import type { Metadata } from "next";
import {
  Activity,
  Clock3,
  DatabaseZap,
  EyeOff,
  FileImage,
  Lock,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Kompresio privacy policy for local browser image processing, metadata handling, analytics boundaries, file retention, and optional future cloud workflows.",
  path: "/privacy",
});

const sections = [
  {
    title: "Browser-first image processing",
    icon: FileImage,
    body:
      "For MVP tools, compression, WebP and AVIF conversion, resize, crop, metadata cleaning, image analysis, image-to-PDF, preview, and ZIP export run in your browser. The file does not need to be uploaded to a Kompresio server for these workflows.",
  },
  {
    title: "Image content is not analytics data",
    icon: EyeOff,
    body:
      "Kompresio should not track image pixels, image previews, personal metadata, or full private filenames in analytics. Product analytics, if enabled, should focus on anonymous workflow events such as tool_opened, file_added, conversion_completed, pdf_created, or zip_downloaded.",
  },
  {
    title: "Metadata and privacy tools",
    icon: ShieldCheck,
    body:
      "Metadata Cleaner and Image Analyzer may read EXIF-like fields in the browser to show camera, software, orientation, and location-related signals. Cleaning exports a fresh re-encoded image so common hidden metadata is removed from the downloaded file.",
  },
  {
    title: "Temporary browser memory",
    icon: Clock3,
    body:
      "Preview URLs, canvas output, PDF blobs, JSON reports, and ZIP files are temporary browser objects. Closing the tab, clearing the queue, or refreshing the page removes the active in-memory session from the app UI.",
  },
  {
    title: "Optional future cloud processing",
    icon: DatabaseZap,
    body:
      "Advanced future features such as API processing, very large batches, shared workspaces, or cloud storage should require explicit consent, clear upload status, short retention windows, and separate account or billing terms.",
  },
  {
    title: "Retention expectation",
    icon: Trash2,
    body:
      "For the browser-first MVP, Kompresio does not need to retain user images. If server-side workflows are added later, retention periods and deletion controls should be documented before users upload files.",
  },
];

const dataBoundaries = [
  "Do not collect raw image content for product analytics.",
  "Do not store private image metadata without explicit consent.",
  "Do not use uploaded images for model training or marketing samples without permission.",
  "Do not expose filenames, EXIF fields, or preview data in logs intended for analytics.",
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <section className="overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Badge variant="success">
            <ShieldCheck className="size-3.5" />
            Privacy-first
          </Badge>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <SectionHeading
              title="Privacy Policy"
              description="Kompresio is designed around local browser processing. This policy explains the practical boundaries for files, metadata, analytics, retention, and future cloud processing."
            />
            <Card className="p-6">
              <Lock className="size-8 text-emerald-600" />
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Current MVP promise
              </p>
              <p className="mt-2 text-2xl font-extrabold text-slate-950">
                Core image workflows stay on your device.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {section.body}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeading
            eyebrow="Data boundaries"
            title="What Kompresio should not do"
            description="These guardrails are part of the product design and should stay visible as advanced workflows are added."
          />
          <div className="mt-8 grid gap-3">
            {dataBoundaries.map((item) => (
              <Card key={item} className="flex gap-4 p-5">
                <Activity className="mt-1 size-5 shrink-0 text-blue-600" />
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
