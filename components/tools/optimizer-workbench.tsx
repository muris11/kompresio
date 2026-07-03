"use client";

import { motion, useReducedMotion } from "framer-motion";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  buildQueueRecommendation,
  createAnalysisResult,
  createPdfFromImages,
  downloadBlob,
  downloadZip,
  inspectImage,
  processImage,
  readImageDimensions,
  type ImageInspection,
  type OutputFormat,
  type ProcessedResult,
  type ProcessingSettings,
} from "@/lib/image/client-processing";
import { formatBytes, validateImageFile } from "@/lib/image/image-rules";
import {
  applyGuardrailFix,
  buildFileProfile,
  evaluateGuardrails,
} from "@/lib/image/quality-guardrails";
import { getToolCapabilities } from "@/lib/image/tool-behavior";
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

export function OptimizerWorkbench({ tool }: { tool: ToolDefinition }) {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const itemsRef = useRef<QueueItem[]>([]);
  const reduceMotion = useReducedMotion();
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
      const result = evaluateGuardrails(settings, fileProfile);
      setGuardrailResult(result);
    } else if (selectedItem?.file) {
      const result = evaluateGuardrails(settings);
      setGuardrailResult(result);
    } else {
      setGuardrailResult({ hasIssues: false, hasErrors: false, warnings: [] });
    }
  }, [settings, selectedItem]);

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        URL.revokeObjectURL(item.previewUrl);
        if (item.result?.url) {
          URL.revokeObjectURL(item.result.url);
        }
      }
    };
  }, []);

  function removeItem(id: string) {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.result?.url) {
          URL.revokeObjectURL(target.result.url);
        }
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

          if (entry.result?.url) {
            URL.revokeObjectURL(entry.result.url);
          }

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

          if (entry.result?.url) {
            URL.revokeObjectURL(entry.result.url);
          }

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

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Dropzone
            tool={tool}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            open={open}
          />
          <QueueList
            items={items}
            selectedId={selectedItem?.id}
            onSelect={setSelectedId}
            onRemove={removeItem}
          />
        </aside>

        <main className="min-w-0 space-y-5 lg:order-none">
          <PreviewPanel
            item={selectedItem}
            mode={tool.mode}
            reduceMotion={Boolean(reduceMotion)}
          />
          {tool.mode === "crop" ? (
            <CropEditorPanel
              item={selectedItem}
              settings={settings}
              setSettings={setSettings}
            />
          ) : null}
          <InspectionPanel item={selectedItem} mode={tool.mode} />
          <ResultSummary item={selectedItem} mode={tool.mode} />
          <PrivacyPanel mode={tool.mode} />
        </main>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <SettingsPanel
            tool={tool}
            capabilities={capabilities}
            selectedItem={selectedItem}
            settings={settings}
            setSettings={setSettings}
            onPreset={applyPreset}
            onRecommendation={applyRecommendation}
            hasRecommendation={Boolean(selectedItem?.recommendation)}
          />
          <GuardrailWarnings
            warnings={guardrailResult.warnings}
            hasErrors={guardrailResult.hasErrors}
            onApplyFix={handleApplyGuardrailFix}
          />
          <ActionPanel
            tool={tool}
            capabilities={capabilities}
            items={items}
            completedCount={completedItems.length}
            isProcessing={isProcessing}
            onProcess={processAll}
            onDownloadAll={downloadAllResults}
          />
        </aside>
      </div>
    </section>
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
            : mode === "resize"
              ? 84
              : 78,
    outputFormat:
      mode === "webp" || mode === "batch"
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
  };
}

function Dropzone({
  tool,
  getRootProps,
  getInputProps,
  isDragActive,
  open,
}: {
  tool: ToolDefinition;
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: boolean;
  open: () => void;
}) {
  return (
    <Card
      {...getRootProps()}
      className={cn(
        "border-dashed p-5 transition",
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "hover:border-blue-300 hover:bg-blue-50/40",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <UploadCloud className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-950">
            {isDragActive
              ? "Release to add images"
              : "Drop images here or browse"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Supports {tool.supportedFormats.join(", ")} for this tool.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={open}
        >
          <ImageIcon className="size-4" />
          Browse images
        </Button>
        <Badge variant="success">
          <Lock className="size-3.5" />
          Local processing
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
}: {
  items: QueueItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <h2 className="text-sm font-bold text-slate-950">File queue</h2>
        <Badge variant="muted">{items.length}/50</Badge>
      </div>
      {items.length === 0 ? (
        <div className="p-5 text-sm leading-6 text-slate-600">
          Upload images to start a batch queue.
        </div>
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
                "group mb-2 w-full rounded-xl border p-3 text-left transition",
                selectedId === item.id
                  ? "border-blue-300 bg-blue-50"
                  : "border-transparent hover:border-slate-200 hover:bg-slate-50",
              )}
            >
              <div className="flex gap-3">
                <div className="relative grid size-12 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  {canRenderPreview(item.file) ? (
                    <Image
                      src={item.previewUrl}
                      alt={`Preview of ${item.file.name}`}
                      fill
                      unoptimized
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-5 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-950">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatBytes(item.file.size)}
                    {item.dimensions
                      ? ` · ${item.dimensions.width}x${item.dimensions.height}`
                      : ""}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={statusVariant[item.status]}>
                      {item.status}
                    </Badge>
                    <button
                      type="button"
                      aria-label={`Remove ${item.file.name}`}
                      className="ml-auto rounded-lg p-1 text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
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
  reduceMotion,
}: {
  item?: QueueItem;
  mode: ToolMode;
  reduceMotion: boolean;
}) {
  if (!item) {
    return (
      <Card className="grid min-h-[420px] place-items-center p-8 text-center">
        <div className="max-w-sm">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
            <Gauge className="size-7" />
          </span>
          <h2 className="mt-5 text-xl font-bold text-slate-950">
            Ready to optimize
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Upload images to preview, analyze, convert, clean metadata, crop, or
            create a PDF directly in the browser.
          </p>
        </div>
      </Card>
    );
  }

  const outputTitle =
    mode === "pdf"
      ? "PDF document"
      : mode === "analyzer"
        ? "Analysis report"
        : mode === "remove-bg"
          ? "Background removed"
          : "Optimized";

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            {mode === "analyzer"
              ? "Inspection preview"
              : "Before and after preview"}
          </h2>
          <p className="text-sm text-slate-500">
            {mode === "pdf"
              ? "Create a single downloadable PDF from the queue."
              : mode === "analyzer"
                ? "Generate a JSON report and readable metadata summary."
                : mode === "remove-bg"
                  ? "AI removes the background while preserving your subject."
                  : "Compare visible quality before downloading."}
          </p>
        </div>
        {item.warning ? (
          <Badge variant="warning">
            <AlertTriangle className="size-3.5" />
            Warning
          </Badge>
        ) : (
          <Badge variant="success">
            <ShieldCheck className="size-3.5" />
            Private
          </Badge>
        )}
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-2">
        <PreviewImage
          title="Original"
          src={item.previewUrl}
          canRender={canRenderPreview(item.file)}
          alt={`Original ${item.file.name}`}
          detail={formatBytes(item.file.size)}
          reduceMotion={reduceMotion}
        />
        {item.result?.kind === "image" ? (
          <PreviewImage
            title={outputTitle}
            src={item.result.url}
            canRender
            alt={`Optimized ${item.file.name}`}
            detail={formatBytes(item.result.outputSize)}
            reduceMotion={reduceMotion}
          />
        ) : (
          <ResultFilePreview result={item.result} title={outputTitle} />
        )}
      </div>

      {item.error || item.warning ? (
        <div className="border-t border-slate-200 p-5">
          <InlineMessage type={item.error ? "error" : "warning"}>
            {item.error || item.warning}
          </InlineMessage>
        </div>
      ) : null}
    </Card>
  );
}

function PreviewImage({
  title,
  src,
  canRender,
  alt,
  detail,
  reduceMotion,
}: {
  title: string;
  src?: string;
  canRender: boolean;
  alt: string;
  detail: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(45deg,#f8fafc_25%,transparent_25%),linear-gradient(-45deg,#f8fafc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f8fafc_75%),linear-gradient(-45deg,transparent_75%,#f8fafc_75%)] bg-[length:22px_22px] bg-[position:0_0,0_11px,11px_-11px,-11px_0]"
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3">
        <p className="text-sm font-bold text-slate-950">{title}</p>
        <p className="font-mono text-xs text-slate-500">{detail}</p>
      </div>
      <div className="grid aspect-[4/3] place-items-center p-3">
        {src && canRender ? (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            unoptimized
            className="h-full w-full rounded-xl object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="text-center text-sm text-slate-500">
            <ImageIcon className="mx-auto mb-2 size-8" />
            {src ? "Preview not available for this format" : "No output yet"}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ResultFilePreview({
  result,
  title,
}: {
  result?: ProcessedResult;
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3">
        <p className="text-sm font-bold text-slate-950">{title}</p>
        <p className="font-mono text-xs text-slate-500">
          {result ? formatBytes(result.outputSize) : "Process to generate"}
        </p>
      </div>
      <div className="grid aspect-[4/3] place-items-center p-6 text-center">
        {result ? (
          <div>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              {result.kind === "json" ? (
                <ScanSearch className="size-7" />
              ) : (
                <FileText className="size-7" />
              )}
            </span>
            <p className="mt-4 text-base font-bold text-slate-950">
              {result.filename}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {result.kind === "pdf"
                ? `${result.pageCount || 1} page PDF ready to download.`
                : "JSON inspection report ready to download."}
            </p>
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            <FileText className="mx-auto mb-2 size-8" />
            No generated file yet
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
}: {
  item?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
}) {
  const aspectRatio = settings.cropAspectRatio || sourceAspectRatio(item);

  if (!item || !canRenderPreview(item.file)) {
    return (
      <Card className="p-5">
        <InlineMessage type="info">
          Upload a browser-previewable image to use the crop editor.
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
    />
  );
}

function CropEditorSurface({
  item,
  aspectRatio,
  setSettings,
}: {
  item: QueueItem;
  aspectRatio: number;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
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
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h2 className="text-base font-bold text-slate-950">Crop editor</h2>
          <p className="text-sm text-slate-500">
            Drag the image and adjust zoom before exporting.
          </p>
        </div>
        <Badge variant="default">
          <CropIcon className="size-3.5" />
          {formatRatioLabel(aspectRatio)}
        </Badge>
      </div>
      <div className="p-5">
        <div className="relative h-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 sm:h-[380px]">
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
              <Label htmlFor="crop-zoom">Zoom</Label>
              <span className="font-mono text-sm font-bold text-slate-950">
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
              className="w-full accent-blue-600"
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
            Reset crop
          </Button>
        </div>
      </div>
    </Card>
  );
}

function InspectionPanel({ item, mode }: { item?: QueueItem; mode: ToolMode }) {
  if (mode !== "analyzer" && mode !== "metadata") {
    return null;
  }

  const analysis = item?.result?.analysis;

  if (!analysis) {
    return (
      <Card className="p-5">
        <InlineMessage type="info">
          {mode === "metadata"
            ? "Run metadata cleaning to scan hidden camera, software, and location-related tags before exporting a clean file."
            : "Run analysis to generate a JSON report with dimensions, file weight, metadata, and optimization recommendations."}
        </InlineMessage>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h2 className="text-base font-bold text-slate-950">
            Image inspection
          </h2>
          <p className="text-sm text-slate-500">
            Metadata, dimensions, memory estimate, and optimization advice.
          </p>
        </div>
        <Badge
          variant={analysis.sensitiveMetadataCount ? "warning" : "success"}
        >
          {analysis.sensitiveMetadataCount
            ? `${analysis.sensitiveMetadataCount} sensitive`
            : "No sensitive tags"}
        </Badge>
      </div>
      <div className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <InspectionMetric label="Size" value={analysis.fileSizeReadable} />
          <InspectionMetric
            label="Dimensions"
            value={
              analysis.width && analysis.height
                ? `${analysis.width}x${analysis.height}`
                : "Unknown"
            }
          />
          <InspectionMetric
            label="Megapixels"
            value={`${analysis.megapixels} MP`}
          />
          <InspectionMetric
            label="Metadata tags"
            value={analysis.metadataCount}
          />
        </div>

        {analysis.recommendation.notes.length ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-bold text-slate-950">
              Smart recommendation
            </p>
            <ul className="mt-3 space-y-2">
              {analysis.recommendation.notes.map((note) => (
                <li
                  key={note}
                  className="flex gap-2 text-sm leading-6 text-slate-700"
                >
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-blue-600" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <MetadataTable analysis={analysis} />
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-2 font-mono text-lg font-bold text-slate-950">{value}</p>
    </div>
  );
}

function MetadataTable({ analysis }: { analysis: ImageInspection }) {
  const tags = analysis.metadataTags.slice(0, 10);

  if (tags.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
        No readable EXIF metadata was found in this file.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <div className="grid min-w-[560px] grid-cols-[1fr_1fr_auto] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase text-slate-500">
        <span>Tag</span>
        <span>Value</span>
        <span>Risk</span>
      </div>
      <div className="divide-y divide-slate-100">
        {tags.map((tag) => (
          <div
            key={`${tag.group || "metadata"}-${tag.name}-${tag.value}`}
            className="grid min-w-[560px] grid-cols-[1fr_1fr_auto] gap-3 px-4 py-3 text-sm"
          >
            <span className="min-w-0 truncate font-semibold text-slate-800">
              {tag.group ? `${tag.group}.${tag.name}` : tag.name}
            </span>
            <span className="min-w-0 truncate text-slate-600">
              {tag.value || "-"}
            </span>
            <Badge variant={tag.sensitive ? "warning" : "muted"}>
              {tag.sensitive ? "Sensitive" : "Normal"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultSummary({ item, mode }: { item?: QueueItem; mode: ToolMode }) {
  const result = item?.result;
  const originalSize = result ? result.originalSize : item ? item.file.size : 0;
  const dimensions = result
    ? `${result.width}x${result.height}`
    : item?.dimensions
      ? `${item.dimensions.width}x${item.dimensions.height}`
      : "-";
  const savedValue =
    result?.kind === "pdf"
      ? `${result.pageCount || 1} page${result.pageCount === 1 ? "" : "s"}`
      : result?.kind === "json"
        ? `${result.analysis?.metadataCount || 0} tags`
        : result
          ? `${result.savedPercent}%`
          : "-";

  const metrics = [
    {
      label: "Original size",
      value: originalSize ? formatBytes(originalSize) : "-",
    },
    {
      label: "Output size",
      value: result ? formatBytes(result.outputSize) : "-",
    },
    {
      label:
        mode === "pdf" ? "Pages" : mode === "analyzer" ? "Metadata" : "Saved",
      value: savedValue,
      strong: Boolean(result),
    },
    {
      label: "Format",
      value: result?.format || "-",
    },
    {
      label: result?.kind === "pdf" ? "Page size" : "Dimensions",
      value: dimensions,
    },
    {
      label: "Time",
      value: result ? `${result.processingTime}ms` : "-",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={cn(
            "rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            metric.strong && "border-emerald-200 bg-emerald-50",
          )}
        >
          <p className="text-xs font-semibold uppercase text-slate-500">
            {metric.label}
          </p>
          <p className="mt-2 break-words font-mono text-xl font-bold text-slate-950 sm:text-2xl">
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
}: {
  tool: ToolDefinition;
  capabilities: ReturnType<typeof getToolCapabilities>;
  selectedItem?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
  onPreset: (id: string) => void;
  onRecommendation: () => void;
  hasRecommendation: boolean;
}) {
  const formatOptions = getFormatOptions(tool.mode);
  const showPresets = !["pdf", "analyzer", "remove-bg"].includes(tool.mode);
  const showQuality = tool.mode !== "analyzer";
  const showOutput =
    formatOptions.length > 0 && tool.mode !== "pdf" && tool.mode !== "analyzer";
  const canResize = capabilities.canResize || tool.mode === "pdf";

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-200 p-5">
        <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
          <Settings2 className="size-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-950">
            {tool.mode === "pdf"
              ? "PDF settings"
              : tool.mode === "analyzer"
                ? "Analyzer settings"
                : "Export settings"}
          </h2>
          <p className="text-xs text-slate-500">{tool.name}</p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {tool.mode === "analyzer" ? (
          <InlineMessage type="info">
            Analyzer creates a JSON report and readable summary. It does not
            change your image pixels.
          </InlineMessage>
        ) : null}

        {showPresets ? (
          <div className="space-y-2">
            <Label>Preset</Label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.id}
                  type="button"
                  variant={
                    settings.preset === preset.id ? "default" : "secondary"
                  }
                  size="sm"
                  onClick={() => onPreset(preset.id)}
                  className="justify-start px-3 text-left"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        ) : null}

        {showQuality ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="quality">
                {tool.mode === "pdf" ? "Image quality in PDF" : "Quality"}
              </Label>
              <span className="font-mono text-sm font-bold text-slate-950">
                {settings.quality}
              </span>
            </div>
            <input
              id="quality"
              type="range"
              min="1"
              max="100"
              value={settings.quality}
              className="w-full accent-blue-600"
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
            <Label htmlFor="format">Output format</Label>
            {formatOptions.length === 1 ? (
              <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700">
                {formatOptions[0].label}
              </div>
            ) : (
              <select
                id="format"
                value={settings.outputFormat}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
          <PdfSettings settings={settings} setSettings={setSettings} />
        ) : null}

        {tool.mode === "crop" ? (
          <CropSettings
            selectedItem={selectedItem}
            settings={settings}
            setSettings={setSettings}
          />
        ) : null}

        {tool.mode === "metadata" ? (
          <InlineMessage type="info">
            Metadata Cleaner always re-encodes the export so common EXIF,
            camera, software, and location tags are stripped.
          </InlineMessage>
        ) : null}

        {capabilities.canCleanMetadata && tool.mode !== "metadata" ? (
          <CheckboxControl
            checked={settings.stripMetadata}
            label="Remove metadata during export"
            description="Recommended before sharing photos publicly."
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
            <ResizeSettings settings={settings} setSettings={setSettings} />
          </>
        ) : null}

        {hasRecommendation &&
        tool.mode !== "pdf" &&
        tool.mode !== "analyzer" ? (
          <Button
            type="button"
            variant="accent"
            className="w-full"
            onClick={onRecommendation}
          >
            <SlidersHorizontal className="size-4" />
            Apply smart recommendation
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

function PdfSettings({
  settings,
  setSettings,
}: {
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <Label htmlFor="pdf-page-size">Page size</Label>
        <select
          id="pdf-page-size"
          value={settings.pdfPageSize}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
        <Label htmlFor="pdf-orientation">Orientation</Label>
        <select
          id="pdf-orientation"
          value={settings.pdfOrientation}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          onChange={(event) =>
            setSettings((current) => ({
              ...current,
              pdfOrientation: event.target
                .value as ProcessingSettings["pdfOrientation"],
            }))
          }
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="pdf-margin">Margin</Label>
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

function CropSettings({
  selectedItem,
  settings,
  setSettings,
}: {
  selectedItem?: QueueItem;
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
}) {
  return (
    <div className="space-y-2">
      <Label>Aspect target</Label>
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
                "rounded-xl border px-3 py-2 text-sm font-semibold transition",
                active
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50",
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
}: {
  settings: ProcessingSettings;
  setSettings: React.Dispatch<React.SetStateAction<ProcessingSettings>>;
}) {
  return (
    <div className="space-y-3">
      <CheckboxControl
        checked={settings.resizeEnabled}
        label="Resize before export"
        description="Useful for large photos, marketplace uploads, and PDF source images."
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
              <Label htmlFor="width">Width</Label>
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
              <Label htmlFor="height">Height</Label>
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
            label="Keep aspect ratio"
            description="Avoid stretching images while resizing."
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
                className="rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
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
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-blue-200 hover:bg-blue-50/50">
      <span
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded border",
          checked
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 bg-white",
        )}
      >
        {checked ? <CheckCircle2 className="size-3.5" /> : null}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="block text-sm font-bold text-slate-950">{label}</span>
        <span className="block text-xs leading-5 text-slate-500">
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
  isProcessing,
  onProcess,
  onDownloadAll,
}: {
  tool: ToolDefinition;
  capabilities: ReturnType<typeof getToolCapabilities>;
  items: QueueItem[];
  completedCount: number;
  isProcessing: boolean;
  onProcess: () => Promise<void>;
  onDownloadAll: () => Promise<void>;
}) {
  const selectedReady = items.find((item) => item.result);
  const copy = getActionCopy(tool);
  const PrimaryIcon =
    tool.mode === "pdf"
      ? FileText
      : tool.mode === "analyzer" || tool.mode === "metadata"
        ? ScanSearch
        : tool.mode === "crop"
          ? CropIcon
          : Gauge;

  return (
    <Card className="p-5">
      <div className="space-y-3">
        <Button
          type="button"
          className="w-full"
          size="lg"
          onClick={onProcess}
          disabled={items.length === 0 || isProcessing}
        >
          {isProcessing ? (
            <RefreshCcw className="size-4 animate-spin" />
          ) : (
            <PrimaryIcon className="size-4" />
          )}
          {isProcessing ? copy.processingLabel : copy.primaryLabel}
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="min-w-0 px-2 text-xs min-[360px]:text-sm"
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
            {copy.singleLabel}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-w-0 px-2 text-xs min-[360px]:text-sm"
            disabled={!capabilities.canZip || completedCount === 0}
            onClick={onDownloadAll}
          >
            <FileArchive className="size-4" />
            {tool.mode === "analyzer" ? "ZIP reports" : "ZIP"}
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {completedCount} result{completedCount === 1 ? "" : "s"} ready.{" "}
        {capabilities.canZip
          ? "ZIP export includes processed files, summary.json, and summary.csv."
          : "This route creates one primary document output."}
      </p>
    </Card>
  );
}

function PrivacyPanel({ mode }: { mode: ToolDefinition["mode"] }) {
  const copy = getPrivacyCopy(mode);

  return (
    <Card className="p-5">
      <div className="flex gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-950">{copy.title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
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
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  };

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border p-3 text-sm leading-6",
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

  return false;
}

function canRenderPreview(file: File) {
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

function getActionCopy(tool: ToolDefinition) {
  const labels: Record<
    ToolMode,
    { primaryLabel: string; processingLabel: string; singleLabel: string }
  > = {
    compress: {
      primaryLabel: tool.primaryAction,
      processingLabel: "Compressing",
      singleLabel: "Single",
    },
    webp: {
      primaryLabel: tool.primaryAction,
      processingLabel: "Converting",
      singleLabel: "WebP",
    },
    avif: {
      primaryLabel: tool.primaryAction,
      processingLabel: "Converting",
      singleLabel: "AVIF",
    },
    resize: {
      primaryLabel: tool.primaryAction,
      processingLabel: "Resizing",
      singleLabel: "Image",
    },
    crop: {
      primaryLabel: "Crop image",
      processingLabel: "Cropping",
      singleLabel: "Image",
    },
    "remove-bg": {
      primaryLabel: "Remove background",
      processingLabel: "Removing background",
      singleLabel: "Cutout",
    },
    metadata: {
      primaryLabel: "Scan and clean metadata",
      processingLabel: "Cleaning",
      singleLabel: "Clean file",
    },
    batch: {
      primaryLabel: tool.primaryAction,
      processingLabel: "Processing",
      singleLabel: "Single",
    },
    analyzer: {
      primaryLabel: tool.primaryAction,
      processingLabel: "Analyzing",
      singleLabel: "Report",
    },
    pdf: {
      primaryLabel: "Create PDF",
      processingLabel: "Creating PDF",
      singleLabel: "PDF",
    },
    heic: {
      primaryLabel: "Convert HEIC",
      processingLabel: "Converting",
      singleLabel: "JPG",
    },
  };

  return labels[tool.mode];
}

function getPrivacyCopy(mode: ToolMode) {
  if (mode === "metadata") {
    return {
      title: "Metadata cleaner",
      description:
        "Kompresio scans readable EXIF data and re-encodes visible pixels in the browser to remove common hidden camera, software, and location-related metadata.",
    };
  }

  if (mode === "pdf") {
    return {
      title: "Private PDF creation",
      description:
        "Images are converted into a PDF inside your browser using local canvas processing and a client-side PDF generator.",
    };
  }

  if (mode === "analyzer") {
    return {
      title: "Local inspection",
      description:
        "Analysis runs in the browser and creates a downloadable JSON report without uploading your images to an API route.",
    };
  }

  if (mode === "remove-bg") {
    return {
      title: "Free AI background removal",
      description:
        "Background removal uses an open-source model loaded in your browser. Your image stays local while the model runs client-side inference.",
    };
  }

  return {
    title: "Your images stay on your device",
    description:
      "Core optimization runs in the browser. Files are not sent to an API route for MVP compression, conversion, resize, crop, preview, or ZIP export.",
  };
}
