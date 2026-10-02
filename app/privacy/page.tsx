import type { Metadata } from "next";
import {
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
import { createPageMetadata, yoastGraphSchema } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy - Private Browser-First Processing",
  description:
    "Kompresio privacy policy for local browser image processing, metadata handling, analytics boundaries, file retention, and optional future cloud workflows.",
  path: "/privacy",
  keywords: [
    "kompresio privacy policy",
    "browser image processing privacy",
    "private image compression",
    "safe exif removal",
  ],
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
        data={yoastGraphSchema({
          path: "/privacy",
          title: "Privacy Policy - Private Browser-First Processing",
          description:
            "Kompresio privacy policy for local browser image processing, metadata handling, analytics boundaries, file retention, and optional future cloud workflows.",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ],
        })}
      />

      <section className="border-b border-mist bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-4 pt-28 pb-16 sm:py-20 lg:py-24">
          <Badge variant="muted">
            <ShieldCheck className="size-3" />
            Privacy-first
          </Badge>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_340px] lg:items-end">
            <SectionHeading
              title="Privacy Policy"
              description="Kompresio is designed around local browser processing. This policy explains the practical boundaries for files, metadata, analytics, retention, and future cloud processing."
            />
            <Card className="p-6">
              <Lock className="size-6 text-signal-blue" />
              <p className="mt-5 text-[12px] uppercase tracking-[0.12em] text-ash">
                Current MVP promise
              </p>
              <p className="mt-2 font-display text-subheading leading-[1.3] text-graphite">
                Core image workflows stay on your device.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-px overflow-hidden rounded-xl border border-mist bg-mist lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-paper p-7">
                <Icon className="size-5 text-charcoal" />
                <h2 className="mt-8 font-display text-subheading leading-[1.25] text-graphite">
                  {section.title}
                </h2>
                <p className="mt-3 text-body-sm leading-7 text-ash">
                  {section.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-mist bg-linen">
        <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Data boundaries"
            title="What Kompresio should not do"
            description="These guardrails are part of the product design and should stay visible as advanced workflows are added."
          />
          <ul className="mt-10 divide-y divide-mist border-y border-mist">
            {dataBoundaries.map((item) => (
              <li
                key={item}
                className="py-5 text-body-sm leading-7 text-charcoal"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
