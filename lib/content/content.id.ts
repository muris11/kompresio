import type { PageContent } from "@/types/content";

export const content: PageContent = {
  locale: "id",
  home: {
    testimonials: [
      {
        quote:
          "Saya memproses sekitar 200 foto produk per minggu untuk listing marketplace. Kompresio menghemat biaya langganan alat foto khusus sambil menjaga gambar tetap bersih dan di bawah 200 KB.",
        name: "Rina Amelia",
        role: "Penjual marketplace, Tokopedia",
      },
      {
        quote:
          "Konverter WebP batch dengan ekspor ZIP adalah fitur yang paling saya pakai. Seret satu folder JPG, atur kualitas ke 80, dan dapatkan ZIP berisi file WebP siap produksi.",
        name: "Dimas Prayoga",
        role: "Frontend developer",
      },
      {
        quote:
          "Saya kaget melihat koordinat GPS dan info model kamera di foto liburan saya. Pemindai metadata menangkapnya sebelum saya membagikan albumnya online.",
        name: "Sari Fitriani",
        role: "Desainer grafis",
      },
      {
        quote:
          "Membangun landing page Next.js dan butuh gambar hero yang teroptimasi. Diubah ukurannya ke 1920px, dikonversi ke WebP, dan halamannya mencapai 98 Lighthouse Performance. Tanpa unggah ke server.",
        name: "Bagus Wirawan",
        role: "Web developer",
      },
    ],
    faqs: [
      {
        question: "Apa itu Kompresio dan bagaimana cara kerjanya?",
        answer:
          "Kompresio adalah rangkaian optimasi gambar dan konversi format berbasis browser yang mengutamakan privasi. Didukung WebAssembly dan HTML5 Canvas API, Kompresio memproses gambar Anda sepenuhnya di memori perangkat lokal. Kompresi, konversi, dan pengubahan ukuran terjadi instan tanpa pernah mengunggah file Anda ke server mana pun.",
      },
      {
        question: "Apakah Kompresio gratis? Ada batas atau watermark?",
        answer:
          "Ya, Kompresio sepenuhnya gratis. Tidak ada watermark, tidak perlu registrasi akun, dan tidak ada biaya langganan. Anda bisa mengompres gambar satu per satu atau memproses batch hingga 50 file sekaligus dan mengekspornya sebagai satu file ZIP yang praktis.",
      },
      {
        question: "Apakah foto saya privat dan aman di Kompresio?",
        answer:
          "Ya. Privasi mutlak adalah pilar dasar Kompresio. Berbeda dari konverter tradisional yang mengunggah foto pribadi atau klien Anda ke server cloud pihak ketiga, Kompresio melakukan 100% pemrosesan secara lokal di komputer atau ponsel Anda. File Anda tidak pernah menyentuh jaringan atau sistem penyimpanan jarak jauh.",
      },
      {
        question: "Format gambar apa saja yang didukung Kompresio?",
        answer:
          "Kompresio mendukung semua format gambar web dan kamera utama, termasuk JPG, JPEG, PNG, WebP, AVIF, HEIC, GIF, dan SVG. Anda bisa mengompres file, mengonversi antar format (seperti JPG ke WebP atau PNG ke AVIF), mengubah dimensi, dan menghapus metadata kamera EXIF.",
      },
      {
        question: "Bisakah saya memakai Kompresio di ponsel (Android & iPhone)?",
        answer:
          "Tentu! Kompresio dirancang dari awal agar sangat cepat dan ringan di perangkat mobile. Bekerja lancar di Safari pada iOS, Chrome pada Android, dan semua browser web mobile modern.",
      },
      {
        question: "Apakah saya perlu membuat akun untuk memakai alatnya?",
        answer:
          "Tidak perlu akun. Semua alat bekerja tanpa login, dan tidak ada batas pemakaian selain batas file praktis: 20 MB per gambar dan hingga 50 file per antrean batch.",
      },
    ],
  },
  blogIndex: {
    learningPaths: [
      {
        title: "Untuk performa website",
        description:
          "Ubah ukuran aset besar, konversi ke WebP atau AVIF, dan jaga Core Web Vitals.",
        href: "/blog/how-image-optimization-improves-core-web-vitals",
        icon: "trending",
      },
      {
        title: "Untuk berbagi yang aman privasi",
        description:
          "Analisis metadata, bersihkan field tersembunyi, dan ekspor gambar baru sebelum dipublikasikan.",
        href: "/blog/how-to-remove-metadata-from-photos",
        icon: "shield",
      },
      {
        title: "Untuk unggahan dokumen",
        description:
          "Konversi foto dan gambar hasil pindai menjadi file PDF praktis dengan kontrol halaman.",
        href: "/blog/how-to-create-image-to-pdf-for-documents",
        icon: "file",
      },
    ],
  },
  privacy: {
    sections: [
      {
        title: "Pemrosesan gambar berbasis browser",
        icon: "image",
        body: "Untuk alat MVP, kompresi, konversi WebP dan AVIF, ubah ukuran, potong, pembersihan metadata, analisis gambar, gambar ke PDF, pratinjau, dan ekspor ZIP berjalan di browser Anda. File tidak perlu diunggah ke server Kompresio untuk alur kerja ini.",
      },
      {
        title: "Isi gambar bukan data analitik",
        icon: "shield",
        body: "Kompresio tidak melacak piksel gambar, pratinjau gambar, metadata pribadi, atau nama file privat lengkap dalam analitik. Analitik produk, jika diaktifkan, berfokus pada peristiwa alur kerja anonim seperti tool_opened, file_added, conversion_completed, pdf_created, atau zip_downloaded.",
      },
      {
        title: "Alat metadata dan privasi",
        icon: "shield",
        body: "Metadata Cleaner dan Image Analyzer dapat membaca field mirip EXIF di browser untuk menampilkan sinyal kamera, perangkat lunak, orientasi, dan lokasi. Pembersihan mengekspor gambar yang di-encode ulang sehingga metadata tersembunyi umum dihapus dari file yang diunduh.",
      },
      {
        title: "Memori browser sementara",
        icon: "clock",
        body: "URL pratinjau, keluaran canvas, blob PDF, laporan JSON, dan file ZIP adalah objek browser sementara. Menutup tab, membersihkan antrean, atau menyegarkan halaman menghapus sesi aktif di memori dari antarmuka aplikasi.",
      },
      {
        title: "Pemrosesan cloud opsional di masa depan",
        icon: "database",
        body: "Fitur lanjutan di masa depan seperti pemrosesan API, batch sangat besar, ruang kerja bersama, atau penyimpanan cloud akan memerlukan persetujuan eksplisit, status unggah yang jelas, jendela retensi singkat, serta ketentuan akun atau penagihan terpisah.",
      },
      {
        title: "Ekspektasi retensi",
        icon: "trash",
        body: "Untuk MVP berbasis browser, Kompresio tidak menyimpan gambar pengguna. Jika alur kerja sisi server ditambahkan nanti, periode retensi dan kontrol penghapusan akan didokumentasikan sebelum pengguna mengunggah file.",
      },
    ],
    boundaries: [
      "Tidak mengumpulkan konten gambar mentah untuk analitik produk.",
      "Tidak menyimpan metadata gambar privat tanpa persetujuan eksplisit.",
      "Tidak menggunakan gambar yang diunggah untuk pelatihan model atau sampel pemasaran tanpa izin.",
      "Tidak mengekspos nama file, field EXIF, atau data pratinjau dalam log yang ditujukan untuk analitik.",
    ],
  },
  terms: {
    sections: [
      {
        title: "Penggunaan layanan",
        icon: "file",
        body: "Kompresio menyediakan alat berbasis browser untuk kompresi gambar, konversi, ubah ukuran, potong, pembersihan metadata, analisis, ekspor batch, dan gambar ke PDF. Anda bertanggung jawab atas file yang Anda proses dan keluaran yang Anda publikasikan atau unggah di tempat lain.",
      },
      {
        title: "Kepemilikan file",
        icon: "image",
        body: "Anda tetap memegang hak atas file asli dan hasil ekspor Anda. Jangan gunakan Kompresio untuk memproses gambar yang bukan milik Anda atau yang tidak Anda miliki izin untuk mengubah, mengonversi, mendistribusikan, atau mempublikasikannya.",
      },
      {
        title: "Peninjauan hasil",
        icon: "alert",
        body: "Kompresi, konversi, ubah ukuran, potong, pembersihan metadata, dan pembuatan PDF dapat mengubah ukuran file, format, dimensi, transparansi, metadata, warna, dan kualitas visual. Tinjau hasil sebelum mengirimkannya ke formulir, klien, toko, atau situs web publik.",
      },
      {
        title: "Penggunaan yang wajar",
        icon: "alert",
        body: "Jangan gunakan Kompresio untuk konten ilegal, pelanggaran privasi, distribusi malware, otomatisasi penyalahgunaan, upaya membebani infrastruktur, atau memproses file yang melanggar hak orang lain.",
      },
      {
        title: "Tanpa akun untuk alat MVP",
        icon: "badge",
        body: "Alat MVP saat ini dirancang bekerja tanpa login. Fitur Pro, tim, API, atau pemrosesan cloud di masa depan dapat menambahkan autentikasi, penagihan, batas penggunaan, ketentuan retensi tambahan, dan aturan layanan terpisah.",
      },
      {
        title: "Ketersediaan dan perubahan",
        icon: "scale",
        body: "Kompresio dapat mengubah format yang didukung, persyaratan browser, rute, perilaku pemrosesan, batas file, harga, dan ketersediaan fitur seiring perkembangan produk.",
      },
    ],
  },
  company: {
    stats: [
      {
        label: "Alat inti",
        value: "16",
        description: "Kompresi, konversi, ubah ukuran, potong, metadata, analisis, PDF.",
      },
      {
        label: "Model pemrosesan",
        value: "Lokal",
        description: "Pekerjaan gambar MVP berjalan di browser terlebih dahulu.",
      },
      {
        label: "Pengguna sasaran",
        value: "Global",
        description: "Dibuat untuk mahasiswa, kreator, penjual, dan pengembang.",
      },
      {
        label: "Atribusi",
        value: "Jelas",
        description: "Dikembangkan dan dipelihara oleh rifqysaputra.dev.",
      },
    ],
    principles: [
      {
        title: "Privat secara default",
        description:
          "File inti tetap di perangkat pengguna untuk kompresi, konversi, ubah ukuran, pembersihan metadata, analisis, dan pembuatan PDF.",
        icon: "shield",
      },
      {
        title: "Produk yang mengutamakan alat",
        description:
          "Pengguna langsung mendapatkan utilitas yang berfungsi, lalu konten pendukung menjelaskan pengaturan, format, dan praktik terbaik.",
        icon: "rocket",
      },
      {
        title: "Praktis untuk Indonesia dan pengguna global",
        description:
          "Produk dirancang untuk alur unggah umum: dokumen, formulir, listing marketplace, situs web, dan kiriman media sosial.",
        icon: "globe",
      },
      {
        title: "Implementasi kelas pengembang",
        description:
          "Rute, metadata, sitemap, gambar Open Graph, JSON-LD, tes, dan pemeriksaan build adalah bagian dari permukaan produk.",
        icon: "code",
      },
    ],
    resources: [
      {
        title: "Kebijakan Privasi",
        description:
          "Bagaimana Kompresio menangani pemrosesan lokal, metadata, batas analitik, dan alur unggah di masa depan.",
        href: "/privacy",
        icon: "lock",
      },
      {
        title: "Ketentuan Layanan",
        description:
          "Penggunaan yang diharapkan, kepemilikan file, tanggung jawab hasil, ketersediaan, dan perilaku yang dilarang.",
        href: "/terms",
        icon: "file",
      },
      {
        title: "Harga",
        description:
          "Alat MVP gratis sekarang, dengan peta jalan jelas untuk alur Pro, API, dan tim opsional nanti.",
        href: "/pricing",
        icon: "badge",
      },
    ],
  },
  pricing: {
    plans: [
      {
        name: "Gratis",
        price: "$0",
        period: "tanpa login",
        description: "Optimasi gambar inti berbasis browser untuk file sehari-hari.",
        icon: "gauge",
        badge: "Tersedia sekarang",
        featured: true,
        href: "/compress-image",
        cta: "Mulai optimasi",
        features: [
          "Kompres JPG, PNG, WebP, AVIF, GIF, SVG sesuai dukungan browser",
          "Konversi ke WebP dan AVIF",
          "Ubah ukuran per piksel atau preset",
          "Potong dengan preset rasio aspek",
          "Pembersih metadata dan penganalisis gambar",
          "Gambar ke PDF dengan keluaran A4 atau Letter",
          "Antrean batch hingga 50 file",
          "Unduh satuan dan ekspor ZIP",
        ],
      },
      {
        name: "Pro",
        price: "Nanti",
        period: "peta jalan",
        description:
          "Alur kerja lanjutan untuk batch lebih berat dan pengaturan produksi tersimpan.",
        icon: "shield",
        badge: "Peta jalan",
        featured: false,
        href: "/blog/how-to-prepare-images-for-nextjs",
        cta: "Baca panduan peta jalan",
        features: [
          "Batas batch lebih besar",
          "Preset tersimpan untuk tim sosial, marketplace, dan web",
          "Alur batch AVIF dan HEIC lanjutan",
          "Riwayat pemrosesan dan aturan penamaan yang dapat dipakai ulang",
          "Pemrosesan prioritas browser dan fallback cloud",
          "Manifest ekspor siap tim",
        ],
      },
      {
        name: "API Pengembang",
        price: "Nanti",
        period: "direncanakan",
        description:
          "Pemrosesan sisi server opsional untuk aplikasi yang butuh otomatisasi berulang.",
        icon: "code",
        badge: "Direncanakan",
        featured: false,
        href: "/company",
        cta: "Lihat catatan perusahaan",
        features: [
          "Pemrosesan server berbasis Sharp",
          "Pola unggah langsung ke object storage",
          "Pekerjaan pemrosesan siap webhook",
          "Batas laju dan kunci API",
          "Manifest hasil JSON terstruktur",
          "Kontrol privasi dan retensi untuk unggahan",
        ],
      },
    ],
    faqs: [
      {
        question: "Apakah Kompresio gratis?",
        answer:
          "Alat MVP berbasis browser gratis dan tidak memerlukan login. Alur Pro, API, atau cloud dapat ditambahkan nanti dengan batas dan ketentuan terpisah.",
      },
      {
        question: "Apakah alat gratis mengunggah gambar ke server?",
        answer:
          "Kompresi inti, konversi, ubah ukuran, potong, pembersihan metadata, analisis, pembuatan PDF, pratinjau, dan ekspor ZIP dirancang berjalan lokal di browser.",
      },
      {
        question: "Kenapa menyebut Pro jika belum tersedia?",
        answer:
          "Halaman ini mendokumentasikan arah produk dengan jelas agar fitur lanjutan di masa depan punya tempat yang jelas tanpa menyesatkan pengguna soal MVP saat ini.",
      },
    ],
  },
};
