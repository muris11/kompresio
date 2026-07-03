# Kompresio Free Dynamic All-In-One Design

Tanggal: 2026-07-03  
Status: Validated draft for implementation

## 1. Product Direction and Approach Decision

Target produk adalah all-in-one image tool untuk user umum: gratis, cepat, dinamis, dan aman kualitas hasilnya. Berdasarkan preferensi, pendekatan terbaik adalah Dynamic With Safety Rail: user bisa mengatur sendiri quality, format, resize, metadata, dan mode proses, tetapi sistem tetap memberikan batas aman agar hasil tidak pecah. Untuk memutuskan bentuk implementasi, ada tiga alternatif. Alternatif pertama adalah Full Manual Pro Control, yaitu semua parameter detail dibuka. Ini fleksibel namun terlalu kompleks untuk user umum. Alternatif kedua adalah Guided Wizard, yaitu user jawab beberapa pertanyaan lalu sistem menyiapkan setting. Ini ramah pemula, tetapi menambah langkah sebelum proses. Alternatif ketiga adalah Dynamic With Safety Rail, yaitu default balanced, panel setting tetap terbuka, dan warning adaptif muncul hanya saat konfigurasi berisiko. Alternatif ketiga direkomendasikan karena memberikan keseimbangan terbaik antara kemudahan, kontrol, dan kualitas output.

Untuk menjaga layanan tetap gratis dan bisa dipakai banyak orang, strategi operasional utama adalah client-side first untuk hampir semua alur standar (compress, convert, resize, crop, remove background, metadata cleaner, batch zip, image-to-pdf). Server hanya dipakai untuk halaman web, SEO, dan endpoint ringan. Dengan demikian beban compute tidak menumpuk di server, biaya tetap rendah, dan privasi user tetap kuat karena file diproses di perangkat pengguna.

## 2. Architecture, Components, and Data Flow

Arsitektur tetap mempertahankan App Router dengan pola tool-driven di satu workbench agar maintenance ringan. Komponen inti adalah Tool Catalog (definisi slug, mode, capability), Optimizer Workbench (UI tunggal multi-mode), Client Processing Engine (canvas pipeline + format encoder), Quality Guardrail Service (rule evaluator untuk anti-pecah), dan Export Layer (single download + zip manifest). Sistem rekomendasi akan bekerja sebagai policy layer, bukan preset statis: ia membaca mime type, dimensi, ukuran file, target output, dan prioritas user (quality, balanced, size), lalu mengusulkan setting aman yang masih bisa diedit user.

Alur data utama: user upload file, file tervalidasi, preview dirender, sistem menghitung profil gambar, rule engine menghitung risiko (misalnya downscale ekstrem, quality terlalu rendah, format tidak cocok transparansi), lalu UI menampilkan indikator warna dan tombol one-click fix. Setelah user proses, pipeline menghasilkan blob output, statistik before-after, dan metadata laporan. Untuk batch, setiap item mempertahankan state sendiri dengan fallback retry per-item agar kegagalan satu file tidak membatalkan seluruh antrean. Hasil akhir selalu dapat diunduh sebagai file individual maupun zip, lengkap dengan summary JSON/CSV.

Skalabilitas pengguna dicapai dengan tiga guard: hard limit ukuran file per item, batas jumlah queue per sesi, dan auto-throttle concurrency processing berdasarkan kemampuan device browser. Pendekatan ini membuat aplikasi tetap responsif saat trafik tinggi tanpa menambah infrastruktur backend berat.

## 3. Error Handling, Quality Guardrails, Testing, and Rollout

Error handling dibagi menjadi empat level. Level 1 adalah validasi input (format, ukuran, dimensi ekstrem). Level 2 adalah runtime browser capability (dukungan format, memory pressure, createImageBitmap failure). Level 3 adalah processing failure per item (misalnya encode gagal). Level 4 adalah export failure (zip atau pdf generation). Semua error harus memiliki pesan praktis, aksi lanjutan jelas, dan tidak menghapus queue user. Untuk menjaga kualitas visual, guardrail rules wajib: minimum quality threshold per format, rasio resize aman, transparansi-preserving rule untuk PNG/WebP, serta warning jika estimasi visual loss melewati batas. User tetap boleh lanjut, tetapi sistem memberi peringatan dan rekomendasi koreksi satu klik.

Strategi testing: unit test untuk rule engine, output resolver, capability map, dan filename policy; integration test untuk pipeline processImage lintas mode termasuk remove background; UI test untuk guardrail warnings, apply recommendation, queue isolation, serta retry scenario; regression test untuk download result, zip manifest, dan metadata behavior. Acceptance criteria utama: tidak ada crash saat batch campuran, warning muncul konsisten untuk setting berisiko, dan output tetap valid dibuka lintas platform.

Rollout dilakukan bertahap dalam tiga fase. Fase 1: dynamic quality guardrail + warning UI + one-click safe fix. Fase 2: adaptive defaults berbasis jenis file dan tujuan penggunaan. Fase 3: telemetry non-PII untuk memahami setting populer dan titik error paling sering, lalu optimasi UX berbasis data. Dengan urutan ini, Kompresio bisa tetap gratis, terasa fleksibel, dan makin kuat dipakai banyak orang.
