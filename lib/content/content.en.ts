import type { PageContent } from "@/types/content";

export const content: PageContent = {
  locale: "en",
  home: {
    testimonials: [
      {
        quote:
          "I process about 200 product photos a week for my marketplace listings. Kompresio saves me the subscription cost of dedicated photo tools while keeping my images clean and under 200 KB.",
        name: "Rina Amelia",
        role: "Marketplace seller, Tokopedia",
      },
      {
        quote:
          "The batch WebP converter with ZIP export is the feature I use most. Drag in a folder of JPGs, set quality to 80, and get a ZIP of WebP files ready for production.",
        name: "Dimas Prayoga",
        role: "Frontend developer",
      },
      {
        quote:
          "I was surprised to see GPS coordinates and camera model info in my vacation photos. The metadata scanner caught them before I shared the album online.",
        name: "Sari Fitriani",
        role: "Graphic designer",
      },
      {
        quote:
          "Built a Next.js landing page and needed optimized hero images. Resized to 1920px, converted to WebP, and the page hit 98 Lighthouse Performance. No server upload needed.",
        name: "Bagus Wirawan",
        role: "Web developer",
      },
    ],
    faqs: [
      {
        question: "What is Kompresio and how does it work?",
        answer:
          "Kompresio is a privacy-first, browser-based image optimization and format conversion suite. Powered by WebAssembly and HTML5 Canvas APIs, it processes your images entirely inside your local device memory. Compression, conversion, and resizing happen instantly without ever uploading your files to any remote server.",
      },
      {
        question: "Is Kompresio free to use? Are there limits or watermarks?",
        answer:
          "Yes, Kompresio is completely free to use. There are no watermarks, no account registration required, and no subscription fees. You can compress individual images or batch-process up to 50 files at once and export them as a single convenient ZIP file.",
      },
      {
        question: "Are my photos private and secure on Kompresio?",
        answer:
          "Yes. Absolute privacy is the foundational pillar of Kompresio. Unlike traditional converters that upload your personal or client photos to third-party cloud servers, Kompresio performs 100% of processing locally on your computer or phone. Your files never touch a remote network or storage system.",
      },
      {
        question: "What image formats does Kompresio support?",
        answer:
          "Kompresio supports all major web and camera image formats, including JPG, JPEG, PNG, WebP, AVIF, HEIC, GIF, and SVG. You can compress files, convert between formats (such as JPG to WebP or PNG to AVIF), resize dimensions, and strip EXIF camera metadata.",
      },
      {
        question: "Can I use Kompresio on mobile phones (Android & iPhone)?",
        answer:
          "Yes! Kompresio is designed from the ground up to be ultra-fast and lightweight on mobile devices. It works smoothly in Safari on iOS, Chrome on Android, and all modern mobile web browsers.",
      },
      {
        question: "Do I need to create an account to use the tools?",
        answer:
          "No account is required. Every tool works without login, and there is no usage cap beyond the practical file limits: 20 MB per image and up to 50 files per batch queue.",
      },
    ],
  },
  blogIndex: {
    learningPaths: [
      {
        title: "For website performance",
        description:
          "Resize large assets, convert to WebP or AVIF, and protect Core Web Vitals.",
        href: "/blog/how-image-optimization-improves-core-web-vitals",
        icon: "trending",
      },
      {
        title: "For privacy-safe sharing",
        description:
          "Analyze metadata, clean hidden fields, and export a fresh image before publishing.",
        href: "/blog/how-to-remove-metadata-from-photos",
        icon: "shield",
      },
      {
        title: "For document uploads",
        description:
          "Convert photos and scanned images into practical PDF files with page controls.",
        href: "/blog/how-to-create-image-to-pdf-for-documents",
        icon: "file",
      },
    ],
  },
  privacy: {
    sections: [
      {
        title: "Browser-first image processing",
        icon: "image",
        body: "For MVP tools, compression, WebP and AVIF conversion, resize, crop, metadata cleaning, image analysis, image-to-PDF, preview, and ZIP export run in your browser. The file does not need to be uploaded to a Kompresio server for these workflows.",
      },
      {
        title: "Image content is not analytics data",
        icon: "shield",
        body: "Kompresio does not track image pixels, image previews, personal metadata, or full private filenames in analytics. Product analytics, if enabled, focus on anonymous workflow events such as tool_opened, file_added, conversion_completed, pdf_created, or zip_downloaded.",
      },
      {
        title: "Metadata and privacy tools",
        icon: "shield",
        body: "Metadata Cleaner and Image Analyzer may read EXIF-like fields in the browser to show camera, software, orientation, and location-related signals. Cleaning exports a fresh re-encoded image so common hidden metadata is removed from the downloaded file.",
      },
      {
        title: "Temporary browser memory",
        icon: "clock",
        body: "Preview URLs, canvas output, PDF blobs, JSON reports, and ZIP files are temporary browser objects. Closing the tab, clearing the queue, or refreshing the page removes the active in-memory session from the app UI.",
      },
      {
        title: "Optional future cloud processing",
        icon: "database",
        body: "Advanced future features such as API processing, very large batches, shared workspaces, or cloud storage would require explicit consent, clear upload status, short retention windows, and separate account or billing terms.",
      },
      {
        title: "Retention expectation",
        icon: "trash",
        body: "For the browser-first MVP, Kompresio does not retain user images. If server-side workflows are added later, retention periods and deletion controls will be documented before users upload files.",
      },
    ],
    boundaries: [
      "Do not collect raw image content for product analytics.",
      "Do not store private image metadata without explicit consent.",
      "Do not use uploaded images for model training or marketing samples without permission.",
      "Do not expose filenames, EXIF fields, or preview data in logs intended for analytics.",
    ],
  },
  terms: {
    sections: [
      {
        title: "Use of the service",
        icon: "file",
        body: "Kompresio provides browser-based tools for image compression, conversion, resize, crop, metadata cleaning, analysis, batch export, and image-to-PDF. You are responsible for the files you process and the outputs you publish or upload elsewhere.",
      },
      {
        title: "File ownership",
        icon: "image",
        body: "You retain rights to your original and exported files. Do not use Kompresio to process images you do not own or do not have permission to modify, convert, distribute, or publish.",
      },
      {
        title: "Output review",
        icon: "alert",
        body: "Compression, conversion, resize, crop, metadata cleaning, and PDF creation can change file size, format, dimensions, transparency, metadata, color, and visual quality. Review outputs before submitting them to forms, clients, stores, or public websites.",
      },
      {
        title: "Acceptable use",
        icon: "alert",
        body: "Do not use Kompresio for unlawful content, privacy violations, malware distribution, abuse automation, attempts to overload infrastructure, or processing files that violate another person's rights.",
      },
      {
        title: "No account required for MVP tools",
        icon: "badge",
        body: "The current MVP tools are designed to work without login. Future Pro, team, API, or cloud processing features may add authentication, billing, usage limits, additional retention terms, and separate service rules.",
      },
      {
        title: "Availability and changes",
        icon: "scale",
        body: "Kompresio may change supported formats, browser requirements, routes, processing behavior, file limits, pricing, and feature availability as the product evolves.",
      },
    ],
  },
  company: {
    stats: [
      {
        label: "Core tools",
        value: "16",
        description: "Compression, conversion, resize, crop, metadata, analyzer, PDF.",
      },
      {
        label: "Processing model",
        value: "Local",
        description: "MVP image work runs in the browser first.",
      },
      {
        label: "Target users",
        value: "Global",
        description: "Built for students, creators, sellers, and developers.",
      },
      {
        label: "Attribution",
        value: "Clear",
        description: "Developed and maintained by rifqysaputra.dev.",
      },
    ],
    principles: [
      {
        title: "Private by default",
        description:
          "Core files stay on the user's device for compression, conversion, resize, metadata cleanup, analysis, and PDF creation.",
        icon: "shield",
      },
      {
        title: "Tool-first product",
        description:
          "Users get the working utility immediately, then supporting content explains settings, formats, and best practices.",
        icon: "rocket",
      },
      {
        title: "Practical for Indonesia and global users",
        description:
          "The product is designed for common upload workflows: documents, forms, marketplace listings, websites, and social posts.",
        icon: "globe",
      },
      {
        title: "Developer-grade implementation",
        description:
          "Routes, metadata, sitemap, Open Graph images, JSON-LD, tests, and build checks are part of the product surface.",
        icon: "code",
      },
    ],
    resources: [
      {
        title: "Privacy Policy",
        description:
          "How Kompresio handles local processing, metadata, analytics boundaries, and future upload workflows.",
        href: "/privacy",
        icon: "lock",
      },
      {
        title: "Terms of Service",
        description:
          "Expected use, file ownership, output responsibility, availability, and prohibited behavior.",
        href: "/terms",
        icon: "file",
      },
      {
        title: "Pricing",
        description:
          "Free MVP tools now, with a clear roadmap for optional Pro, API, and team workflows later.",
        href: "/pricing",
        icon: "badge",
      },
    ],
  },
  pricing: {
    plans: [
      {
        name: "Free",
        price: "$0",
        period: "no login required",
        description: "Core browser-based image optimization for everyday files.",
        icon: "gauge",
        badge: "Available now",
        featured: true,
        href: "/compress-image",
        cta: "Start optimizing",
        features: [
          "Compress JPG, PNG, WebP, AVIF, GIF, SVG where browser support allows",
          "Convert to WebP and AVIF",
          "Resize by pixel or preset",
          "Crop with aspect ratio presets",
          "Metadata cleaner and image analyzer",
          "Image to PDF with A4 or Letter output",
          "Batch queue up to 50 files",
          "Single download and ZIP export",
        ],
      },
      {
        name: "Pro",
        price: "Later",
        period: "roadmap",
        description:
          "Advanced workflows for heavier batches and saved production settings.",
        icon: "shield",
        badge: "Roadmap",
        featured: false,
        href: "/blog/how-to-prepare-images-for-nextjs",
        cta: "Read roadmap guide",
        features: [
          "Larger batch limits",
          "Saved presets for social, marketplace, and web teams",
          "Advanced AVIF and HEIC batch workflows",
          "Processing history and reusable naming rules",
          "Priority browser and cloud fallback processing",
          "Team-ready export manifests",
        ],
      },
      {
        name: "Developer API",
        price: "Later",
        period: "planned",
        description:
          "Optional server-side processing for apps that need repeatable automation.",
        icon: "code",
        badge: "Planned",
        featured: false,
        href: "/company",
        cta: "View company notes",
        features: [
          "Sharp-backed server processing",
          "Direct object storage upload patterns",
          "Webhook-ready processing jobs",
          "Rate limits and API keys",
          "Structured JSON result manifests",
          "Privacy and retention controls for uploads",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Kompresio free?",
        answer:
          "The MVP browser-based tools are free and do not require login. Pro, API, or cloud workflows can be added later with separate limits and terms.",
      },
      {
        question: "Do free tools upload images to a server?",
        answer:
          "Core compression, conversion, resize, crop, metadata cleaning, analysis, PDF creation, preview, and ZIP export are designed to run locally in the browser.",
      },
      {
        question: "Why mention Pro if it is not available yet?",
        answer:
          "The page documents the product direction clearly so future advanced features have an obvious place without misleading users about the current MVP.",
      },
    ],
  },
};
