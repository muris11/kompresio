export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category:
    | "Compression"
    | "Formats"
    | "Resize"
    | "SEO"
    | "Privacy"
    | "Developer"
    | "Workflow"
    | "Document";
  readTime: string;
  publishedAt: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  relatedTools: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    description:
      "A practical guide to reducing image size while keeping photos and website assets sharp.",
    category: "Compression",
    readTime: "5 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["compress-image", "convert-to-webp", "resize-image"],
    sections: [
      {
        heading: "Start With The Right Dimensions",
        body:
          "Most heavy images are larger than the place where they will be displayed. Resize large photos before compression so the encoder has fewer pixels to store.",
      },
      {
        heading: "Use Balanced Quality",
        body:
          "For web photos, quality between 75 and 82 is often a practical range. It reduces file size heavily while keeping visual artifacts hard to notice.",
      },
      {
        heading: "Export Modern Formats",
        body:
          "WebP and AVIF can be much smaller than JPG or PNG for web delivery. Use PNG only when you need exact lossless output or compatibility with a specific workflow.",
      },
    ],
  },
  {
    slug: "jpg-vs-png-vs-webp-vs-avif",
    title: "JPG vs PNG vs WebP vs AVIF",
    description:
      "Understand when to use each image format for websites, documents, and marketplace photos.",
    category: "Formats",
    readTime: "6 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["convert-to-webp", "convert-to-avif", "image-analyzer"],
    sections: [
      {
        heading: "JPG Is Still Useful For Photos",
        body:
          "JPG is widely supported and works well for photographs, but it can be heavier than modern formats at similar visual quality.",
      },
      {
        heading: "PNG Is Best For Transparency And Screenshots",
        body:
          "PNG keeps sharp edges and transparency, but large PNG photos often become unnecessarily heavy.",
      },
      {
        heading: "WebP And AVIF Are Built For The Web",
        body:
          "WebP has broad browser support and AVIF can compress even further in modern browsers. Use both with fallbacks when compatibility matters.",
      },
    ],
  },
  {
    slug: "how-to-resize-product-photos-for-marketplace",
    title: "How to Resize Product Photos for Marketplace",
    description:
      "Prepare clean product photos with square dimensions, sensible file size, and consistent exports.",
    category: "Resize",
    readTime: "4 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["resize-image", "compress-image", "metadata-cleaner"],
    sections: [
      {
        heading: "Use A Square Preset",
        body:
          "Many marketplace catalogs look best with 1:1 product images. A 1000 by 1000 pixel export is a practical starting point.",
      },
      {
        heading: "Compress After Resizing",
        body:
          "Resize first, then compress. This avoids wasting time compressing pixels that will be removed later.",
      },
      {
        heading: "Keep Metadata Clean",
        body:
          "Before publishing product photos, remove unnecessary camera and software metadata from the exported image.",
      },
    ],
  },
  {
    slug: "how-to-remove-metadata-from-photos",
    title: "How to Remove Metadata from Photos",
    description:
      "Learn what image metadata is and why removing it can improve privacy before sharing photos online.",
    category: "Privacy",
    readTime: "5 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["metadata-cleaner", "compress-image", "image-analyzer"],
    sections: [
      {
        heading: "What Metadata Can Contain",
        body:
          "Photo metadata can include device model, capture date, software names, orientation data, and sometimes location details.",
      },
      {
        heading: "Re-encoding Removes Common Metadata",
        body:
          "Browser-based tools can remove common metadata by decoding the visible pixels and exporting a fresh image file.",
      },
      {
        heading: "Keep A Private Original",
        body:
          "Store the original file locally if you need it, then share the cleaned export publicly.",
      },
    ],
  },
  {
    slug: "how-to-prepare-images-for-nextjs",
    title: "How to Prepare Images for Next.js Websites",
    description:
      "A developer-focused workflow for resizing, converting, naming, and optimizing image assets before shipping.",
    category: "Developer",
    readTime: "7 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["convert-to-webp", "resize-image", "compress-image"],
    sections: [
      {
        heading: "Resize Source Assets",
        body:
          "Avoid shipping oversized source images. Export hero, card, and thumbnail assets close to their largest displayed dimensions.",
      },
      {
        heading: "Use Descriptive Filenames",
        body:
          "A filename like product-photo-webp-compressed.webp is easier to manage than a camera export name with random numbers.",
      },
      {
        heading: "Test Visual Quality",
        body:
          "Compression settings should be checked on real images. Text, gradients, and faces can reveal artifacts at different thresholds.",
      },
    ],
  },
  {
    slug: "how-image-optimization-improves-core-web-vitals",
    title: "How Image Optimization Improves Core Web Vitals",
    description:
      "Image size, dimensions, and format decisions directly affect load speed, layout stability, and perceived responsiveness.",
    category: "SEO",
    readTime: "6 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["image-analyzer", "convert-to-webp", "compress-image"],
    sections: [
      {
        heading: "Large Images Slow LCP",
        body:
          "The largest visible image often becomes the LCP element. Smaller optimized assets can load faster and improve user experience.",
      },
      {
        heading: "Stable Dimensions Reduce CLS",
        body:
          "Export images at predictable dimensions and reserve space in layouts so content does not jump during loading.",
      },
      {
        heading: "Batch Workflows Save Time",
        body:
          "When teams process many assets, consistent presets and ZIP export help keep optimization repeatable.",
      },
    ],
  },
  {
    slug: "how-to-convert-heic-to-jpg-cleanly",
    title: "How to Convert HEIC to JPG Cleanly",
    description:
      "Turn iPhone HEIC photos into compatible JPG files while keeping export quality practical for forms, marketplaces, and documents.",
    category: "Formats",
    readTime: "5 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["heic-to-jpg", "metadata-cleaner", "image-analyzer"],
    sections: [
      {
        heading: "Why HEIC Needs A Converter",
        body:
          "HEIC is efficient for phones, but many forms, legacy systems, document portals, and marketplace uploaders still expect JPG or PNG. Convert the file before submitting it so the receiving platform does not reject the upload.",
      },
      {
        heading: "Use JPG For Compatibility",
        body:
          "JPG remains the safest target when the receiving system does not clearly support WebP. Use a balanced quality value so the photo stays readable while the file size remains manageable.",
      },
      {
        heading: "Clean Metadata Before Sharing",
        body:
          "Phone photos may include camera, software, date, and location-related metadata. Run a metadata clean export when the file will be shared publicly or sent outside your private workflow.",
      },
    ],
  },
  {
    slug: "how-to-build-a-batch-image-workflow",
    title: "How to Build a Batch Image Workflow",
    description:
      "A repeatable process for converting, resizing, cleaning, and exporting many images with predictable filenames and ZIP manifests.",
    category: "Workflow",
    readTime: "8 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["batch-converter", "convert-to-webp", "metadata-cleaner"],
    sections: [
      {
        heading: "Start With One Shared Preset",
        body:
          "Batch work becomes reliable when every file uses the same output format, quality, resize rule, and metadata policy. This prevents one file from quietly shipping with the wrong settings.",
      },
      {
        heading: "Export With A Manifest",
        body:
          "A ZIP with summary.json and summary.csv gives teams a simple audit trail: original name, output name, file size, dimensions, format, and processing time.",
      },
      {
        heading: "Keep Originals Separate",
        body:
          "Do not overwrite source assets. Keep originals in one folder and processed outputs in a clear export folder so it is easy to rerun the workflow with different settings.",
      },
    ],
  },
  {
    slug: "when-to-use-image-analyzer-before-compressing",
    title: "When to Use Image Analyzer Before Compressing",
    description:
      "Use an image audit to understand dimensions, metadata, memory cost, format, and optimization opportunities before changing the file.",
    category: "SEO",
    readTime: "6 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["image-analyzer", "compress-image", "resize-image"],
    sections: [
      {
        heading: "Analyze Before Guessing",
        body:
          "Compression settings depend on the source file. A 9000px photo, a transparent PNG, and a small WebP need different output choices, so inspect the file before applying a generic preset.",
      },
      {
        heading: "Check Metadata Risk",
        body:
          "Analyzer output can reveal whether readable metadata exists. If the file will be public, clean metadata before sharing the optimized version.",
      },
      {
        heading: "Turn Findings Into Actions",
        body:
          "Use analysis to decide the next step: resize oversized dimensions, convert heavy JPG or PNG files to WebP, keep PNG for transparency, or create PDF output for document submission.",
      },
    ],
  },
  {
    slug: "how-to-create-image-to-pdf-for-documents",
    title: "How to Create an Image to PDF Document",
    description:
      "Convert document photos and scanned images into a clean PDF with the right page size, orientation, margin, and image quality.",
    category: "Document",
    readTime: "5 min read",
    publishedAt: "2026-05-21",
    relatedTools: ["image-to-pdf", "resize-image", "metadata-cleaner"],
    sections: [
      {
        heading: "Choose The Page Size First",
        body:
          "A4 is common for many documents, while Letter is common in US workflows. Pick the page size before export so every image scales predictably inside the PDF.",
      },
      {
        heading: "Use Margins For Readability",
        body:
          "A small margin keeps photos away from the paper edge and makes the PDF easier to print, review, or upload to forms that render page previews.",
      },
      {
        heading: "Compress Source Images Before PDF",
        body:
          "Very large photos can make PDFs unnecessarily heavy. Resize and use balanced image quality before generating the PDF so the document stays upload-friendly.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
