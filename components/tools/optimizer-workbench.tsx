"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Crop as CropIcon,
  Download,
  FileArchive,
  FileText,
  Gauge,
  ImageIcon,
  Info,
  Lock,
  RefreshCcw,
  ScanSearch,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  UploadCloud,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import type * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone, type Accept } from "react-dropzone";
import Cropper, { type Area, type Point } from "react-easy-crop";

import { useLocale } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  buildQueueRecommendation,
  convertPdfToWebp,
  createAnalysisResult,
  createPdfFromImages,
  downloadBlob,
  downloadIndividualFiles,
  downloadZip,
  inspectImage,
  processImage,
  readImageDimensions,
  readPdfSummary,
  type ImageInspection,
  type OutputFormat,
  type PdfDocumentSummary,
  type ProcessedResult,
  type ProcessingSettings,
} from "@/lib/image/client-processing";
import { formatBytes, validateImageFile } from "@/lib/image/image-rules";
import {
  describePageSelection,
  isPdfFile,
  parsePageSelection,
  validatePdfFile,
} from "@/lib/image/pdf-pages";
import {
  applyGuardrailFix,
  buildFileProfile,
  evaluateGuardrails,
} from "@/lib/image/quality-guardrails";
import { getToolCapabilities } from "@/lib/image/tool-behavior";
import { interpolate } from "@/lib/i18n/dictionaries";
import {
  getWorkbenchMessages,
  type WorkbenchMessages,
} from "@/lib/i18n/workbench";
import { cn } from "@/lib/utils";
import type { GuardrailFix, GuardrailResult } from "@/types/guardrail";
import type { ToolDefinition, ToolMode } from "@/types/tool";

import { GuardrailWarnings } from "@/components/tools/quality-guardrail-warnings";

type QueueStatus =
  | "waiting"
  | "processing"
  | "completed"
  | "failed"
  | "skipped";

type QueueItem = {
  id: string;
  file: File;
  previewUrl: string;
  dimensions?: {
    width: number;
    height: number;
  };
  pdf?: PdfDocumentSummary;
  warning?: string;
  error?: string;
  invalid?: boolean;
  progress: number;
  status: QueueStatus;
  result?: ProcessedResult;
  recommendation?: ReturnType<typeof buildQueueRecommendation>;
};

type FormatOption = {
  value: OutputFormat;
  label: string;
};

const presets = [
  { id: "smallest", label: "Smallest Size", quality: 62, format: "webp" },
  { id: "balanced", label: "Balanced", quality: 78, format: "webp" },
  { id: "quality", label: "High Quality", quality: 90, format: "original" },
  { id: "web", label: "Web Optimized", quality: 82, format: "webp" },
  { id: "marketplace", label: "Marketplace", quality: 84, format: "webp" },
  { id: "document", label: "Document Upload", quality: 76, format: "jpeg" },
] satisfies Array<{
  id: string;
  label: string;
  quality: number;
  format: OutputFormat;
}>;

const resizePresets = [
  { label: "Instagram Square", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "YouTube Thumbnail", width: 1280, height: 720 },
  { label: "Website Hero", width: 1920, height: 1080 },
  { label: "Blog Cover", width: 1200, height: 630 },
  { label: "Marketplace Product", width: 1000, height: 1000 },
  { label: "Profile Picture", width: 512, height: 512 },
  { label: "Document Upload", width: 800, height: 0 },
];

const cropPresets = [
  { id: "crop-original", label: "Original", ratio: 0 },
  { id: "crop-square", label: "1:1", ratio: 1 },
  { id: "crop-social", label: "4:5", ratio: 4 / 5 },
  { id: "crop-wide", label: "16:9", ratio: 16 / 9 },
  { id: "crop-story", label: "9:16", ratio: 9 / 16 },
  { id: "crop-photo", label: "3:2", ratio: 3 / 2 },
];

const statusVariant: Record<
  QueueStatus,
  "default" | "muted" | "success" | "warning" | "destructive"
> = {
  waiting: "muted",
  processing: "default",
  completed: "success",
  failed: "destructive",
  skipped: "warning",
};

function revokeResultUrls(result?: ProcessedResult) {
  if (!result) {
    return;
  }

  URL.revokeObjectURL(result.url);

  for (const page of result.pages ?? []) {
    URL.revokeObjectURL(page.url);
  }
}

export function OptimizerWorkbench({ tool }: { tool: ToolDefinition }) {
  const { locale } = useLocale();
  const t = getWorkbenchMessages(locale);

  const [items, setItems] = useState<QueueItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const itemsRef = useRef<QueueItem[]>([]);
  const [settings, setSettings] = useState<ProcessingSettings>(() =>
    defaultSettings(tool),
  );
  const [guardrailResult, setGuardrailResult] = useState<GuardrailResult>({
    hasIssues: false,
    hasErrors: false,
    warnings: [],
  });
  const hasAdaptedRef = useRef(false);

  const capabilities = useMemo(
    () => getToolCapabilities(tool.mode),
    [tool.mode],
  );

  const acceptedFormats = useMemo(() => getDropzoneAccept(tool), [tool]);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || items[0],
    [items, selectedId],
  );

  const completedItems = useMemo(
    () => items.filter((item) => item.result),
    [items],
  );

  const readyDownloadItems = useMemo(
    () =>
      items
        .filter((item): item is QueueItem & { result: ProcessedResult } =>
          Boolean(item.result),
        )
        .map((item) => ({ file: item.file, result: item.result })),
    [items],
  );

  useEffect(() => {
    setSettings(defaultSettings(tool));
    hasAdaptedRef.current = false;
    setGuardrailResult({ hasIssues: false, hasErrors: false, warnings: [] });
  }, [tool]);

  const onDrop = useCallback(
    async (files: File[]) => {
      const limitedFiles = files.slice(0, 50);

      for (const file of limitedFiles) {
        const previewUrl = URL.createObjectURL(file);
        const baseItem: QueueItem = {
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          previewUrl,
          progress: 0,
          status: "waiting",
        };

        if (tool.mode === "pdf-to-webp") {
          const pdfValidation = validatePdfFile(file);

          if (!pdfValidation.ok) {
            setItems((current) => [
              ...current,
              {
                ...baseItem,
                status: "failed",
                invalid: true,
                error: pdfValidation.reason,
              },
            ]);
            continue;
          }

          setItems((current) => [...current, baseItem]);
          setSelectedId((current) => current || baseItem.id);

          try {
            const pdf = await readPdfSummary(file);
            setItems((current) =>
              current.map((item) =>
                item.id === baseItem.id
                  ? {
                      ...item,
                      pdf,
                      dimensions: {
                        width: pdf.pageWidth,
                        height: pdf.pageHeight,
                      },
                    }
                  : item,
              ),
            );

            if (!hasAdaptedRef.current) {
              hasAdaptedRef.current = true;
              setSettings((current) => ({
                ...current,
                pdfPageRange: "all",
                outputFormat: "webp",
              }));
            }
          } catch {
            setItems((current) =>
              current.map((item) =>
                item.id === baseItem.id
                  ? {
                      ...item,
                      status: "failed",
                      invalid: true,
                      error:
                        "This PDF could not be read. It may be encrypted or corrupted.",
                    }
                  : item,
              ),
            );
          }

          continue;
        }

        const validation = validateImageFile(file);
        const toolValidation = validateFileForTool(file, tool);

        if (!validation.ok || toolValidation) {
          const failedItem = {
            ...baseItem,
            status: "failed" as const,
            invalid: true,
            error: !validation.ok ? validation.reason : toolValidation,
          };
          setItems((current) => [...current, failedItem]);
          continue;
        }

        setItems((current) => [
          ...current,
          {
            ...baseItem,
            warning: validation.warning,
          },
        ]);

        setSelectedId((current) => current || baseItem.id);

        try {
          const dimensions = await readImageDimensions(file);
          setItems((current) =>
            current.map((item) =>
              item.id === baseItem.id
                ? {
                    ...item,
                    dimensions,
                    recommendation: buildQueueRecommendation(file, dimensions),
                  }
                : item,
            ),
          );

          if (!hasAdaptedRef.current && itemsRef.current.length === 0) {
            hasAdaptedRef.current = true;
            const recommendation = buildQueueRecommendation(file, dimensions);
            setSettings((current) => ({
              ...current,
              quality: recommendation.quality,
              outputFormat: recommendation.format,
              stripMetadata: recommendation.stripMetadata,
              resizeEnabled: Boolean(recommendation.resizeWidth),
              width: recommendation.resizeWidth || current.width,
              height: 0,
              keepAspectRatio: true,
              preset: "smart",
            }));
          }
        } catch {
          setItems((current) =>
            current.map((item) =>
              item.id === baseItem.id
                ? {
                    ...item,
                    warning:
                      "Preview dimensions are not available. Processing will continue if this browser can decode the file.",
                    recommendation: buildQueueRecommendation(file),
                  }
                : item,
            ),
          );
        }
      }
    },
    [tool],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
    accept: acceptedFormats,
  });

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    if (selectedItem?.dimensions) {
      const fileProfile = buildFileProfile(
        selectedItem.file.type,
        selectedItem.file.size,
        selectedItem.dimensions.width,
        selectedItem.dimensions.height,
      );
      const result = evaluateGuardrails(settings, fileProfile, locale);
      setGuardrailResult(result);
    } else if (selectedItem?.file) {
      const result = evaluateGuardrails(settings, undefined, locale);
      setGuardrailResult(result);
    } else {
      setGuardrailResult({ hasIssues: false, hasErrors: false, warnings: [] });
    }
  }, [settings, selectedItem, locale]);

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        URL.revokeObjectURL(item.previewUrl);
        revokeResultUrls(item.result);
      }
    };
  }, []);

  function removeItem(id: string) {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        revokeResultUrls(target.result);
      }
      const next = current.filter((item) => item.id !== id);
      if (selectedId === id) {
        setSelectedId(next[0]?.id || null);
      }
      return next;
    });
  }

  async function runToolForItem(item: QueueItem) {
    const itemSettings =
      settings.mode === "crop"
        ? {
            ...settings,
            cropArea:
              settings.cropAreaSourceId === item.id
                ? settings.cropArea
                : undefined,
          }
        : settings;

    if (settings.mode === "pdf-to-webp") {
      const totalPages = item.pdf?.pageCount || 1;
      return convertPdfToWebp(
        item.file,
        itemSettings,
        parsePageSelection(settings.pdfPageRange, totalPages),
      );
    }

    if (settings.mode === "analyzer") {
      return createAnalysisResult(item.file, item.dimensions);
    }

    if (settings.mode === "metadata") {
      const analysis = await inspectImage(item.file, item.dimensions);
      const cleaned = await processImage(item.file, {
        ...itemSettings,
        stripMetadata: true,
      });
      return { ...cleaned, analysis };
    }

    return processImage(item.file, itemSettings);
  }

  async function processOne(item: QueueItem) {
    if (item.invalid) {
      return;
    }

    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id
          ? { ...entry, status: "processing", progress: 18, error: undefined }
          : entry,
      ),
    );

    try {
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id ? { ...entry, progress: 55 } : entry,
        ),
      );
      const result = await runToolForItem(item);
      setItems((current) =>
        current.map((entry) => {
          if (entry.id !== item.id) {
            return entry;
          }

          revokeResultUrls(entry.result);

          return {
            ...entry,
            status: "completed",
            progress: 100,
            result,
          };
        }),
      );
    } catch (error) {
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? {
                ...entry,
                status: "failed",
                progress: 0,
                error:
                  error instanceof Error
                    ? error.message
                    : "We could not process this image.",
              }
            : entry,
        ),
      );
    }
  }

  async function processPdf(queue: QueueItem[]) {
    if (queue.length === 0) {
      return;
    }

    const queueIds = new Set(queue.map((item) => item.id));
    setItems((current) =>
      current.map((entry) =>
        queueIds.has(entry.id)
          ? { ...entry, status: "processing", progress: 40, error: undefined }
          : entry,
      ),
    );

    try {
      const result = await createPdfFromImages(
        queue.map((item) => item.file),
        settings,
      );
      const primaryId = queue[0].id;

      setItems((current) =>
        current.map((entry) => {
          if (!queueIds.has(entry.id)) {
            return entry;
          }

          revokeResultUrls(entry.result);

          if (entry.id === primaryId) {
            return {
              ...entry,
              status: "completed",
              progress: 100,
              warning: undefined,
              result,
            };
          }

          return {
            ...entry,
            status: "skipped",
            progress: 100,
            result: undefined,
            warning: `Included in ${result.filename}.`,
          };
        }),
      );
      setSelectedId(primaryId);
    } catch (error) {
      setItems((current) =>
        current.map((entry) =>
          queueIds.has(entry.id)
            ? {
                ...entry,
                status: "failed",
                progress: 0,
                error:
                  error instanceof Error
                    ? error.message
                    : "We could not create the PDF.",
              }
            : entry,
        ),
      );
    }
  }

  async function processAll() {
    setIsProcessing(true);
    const queue = items.filter((item) => !item.invalid);

    try {
      if (settings.mode === "pdf") {
        await processPdf(queue);
        return;
      }

      for (const item of queue) {
        await processOne(item);
      }
    } finally {
      setIsProcessing(false);
    }
  }

  function applyPreset(id: string) {
    const preset = presets.find((item) => item.id === id);
    if (!preset) return;

    setSettings((current) => ({
      ...current,
      preset: preset.id,
      quality: preset.quality,
      outputFormat: preset.format,
      resizeEnabled: preset.id === "marketplace" || current.resizeEnabled,
      width: preset.id === "marketplace" ? 1000 : current.width,
      height: preset.id === "marketplace" ? 1000 : current.height,
    }));
  }

  function applyRecommendation() {
    if (!selectedItem?.recommendation) return;
    const recommendation = selectedItem.recommendation;
    setSettings((current) => ({
      ...current,
      quality: recommendation.quality,
      outputFormat: recommendation.format,
      stripMetadata: recommendation.stripMetadata,
      resizeEnabled: Boolean(recommendation.resizeWidth),
      width: recommendation.resizeWidth || current.width,
      height: 0,
      keepAspectRatio: true,
      preset: "smart",
    }));
  }

  function handleApplyGuardrailFix(fix: GuardrailFix) {
    setSettings((current) => applyGuardrailFix(current, fix));
  }

  async function downloadAllResults() {
    const readyItems = items
      .filter((item): item is QueueItem & { result: ProcessedResult } =>
        Boolean(item.result),
      )
      .map((item) => ({ file: item.file, result: item.result }));

    if (readyItems.length === 1 && !capabilities.canZip) {
      downloadBlob(readyItems[0].result.blob, readyItems[0].result.filename);
      return;
    }

    await downloadZip(readyItems);
  }

  async function handleDownloadIndividualFiles() {
    await downloadIndividualFiles(readyDownloadItems);
  }

  const currentStep =
    items.length === 0 ? 1 : completedItems.length === 0 ? 2 : 3;

  return (
    <section
      id="kompresio-workbench"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
    >
      <WorkbenchSteps
        tool={tool}
        currentStep={currentStep}
        hasFiles={items.length > 0}
        completedCount={completedItems.length}
        messages={t}
      />
      <div className="mt-6 flex flex-col gap-5 lg:grid lg:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="order-1 space-y-4 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <Dropzone
            tool={tool}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            open={open}
            messages={t}
          />
          <QueueList
            items={items}
            selectedId={selectedItem?.id}
            onSelect={setSelectedId}
            onRemove={removeItem}
            messages={t}
          />
        </aside>

        <main className="order-3 min-w-0 space-y-5 lg:order-none">
          <PreviewPanel
            item={selectedItem}
            mode={tool.mode}
            tool={tool}
            messages={t}
          />
          {tool.mode === "crop" ? (
            <CropEditorPanel
              item={selectedItem}
              settings={settings}
              setSettings={setSettings}
              messages={t}
            />
          ) : null}
          <InspectionPanel item={selectedItem} mode={tool.mode} messages={t} />
          <ResultSummary
            item={selectedItem}
            mode={tool.mode}
            tool={tool}
            messages={t}
          />
          <PrivacyPanel mode={tool.mode} tool={tool} messages={t} />
        </main>

        <aside className="order-2 space-y-4 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <SettingsPanel
            tool={tool}
            capabilities={capabilities}
            selectedItem={selectedItem}
            settings={settings}
            setSettings={setSettings}
            onPreset={applyPreset}
            onRecommendation={applyRecommendation}
            hasRecommendation={Boolean(selectedItem?.recommendation)}
            messages={t}
          />
          <GuardrailWarnings
            warnings={guardrailResult.warnings}
            hasErrors={guardrailResult.hasErrors}
            onApplyFix={handleApplyGuardrailFix}
            messages={t}
          />
          <ActionPanel
            tool={tool}
            capabilities={capabilities}
            items={items}
            completedCount={completedItems.length}
            readyItems={readyDownloadItems}
            isProcessing={isProcessing}
            onProcess={processAll}
            onDownloadZip={downloadAllResults}
            onDownloadFiles={handleDownloadIndividualFiles}
            messages={t}
          />
        </aside>
      </div>
    </section>
  );
}

function WorkbenchSteps({
  tool,
  currentStep,
  hasFiles,
  completedCount,
  messages,
}: {
  tool: ToolDefinition;
  currentStep: number;
  hasFiles: boolean;
  completedCount: number;
  messages: WorkbenchMessages;
}) {
  const t = messages.steps;
  const steps = [
    {
      number: 1,
      title: t.upload,
      description: hasFiles
        ? t.uploadReady
        : interpolate(t.uploadEmpty, {
            formats: tool.supportedFormats.slice(0, 3).join(", "),
          }),
    },
    {
      number: 2,
      title: t.adjust,
      description: interpolate(t.adjustHint, { action: tool.primaryAction }),
    },
    {
      number: 3,
      title: t.download,
      description:
        completedCount > 0
          ? interpolate(t.downloadReady, { count: completedCount })
          : t.downloadHint,
    },
  ];

  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {steps.map((step) => {
        const active = currentStep === step.number;
        const done =
          (step.number === 1 && hasFiles) ||
          (step.number === 2 && completedCount > 0);
        return (
          <li
            key={step.number}
            className={cn(
              "flex gap-3 rounded-2xl border bg-paper p-4 transition-colors",
              active ? "border-cerulean/40 bg-brand-soft" : "border-mist",
            )}
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full font-mono text-[12px]",
                active || done
                  ? "bg-cerulean text-white"
                  : "bg-linen text-fog",
              )}
            >
              {done ? <CheckCircle2 className="size-4" /> : `0${step.number}`}
            </span>
            <span className="min-w-0">
              <span className="block text-body-sm font-semibold text-graphite">
                {step.title}
              </span>
              <span className="mt-0.5 block text-[13px] leading-6 text-ash">
                {step.description}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function defaultSettings(tool: ToolDefinition): ProcessingSettings {
  const mode = tool.mode;
  return {
    mode,
    quality:
      mode === "metadata"
        ? 92
        : mode === "remove-bg"
          ? 90
          : mode === "pdf"
            ? 86
            : mode === "pdf-to-webp"
              ? 86
              : mode === "resize"
                ? 84
                : 78,
    outputFormat:
      mode === "webp" || mode === "batch" || mode === "pdf-to-webp"
        ? "webp"
        : mode === "avif"
          ? "avif"
          : mode === "remove-bg"
            ? "png"
            : mode === "heic" || mode === "metadata"
              ? "jpeg"
              : "original",
    resizeEnabled: mode === "resize",
    width: mode === "resize" ? 1200 : mode === "pdf" ? 1600 : 1600,
    height: mode === "resize" ? 630 : 0,
    keepAspectRatio: true,
    stripMetadata: true,
    preset: mode === "resize" ? "blog-cover" : "balanced",
    cropAspectRatio: 1,
    pdfOrientation: "portrait",
    pdfPageSize: "a4",
    pdfMargin: 24,
    pdfPageRange: "all",
    pdfScale: 2,
    pdfBackground: "white",
  };
}

function Dropzone({
  tool,
  getRootProps,
  getInputProps,
  isDragActive,
  open,
  messages,
}: {
  tool: ToolDefinition;
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: boolean;
  open: () => void;
  messages: WorkbenchMessages;
}) {
  const t = messages.dropzone;
  const isPdfTool = tool.mode === "pdf-to-webp";

  return (
    <Card
      {...getRootProps()}
      id="kompresio-dropzone"
      className={cn(
        "scroll-mt-24 border-dashed p-5 transition-colors",
        isDragActive
          ? "border-cerulean bg-brand-soft"
          : "hover:border-fog",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-start gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-cerulean">
          <UploadCloud className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-cerulean">
            {messages.steps.upload}
          </p>
          <h2 className="mt-1.5 font-display text-subheading text-graphite">
            {isDragActive
              ? t.release
              : isPdfTool
                ? t.pdf
                : t.images}
          </h2>
          <p className="mt-1.5 text-[13px] leading-6 text-ash">
            {interpolate(t.formats, {
              tool: tool.name,
              formats: tool.supportedFormats.join(", "),
            })}{" "}
            {isPdfTool ? t.limitsPdf : t.limitsImage}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={open}
        >
          <ImageIcon className="size-4" />
          {isPdfTool ? t.browsePdfs : t.browseImages}
        </Button>
        <Badge variant="success">
          <Lock className="size-3" />
          {t.local}
        </Badge>
      </div>
    </Card>
  );
}

function QueueList({
  items,
  selectedId,
  onSelect,
  onRemove,
  messages,
}: {
  items: QueueItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  messages: WorkbenchMessages;
}) {
  const t = messages.queue;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-mist p-4">
        <h2 className="text-body-sm font-semibold text-graphite">
          {t.title}
        </h2>
        <Badge variant="muted">{items.length}/50</Badge>
      </div>
      {items.length === 0 ? (
        <div className="p-5 text-[13px] leading-6 text-ash">{t.empty}</div>
      ) : (
        <div className="max-h-[420px] overflow-y-auto p-2">
          {items.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(item.id);
                }
              }}
              className={cn(
                "group mb-2 w-full cursor-pointer rounded-xl border p-3 text-left transition-colors",
                selectedId === item.id
                  ? "border-cerulean/40 bg-brand-soft"
                  : "border-transparent hover:border-mist hover:bg-linen",
              )}
            >
              <div className="flex gap-3">
                <div className="relative grid size-12 place-items-center overflow-hidden rounded-lg border border-mist bg-linen">
                  {item.pdf ? (
                    <FileText className="size-5 text-fog" />
                  ) : canRenderPreview(item.file) ? (
                    <Image
                      src={item.previewUrl}
                      alt={`Preview of ${item.file.name}`}
                      fill
                      unoptimized
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-5 text-fog" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-graphite">
                    {item.file.name}
                  </p>
                  <p className="font-mono text-[12px] text-ash">
                    {formatBytes(item.file.size)}
                    {item.pdf
                      ? ` · ${item.pdf.pageCount}`
                      : item.dimensions
                        ? ` · ${item.dimensions.width}×${item.dimensions.height}`
                        : ""}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={statusVariant[item.status]}>
                      {item.status}
                    </Badge>
                    <button
                      type="button"
                      aria-label={`Remove ${item.file.name}`}
                      className="ml-auto rounded-md p-1 text-fog opacity-0 transition-colors hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemove(item.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  {item.status === "processing" ? (
                    <Progress value={item.progress} className="mt-2" />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function PreviewPanel({
  item,
  mode,
  tool,
  messages,
}: {
  item?: QueueItem;
  mode: ToolMode;
  tool: ToolDefinition;
  messages: WorkbenchMessages;
}) {
  const t = messages.preview;

  if (!item) {
    return (
      <Card className="grid min-h-[420px] place-items-center p-8 text-center">
        <div className="max-w-sm">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-soft text-cerulean">
            <Gauge className="size-6" />
          </span>
          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cerulean">
            {t.emptyEyebrow}
          </p>
          <h2 className="mt-2 font-display text-heading-sm text-graphite">
            {interpolate(t.emptyTitle, { tool: tool.name.toLowerCase() })}
          </h2>
          <p className="mt-3 text-body-sm leading-7 text-ash">
            {interpolate(t.emptyBody, {
              formats: tool.supportedFormats.slice(0, 3).join(", "),
              action: tool.primaryAction,
            })}
          </p>
        </div>
      </Card>
    );
  }

  const outputTitle =
    mode === "pdf"
      ? t.pdfDocument
      : mode === "pdf-to-webp"
        ? t.webpPages
        : mode === "analyzer"
          ? t.analysisReport
          : mode === "remove-bg"
            ? t.backgroundRemoved
            : t.optimized;

  const heading =
    mode === "analyzer"
      ? t.inspectionPreview
      : mode === "pdf-to-webp"
        ? t.pdfPagePreview
        : t.beforeAfter;

  const description =
    mode === "pdf"
      ? t.descPdf
      : mode === "pdf-to-webp"
        ? t.descPdfToWebp
        : mode === "analyzer"
          ? t.descAnalyzer
          : mode === "remove-bg"
            ? t.descRemoveBg
            : t.descCompare;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col justify-between gap-3 border-b border-mist p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-subheading text-graphite">
            {heading}
          </h2>
          <p className="text-[13px] text-ash">{description}</p>
        </div>
        {item.warning ? (
          <Badge variant="warning">
            <AlertTriangle className="size-3" />
            {t.warning}
          </Badge>
        ) : (
          <Badge variant="success">
            <ShieldCheck className="size-3" />
            {t.private}
          </Badge>
        )}
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">
        {mode === "pdf-to-webp" ? (
          <PdfSourcePreview item={item} messages={messages} />
        ) : (
          <PreviewImage
            title={t.original}
            src={item.previewUrl}
            canRender={canRenderPreview(item.file)}
            alt={`Original ${item.file.name}`}
            detail={formatBytes(item.file.size)}
          />
        )}
        {item.result?.kind === "image" ? (
          <PreviewImage
            title={outputTitle}
            src={item.result.url}
            canRender
            alt={`Optimized ${item.file.name}`}
            detail={formatBytes(item.result.outputSize)}
          />
        ) : (
          <ResultFilePreview
            result={item.result}
            title={outputTitle}
            messages={messages}
          />
        )}
      </div>

      {item.result?.pages && item.result.pages.length > 1 ? (
        <div className="border-t border-mist p-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ash">
            {t.convertedPages}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {item.result.pages.map((page) => (
              <a
                key={page.filename}
                href={page.url}
                download={page.filename}
                className="group overflow-hidden rounded-xl border border-mist bg-linen transition-colors hover:border-fog"
              >
                <div className="relative aspect-[3/4] bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.url}
                    alt={interpolate(t.page, { number: page.pageNumber })}
                    loading="lazy"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-mist px-3 py-2">
                  <span className="font-mono text-[12px] text-ash">
                    {interpolate(t.page, { number: page.pageNumber })}
                  </span>
                  <span className="font-mono text-[11px] text-fog">
                    {formatBytes(page.blob.size)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      {item.error || item.warning ? (
        <div className="border-t border-mist p-5">
          <InlineMessage type={item.error ? "error" : "warning"}>
            {item.error || item.warning}
          </InlineMessage>
        </div>
      ) : null}
    </Card>
  );
}

function PdfSourcePreview({
  item,
  messages,
}: {
  item: QueueItem;
  messages: WorkbenchMessages;
}) {
  const pdf = item.pdf;
  const rows = [
    { label: "File", value: item.file.name },
    { label: messages.inspection.size, value: formatBytes(item.file.size) },
    {
      label: messages.results.pages,
      value: pdf ? String(pdf.pageCount) : "…",
    },
    {
      label: messages.results.pageSize,
      value: pdf ? `${pdf.pageWidth}×${pdf.pageHeight} pt` : "…",
    },
    { label: "Title", value: pdf?.title || "—" },
    { label: "Author", value: pdf?.author || "—" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-mist bg-linen">
      <div className="flex items-center justify-between border-b border-mist bg-paper/90 px-4 py-3">
        <p className="text-[13px] font-medium text-graphite">
          {messages.preview.pdfDocument}
        </p>
        <p className="font-mono text-[12px] text-ash">
          {formatBytes(item.file.size)}
        </p>
      </div>
      <div className="grid aspect-[4/3] place-items-center p-5">
        <div className="w-full max-w-sm">
          <FileText className="mx-auto size-8 text-cerulean" />
          <p className="mt-4 truncate text-center text-body-sm font-medium text-graphite">
            {item.file.name}
          </p>
          <dl className="mt-5 space-y-2">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4 border-t border-mist pt-2"
              >
                <dt className="text-[12px] uppercase tracking-[0.08em] text-ash">
                  {row.label}
                </dt>
                <dd className="max-w-[60%] truncate text-right font-mono text-[12px] text-graphite">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function PreviewImage({
  title,
  src,
  canRender,
  alt,
  detail,
}: {
  title: string;
  src?: string;
  canRender: boolean;
  alt: string;
  detail: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-mist bg-[linear-gradient(45deg,#f2f4f0_25%,transparent_25%),linear-gradient(-45deg,#f2f4f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f2f4f0_75%),linear-gradient(-45deg,transparent_75%,#f2f4f0_75%)] bg-[length:22px_22px] bg-[position:0_0,0_11px,11px_-11px,-11px_0]">
      <div className="flex items-center justify-between border-b border-mist bg-paper/90 px-4 py-3">
        <p className="text-[13px] font-medium text-graphite">{title}</p>
        <p className="font-mono text-[12px] text-ash">{detail}</p>
      </div>
      <div className="grid aspect-[4/3] place-items-center p-3">
        {src && canRender ? (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            unoptimized
            className="h-full w-full rounded-lg object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="text-center text-[13px] text-ash">
            <ImageIcon className="mx-auto mb-2 size-8 text-fog" />
            {src ? "Preview not available for this format" : "No output yet"}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultFilePreview({
  result,
  title,
  messages,
}: {
  result?: ProcessedResult;
  title: string;
  messages: WorkbenchMessages;
}) {
  const t = messages.preview;

  return (
    <div className="overflow-hidden rounded-xl border border-mist bg-linen">
      <div className="flex items-center justify-between border-b border-mist bg-paper/90 px-4 py-3">
        <p className="text-[13px] font-medium text-graphite">{title}</p>
        <p className="font-mono text-[12px] text-ash">
          {result ? formatBytes(result.outputSize) : t.processToGenerate}
        </p>
      </div>
      <div className="grid aspect-[4/3] place-items-center p-6 text-center">
        {result ? (
          <div>
            {result.kind === "json" ? (
              <ScanSearch className="mx-auto size-7 text-cerulean" />
            ) : (
              <FileText className="mx-auto size-7 text-cerulean" />
            )}
            <p className="mt-4 break-all text-body-sm font-medium text-graphite">
              {result.filename}
            </p>
            <p className="mt-2 text-[13px] leading-6 text-ash">
              {result.kind === "pdf"
                ? interpolate(t.pdfReady, { count: result.pageCount || 1 })
                : t.jsonReady}
            </p>
          </div>
        ) : (
          <div className="text-[13px] text-ash">
            <FileText className="mx-auto mb-2 size-8 text-fog" />
            {t.noGeneratedFile}
          </div>
        )}
      </div>
    </div>
  );
}

function CropEditorPanel({
  item,
  settings,
  setSettings,
  messages,
}: {
  item?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  messages: WorkbenchMessages;
}) {
  const aspectRatio = settings.cropAspectRatio || sourceAspectRatio(item);

  if (!item || !canRenderPreview(item.file)) {
    return (
      <Card className="p-5">
        <InlineMessage type="info">
          {messages.crop.uploadHint}
        </InlineMessage>
      </Card>
    );
  }

  return (
    <CropEditorSurface
      key={`${item.id}-${aspectRatio}`}
      item={item}
      aspectRatio={aspectRatio}
      setSettings={setSettings}
      messages={messages}
    />
  );
}

function CropEditorSurface({
  item,
  aspectRatio,
  setSettings,
  messages,
}: {
  item: QueueItem;
  aspectRatio: number;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  messages: WorkbenchMessages;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  function handleCropComplete(_: Area, croppedAreaPixels: Area) {
    setSettings((current) => ({
      ...current,
      cropArea: croppedAreaPixels,
      cropAreaSourceId: item.id,
    }));
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-mist p-5">
        <div>
          <h2 className="font-display text-subheading text-graphite">
            {messages.crop.title}
          </h2>
          <p className="text-[13px] text-ash">
            {messages.crop.description}
          </p>
        </div>
        <Badge variant="outline">{formatRatioLabel(aspectRatio)}</Badge>
      </div>
      <div className="p-5">
        <div className="relative h-[300px] overflow-hidden rounded-xl border border-mist bg-dusk sm:h-[380px]">
          <Cropper
            image={item.previewUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="crop-zoom">{messages.crop.zoom}</Label>
              <span className="font-mono text-[13px] text-graphite">
                {zoom.toFixed(2)}x
              </span>
            </div>
            <input
              id="crop-zoom"
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              className="w-full accent-cerulean"
              onChange={(event) => setZoom(Number(event.target.value))}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setCrop({ x: 0, y: 0 });
              setZoom(1);
              setSettings((current) => ({
                ...current,
                cropArea: undefined,
                cropAreaSourceId: undefined,
              }));
            }}
          >
            <RefreshCcw className="size-4" />
            {messages.crop.reset}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function InspectionPanel({
  item,
  mode,
  messages,
}: {
  item?: QueueItem;
  mode: ToolMode;
  messages: WorkbenchMessages;
}) {
  const t = messages.inspection;

  if (mode !== "analyzer" && mode !== "metadata") {
    return null;
  }

  const analysis = item?.result?.analysis;

  if (!analysis) {
    return (
      <Card className="p-5">
        <InlineMessage type="info">
          {mode === "metadata" ? t.runMetadata : t.runAnalyzer}
        </InlineMessage>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-mist p-5">
        <div>
          <h2 className="font-display text-subheading text-graphite">
            {t.title}
          </h2>
          <p className="text-[13px] text-ash">{t.description}</p>
        </div>
        <Badge
          variant={analysis.sensitiveMetadataCount ? "warning" : "success"}
        >
          {analysis.sensitiveMetadataCount
            ? interpolate(t.sensitiveCount, {
                count: analysis.sensitiveMetadataCount,
              })
            : t.noSensitive}
        </Badge>
      </div>
      <div className="space-y-5 p-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InspectionMetric label={t.size} value={analysis.fileSizeReadable} />
          <InspectionMetric
            label={t.dimensions}
            value={
              analysis.width && analysis.height
                ? `${analysis.width}×${analysis.height}`
                : t.unknown
            }
          />
          <InspectionMetric
            label={t.megapixels}
            value={`${analysis.megapixels} MP`}
          />
          <InspectionMetric label={t.metadataTags} value={analysis.metadataCount} />
        </div>

        {analysis.recommendation.notes.length ? (
          <div className="rounded-xl border border-cerulean/20 bg-brand-soft p-4">
            <p className="text-body-sm font-semibold text-graphite">
              {t.smartRecommendation}
            </p>
            <ul className="mt-3 space-y-2">
              {analysis.recommendation.notes.map((note) => (
                <li
                  key={note}
                  className="flex gap-2 text-[13px] leading-6 text-charcoal"
                >
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-cerulean" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <MetadataTable analysis={analysis} messages={messages} />
      </div>
    </Card>
  );
}

function InspectionMetric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="border-t border-mist pt-3">
      <p className="text-[12px] uppercase tracking-[0.08em] text-ash">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-lg text-graphite">{value}</p>
    </div>
  );
}

function MetadataTable({
  analysis,
  messages,
}: {
  analysis: ImageInspection;
  messages: WorkbenchMessages;
}) {
  const t = messages.inspection;
  const tags = analysis.metadataTags.slice(0, 10);

  if (tags.length === 0) {
    return (
      <div className="rounded-xl border border-success/25 bg-success/8 p-4 text-[13px] leading-6 text-success">
        {t.noExif}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-mist">
      <div className="grid min-w-[560px] grid-cols-[1fr_1fr_auto] gap-3 border-b border-mist bg-linen px-4 py-3 text-[12px] uppercase tracking-[0.08em] text-ash">
        <span>{t.tag}</span>
        <span>{t.value}</span>
        <span>{t.risk}</span>
      </div>
      <div className="divide-y divide-mist">
        {tags.map((tag) => (
          <div
            key={`${tag.group || "metadata"}-${tag.name}-${tag.value}`}
            className="grid min-w-[560px] grid-cols-[1fr_1fr_auto] gap-3 px-4 py-3 text-[13px]"
          >
            <span className="min-w-0 truncate text-charcoal">
              {tag.group ? `${tag.group}.${tag.name}` : tag.name}
            </span>
            <span className="min-w-0 truncate text-ash">
              {tag.value || "-"}
            </span>
            <Badge variant={tag.sensitive ? "warning" : "muted"}>
              {tag.sensitive ? t.sensitive : t.normal}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultSummary({
  item,
  mode,
  tool,
  messages,
}: {
  item?: QueueItem;
  mode: ToolMode;
  tool: ToolDefinition;
  messages: WorkbenchMessages;
}) {
  const t = messages.results;
  const result = item?.result;
  const noFile = !item;
  const originalSize = result ? result.originalSize : item ? item.file.size : 0;
  const dimensions = result
    ? `${result.width}×${result.height}`
    : item?.dimensions
      ? `${item.dimensions.width}×${item.dimensions.height}`
      : noFile
        ? interpolate(t.appearsAfter, { action: tool.primaryAction })
        : "-";
  const savedValue =
    result?.kind === "pdf"
      ? `${result.pageCount || 1}`
      : result?.pages
        ? `${result.pages.length}`
        : result?.kind === "json"
          ? `${result.analysis?.metadataCount || 0}`
          : result
            ? `${result.savedPercent}%`
            : "-";

  const metrics = [
    { label: t.originalSize, value: originalSize ? formatBytes(originalSize) : "-" },
    { label: t.outputSize, value: result ? formatBytes(result.outputSize) : "-" },
    {
      label:
        mode === "pdf"
          ? t.pages
          : mode === "pdf-to-webp"
            ? t.webpPages
            : mode === "analyzer"
              ? t.metadata
              : t.saved,
      value: savedValue,
      strong: Boolean(result),
    },
    { label: t.format, value: result?.format || "-" },
    {
      label: result?.kind === "pdf" ? t.pageSize : t.dimensions,
      value: dimensions,
    },
    { label: t.time, value: result ? `${result.processingTime}ms` : "-" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={cn(
            "rounded-xl border p-4",
            metric.strong
              ? "border-cerulean/25 bg-brand-soft"
              : "border-mist bg-paper",
          )}
        >
          <p className="text-[12px] uppercase tracking-[0.08em] text-ash">
            {metric.label}
          </p>
          <p className="mt-1.5 break-words font-mono text-lg text-graphite">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel({
  tool,
  capabilities,
  selectedItem,
  settings,
  setSettings,
  onPreset,
  onRecommendation,
  hasRecommendation,
  messages,
}: {
  tool: ToolDefinition;
  capabilities: ReturnType<typeof getToolCapabilities>;
  selectedItem?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  onPreset: (id: string) => void;
  onRecommendation: () => void;
  hasRecommendation: boolean;
  messages: WorkbenchMessages;
}) {
  const t = messages.settings;
  const formatOptions = getFormatOptions(tool.mode);
  const showPresets = ![
    "pdf",
    "pdf-to-webp",
    "analyzer",
    "remove-bg",
  ].includes(tool.mode);
  const showQuality = tool.mode !== "analyzer";
  const showOutput =
    formatOptions.length > 0 &&
    tool.mode !== "pdf" &&
    tool.mode !== "pdf-to-webp" &&
    tool.mode !== "analyzer";
  const canResize = capabilities.canResize || tool.mode === "pdf";

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-mist p-5">
        <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-cerulean">
          <Settings2 className="size-4.5" />
        </span>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-cerulean">
            {messages.steps.adjust}
          </p>
          <h2 className="font-display text-subheading text-graphite">
            {tool.mode === "pdf"
              ? t.pdfTitle
              : tool.mode === "analyzer"
                ? t.analyzerTitle
                : t.title}
          </h2>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <p className="text-[13px] leading-6 text-ash">
          {interpolate(t.intro, { tool: tool.name })}
        </p>

        {tool.mode === "analyzer" ? (
          <InlineMessage type="info">{t.analyzerNote}</InlineMessage>
        ) : null}

        {showPresets ? (
          <div className="space-y-2">
            <Label>{t.preset}</Label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPreset(preset.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-left text-[13px] transition-colors",
                    settings.preset === preset.id
                      ? "border-cerulean bg-brand-soft text-cerulean"
                      : "border-mist text-charcoal hover:border-fog hover:bg-linen",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {showQuality ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="quality">
                {tool.mode === "pdf" ? t.pdfQuality : t.quality}
              </Label>
              <span className="font-mono text-[13px] text-graphite">
                {settings.quality}
              </span>
            </div>
            <input
              id="quality"
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              className="w-full accent-cerulean"
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  quality: Number(event.target.value),
                  preset: "custom",
                }))
              }
            />
          </div>
        ) : null}

        {showOutput ? (
          <div className="space-y-2">
            <Label htmlFor="format">{t.outputFormat}</Label>
            {formatOptions.length === 1 ? (
              <div className="flex h-10 items-center rounded-lg border border-mist bg-linen px-3 text-[15px] text-charcoal">
                {formatOptions[0].label}
              </div>
            ) : (
              <select
                id="format"
                value={settings.outputFormat}
                className="h-10 w-full rounded-lg border border-mist bg-linen px-3 text-[15px] text-charcoal outline-none transition-colors focus:border-cerulean/60 focus:bg-paper focus:ring-4 focus:ring-cerulean/10"
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    outputFormat: event.target.value as OutputFormat,
                    preset: "custom",
                  }))
                }
              >
                {formatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ) : null}

        {tool.mode === "pdf" ? (
          <PdfSettings
            settings={settings}
            setSettings={setSettings}
            messages={messages}
          />
        ) : null}

        {tool.mode === "pdf-to-webp" ? (
          <PdfToWebpSettings
            selectedItem={selectedItem}
            settings={settings}
            setSettings={setSettings}
            messages={messages}
          />
        ) : null}

        {tool.mode === "crop" ? (
          <CropSettings
            selectedItem={selectedItem}
            settings={settings}
            setSettings={setSettings}
            messages={messages}
          />
        ) : null}

        {tool.mode === "metadata" ? (
          <InlineMessage type="info">{t.metadataNote}</InlineMessage>
        ) : null}

        {capabilities.canCleanMetadata && tool.mode !== "metadata" ? (
          <CheckboxControl
            checked={settings.stripMetadata}
            label={t.removeMetadata}
            description={t.removeMetadataHint}
            onChange={(checked) =>
              setSettings((current) => ({
                ...current,
                stripMetadata: checked,
              }))
            }
          />
        ) : null}

        {canResize ? (
          <>
            <Separator />
            <ResizeSettings
              settings={settings}
              setSettings={setSettings}
              messages={messages}
            />
          </>
        ) : null}

        {hasRecommendation &&
        tool.mode !== "pdf" &&
        tool.mode !== "pdf-to-webp" &&
        tool.mode !== "analyzer" ? (
          <Button
            type="button"
            variant="accent"
            className="w-full"
            onClick={onRecommendation}
          >
            <SlidersHorizontal className="size-4" />
            {t.applyRecommendation}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

function PdfSettings({
  settings,
  setSettings,
  messages,
}: {
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  messages: WorkbenchMessages;
}) {
  const t = messages.pdf;
  const selectClass =
    "h-10 w-full rounded-lg border border-mist bg-linen px-3 text-[15px] text-charcoal outline-none transition-colors focus:border-cerulean/60 focus:bg-paper focus:ring-4 focus:ring-cerulean/10";

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <Label htmlFor="pdf-page-size">{t.pageSize}</Label>
        <select
          id="pdf-page-size"
          value={settings.pdfPageSize}
          className={selectClass}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pdfPageSize: event.target
                .value as ProcessingSettings["pdfPageSize"],
            }))
          }
        >
          <option value="a4">A4</option>
          <option value="letter">Letter</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pdf-orientation">{t.orientation}</Label>
        <select
          id="pdf-orientation"
          value={settings.pdfOrientation}
          className={selectClass}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pdfOrientation: event.target
                .value as ProcessingSettings["pdfOrientation"],
            }))
          }
        >
          <option value="portrait">{t.portrait}</option>
          <option value="landscape">{t.landscape}</option>
        </select>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="pdf-margin">{t.margin}</Label>
        <Input
          id="pdf-margin"
          type="number"
          min={0}
          max={96}
          value={settings.pdfMargin}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pdfMargin: Number(event.target.value),
            }))
          }
        />
      </div>
    </div>
  );
}

function PdfToWebpSettings({
  selectedItem,
  settings,
  setSettings,
  messages,
}: {
  selectedItem?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  messages: WorkbenchMessages;
}) {
  const t = messages.pdfToWebp;
  const totalPages = selectedItem?.pdf?.pageCount || 0;
  const selectedPages = totalPages
    ? parsePageSelection(settings.pdfPageRange, totalPages)
    : [];
  const backgroundOptions: Array<{
    value: ProcessingSettings["pdfBackground"];
    label: string;
  }> = [
    { value: "white", label: t.white },
    { value: "transparent", label: t.transparent },
  ];

  return (
    <div className="space-y-5">
      <InlineMessage type="info">{t.note}</InlineMessage>

      <div className="space-y-2">
        <Label htmlFor="pdf-page-range">{t.pages}</Label>
        <Input
          id="pdf-page-range"
          type="text"
          inputMode="text"
          placeholder={t.pagesPlaceholder}
          value={settings.pdfPageRange}
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pdfPageRange: event.target.value,
            }))
          }
        />
        <p className="text-[12px] leading-5 text-ash">
          {t.pagesHelp}
          {totalPages > 0
            ? ` ${describePageSelection(selectedPages, totalPages)}`
            : ""}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="pdf-scale">{t.scale}</Label>
          <span className="font-mono text-[13px] text-graphite">
            {settings.pdfScale.toFixed(2)}×
          </span>
        </div>
        <input
          id="pdf-scale"
          type="range"
          min="1"
          max="4"
          step="0.25"
          value={settings.pdfScale}
          className="w-full accent-cerulean"
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pdfScale: Number(event.target.value),
            }))
          }
        />
        <p className="text-[12px] leading-5 text-ash">{t.scaleHelp}</p>
      </div>

      <div className="space-y-2">
        <Label>{t.background}</Label>
        <div className="grid grid-cols-2 gap-2">
          {backgroundOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  pdfBackground: option.value,
                }))
              }
              className={cn(
                "rounded-lg border px-3 py-2 text-[13px] transition-colors",
                settings.pdfBackground === option.value
                  ? "border-cerulean bg-brand-soft text-cerulean"
                  : "border-mist text-charcoal hover:border-fog hover:bg-linen",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CropSettings({
  selectedItem,
  settings,
  setSettings,
  messages,
}: {
  selectedItem?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  messages: WorkbenchMessages;
}) {
  return (
    <div className="space-y-2">
      <Label>{messages.cropSettings.aspect}</Label>
      <div className="grid grid-cols-3 gap-2">
        {cropPresets.map((preset) => {
          const ratio = preset.ratio || sourceAspectRatio(selectedItem);
          const active =
            settings.preset === preset.id ||
            Math.abs(settings.cropAspectRatio - ratio) < 0.001;

          return (
            <button
              key={preset.id}
              type="button"
              className={cn(
                "rounded-lg border px-3 py-2 text-[13px] transition-colors",
                active
                  ? "border-cerulean bg-brand-soft text-cerulean"
                  : "border-mist text-charcoal hover:border-fog hover:bg-linen",
              )}
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  cropAspectRatio: ratio,
                  cropArea: undefined,
                  cropAreaSourceId: undefined,
                  preset: preset.id,
                }))
              }
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResizeSettings({
  settings,
  setSettings,
  messages,
}: {
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  messages: WorkbenchMessages;
}) {
  const t = messages.resize;

  return (
    <div className="space-y-3">
      <CheckboxControl
        checked={settings.resizeEnabled}
        label={t.enable}
        description={t.enableHint}
        onChange={(checked) =>
          setSettings((current) => ({
            ...current,
            resizeEnabled: checked,
          }))
        }
      />

      {settings.resizeEnabled ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="width">{t.width}</Label>
              <Input
                id="width"
                type="number"
                min={0}
                value={settings.width || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    width: Number(event.target.value),
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">{t.height}</Label>
              <Input
                id="height"
                type="number"
                min={0}
                value={settings.height || ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    height: Number(event.target.value),
                  }))
                }
              />
            </div>
          </div>
          <CheckboxControl
            checked={settings.keepAspectRatio}
            label={t.keepAspect}
            description={t.keepAspectHint}
            onChange={(checked) =>
              setSettings((current) => ({
                ...current,
                keepAspectRatio: checked,
              }))
            }
          />
          <div className="grid grid-cols-2 gap-2">
            {resizePresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="rounded-lg border border-mist px-3 py-2 text-left text-[12px] text-charcoal transition-colors hover:border-fog hover:bg-linen"
                onClick={() =>
                  setSettings((current) => ({
                    ...current,
                    resizeEnabled: true,
                    width: preset.width,
                    height: preset.height,
                    preset: preset.label.toLowerCase().replaceAll(" ", "-"),
                  }))
                }
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CheckboxControl({
  checked,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  label: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-mist bg-paper p-3 transition-colors hover:border-fog">
      <span
        className={cn(
          "mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-md border transition-colors",
          checked ? "border-cerulean bg-cerulean text-white" : "border-fog",
        )}
      >
        {checked ? <CheckCircle2 className="size-3" /> : null}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="block text-[13px] font-medium text-graphite">
          {label}
        </span>
        <span className="block text-[12px] leading-5 text-ash">
          {description}
        </span>
      </span>
    </label>
  );
}

function ActionPanel({
  tool,
  capabilities,
  items,
  completedCount,
  readyItems,
  isProcessing,
  onProcess,
  onDownloadZip,
  onDownloadFiles,
  messages,
}: {
  tool: ToolDefinition;
  capabilities: ReturnType<typeof getToolCapabilities>;
  items: QueueItem[];
  completedCount: number;
  readyItems: Array<{ file: File; result: ProcessedResult }>;
  isProcessing: boolean;
  onProcess: () => Promise<void>;
  onDownloadZip: () => Promise<void>;
  onDownloadFiles: () => Promise<void>;
  messages: WorkbenchMessages;
}) {
  const t = messages.actions;
  const selectedReady = items.find((item) => item.result);
  const copy = getActionCopy(tool, t);
  const PrimaryIcon =
    tool.mode === "pdf" || tool.mode === "pdf-to-webp"
      ? FileText
      : tool.mode === "analyzer" || tool.mode === "metadata"
        ? ScanSearch
        : tool.mode === "crop"
          ? CropIcon
          : Gauge;

  return (
    <Card className="p-5">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-cerulean">
        {messages.steps.download}
      </p>
      <div className="space-y-3">
        <Button
          type="button"
          variant="dark"
          className="w-full"
          size="lg"
          onClick={() => {
            if (items.length === 0) {
              document
                .getElementById("kompresio-dropzone")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
              return;
            }
            void onProcess();
          }}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCcw className="size-4 animate-spin" />
          ) : (
            <PrimaryIcon className="size-4" />
          )}
          {isProcessing ? copy.processingLabel : copy.primaryLabel}
        </Button>
        {readyItems.length === 1 && !capabilities.canZip ? (
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={!selectedReady}
            onClick={() =>
              selectedReady?.result &&
              downloadBlob(
                selectedReady.result.blob,
                selectedReady.result.filename,
              )
            }
          >
            <Download className="size-4" />
            {interpolate(t.downloadSingle, { label: copy.singleLabel })}
          </Button>
        ) : readyItems.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={onDownloadFiles}
            >
              <Download className="size-4" />
              {interpolate(t.files, { count: readyItems.length })}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={onDownloadZip}
              disabled={!capabilities.canZip}
            >
              <FileArchive className="size-4" />
              {interpolate(t.zip, { count: readyItems.length })}
            </Button>
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-[13px] leading-6 text-ash">
        {items.length === 0
          ? interpolate(t.emptyHint, { action: copy.primaryLabel })
          : completedCount > 0
            ? interpolate(t.readyHint, { count: completedCount })
            : t.idleHint}
      </p>
    </Card>
  );
}

function PrivacyPanel({
  mode,
  tool,
  messages,
}: {
  mode: ToolDefinition["mode"];
  tool: ToolDefinition;
  messages: WorkbenchMessages;
}) {
  const copy = getPrivacyCopy(mode, messages, tool);

  return (
    <Card className="p-5">
      <div className="flex gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-success/10 text-success">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-subheading text-graphite">
            {copy.title}
          </h2>
          <p className="mt-1 text-[13px] leading-6 text-ash">
            {copy.description}
          </p>
        </div>
      </div>
    </Card>
  );
}

function InlineMessage({
  type,
  children,
}: {
  type: "error" | "warning" | "info";
  children: React.ReactNode;
}) {
  const Icon =
    type === "error" ? XCircle : type === "warning" ? AlertTriangle : Info;
  const styles = {
    error: "border-destructive/25 bg-destructive/6 text-destructive",
    warning: "border-warning/25 bg-warning/6 text-warning",
    info: "border-cerulean/25 bg-brand-soft text-cerulean",
  };

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-3 text-[13px] leading-6",
        styles[type],
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function getDropzoneAccept(tool: ToolDefinition): Accept {
  const accept: Accept = {};

  for (const format of tool.supportedFormats) {
    const normalized = format.toLowerCase();

    if (normalized === "jpg" || normalized === "jpeg") {
      accept["image/jpeg"] = [".jpg", ".jpeg"];
    }
    if (normalized === "png") accept["image/png"] = [".png"];
    if (normalized === "webp") accept["image/webp"] = [".webp"];
    if (normalized === "avif") accept["image/avif"] = [".avif"];
    if (normalized === "gif") accept["image/gif"] = [".gif"];
    if (normalized === "svg") accept["image/svg+xml"] = [".svg"];
    if (normalized === "heic") accept["image/heic"] = [".heic"];
    if (normalized === "heif") accept["image/heif"] = [".heif"];
    if (normalized === "pdf") accept["application/pdf"] = [".pdf"];
  }

  return accept;
}

function validateFileForTool(file: File, tool: ToolDefinition) {
  const valid = tool.supportedFormats.some((format) =>
    matchesFormat(file, format),
  );

  if (valid) {
    return undefined;
  }

  return `${tool.name} accepts ${tool.supportedFormats.join(", ")} files.`;
}

function matchesFormat(file: File, format: string) {
  const normalized = format.toLowerCase();
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  if (normalized === "jpg" || normalized === "jpeg") {
    return type === "image/jpeg" || /\.(jpe?g)$/i.test(name);
  }
  if (normalized === "png")
    return type === "image/png" || name.endsWith(".png");
  if (normalized === "webp")
    return type === "image/webp" || name.endsWith(".webp");
  if (normalized === "avif")
    return type === "image/avif" || name.endsWith(".avif");
  if (normalized === "gif")
    return type === "image/gif" || name.endsWith(".gif");
  if (normalized === "svg")
    return type === "image/svg+xml" || name.endsWith(".svg");
  if (normalized === "heic")
    return type === "image/heic" || name.endsWith(".heic");
  if (normalized === "heif")
    return type === "image/heif" || name.endsWith(".heif");
  if (normalized === "pdf")
    return type === "application/pdf" || name.endsWith(".pdf");

  return false;
}

function canRenderPreview(file: File) {
  if (isPdfFile(file)) {
    return false;
  }

  return !(
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.hei[cf]$/i.test(file.name)
  );
}

function getFormatOptions(mode: ToolMode): FormatOption[] {
  if (mode === "webp") return [{ value: "webp", label: "WebP" }];
  if (mode === "avif") return [{ value: "avif", label: "AVIF" }];
  if (mode === "remove-bg") {
    return [
      { value: "png", label: "PNG (transparent)" },
      { value: "webp", label: "WebP (transparent)" },
    ];
  }
  if (mode === "heic") {
    return [
      { value: "jpeg", label: "JPG" },
      { value: "webp", label: "WebP" },
    ];
  }
  if (mode === "metadata") {
    return [
      { value: "jpeg", label: "JPG" },
      { value: "png", label: "PNG" },
      { value: "webp", label: "WebP" },
    ];
  }
  if (mode === "batch") {
    return [
      { value: "webp", label: "WebP" },
      { value: "jpeg", label: "JPG" },
      { value: "png", label: "PNG" },
      { value: "avif", label: "AVIF" },
    ];
  }
  if (mode === "resize" || mode === "crop") {
    return [
      { value: "original", label: "Original" },
      { value: "jpeg", label: "JPG" },
      { value: "png", label: "PNG" },
      { value: "webp", label: "WebP" },
    ];
  }
  if (mode === "compress") {
    return [
      { value: "original", label: "Original" },
      { value: "jpeg", label: "JPG" },
      { value: "png", label: "PNG" },
      { value: "webp", label: "WebP" },
      { value: "avif", label: "AVIF" },
    ];
  }

  return [];
}

function sourceAspectRatio(item?: QueueItem) {
  if (!item?.dimensions?.width || !item.dimensions.height) {
    return 1;
  }

  return item.dimensions.width / item.dimensions.height;
}

function formatRatioLabel(ratio: number) {
  if (Math.abs(ratio - 1) < 0.001) return "1:1";
  if (Math.abs(ratio - 4 / 5) < 0.001) return "4:5";
  if (Math.abs(ratio - 16 / 9) < 0.001) return "16:9";
  if (Math.abs(ratio - 9 / 16) < 0.001) return "9:16";
  if (Math.abs(ratio - 3 / 2) < 0.001) return "3:2";
  return ratio > 1 ? `${ratio.toFixed(2)}:1` : `1:${(1 / ratio).toFixed(2)}`;
}

function getActionCopy(
  tool: ToolDefinition,
  t: WorkbenchMessages["actions"],
): { primaryLabel: string; processingLabel: string; singleLabel: string } {
  const processingByMode: Record<ToolMode, string> = {
    compress: t.processing,
    webp: t.processing,
    avif: t.processing,
    resize: t.processing,
    crop: t.processing,
    "remove-bg": t.processing,
    metadata: t.processing,
    batch: t.processing,
    analyzer: t.processing,
    pdf: t.processing,
    "pdf-to-webp": t.processing,
    heic: t.processing,
  };

  const singleByMode: Record<ToolMode, string> = {
    compress: t.single,
    webp: "WebP",
    avif: "AVIF",
    resize: t.single,
    crop: t.single,
    "remove-bg": t.single,
    metadata: t.single,
    batch: t.single,
    analyzer: t.single,
    pdf: "PDF",
    "pdf-to-webp": "WebP",
    heic: "JPG",
  };

  return {
    primaryLabel: tool.primaryAction,
    processingLabel: processingByMode[tool.mode],
    singleLabel: singleByMode[tool.mode],
  };
}

function getPrivacyCopy(
  mode: ToolMode,
  messages: WorkbenchMessages,
  tool?: ToolDefinition,
) {
  const t = messages.privacy;

  if (mode === "metadata") {
    return { title: t.metadataTitle, description: t.metadataBody };
  }
  if (mode === "pdf") {
    return { title: t.pdfTitle, description: t.pdfBody };
  }
  if (mode === "pdf-to-webp") {
    return { title: t.pdfToWebpTitle, description: t.pdfToWebpBody };
  }
  if (mode === "analyzer") {
    return { title: t.analyzerTitle, description: t.analyzerBody };
  }
  if (mode === "remove-bg") {
    return { title: t.removeBgTitle, description: t.removeBgBody };
  }

  return {
    title: t.defaultTitle,
    description: tool
      ? interpolate(t.defaultBody, {
          tool: tool.name,
          formats: tool.supportedFormats.slice(0, 4).join(", "),
        })
      : t.defaultBodyNoTool,
  };
}
