import type { Locale } from "@/lib/i18n/config";

/*
  Workbench copy, kept separate because it is the largest single UI surface.
  English is the base shape; Indonesian is typed as the same object so the two
  locales cannot drift apart.
*/
const en = {
  steps: {
    upload: "Upload images",
    adjust: "Adjust and process",
    download: "Download results",
    uploadEmpty: "Drag {formats} into the left panel, or browse.",
    uploadReady: "Files queued — continue to step 2.",
    adjustHint: "The Balanced default suits most files. Then click “{action}”.",
    downloadReady: "{count} ready — download single files or a ZIP.",
    downloadHint: "Results and download buttons appear here.",
  },
  dropzone: {
    release: "Release to add images",
    images: "Drag images here",
    pdf: "Drag PDF documents here",
    formats: "For {tool}: {formats}.",
    limitsImage: "Max 20 MB per file, up to 50 files.",
    limitsPdf: "Max 50 MB per document, up to 100 pages per PDF.",
    browseImages: "Browse images",
    browsePdfs: "Browse PDFs",
    local: "Local processing",
  },
  queue: {
    title: "File queue",
    empty:
      "Step 1: upload first — the queue is empty. After upload, adjust in step 2, then press the process button in step 3.",
  },
  preview: {
    emptyEyebrow: "Step 1 — No files yet",
    emptyTitle: "Upload to start {tool}",
    emptyBody:
      "Steps: 1) upload {formats}, 2) keep the Balanced preset, 3) click “{action}” then download. Everything runs locally in your browser.",
    beforeAfter: "Before and after preview",
    inspectionPreview: "Inspection preview",
    pdfPagePreview: "PDF page preview",
    descCompare: "Compare visible quality before downloading.",
    descPdf: "Create a single downloadable PDF from the queue.",
    descPdfToWebp: "Each selected page renders to WebP locally with pdf.js.",
    descAnalyzer: "Generate a JSON report and readable metadata summary.",
    descRemoveBg: "AI removes the background while preserving your subject.",
    original: "Original",
    optimized: "Optimized",
    pdfDocument: "PDF document",
    webpPages: "WebP pages",
    analysisReport: "Analysis report",
    backgroundRemoved: "Background removed",
    warning: "Warning",
    private: "Private",
    convertedPages: "Converted pages",
    page: "Page {number}",
    notAvailable: "Preview not available for this format",
    noOutput: "No output yet",
    processToGenerate: "Process to generate",
    pdfReady: "{count} page PDF ready to download.",
    jsonReady: "JSON inspection report ready to download.",
    noGeneratedFile: "No generated file yet",
  },
  crop: {
    title: "Crop editor",
    description: "Drag the image and adjust zoom before exporting.",
    uploadHint: "Upload a browser-previewable image to use the crop editor.",
    zoom: "Zoom",
    reset: "Reset crop",
  },
  inspection: {
    title: "Image inspection",
    description: "Metadata, dimensions, memory estimate, and optimization advice.",
    noSensitive: "No sensitive tags",
    sensitiveCount: "{count} sensitive",
    size: "Size",
    dimensions: "Dimensions",
    megapixels: "Megapixels",
    metadataTags: "Metadata tags",
    unknown: "Unknown",
    smartRecommendation: "Smart recommendation",
    noExif: "No readable EXIF metadata was found in this file.",
    tag: "Tag",
    value: "Value",
    risk: "Risk",
    sensitive: "Sensitive",
    normal: "Normal",
    runMetadata:
      "Run metadata cleaning to scan hidden camera, software, and location-related tags before exporting a clean file.",
    runAnalyzer:
      "Run analysis to generate a JSON report with dimensions, file weight, metadata, and optimization recommendations.",
  },
  results: {
    originalSize: "Original size",
    outputSize: "Output size",
    saved: "Saved",
    pages: "Pages",
    webpPages: "WebP pages",
    metadata: "Metadata",
    format: "Format",
    dimensions: "Dimensions",
    pageSize: "Page size",
    time: "Time",
    appearsAfter: "Appears after clicking “{action}”",
  },
  settings: {
    title: "Export settings",
    pdfTitle: "PDF settings",
    analyzerTitle: "Analyzer settings",
    intro: "{tool} — the Balanced default is enough. Change only what you need.",
    analyzerNote:
      "Analyzer creates a JSON report and readable summary. It does not change your image pixels.",
    preset: "Preset",
    quality: "Quality",
    pdfQuality: "Image quality in PDF",
    outputFormat: "Output format",
    metadataNote:
      "Metadata Cleaner always re-encodes the export so common EXIF, camera, software, and location tags are stripped.",
    removeMetadata: "Remove metadata during export",
    removeMetadataHint: "Recommended before sharing photos publicly.",
    applyRecommendation: "Apply smart recommendation",
  },
  pdf: {
    pageSize: "Page size",
    orientation: "Orientation",
    margin: "Margin",
    portrait: "Portrait",
    landscape: "Landscape",
  },
  pdfToWebp: {
    note:
      "Every selected page becomes its own WebP file. Pages render locally with pdf.js — your document never leaves this browser.",
    pages: "Pages",
    pagesPlaceholder: "all, or 1-3, 5, 8-",
    pagesHelp:
      "Use {all}, a single page, ranges like {range}, or open ranges like {open}.",
    scale: "Render scale",
    scaleHelp:
      "Higher scale means sharper pages and larger WebP files. Oversized pages are capped automatically to protect memory.",
    background: "Page background",
    white: "White",
    transparent: "Transparent",
  },
  cropSettings: {
    aspect: "Aspect target",
  },
  resize: {
    enable: "Resize before export",
    enableHint:
      "Useful for large photos, marketplace uploads, and PDF source images.",
    width: "Width",
    height: "Height",
    keepAspect: "Keep aspect ratio",
    keepAspectHint: "Avoid stretching images while resizing.",
  },
  actions: {
    processing: "Processing",
    single: "Single",
    files: "Files ({count})",
    zip: "ZIP ({count})",
    downloadSingle: "Download {label}",
    emptyHint: "Step 1 first: upload images, then click “{action}”.",
    readyHint:
      "{count} results ready — download single files or a ZIP with summary.",
    idleHint: "When done, choose Single, Download files, or ZIP.",
  },
  privacy: {
    metadataTitle: "Metadata cleaner",
    metadataBody:
      "Kompresio scans readable EXIF data and re-encodes visible pixels in the browser to remove common hidden camera, software, and location-related metadata.",
    pdfTitle: "Private PDF creation",
    pdfBody:
      "Images are converted into a PDF inside your browser using local canvas processing and a client-side PDF generator.",
    pdfToWebpTitle: "PDF to WebP stays on your device",
    pdfToWebpBody:
      "Pages are parsed and rendered with pdf.js (github.com/mozilla/pdf.js) inside this browser tab. The document is never uploaded to a server, and every exported WebP is generated locally.",
    analyzerTitle: "Local inspection",
    analyzerBody:
      "Analysis runs in the browser and creates a downloadable JSON report without uploading your images to an API route.",
    removeBgTitle: "Free AI background removal",
    removeBgBody:
      "Background removal uses an open-source model loaded in your browser. Your image stays local while the model runs client-side inference.",
    defaultTitle: "Your images stay on your device",
    defaultBody:
      "{tool} runs locally in your browser: {formats} never leave your device for compression, preview, or ZIP export.",
    defaultBodyNoTool:
      "Core optimization runs in the browser. Files are not sent to an API route for MVP compression, conversion, resize, crop, preview, or ZIP export.",
  },
  guardrails: {
    title: "Quality guardrails",
    error: "Error",
    warning: "Warning",
    info: "Info",
  },
};

export type WorkbenchMessages = typeof en;

const id: WorkbenchMessages = {
  steps: {
    upload: "Unggah gambar",
    adjust: "Atur dan proses",
    download: "Unduh hasil",
    uploadEmpty: "Seret {formats} ke panel kiri, atau pilih file.",
    uploadReady: "File masuk antrean — lanjut ke langkah 2.",
    adjustHint: "Default Balanced cocok untuk sebagian besar file. Lalu klik “{action}”.",
    downloadReady: "{count} siap — unduh file satuan atau ZIP.",
    downloadHint: "Hasil dan tombol unduh muncul di sini.",
  },
  dropzone: {
    release: "Lepaskan untuk menambah gambar",
    images: "Seret gambar ke sini",
    pdf: "Seret dokumen PDF ke sini",
    formats: "Untuk {tool}: {formats}.",
    limitsImage: "Maks 20 MB per file, hingga 50 file.",
    limitsPdf: "Maks 50 MB per dokumen, hingga 100 halaman per PDF.",
    browseImages: "Pilih gambar",
    browsePdfs: "Pilih PDF",
    local: "Diproses lokal",
  },
  queue: {
    title: "Antrean file",
    empty:
      "Langkah 1: unggah dulu — antrean masih kosong. Setelah unggah, atur di langkah 2, lalu tekan tombol proses di langkah 3.",
  },
  preview: {
    emptyEyebrow: "Langkah 1 — Belum ada file",
    emptyTitle: "Unggah untuk mulai {tool}",
    emptyBody:
      "Langkah: 1) unggah {formats}, 2) pertahankan preset Balanced, 3) klik “{action}” lalu unduh. Semua berjalan lokal di browser Anda.",
    beforeAfter: "Pratinjau sebelum dan sesudah",
    inspectionPreview: "Pratinjau inspeksi",
    pdfPagePreview: "Pratinjau halaman PDF",
    descCompare: "Bandingkan kualitas yang terlihat sebelum mengunduh.",
    descPdf: "Buat satu PDF yang dapat diunduh dari antrean.",
    descPdfToWebp:
      "Setiap halaman terpilih dirender ke WebP secara lokal dengan pdf.js.",
    descAnalyzer: "Hasilkan laporan JSON dan ringkasan metadata yang mudah dibaca.",
    descRemoveBg: "AI menghapus latar belakang sambil mempertahankan subjek Anda.",
    original: "Asli",
    optimized: "Teroptimasi",
    pdfDocument: "Dokumen PDF",
    webpPages: "Halaman WebP",
    analysisReport: "Laporan analisis",
    backgroundRemoved: "Latar dihapus",
    warning: "Peringatan",
    private: "Privat",
    convertedPages: "Halaman terkonversi",
    page: "Halaman {number}",
    notAvailable: "Pratinjau tidak tersedia untuk format ini",
    noOutput: "Belum ada keluaran",
    processToGenerate: "Proses untuk menghasilkan",
    pdfReady: "PDF {count} halaman siap diunduh.",
    jsonReady: "Laporan inspeksi JSON siap diunduh.",
    noGeneratedFile: "Belum ada file yang dihasilkan",
  },
  crop: {
    title: "Editor potong",
    description: "Seret gambar dan atur zoom sebelum mengekspor.",
    uploadHint:
      "Unggah gambar yang bisa dipratinjau di browser untuk memakai editor potong.",
    zoom: "Zoom",
    reset: "Reset potong",
  },
  inspection: {
    title: "Inspeksi gambar",
    description: "Metadata, dimensi, estimasi memori, dan saran optimasi.",
    noSensitive: "Tidak ada tag sensitif",
    sensitiveCount: "{count} sensitif",
    size: "Ukuran",
    dimensions: "Dimensi",
    megapixels: "Megapiksel",
    metadataTags: "Tag metadata",
    unknown: "Tidak diketahui",
    smartRecommendation: "Rekomendasi cerdas",
    noExif: "Tidak ditemukan metadata EXIF yang dapat dibaca di file ini.",
    tag: "Tag",
    value: "Nilai",
    risk: "Risiko",
    sensitive: "Sensitif",
    normal: "Normal",
    runMetadata:
      "Jalankan pembersihan metadata untuk memindai tag kamera, perangkat lunak, dan lokasi tersembunyi sebelum mengekspor file bersih.",
    runAnalyzer:
      "Jalankan analisis untuk menghasilkan laporan JSON berisi dimensi, bobot file, metadata, dan rekomendasi optimasi.",
  },
  results: {
    originalSize: "Ukuran asli",
    outputSize: "Ukuran keluaran",
    saved: "Hemat",
    pages: "Halaman",
    webpPages: "Halaman WebP",
    metadata: "Metadata",
    format: "Format",
    dimensions: "Dimensi",
    pageSize: "Ukuran halaman",
    time: "Waktu",
    appearsAfter: "Muncul setelah mengklik “{action}”",
  },
  settings: {
    title: "Pengaturan ekspor",
    pdfTitle: "Pengaturan PDF",
    analyzerTitle: "Pengaturan analisis",
    intro: "{tool} — default Balanced sudah cukup. Ubah hanya yang perlu.",
    analyzerNote:
      "Analyzer membuat laporan JSON dan ringkasan yang mudah dibaca. Tidak mengubah piksel gambar Anda.",
    preset: "Preset",
    quality: "Kualitas",
    pdfQuality: "Kualitas gambar di PDF",
    outputFormat: "Format keluaran",
    metadataNote:
      "Pembersih Metadata selalu mengenkode ulang ekspor sehingga tag EXIF, kamera, perangkat lunak, dan lokasi umum dihapus.",
    removeMetadata: "Hapus metadata saat ekspor",
    removeMetadataHint: "Disarankan sebelum membagikan foto ke publik.",
    applyRecommendation: "Terapkan rekomendasi cerdas",
  },
  pdf: {
    pageSize: "Ukuran halaman",
    orientation: "Orientasi",
    margin: "Margin",
    portrait: "Potret",
    landscape: "Lanskap",
  },
  pdfToWebp: {
    note:
      "Setiap halaman terpilih menjadi file WebP tersendiri. Halaman dirender lokal dengan pdf.js — dokumen Anda tidak pernah keluar dari browser ini.",
    pages: "Halaman",
    pagesPlaceholder: "all, atau 1-3, 5, 8-",
    pagesHelp:
      "Gunakan {all}, satu halaman, rentang seperti {range}, atau rentang terbuka seperti {open}.",
    scale: "Skala render",
    scaleHelp:
      "Skala lebih tinggi berarti halaman lebih tajam dan file WebP lebih besar. Halaman terlalu besar dibatasi otomatis untuk melindungi memori.",
    background: "Latar halaman",
    white: "Putih",
    transparent: "Transparan",
  },
  cropSettings: {
    aspect: "Target rasio",
  },
  resize: {
    enable: "Ubah ukuran sebelum ekspor",
    enableHint:
      "Berguna untuk foto besar, unggahan marketplace, dan gambar sumber PDF.",
    width: "Lebar",
    height: "Tinggi",
    keepAspect: "Pertahankan rasio aspek",
    keepAspectHint: "Hindari gambar teregang saat diubah ukurannya.",
  },
  actions: {
    processing: "Memproses",
    single: "Satuan",
    files: "File ({count})",
    zip: "ZIP ({count})",
    downloadSingle: "Unduh {label}",
    emptyHint: "Langkah 1 dulu: unggah gambar, lalu klik “{action}”.",
    readyHint:
      "{count} hasil siap — unduh file satuan atau ZIP dengan ringkasan.",
    idleHint: "Jika selesai, pilih Satuan, Unduh file, atau ZIP.",
  },
  privacy: {
    metadataTitle: "Pembersih metadata",
    metadataBody:
      "Kompresio memindai data EXIF yang dapat dibaca dan mengenkode ulang piksel yang terlihat di browser untuk menghapus metadata kamera, perangkat lunak, dan lokasi tersembunyi yang umum.",
    pdfTitle: "Pembuatan PDF privat",
    pdfBody:
      "Gambar dikonversi menjadi PDF di dalam browser Anda menggunakan pemrosesan canvas lokal dan generator PDF sisi klien.",
    pdfToWebpTitle: "PDF ke WebP tetap di perangkat Anda",
    pdfToWebpBody:
      "Halaman diurai dan dirender dengan pdf.js (github.com/mozilla/pdf.js) di dalam tab browser ini. Dokumen tidak pernah diunggah ke server, dan setiap WebP yang diekspor dihasilkan secara lokal.",
    analyzerTitle: "Inspeksi lokal",
    analyzerBody:
      "Analisis berjalan di browser dan membuat laporan JSON yang dapat diunduh tanpa mengunggah gambar Anda ke rute API.",
    removeBgTitle: "Hapus latar belakang AI gratis",
    removeBgBody:
      "Penghapusan latar belakang memakai model open-source yang dimuat di browser Anda. Gambar tetap lokal saat model menjalankan inferensi sisi klien.",
    defaultTitle: "Gambar Anda tetap di perangkat Anda",
    defaultBody:
      "{tool} berjalan lokal di browser Anda: {formats} tidak pernah meninggalkan perangkat untuk kompresi, pratinjau, atau ekspor ZIP.",
    defaultBodyNoTool:
      "Optimasi inti berjalan di browser. File tidak dikirim ke rute API untuk kompresi, konversi, ubah ukuran, potong, pratinjau, atau ekspor ZIP MVP.",
  },
  guardrails: {
    title: "Guardrail kualitas",
    error: "Error",
    warning: "Peringatan",
    info: "Info",
  },
};

export const workbenchMessages: Record<Locale, WorkbenchMessages> = { en, id };

export function getWorkbenchMessages(locale: Locale): WorkbenchMessages {
  return workbenchMessages[locale];
}
