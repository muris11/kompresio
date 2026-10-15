import type { Locale } from "@/lib/i18n/config";

/*
  Single source of truth for UI copy. English is the base shape; the Indonesian
  object is typed as the same Dictionary, so a missing or extra key fails the
  type check — that is what keeps the two locales 1:1.
*/
const en = {
  common: {
    home: "Home",
    tools: "Tools",
    blog: "Blog",
    read: "Read",
    openPage: "Open page",
    readPath: "Read path",
    viewAll: "View all tools",
    viewAllArticles: "View all articles",
    allTools: "All tools",
    startOptimizing: "Start optimizing",
    browseTools: "Browse all tools",
    openCompressor: "Open the compressor",
    language: "Language",
  },
  nav: {
    tools: "Tools",
    compress: "Compress",
    convert: "Convert",
    resize: "Resize",
    blog: "Blog",
  },
  header: {
    menu: "Menu",
    closeMenu: "Close menu",
  },
  footer: {
    tagline:
      "Private, browser-first image compression, conversion, resize, metadata cleaning, batch export, and document tools.",
    product: "Product",
    resources: "Resources",
    company: "Company",
    developer: "Developer",
    rights: "All rights reserved.",
    builtBy: "Built by",
    headline: "Images get smaller. Nothing leaves your device.",
  },
  home: {
    hero: {
      badge: "Free private image optimization",
      title: "Compress and optimize images in your browser",
      description:
        "Kompresio compresses, converts, resizes, and cleans JPG, PNG, WebP, AVIF, and HEIC files directly on your device. Free, private, and fast — your photos never leave your browser.",
      ctaPrimary: "Start optimizing",
      ctaSecondary: "Browse all tools",
      trust: ["Runs in your browser", "Batch up to 50 files", "No sign-up"],
      sampleTitle: "Example output",
      sampleNote:
        "Illustrative figures. Your results depend on the source image and the settings you choose.",
    },
    stats: {
      items: [
        { value: "16", label: "Free tools, no sign-up" },
        { value: "20 MB", label: "Max file size per image" },
        { value: "50", label: "Files per batch queue" },
        { value: "100%", label: "Processed in your browser" },
      ],
    },
    popularTools: {
      eyebrow: "Popular tools",
      title: "One workflow for image optimization",
      description:
        "Start with the common tools, then move into batch, privacy, and developer workflows when you need them.",
    },
    beforeAfter: {
      eyebrow: "Preview first",
      title: "See what changed before you download",
      description:
        "Upload, tune quality, compare the visible result, then export one file or a ZIP. The comparison happens in your browser.",
      metrics: [
        { label: "Original", value: "2.4 MB" },
        { label: "Optimized WebP", value: "312 KB" },
        { label: "Saved", value: "87%" },
        { label: "Processing", value: "420ms" },
      ],
      originalLabel: "Original JPG",
      optimizedLabel: "Optimized WebP",
    },
    howItWorks: {
      eyebrow: "Workflow",
      title: "Three steps, no server upload",
      description:
        "Kompresio is built for repeat work: add files, tune, and export — nothing else in the way.",
      steps: [
        {
          title: "Upload",
          description: "Drag in one image or a batch of up to 50 files.",
        },
        {
          title: "Adjust",
          description:
            "Keep the Balanced default, or set quality, format, and size.",
        },
        {
          title: "Download",
          description: "Export a single file or everything as a ZIP archive.",
        },
      ],
    },
    formatGuide: {
      eyebrow: "Formats",
      title: "Built for modern image pipelines",
      description:
        "Convert to WebP, resize assets, clean metadata, and export batches prepared for fast-loading sites.",
      headers: ["Format", "Alpha", "Motion", "Support", "Best for"],
    },
    why: {
      eyebrow: "Why Kompresio",
      title: "A working utility, not just an upload box",
      description:
        "Tool-first, private, and shaped for the everyday jobs people actually bring to an image tool.",
      reasons: [
        {
          title: "Private by default",
          description:
            "Images never leave your device. No upload, no account, no tracking of file content.",
        },
        {
          title: "No sign-up needed",
          description:
            "Open a tool, add files, download results. Works on mobile and desktop.",
        },
        {
          title: "Batch and ZIP ready",
          description:
            "Process up to 50 images at once and export everything as a single ZIP.",
        },
      ],
      usedFor: "Used for",
      useCases: [
        "Websites",
        "Marketplace listings",
        "Social media",
        "Documents and forms",
        "Developer handoff",
        "Student projects",
      ],
    },
    testimonials: {
      eyebrow: "In practice",
      title: "Used by designers, developers, and sellers",
      description: "Different jobs, the same short loop: add files, tune, and export.",
    },
    faq: {
      chip: "Got questions?",
      title: "Frequently asked questions about Kompresio",
      description:
        "Find answers about how Kompresio works, its privacy model, supported formats, and client-side performance.",
    },
    blog: {
      eyebrow: "Learn",
      title: "Guides for image optimization",
    },
    cta: {
      title: "Start optimizing images in about thirty seconds",
      description:
        "No account, no upload, no waiting. Add a file and see the result in the same tab.",
      trust: ["Free to use", "No sign-up", "Files stay on your device"],
    },
  },
  toolsPage: {
    title: "All Kompresio image tools",
    description:
      "Compress, convert, resize, clean metadata, analyze, and batch export images with browser-first workflows.",
    eyebrow: "Tools",
  },
  toolPage: {
    privacyBadge: "Runs in your browser",
    howToUse: "How to use",
    goToStep1: "Go to step 1",
    relatedEyebrow: "Related tools",
    relatedTitle: "Continue the image workflow",
    relatedDescription:
      "Move between compression, conversion, resize, metadata cleanup, and batch export without changing apps.",
    faqEyebrow: "FAQ",
    faqTitle: "Questions about {tool}",
    faqDescription:
      "Clear answers for privacy, formats, batch processing, and output quality.",
    guideEyebrow: "Guide",
    guideTitle: "How to use {tool}",
    guideDescription:
      "Kompresio keeps {keyword} practical: the tool comes first, then guidance explains the settings and the cases they fit.",
    howTo: "How to {action}",
    whyUse: "Why use Kompresio",
    bestFor: "Best for",
    supportedFormatsNote:
      "Supported formats include {formats}. For heavier server-side processing, use direct object storage upload rather than posting large images to serverless functions.",
  },
  workbench: {
    step1: "Step 1 — Upload",
    step2: "Step 2 — Settings",
    step3: "Step 3 — Process and download",
    uploadTitle: "Upload images",
    adjustTitle: "Adjust and process",
    downloadTitle: "Download results",
    dropRelease: "Release to add images",
    dropImages: "Drag images here",
    dropPdf: "Drag PDF documents here",
    browseImages: "Browse images",
    browsePdfs: "Browse PDFs",
    localProcessing: "Local processing",
    fileQueue: "File queue",
    emptyQueue:
      "Step 1: upload first — the queue is empty. After upload, adjust in step 2, then press the process button in step 3.",
    noFilesEyebrow: "Step 1 — No files yet",
    uploadToStart: "Upload to start {tool}",
    previewTitle: "Before and after preview",
    previewDescription: "Compare visible quality before downloading.",
    original: "Original",
    optimized: "Optimized",
    settingsTitle: "Export settings",
    preset: "Preset",
    quality: "Quality",
    outputFormat: "Output format",
    removeMetadata: "Remove metadata during export",
    removeMetadataHint: "Recommended before sharing photos publicly.",
    applyRecommendation: "Apply smart recommendation",
    process: "Process",
    downloadFiles: "Files",
    downloadZip: "ZIP",
    resultsReady: "{count} results ready — download single files or a ZIP with summary.",
    smartRecommendation: "Smart recommendation",
    imageInspection: "Image inspection",
    privacyPanelTitle: "Your images stay on your device",
    results: {
      originalSize: "Original size",
      outputSize: "Output size",
      saved: "Saved",
      format: "Format",
      dimensions: "Dimensions",
      time: "Time",
    },
  },
  blog: {
    title: "Image optimization guides for real workflows",
    description:
      "Learn compression, conversion, resize, metadata privacy, HEIC handling, batch export, image-to-PDF, SEO, and developer handoff patterns.",
    featured: "Featured",
    learningPathsTitle: "Pick the guide that matches your job",
    learningPathsDescription:
      "Start with the outcome you need: faster pages, safer sharing, or upload-ready documents.",
    allGuidesEyebrow: "All guides",
    allGuidesTitle: "Complete Kompresio article library",
    allGuidesDescription:
      "Every article links back to the relevant working tool so the guide can turn into action immediately.",
    contents: "Contents",
    relatedTools: "Related tools",
    categories: [
      "Compression",
      "Formats",
      "Resize",
      "SEO",
      "Privacy",
      "Developer",
      "Workflow",
      "Document",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Kompresio is designed around local browser processing. This policy explains the practical boundaries for files, metadata, analytics, retention, and future cloud processing.",
    badge: "Privacy-first",
    promiseLabel: "Current MVP promise",
    promise: "Core image workflows stay on your device.",
    boundariesEyebrow: "Data boundaries",
    boundariesTitle: "What Kompresio should not do",
    boundariesDescription:
      "These guardrails are part of the product design and should stay visible as advanced workflows are added.",
  },
  terms: {
    title: "Terms of Service",
    description:
      "These terms define practical expectations for using Kompresio's image utility workflows. They are written for the current browser-first MVP and leave room for future Pro or API features.",
    badge: "Legal",
    summaryLabel: "Plain-language summary",
    summary: "Use files you are allowed to process, and check outputs before sharing.",
  },
  company: {
    badge: "Company",
    title: "A fast, private image toolkit for real upload workflows.",
    description:
      "Kompresio helps people compress, convert, resize, crop, clean metadata, analyze, batch export, and create PDFs from images — without turning a simple task into a complicated design app.",
    exploreTools: "Explore tools",
    readGuides: "Read guides",
    builtBy: "Built by",
    builtByNote: "Product ownership, maintenance, and attribution stay with rifqysaputra.dev.",
    principlesEyebrow: "Operating principles",
    principlesTitle: "Built around speed, privacy, and practical output",
    principlesDescription:
      "The product is shaped for repeat work: upload quickly, choose a real setting, preview output, and download files that are ready for websites, documents, marketplaces, or sharing.",
    resourcesEyebrow: "Company resources",
    resourcesTitle: "Clear product, legal, and pricing pages",
    resourcesDescription:
      "These pages document how Kompresio should be used, what data boundaries matter, and what the free MVP includes.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Start free with private browser processing",
    description:
      "Kompresio's current MVP tools are free, local-first, and do not require login. Future paid plans can support heavier production, team, and API workflows.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for does not exist or has moved.",
  },
  error: {
    title: "Something went wrong",
    description: "Please refresh the page or try again.",
    retry: "Retry",
  },
};

export type Dictionary = typeof en;

const id: Dictionary = {
  common: {
    home: "Beranda",
    tools: "Alat",
    blog: "Blog",
    read: "Baca",
    openPage: "Buka halaman",
    readPath: "Baca panduan",
    viewAll: "Lihat semua alat",
    viewAllArticles: "Lihat semua artikel",
    allTools: "Semua alat",
    startOptimizing: "Mulai optimasi",
    browseTools: "Jelajahi semua alat",
    openCompressor: "Buka kompresor",
    language: "Bahasa",
  },
  nav: {
    tools: "Alat",
    compress: "Kompres",
    convert: "Konversi",
    resize: "Ubah Ukuran",
    blog: "Blog",
  },
  header: {
    menu: "Menu",
    closeMenu: "Tutup menu",
  },
  footer: {
    tagline:
      "Kompresi, konversi, ubah ukuran, pembersih metadata, ekspor batch, dan alat dokumen gambar yang privat dan berbasis browser.",
    product: "Produk",
    resources: "Sumber",
    company: "Perusahaan",
    developer: "Pengembang",
    rights: "Seluruh hak dilindungi.",
    builtBy: "Dibuat oleh",
    headline:
      "Gambar jadi lebih kecil. Tidak ada yang keluar dari perangkat Anda.",
  },
  home: {
    hero: {
      badge: "Optimasi gambar gratis dan privat",
      title: "Kompres dan optimalkan gambar langsung di browser",
      description:
        "Kompresio mengompres, mengonversi, mengubah ukuran, dan membersihkan file JPG, PNG, WebP, AVIF, dan HEIC langsung di perangkat Anda. Gratis, privat, dan cepat — foto Anda tidak pernah keluar dari browser.",
      ctaPrimary: "Mulai optimasi",
      ctaSecondary: "Jelajahi semua alat",
      trust: [
        "Berjalan di browser Anda",
        "Batch hingga 50 file",
        "Tanpa pendaftaran",
      ],
      sampleTitle: "Contoh hasil",
      sampleNote:
        "Angka hanya ilustrasi. Hasil Anda bergantung pada gambar sumber dan pengaturan yang dipilih.",
    },
    stats: {
      items: [
        { value: "17", label: "Alat gratis, tanpa pendaftaran" },
        { value: "20 MB", label: "Ukuran maksimum per gambar" },
        { value: "50", label: "File per antrean batch" },
        { value: "100%", label: "Diproses di browser Anda" },
      ],
    },
    popularTools: {
      eyebrow: "Alat populer",
      title: "Satu alur kerja untuk optimasi gambar",
      description:
        "Mulai dari alat yang umum, lalu lanjut ke alur batch, privasi, dan pengembang saat Anda membutuhkannya.",
    },
    beforeAfter: {
      eyebrow: "Pratinjau dulu",
      title: "Lihat apa yang berubah sebelum mengunduh",
      description:
        "Unggah, atur kualitas, bandingkan hasil yang terlihat, lalu ekspor satu file atau ZIP. Perbandingan terjadi di browser Anda.",
      metrics: [
        { label: "Asli", value: "2.4 MB" },
        { label: "WebP Teroptimasi", value: "312 KB" },
        { label: "Hemat", value: "87%" },
        { label: "Proses", value: "420ms" },
      ],
      originalLabel: "JPG Asli",
      optimizedLabel: "WebP Teroptimasi",
    },
    howItWorks: {
      eyebrow: "Alur kerja",
      title: "Tiga langkah, tanpa unggah ke server",
      description:
        "Kompresio dibuat untuk pekerjaan berulang: tambah file, atur, lalu ekspor — tanpa hal lain yang menghalangi.",
      steps: [
        {
          title: "Unggah",
          description: "Seret satu gambar atau batch hingga 50 file.",
        },
        {
          title: "Atur",
          description:
            "Pertahankan default Balanced, atau atur kualitas, format, dan ukuran.",
        },
        {
          title: "Unduh",
          description: "Ekspor satu file atau semuanya sebagai arsip ZIP.",
        },
      ],
    },
    formatGuide: {
      eyebrow: "Format",
      title: "Dibuat untuk pipeline gambar modern",
      description:
        "Konversi ke WebP, ubah ukuran aset, bersihkan metadata, dan ekspor batch yang siap untuk situs cepat.",
      headers: ["Format", "Alpha", "Gerak", "Dukungan", "Terbaik untuk"],
    },
    why: {
      eyebrow: "Kenapa Kompresio",
      title: "Alat yang benar-benar bekerja, bukan sekadar kotak unggah",
      description:
        "Mengutamakan alat, privat, dan dirancang untuk pekerjaan sehari-hari yang nyata.",
      reasons: [
        {
          title: "Privat secara default",
          description:
            "Gambar tidak pernah meninggalkan perangkat Anda. Tanpa unggah, tanpa akun, tanpa pelacakan isi file.",
        },
        {
          title: "Tanpa perlu mendaftar",
          description:
            "Buka alat, tambah file, unduh hasil. Bekerja di ponsel dan desktop.",
        },
        {
          title: "Siap batch dan ZIP",
          description:
            "Proses hingga 50 gambar sekaligus dan ekspor semuanya sebagai satu ZIP.",
        },
      ],
      usedFor: "Digunakan untuk",
      useCases: [
        "Situs web",
        "Listing marketplace",
        "Media sosial",
        "Dokumen dan formulir",
        "Serah terima pengembang",
        "Proyek mahasiswa",
      ],
    },
    testimonials: {
      eyebrow: "Dalam praktik",
      title: "Digunakan oleh desainer, pengembang, dan penjual",
      description:
        "Pekerjaan berbeda, alur singkat yang sama: tambah file, atur, dan ekspor.",
    },
    faq: {
      chip: "Ada pertanyaan?",
      title: "Pertanyaan umum tentang Kompresio",
      description:
        "Temukan jawaban tentang cara kerja Kompresio, model privasinya, format yang didukung, dan performa sisi klien.",
    },
    blog: {
      eyebrow: "Pelajari",
      title: "Panduan optimasi gambar",
    },
    cta: {
      title: "Mulai optimasi gambar dalam sekitar tiga puluh detik",
      description:
        "Tanpa akun, tanpa unggah, tanpa menunggu. Tambah file dan lihat hasilnya di tab yang sama.",
      trust: [
        "Gratis digunakan",
        "Tanpa pendaftaran",
        "File tetap di perangkat Anda",
      ],
    },
  },
  toolsPage: {
    title: "Semua alat gambar Kompresio",
    description:
      "Kompres, konversi, ubah ukuran, bersihkan metadata, analisis, dan ekspor batch gambar dengan alur berbasis browser.",
    eyebrow: "Alat",
  },
  toolPage: {
    privacyBadge: "Berjalan di browser Anda",
    howToUse: "Cara pakai",
    goToStep1: "Ke langkah 1",
    relatedEyebrow: "Alat terkait",
    relatedTitle: "Lanjutkan alur kerja gambar",
    relatedDescription:
      "Berpindah antara kompresi, konversi, ubah ukuran, pembersihan metadata, dan ekspor batch tanpa ganti aplikasi.",
    faqEyebrow: "FAQ",
    faqTitle: "Pertanyaan tentang {tool}",
    faqDescription:
      "Jawaban jelas soal privasi, format, pemrosesan batch, dan kualitas keluaran.",
    guideEyebrow: "Panduan",
    guideTitle: "Cara menggunakan {tool}",
    guideDescription:
      "Kompresio membuat {keyword} tetap praktis: alat dulu, lalu panduan menjelaskan pengaturan dan kasus yang cocok.",
    howTo: "Cara {action}",
    whyUse: "Kenapa pakai Kompresio",
    bestFor: "Cocok untuk",
    supportedFormatsNote:
      "Format yang didukung termasuk {formats}. Untuk pemrosesan sisi server yang lebih berat, gunakan unggahan langsung ke object storage alih-alih mengirim gambar besar ke serverless function.",
  },
  workbench: {
    step1: "Langkah 1 — Unggah",
    step2: "Langkah 2 — Pengaturan",
    step3: "Langkah 3 — Proses dan unduh",
    uploadTitle: "Unggah gambar",
    adjustTitle: "Atur dan proses",
    downloadTitle: "Unduh hasil",
    dropRelease: "Lepaskan untuk menambah gambar",
    dropImages: "Seret gambar ke sini",
    dropPdf: "Seret dokumen PDF ke sini",
    browseImages: "Pilih gambar",
    browsePdfs: "Pilih PDF",
    localProcessing: "Diproses lokal",
    fileQueue: "Antrean file",
    emptyQueue:
      "Langkah 1: unggah dulu — antrean masih kosong. Setelah unggah, atur di langkah 2, lalu tekan tombol proses di langkah 3.",
    noFilesEyebrow: "Langkah 1 — Belum ada file",
    uploadToStart: "Unggah untuk mulai {tool}",
    previewTitle: "Pratinjau sebelum dan sesudah",
    previewDescription: "Bandingkan kualitas yang terlihat sebelum mengunduh.",
    original: "Asli",
    optimized: "Teroptimasi",
    settingsTitle: "Pengaturan ekspor",
    preset: "Preset",
    quality: "Kualitas",
    outputFormat: "Format keluaran",
    removeMetadata: "Hapus metadata saat ekspor",
    removeMetadataHint: "Disarankan sebelum membagikan foto ke publik.",
    applyRecommendation: "Terapkan rekomendasi cerdas",
    process: "Proses",
    downloadFiles: "File",
    downloadZip: "ZIP",
    resultsReady: "{count} hasil siap — unduh file satuan atau ZIP dengan ringkasan.",
    smartRecommendation: "Rekomendasi cerdas",
    imageInspection: "Inspeksi gambar",
    privacyPanelTitle: "Gambar Anda tetap di perangkat Anda",
    results: {
      originalSize: "Ukuran asli",
      outputSize: "Ukuran keluaran",
      saved: "Hemat",
      format: "Format",
      dimensions: "Dimensi",
      time: "Waktu",
    },
  },
  blog: {
    title: "Panduan optimasi gambar untuk alur kerja nyata",
    description:
      "Pelajari kompresi, konversi, ubah ukuran, privasi metadata, penanganan HEIC, ekspor batch, gambar ke PDF, SEO, dan pola serah terima pengembang.",
    featured: "Unggulan",
    learningPathsTitle: "Pilih panduan sesuai kebutuhan Anda",
    learningPathsDescription:
      "Mulai dari hasil yang Anda butuhkan: halaman lebih cepat, berbagi lebih aman, atau dokumen siap unggah.",
    allGuidesEyebrow: "Semua panduan",
    allGuidesTitle: "Perpustakaan artikel Kompresio lengkap",
    allGuidesDescription:
      "Setiap artikel menautkan kembali ke alat yang relevan sehingga panduan bisa langsung menjadi tindakan.",
    contents: "Daftar isi",
    relatedTools: "Alat terkait",
    categories: [
      "Kompresi",
      "Format",
      "Ubah Ukuran",
      "SEO",
      "Privasi",
      "Pengembang",
      "Alur Kerja",
      "Dokumen",
    ],
  },
  privacy: {
    title: "Kebijakan Privasi",
    description:
      "Kompresio dirancang dengan pemrosesan lokal di browser. Kebijakan ini menjelaskan batas praktis untuk file, metadata, analitik, retensi, dan pemrosesan cloud di masa depan.",
    badge: "Mengutamakan privasi",
    promiseLabel: "Janji MVP saat ini",
    promise: "Alur kerja gambar inti tetap di perangkat Anda.",
    boundariesEyebrow: "Batas data",
    boundariesTitle: "Yang tidak boleh dilakukan Kompresio",
    boundariesDescription:
      "Guardrail ini bagian dari desain produk dan harus tetap terlihat saat alur kerja lanjutan ditambahkan.",
  },
  terms: {
    title: "Ketentuan Layanan",
    description:
      "Ketentuan ini menetapkan ekspektasi praktis untuk penggunaan alur kerja alat gambar Kompresio. Ditulis untuk MVP berbasis browser saat ini dan menyisakan ruang untuk fitur Pro atau API di masa depan.",
    badge: "Legal",
    summaryLabel: "Ringkasan bahasa sederhana",
    summary:
      "Gunakan file yang boleh Anda proses, dan periksa hasil sebelum membagikannya.",
  },
  company: {
    badge: "Perusahaan",
    title: "Toolkit gambar yang cepat dan privat untuk alur unggah nyata.",
    description:
      "Kompresio membantu orang mengompres, mengonversi, mengubah ukuran, memotong, membersihkan metadata, menganalisis, ekspor batch, dan membuat PDF dari gambar — tanpa mengubah tugas sederhana menjadi aplikasi desain yang rumit.",
    exploreTools: "Jelajahi alat",
    readGuides: "Baca panduan",
    builtBy: "Dibuat oleh",
    builtByNote:
      "Kepemilikan produk, pemeliharaan, dan atribusi tetap pada rifqysaputra.dev.",
    principlesEyebrow: "Prinsip operasi",
    principlesTitle: "Dibangun di sekitar kecepatan, privasi, dan hasil praktis",
    principlesDescription:
      "Produk dibentuk untuk pekerjaan berulang: unggah cepat, pilih pengaturan nyata, pratinjau hasil, dan unduh file yang siap untuk situs web, dokumen, marketplace, atau berbagi.",
    resourcesEyebrow: "Sumber perusahaan",
    resourcesTitle: "Halaman produk, legal, dan harga yang jelas",
    resourcesDescription:
      "Halaman ini mendokumentasikan cara Kompresio digunakan, batas data yang penting, dan apa yang termasuk dalam MVP gratis.",
  },
  pricing: {
    eyebrow: "Harga",
    title: "Mulai gratis dengan pemrosesan browser yang privat",
    description:
      "Alat MVP Kompresio saat ini gratis, mengutamakan lokal, dan tanpa login. Paket berbayar di masa depan dapat mendukung produksi, tim, dan alur API yang lebih berat.",
  },
  notFound: {
    title: "Halaman tidak ditemukan",
    description: "Halaman yang Anda cari tidak ada atau telah dipindahkan.",
  },
  error: {
    title: "Terjadi kesalahan",
    description: "Silakan muat ulang halaman atau coba lagi.",
    retry: "Coba lagi",
  },
};

export const dictionaries = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
