# PRD — Kompresio

**Project Name:** Kompresio  
**Product Type:** All-in-one image optimization web app  
**Primary Stack:** Next.js App Router, TypeScript, Tailwind CSS 4, shadcn/ui, lucide-react, Framer Motion  
**Deployment Target:** Vercel  
**Version:** 2.0 SEO + Vercel Hosting Edition  
**Status:** Product planning document  

---

## 1. Executive Summary

Kompresio adalah website utilitas gambar modern untuk mengompres, mengubah format, resize, crop, membersihkan metadata, menganalisis gambar, dan mengunduh hasil dalam bentuk file tunggal atau ZIP. Produk ini dirancang sebagai tool yang cepat, private, ringan, SEO-friendly, dan siap di-hosting di Vercel.

Kompresio mengambil pendekatan **client-side first**, artinya proses utama seperti compress, resize, convert to WebP, preview, metadata cleaner, dan ZIP export dilakukan langsung di browser pengguna. Pendekatan ini penting karena:

1. Gambar pengguna tidak perlu keluar dari device.
2. Website terasa lebih cepat untuk proses ringan dan menengah.
3. Biaya server lebih rendah.
4. Lebih cocok untuk Vercel, karena upload file gambar besar ke serverless function punya batas payload.
5. Lebih mudah diposisikan sebagai produk privacy-first.

Untuk fitur advanced seperti AVIF encoding berat, batch besar, API developer, atau processing cloud, Kompresio dapat menyediakan mode server-side optional menggunakan Sharp, Vercel Blob, Cloudflare R2, atau dedicated backend.

---

## 2. Product Vision

Menjadi website image optimization toolkit yang paling mudah digunakan untuk pengguna Indonesia dan tetap relevan secara global. Kompresio tidak hanya menjadi alat kompres gambar, tetapi menjadi pusat workflow optimasi gambar untuk website, marketplace, sosial media, dokumen, dan kebutuhan developer.

### Vision Statement

> Kompresio helps people compress, convert, resize, and prepare images for the web with speed, privacy, and professional quality.

---

## 3. Product Mission

Kompresio memiliki misi untuk:

1. Membantu pengguna memperkecil ukuran gambar tanpa proses rumit.
2. Membantu developer membuat asset gambar yang lebih optimal untuk website.
3. Membantu UMKM menyiapkan foto produk untuk marketplace.
4. Membantu content creator membuat gambar yang sesuai ukuran platform.
5. Membantu pengguna menjaga privasi dengan metadata cleaner.
6. Menyediakan tool gambar yang cepat, responsive, dan bisa dipakai tanpa login.

---

## 4. Naming Direction

Nama utama: **Kompresio**

### Alasan Nama

1. Berasal dari kata “kompresi”, sehingga langsung relevan dengan fitur utama.
2. Akhiran “io” memberi kesan modern, software, dan global.
3. Mudah diucapkan oleh pengguna Indonesia.
4. Cocok untuk domain seperti:
   - kompresio.app
   - kompresio.id
   - kompresio.tools
   - kompresio.dev
   - kompresio.vercel.app untuk preview awal.

### Catatan Legal

Nama ini tetap harus dicek ulang sebelum rilis resmi:

1. Ketersediaan domain.
2. Ketersediaan username sosial media.
3. Potensi kemiripan brand.
4. Trademark atau merek dagang.

---

## 5. Problem Statement

Banyak pengguna mengalami masalah berikut:

| Masalah | Dampak | Solusi Kompresio |
|---|---|---|
| Gambar terlalu besar | Upload lambat, website lambat, gagal upload formulir | Image compression |
| Format tidak cocok | File tidak bisa dipakai di platform tertentu | Image converter |
| Butuh WebP/AVIF | Developer harus pakai tool terpisah | Convert to WebP/AVIF |
| Foto iPhone HEIC sulit dibuka | Tidak kompatibel di banyak sistem | HEIC converter |
| Gambar terlalu besar dimensinya | Layout website berat dan tidak efisien | Resize image |
| Banyak gambar harus diproses | Manual satu per satu memakan waktu | Batch processing |
| Metadata foto berisi info sensitif | Risiko privasi | Metadata cleaner |
| Nama file tidak SEO-friendly | Asset kurang rapi untuk website | SEO filename generator |
| User tidak paham setting kompresi | Hasil tidak optimal | Smart recommendation |
| Server upload punya batasan | Gagal upload file besar | Client-side processing |

---

## 6. Product Goals

### 6.1 User Goals

Pengguna dapat:

1. Upload gambar dengan drag and drop.
2. Mengompres gambar dalam beberapa detik.
3. Convert gambar ke WebP dan AVIF.
4. Resize gambar berdasarkan ukuran custom atau preset.
5. Crop gambar dengan rasio populer.
6. Menghapus metadata gambar.
7. Melihat perbandingan before/after.
8. Download satu file atau semua hasil dalam ZIP.
9. Menggunakan website dari HP, tablet, dan desktop.
10. Menggunakan fitur dasar tanpa login.

### 6.2 Business Goals

Kompresio ditargetkan untuk:

1. Mendapat organic traffic dari Google.
2. Menjadi portfolio project yang terlihat profesional.
3. Bisa berkembang menjadi SaaS ringan.
4. Memiliki potensi monetisasi melalui Pro plan, API, atau iklan non-intrusif.
5. Menjadi produk lokal dengan kualitas global.

### 6.3 Technical Goals

1. Deploy stabil di Vercel.
2. Client-side first untuk processing gambar.
3. SEO teknis lengkap.
4. Performance tinggi di Lighthouse.
5. Responsive di semua ukuran layar.
6. Modular dan mudah dikembangkan.
7. Mudah ditambahkan tool baru.

---

## 7. Target Audience

## 7.1 General Users

Kebutuhan:

- Kompres foto cepat.
- Convert format gambar.
- Resize tanpa aplikasi tambahan.
- Tidak ingin login.

Fitur utama:

- Drag and drop upload.
- One-click compression.
- Preset quality.
- Download langsung.

## 7.2 Web Developers

Kebutuhan:

- Convert JPG/PNG ke WebP/AVIF.
- Optimasi asset website.
- Batch export.
- Metadata dan filename rapi.

Fitur utama:

- WebP converter.
- AVIF converter.
- Batch queue.
- Rename pattern.
- SEO filename helper.
- API mode optional.

## 7.3 UMKM / Marketplace Sellers

Kebutuhan:

- Foto produk ringan.
- Rasio gambar sesuai marketplace.
- Batch resize.
- Watermark brand.

Fitur utama:

- Marketplace preset.
- Resize 1:1.
- Watermark.
- Batch ZIP.

## 7.4 Content Creators

Kebutuhan:

- Resize untuk Instagram, TikTok, YouTube.
- Crop rasio sosial media.
- Kompres tanpa merusak kualitas.

Fitur utama:

- Social media presets.
- Cropper.
- Format converter.
- Preview before/after.

## 7.5 Students

Kebutuhan:

- Kompres gambar untuk tugas.
- Image to PDF.
- Convert format.
- Tool gratis dan mudah.

Fitur utama:

- Compress image.
- Image to PDF.
- Resize.
- Download cepat.

---

## 8. Core Value Proposition

Kompresio menawarkan:

1. **Fast:** proses cepat langsung di browser.
2. **Private:** file tidak perlu dikirim ke server untuk fitur utama.
3. **Complete:** compress, convert, resize, crop, metadata, batch, ZIP.
4. **SEO-ready:** setiap tool punya halaman landing sendiri.
5. **Vercel-ready:** arsitektur cocok untuk hosting modern.
6. **Responsive:** nyaman digunakan di mobile dan desktop.
7. **Professional:** UI modern dengan icon, bukan emoji.

---

## 9. Product Scope

## 9.1 MVP Scope

MVP harus mencakup:

1. Landing page profesional.
2. Compress image.
3. Convert to WebP.
4. Resize image.
5. Batch upload.
6. File queue.
7. Before/after preview.
8. Quality slider.
9. Download single image.
10. Download all as ZIP.
11. Metadata cleaner basic.
12. Smart recommendation basic.
13. SEO metadata per halaman.
14. Sitemap.
15. Robots.txt.
16. Open Graph image.
17. Blog index basic.
18. Privacy page.
19. Terms page.
20. Vercel deployment configuration.

## 9.2 Advanced Scope

Fitur lanjutan:

1. Convert to AVIF.
2. HEIC to JPG/WebP.
3. Crop image.
4. Watermark tool.
5. Image analyzer.
6. Rename pattern.
7. Image to PDF.
8. SVG optimizer.
9. PWA offline support.
10. Local processing history.
11. Saved presets.
12. API developer.
13. Login.
14. Pro plan.
15. Cloud processing.

---

## 10. Feature Specification

## 10.1 Upload System

### Description

User dapat mengunggah gambar melalui drag and drop atau file picker.

### Supported Input Formats

- JPG
- JPEG
- PNG
- WebP
- AVIF
- GIF
- SVG
- HEIC/HEIF untuk fitur khusus

### Functional Requirements

1. User bisa upload single file.
2. User bisa upload multiple files.
3. User bisa drag and drop.
4. Sistem memvalidasi MIME type.
5. Sistem memvalidasi ukuran file.
6. Sistem menampilkan thumbnail.
7. Sistem menolak file unsupported.
8. Sistem memberi pesan error yang jelas.

### Validation Rules

Default free limits:

- Max file size per image: 20 MB.
- Max batch file count: 50 files.
- Max total batch size: 250 MB.
- Warning jika dimensi lebih dari 8000px.

---

## 10.2 Image Compression

### Description

Tool untuk mengurangi ukuran gambar dengan pengaturan kualitas.

### Input

- JPG
- PNG
- WebP
- BMP jika didukung browser

### Output

- Original format
- JPG
- PNG
- WebP
- AVIF optional

### Settings

1. Quality slider 1–100.
2. Preset:
   - Smallest Size
   - Balanced
   - High Quality
   - Web Optimized
   - Marketplace
   - Document Upload
3. Strip metadata.
4. Resize before compression.
5. Target file size.
6. Lossless toggle untuk format tertentu.

### Output Metrics

1. Original size.
2. New size.
3. Saved bytes.
4. Saved percentage.
5. Output format.
6. Output dimensions.
7. Processing time.

---

## 10.3 Convert to WebP

### Description

Tool untuk convert JPG, PNG, dan format lain ke WebP.

### Settings

1. Quality.
2. Lossy/lossless.
3. Resize optional.
4. Remove metadata.
5. Rename output.
6. Batch conversion.

### SEO Target

Primary keyword:

- convert image to WebP
- JPG to WebP
- PNG to WebP
- WebP converter

---

## 10.4 Convert to AVIF

### Description

Tool untuk menghasilkan gambar AVIF yang lebih ringan untuk website modern.

### Settings

1. Quality.
2. Encoding effort.
3. Resize optional.
4. Batch convert.
5. Browser support warning.

### Notes

AVIF encoding dapat lebih lambat, sehingga sebaiknya:

1. Lazy load module.
2. Gunakan Web Worker.
3. Berikan progress indicator.

---

## 10.5 Resize Image

### Description

Tool untuk mengubah ukuran dimensi gambar.

### Modes

1. Width only.
2. Height only.
3. Width and height.
4. Percentage.
5. Preset.

### Presets

| Preset | Size |
|---|---:|
| Instagram Square | 1080x1080 |
| Instagram Story | 1080x1920 |
| YouTube Thumbnail | 1280x720 |
| Website Hero | 1920x1080 |
| Blog Cover | 1200x630 |
| Marketplace Product | 1000x1000 |
| Profile Picture | 512x512 |
| Document Upload | 800px width |

---

## 10.6 Crop Image

### Description

Tool visual untuk memotong gambar.

### Features

1. Free crop.
2. Aspect ratio presets.
3. Zoom.
4. Rotate.
5. Reset crop.
6. Preview result.
7. Export format selection.

---

## 10.7 Metadata Cleaner

### Description

Tool untuk membersihkan EXIF dan metadata lain dari gambar.

### Metadata Target

1. GPS location.
2. Camera model.
3. Device brand.
4. Date taken.
5. Software info.
6. Lens info.
7. Orientation data jika tidak diperlukan.

### UX Requirement

User harus melihat:

1. Apakah metadata ditemukan.
2. Jenis metadata secara ringkas.
3. Button clear metadata.
4. Hasil file bersih.

---

## 10.8 Batch Processing

### Description

User dapat memproses banyak file sekaligus.

### Queue Status

1. Waiting.
2. Processing.
3. Completed.
4. Failed.
5. Skipped.

### Required Actions

1. Process all.
2. Pause optional.
3. Cancel batch.
4. Retry failed.
5. Remove selected.
6. Download selected.
7. Download all ZIP.

---

## 10.9 Smart Recommendation

### Description

Sistem menganalisis gambar dan menyarankan setting terbaik.

### Example Recommendation

```txt
Recommended optimization:
- Format: WebP
- Quality: 78
- Resize width: 1600px
- Remove metadata: Yes
- Estimated saving: 72%
```

### Recommendation Rules

| Condition | Recommendation |
|---|---|
| JPG photo > 2 MB | Convert WebP quality 75–82 |
| PNG photo without transparency | Convert WebP |
| PNG with transparency | WebP lossless or optimized PNG |
| Very large dimension | Resize width 1600–1920px |
| Marketplace preset selected | 1000x1000 JPG/WebP |
| Blog cover | 1200x630 WebP |
| Has metadata | Strip metadata |

---

## 10.10 ZIP Export

### Description

Batch results dapat diunduh sebagai ZIP.

### ZIP Structure

```txt
kompresio-export.zip
├── compressed/
├── webp/
├── avif/
├── resized/
├── metadata-cleaned/
├── summary.json
└── summary.csv
```

### Manifest Fields

1. Original filename.
2. Output filename.
3. Original size.
4. Output size.
5. Saved percentage.
6. Output format.
7. Width.
8. Height.
9. Processing time.
10. Processing date.

---

## 11. Page Architecture

## 11.1 Public Pages

| Route | Page Type | SEO Intent |
|---|---|---|
| `/` | Homepage | brand + image optimizer |
| `/tools` | Tool directory | all image tools |
| `/compress-image` | Tool page | compress image online |
| `/compress-jpg` | Tool page | compress JPG online |
| `/compress-png` | Tool page | compress PNG online |
| `/convert-to-webp` | Tool page | convert image to WebP |
| `/jpg-to-webp` | Tool page | JPG to WebP |
| `/png-to-webp` | Tool page | PNG to WebP |
| `/convert-to-avif` | Tool page | AVIF converter |
| `/resize-image` | Tool page | resize image online |
| `/crop-image` | Tool page | crop image online |
| `/heic-to-jpg` | Tool page | HEIC to JPG |
| `/metadata-cleaner` | Tool page | remove image metadata |
| `/batch-converter` | Tool page | batch image converter |
| `/image-analyzer` | Tool page | image analyzer |
| `/image-to-pdf` | Tool page | image to PDF |
| `/blog` | Blog index | SEO content hub |
| `/blog/[slug]` | Blog detail | long-tail SEO |
| `/privacy` | Legal | privacy |
| `/terms` | Legal | terms |
| `/pricing` | Optional | SaaS pricing |

## 11.2 App / Dashboard Pages Optional

| Route | Purpose |
|---|---|
| `/dashboard` | User overview |
| `/dashboard/history` | Processing history |
| `/dashboard/presets` | Saved presets |
| `/dashboard/api-keys` | API keys |
| `/dashboard/billing` | Billing |
| `/dashboard/settings` | Account settings |

---

## 12. SEO Strategy

## 12.1 SEO Principles

Kompresio harus mengikuti prinsip SEO berikut:

1. Setiap tool utama punya halaman khusus.
2. Setiap halaman punya title, description, canonical URL, Open Graph, dan Twitter card.
3. Konten harus membantu user, bukan sekadar mengulang keyword.
4. Internal linking antar tool harus kuat.
5. Halaman harus mobile-friendly dan cepat.
6. Struktur heading harus rapi.
7. Gambar demo harus punya alt text deskriptif.
8. Sitemap harus otomatis.
9. Robots.txt harus valid.
10. Structured data digunakan secara wajar dan sesuai halaman.

## 12.2 Keyword Cluster

## Cluster 1 — Compress Image

Primary:

- compress image online
- image compressor
- compress image free

Secondary:

- reduce image size
- compress JPG
- compress PNG
- compress WebP
- image size reducer
- photo compressor

Long-tail:

- compress image without losing quality
- compress image for website
- compress image for email
- compress image under 1MB
- compress image under 500KB

## Cluster 2 — WebP Converter

Primary:

- convert image to WebP
- WebP converter
- JPG to WebP
- PNG to WebP

Secondary:

- image to WebP online
- convert PNG to WebP online
- convert JPG to WebP free
- WebP image converter

Long-tail:

- convert image to WebP for website
- batch convert JPG to WebP
- convert PNG with transparency to WebP

## Cluster 3 — AVIF Converter

Primary:

- AVIF converter
- convert image to AVIF

Secondary:

- JPG to AVIF
- PNG to AVIF
- WebP to AVIF

Long-tail:

- convert images to AVIF for faster website
- AVIF vs WebP for website images

## Cluster 4 — Resize Image

Primary:

- resize image online
- image resizer

Secondary:

- resize JPG
- resize PNG
- resize image by pixel
- resize image for Instagram
- resize image for marketplace

Long-tail:

- resize image to 1080x1080
- resize image to 1200x630
- resize product photo for marketplace

## Cluster 5 — Privacy / Metadata

Primary:

- remove image metadata
- EXIF remover

Secondary:

- remove GPS from photo
- clean image metadata
- photo privacy cleaner

Long-tail:

- remove camera info from photo online
- remove location data from image

## 12.3 Metadata Template

## Homepage

Title:

```txt
Kompresio — Compress, Convert, and Optimize Images Online
```

Description:

```txt
Compress JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Convert to WebP, resize, clean metadata, and download optimized images in seconds.
```

## Tool Page Template

Title:

```txt
[Tool Name] Online — Fast and Private | Kompresio
```

Description:

```txt
Use Kompresio to [main action]. Fast, private, browser-based, and built for batch image optimization with download ZIP support.
```

## Blog Template

Title:

```txt
[Article Title] | Kompresio Blog
```

Description:

```txt
Learn [topic] with practical image optimization tips from Kompresio.
```

## 12.4 Canonical URL Rules

1. Setiap halaman public harus punya canonical URL.
2. Gunakan domain produksi, bukan preview domain Vercel.
3. Jika menggunakan route alias seperti `/jpg-to-webp` dan `/convert-to-webp`, canonical harus ditentukan jelas.
4. Hindari duplicate content antara halaman tool mirip.

Recommended canonical strategy:

| Page | Canonical |
|---|---|
| `/convert-to-webp` | `/convert-to-webp` |
| `/jpg-to-webp` | `/jpg-to-webp` dengan konten spesifik JPG |
| `/png-to-webp` | `/png-to-webp` dengan konten spesifik PNG |

## 12.5 Heading Structure

Setiap tool page:

```txt
H1: Compress Image Online
H2: Upload your image
H2: Compression settings
H2: How to compress images
H2: Why use Kompresio
H2: Supported formats
H2: Related tools
H2: Frequently asked questions
```

Aturan:

1. Hanya satu H1 per halaman.
2. H2 untuk section utama.
3. H3 untuk sub-section.
4. Jangan gunakan heading hanya untuk styling.

## 12.6 Structured Data

Gunakan structured data berikut:

### Website Schema

Untuk homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kompresio",
  "url": "https://kompresio.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kompresio.app/tools?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### SoftwareApplication Schema

Untuk tool page:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Kompresio Image Compressor",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### BreadcrumbList Schema

Untuk semua halaman detail:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://kompresio.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools",
      "item": "https://kompresio.app/tools"
    }
  ]
}
```

### FAQ Structured Data

FAQ dapat disiapkan untuk membantu search engine memahami konten, tetapi jangan menjanjikan rich result karena Google tidak menjamin semua structured data akan ditampilkan sebagai rich result.

## 12.7 Image SEO

Karena Kompresio adalah website image tool, image SEO juga penting.

Rules:

1. Gunakan nama file deskriptif.
2. Gunakan alt text yang menjelaskan fungsi gambar.
3. Hindari nama seperti `image1.png`.
4. Gunakan WebP untuk gambar marketing.
5. Sediakan width dan height agar layout stabil.
6. Lazy load gambar non-critical.
7. Prioritaskan hero image jika ada.
8. Buat OG image khusus untuk tiap halaman tool.

Example alt text:

```txt
Kompresio dashboard showing image compression result with original size and optimized WebP size
```

## 12.8 Internal Linking Strategy

Setiap halaman tool harus punya:

1. Link ke tool terkait.
2. Link ke blog tutorial.
3. Breadcrumb.
4. Footer navigation.
5. CTA ke batch converter.

Example untuk `/compress-image`:

Related tools:

- Convert to WebP
- Resize Image
- Metadata Cleaner
- Batch Converter

Related articles:

- How to compress images without losing quality
- WebP vs JPG: which one should you use?
- Best image size for websites

## 12.9 Blog Content Plan

Minimum 30 artikel SEO:

1. How to Compress Images Without Losing Quality
2. JPG vs PNG vs WebP vs AVIF
3. How to Convert JPG to WebP
4. How to Convert PNG to WebP
5. What Is WebP and Why It Matters
6. What Is AVIF and When to Use It
7. WebP vs AVIF for Website Images
8. Best Image Size for Website Performance
9. How to Resize Images for Instagram
10. How to Resize Images for YouTube Thumbnail
11. How to Resize Product Photos for Marketplace
12. How to Remove Metadata from Photos
13. What Is EXIF Metadata?
14. How to Convert HEIC to JPG
15. Why Large Images Slow Down Your Website
16. How to Optimize Images for SEO
17. How to Name Image Files for SEO
18. Best Image Format for Blog Posts
19. How to Compress Images Under 1MB
20. How to Compress Images Under 500KB
21. How to Batch Convert Images to WebP
22. How to Prepare Images for Vercel and Next.js
23. How Image Optimization Improves Core Web Vitals
24. How to Create Web-Ready Product Photos
25. How to Optimize Images for Portfolio Websites
26. How to Use Alt Text Properly
27. How to Reduce Image Size on Mobile
28. Lossy vs Lossless Image Compression
29. How to Create Fast Loading Landing Pages
30. Complete Guide to Image Optimization

## 12.10 SEO KPIs

| Metric | Target |
|---|---:|
| Indexed pages | 30+ pages in first phase |
| Organic clicks | Growth month over month |
| Average CTR | > 3% for tool pages |
| Lighthouse SEO | 95+ |
| Core Web Vitals | Good |
| Internal links per page | 5–12 relevant links |
| Blog publishing | 2–4 posts per week initially |

---

## 13. Vercel Hosting Strategy

## 13.1 Why Vercel

Vercel cocok karena:

1. Native support untuk Next.js.
2. Preview deployment otomatis dari Git.
3. Custom domain mudah.
4. HTTPS otomatis.
5. Environment variables mudah dikelola.
6. Edge network global.
7. Cocok untuk static + dynamic hybrid.
8. Analytics dan Speed Insights tersedia.

## 13.2 Hosting Architecture

Recommended architecture:

```txt
User Browser
  ↓
Kompresio Next.js App on Vercel
  ↓
Client-side Image Processing
  ↓
Download Locally
```

Optional advanced architecture:

```txt
User Browser
  ↓
Vercel Next.js App
  ↓
Direct Upload to Vercel Blob / S3 / R2
  ↓
Background Worker / Dedicated API
  ↓
Optimized Output
  ↓
Download Link
```

## 13.3 Client-Side First Requirement

Fitur berikut harus berjalan client-side:

1. Compress image basic.
2. Convert to WebP.
3. Resize image.
4. Crop image.
5. Metadata cleaner basic.
6. Preview before/after.
7. ZIP export.
8. File analyzer basic.

Alasan:

1. Mengurangi server cost.
2. Menghindari limit upload serverless untuk file besar.
3. Menjaga privasi.
4. Membuat website lebih scalable.

## 13.4 Server-Side Optional Requirement

Fitur yang boleh server-side:

1. AVIF advanced.
2. Heavy batch processing.
3. Developer API.
4. Cloud history.
5. Pro processing.
6. Team workspace.

Jika menggunakan server-side, jangan upload langsung file besar ke API route biasa. Gunakan direct upload ke object storage.

## 13.5 Vercel Deployment Flow

### Step 1 — Create Project

```bash
pnpm create next-app@latest kompresio --typescript --eslint --app
cd kompresio
```

### Step 2 — Install Tailwind CSS 4

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

`postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

`app/globals.css`:

```css
@import "tailwindcss";
```

### Step 3 — Install UI and Tools

```bash
pnpm add lucide-react framer-motion react-dropzone zustand zod jszip file-saver browser-image-compression compressorjs heic2any dexie
pnpm add sharp
pnpm add -D @types/file-saver
```

### Step 4 — Setup shadcn/ui

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card badge slider tabs dialog dropdown-menu progress table input label select sheet separator toast textarea accordion
```

### Step 5 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial Kompresio project"
git branch -M main
git remote add origin https://github.com/username/kompresio.git
git push -u origin main
```

### Step 6 — Import to Vercel

1. Open Vercel dashboard.
2. Add New Project.
3. Import GitHub repository.
4. Framework should be detected as Next.js.
5. Build command: `pnpm build`.
6. Install command: `pnpm install`.
7. Output directory: default.
8. Deploy.

### Step 7 — Add Custom Domain

Possible domains:

- `kompresio.app`
- `kompresio.id`
- `kompresio.tools`
- `kompresio.dev`

After adding domain:

1. Set production domain.
2. Update `NEXT_PUBLIC_SITE_URL`.
3. Rebuild deployment.
4. Test canonical URL.
5. Test sitemap URL.
6. Test Open Graph image.

## 13.6 Environment Variables

Recommended env:

```env
NEXT_PUBLIC_SITE_URL=https://kompresio.app
NEXT_PUBLIC_APP_NAME=Kompresio
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CLIENT_PROCESSING=true
NEXT_PUBLIC_ENABLE_SERVER_PROCESSING=false
NEXT_PUBLIC_MAX_FILE_SIZE_MB=20
NEXT_PUBLIC_MAX_BATCH_FILES=50
```

Optional Pro env:

```env
BLOB_READ_WRITE_TOKEN=
DATABASE_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## 13.7 Vercel Configuration

`vercel.json` optional:

```json
{
  "framework": "nextjs",
  "regions": ["sin1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

Note:

- Region `sin1` bisa dipilih untuk Asia Tenggara jika tersedia dan sesuai plan.
- Jangan memaksa semua proses berat di Vercel Functions.
- Gunakan browser processing untuk MVP.

## 13.8 Build and Deployment Scripts

`package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build"
  }
}
```

## 13.9 Vercel Launch Checklist

Before deploy:

- Build success locally.
- No TypeScript error.
- No ESLint blocking error.
- All env set.
- Metadata works.
- Sitemap works.
- Robots works.
- OG image works.
- Mobile responsive tested.
- Large image tested.
- ZIP export tested.
- Dark mode tested.

After deploy:

- Test production URL.
- Test custom domain.
- Test HTTPS.
- Submit sitemap to Google Search Console.
- Add Vercel Analytics.
- Add Speed Insights.
- Check Lighthouse.
- Check Core Web Vitals.
- Check robots.txt.
- Check canonical URLs.

---

## 14. Technical Architecture

## 14.1 Recommended Stack

| Category | Tool |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI | shadcn/ui |
| Icon | lucide-react |
| Animation | Framer Motion |
| Upload | react-dropzone |
| State | Zustand |
| Validation | Zod |
| Local DB | Dexie / IndexedDB |
| Compression | browser-image-compression, CompressorJS, Canvas API |
| HEIC | heic2any |
| ZIP | JSZip, FileSaver |
| Server optional | Sharp |
| Hosting | Vercel |

## 14.2 Folder Structure

```txt
kompresio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   ├── opengraph-image.tsx
│   ├── twitter-image.tsx
│   ├── tools/page.tsx
│   ├── compress-image/page.tsx
│   ├── compress-jpg/page.tsx
│   ├── compress-png/page.tsx
│   ├── convert-to-webp/page.tsx
│   ├── jpg-to-webp/page.tsx
│   ├── png-to-webp/page.tsx
│   ├── convert-to-avif/page.tsx
│   ├── resize-image/page.tsx
│   ├── crop-image/page.tsx
│   ├── heic-to-jpg/page.tsx
│   ├── metadata-cleaner/page.tsx
│   ├── batch-converter/page.tsx
│   ├── image-analyzer/page.tsx
│   ├── image-to-pdf/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/
│       ├── health/route.ts
│       └── optimize/route.ts
├── components/
│   ├── layout/
│   ├── marketing/
│   ├── upload/
│   ├── tools/
│   ├── seo/
│   ├── shared/
│   └── ui/
├── hooks/
├── lib/
│   ├── image/
│   ├── seo/
│   ├── vercel/
│   ├── constants/
│   ├── validators/
│   └── utils.ts
├── workers/
├── store/
├── types/
├── public/
│   ├── images/
│   ├── icons/
│   └── og/
├── docs/
│   ├── prd.md
│   └── design.md
├── next.config.ts
├── postcss.config.mjs
├── package.json
├── tsconfig.json
└── vercel.json
```

---

## 15. SEO Implementation in Next.js

## 15.1 Root Metadata

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kompresio.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kompresio — Compress, Convert, and Optimize Images Online",
    template: "%s | Kompresio",
  },
  description:
    "Compress JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Convert to WebP, resize, clean metadata, and download optimized images in seconds.",
  applicationName: "Kompresio",
  keywords: [
    "image compressor",
    "compress image online",
    "WebP converter",
    "AVIF converter",
    "resize image online",
    "metadata cleaner",
  ],
  authors: [{ name: "Kompresio" }],
  creator: "Kompresio",
  publisher: "Kompresio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Kompresio",
    title: "Kompresio — Compress, Convert, and Optimize Images Online",
    description:
      "Fast and private browser-based image compression, WebP conversion, resizing, metadata cleaning, and batch export.",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Kompresio image optimization toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompresio — Compress, Convert, and Optimize Images Online",
    description:
      "Compress and convert images directly in your browser with Kompresio.",
    images: ["/og/default.png"],
  },
};
```

## 15.2 Tool Page Metadata

`app/compress-image/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Image Online — Fast and Private",
  description:
    "Compress JPG, PNG, and WebP images online with Kompresio. Fast, private, browser-based image compression with batch ZIP download support.",
  alternates: {
    canonical: "/compress-image",
  },
  openGraph: {
    title: "Compress Image Online — Kompresio",
    description:
      "Reduce image file size while keeping visual quality. Process images directly in your browser.",
    url: "/compress-image",
    images: [
      {
        url: "/og/compress-image.png",
        width: 1200,
        height: 630,
        alt: "Compress image online with Kompresio",
      },
    ],
  },
};
```

## 15.3 Dynamic Sitemap

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kompresio.app";

const staticRoutes = [
  "",
  "/tools",
  "/compress-image",
  "/compress-jpg",
  "/compress-png",
  "/convert-to-webp",
  "/jpg-to-webp",
  "/png-to-webp",
  "/convert-to-avif",
  "/resize-image",
  "/crop-image",
  "/heic-to-jpg",
  "/metadata-cleaner",
  "/batch-converter",
  "/image-analyzer",
  "/image-to-pdf",
  "/blog",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.includes("blog") ? 0.7 : 0.9,
  }));
}
```

## 15.4 Robots.txt

`app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kompresio.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api", "/internal"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

## 15.5 JSON-LD Component

`components/seo/json-ld.tsx`:

```tsx
type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

## 16. Performance Requirements

## 16.1 Core Web Vitals Target

| Metric | Target |
|---|---:|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |

## 16.2 Performance Strategy

1. Lazy load image processing libraries.
2. Use Web Workers for heavy processing.
3. Use dynamic import for AVIF/HEIC modules.
4. Avoid blocking main thread.
5. Use skeleton loading for heavy UI.
6. Use local object URLs carefully and revoke them.
7. Compress all marketing images.
8. Use responsive image sizes.
9. Avoid unnecessary client components.
10. Keep landing page lightweight.

---

## 17. Security and Privacy Requirements

## 17.1 Privacy

1. Default processing happens locally.
2. User files are not uploaded for MVP tools.
3. No image is stored without consent.
4. No image content is used for analytics.
5. Metadata cleaner should clearly explain removed data.
6. Privacy policy must be available in footer.

## 17.2 Security

1. Validate MIME type.
2. Validate extension.
3. Validate file size.
4. Sanitize filename.
5. Avoid unsafe SVG rendering.
6. Apply security headers.
7. Use strict content policy where possible.
8. Do not expose secrets to client.
9. Keep dependencies updated.
10. Use server-side processing only with proper limits.

---

## 18. Analytics Requirements

Recommended analytics:

- Vercel Analytics.
- Vercel Speed Insights.
- Optional Plausible.

Track events:

1. `tool_opened`
2. `file_added`
3. `batch_added`
4. `compression_started`
5. `compression_completed`
6. `convert_webp_started`
7. `convert_webp_completed`
8. `resize_completed`
9. `metadata_cleaned`
10. `zip_downloaded`
11. `single_downloaded`
12. `error_occurred`

Do not track:

1. Image content.
2. Personal metadata.
3. Sensitive filenames.
4. Preview image data.

---

## 19. Monetization Optional

## 19.1 Free Plan

- Compress image.
- Convert to WebP.
- Resize image.
- Batch up to 50 files.
- ZIP export.
- Metadata cleaner basic.

## 19.2 Pro Plan

- Batch up to 500 files.
- Larger file limit.
- Advanced AVIF.
- HEIC batch.
- Saved presets.
- Processing history.
- API access.
- Cloud processing.

## 19.3 Team Plan

- Team workspace.
- Shared presets.
- Brand watermark.
- Admin dashboard.
- Usage reports.
- Priority support.

---

## 20. Roadmap

## Phase 1 — MVP

1. Landing page.
2. Compress image.
3. Convert to WebP.
4. Resize image.
5. Batch queue.
6. ZIP download.
7. Metadata cleaner basic.
8. SEO setup.
9. Vercel deploy.

## Phase 2 — SEO Expansion

1. Tool-specific pages.
2. Blog content hub.
3. Programmatic metadata.
4. OG image generator.
5. Internal linking system.
6. Google Search Console setup.

## Phase 3 — Advanced Tools

1. AVIF converter.
2. HEIC converter.
3. Crop image.
4. Watermark.
5. Image analyzer.
6. Rename pattern.
7. PWA offline.

## Phase 4 — SaaS

1. Login.
2. Saved presets.
3. Cloud history.
4. API keys.
5. Billing.
6. Pro processing.
7. Team workspace.

---

## 21. Acceptance Criteria

MVP dianggap selesai jika:

1. Website dapat diakses di Vercel production URL.
2. Custom domain dapat digunakan.
3. Homepage responsive.
4. Tool compress image berjalan client-side.
5. Tool convert WebP berjalan client-side.
6. Tool resize berjalan client-side.
7. Batch upload berjalan.
8. ZIP export berjalan.
9. Metadata cleaner basic berjalan.
10. Setiap halaman punya metadata.
11. Sitemap tersedia di `/sitemap.xml`.
12. Robots tersedia di `/robots.txt`.
13. OG image tampil saat dibagikan.
14. Privacy page tersedia.
15. Terms page tersedia.
16. Lighthouse SEO minimal 95.
17. Lighthouse Accessibility minimal 95.
18. Tidak ada emoji dalam UI utama.
19. Semua visual memakai icon.
20. Tidak ada gambar user yang dikirim ke server untuk fitur MVP.

---

## 22. References

1. Next.js Metadata and OG Images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
2. Next.js Sitemap File Convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
3. Next.js Robots File Convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
4. Tailwind CSS with Next.js: https://tailwindcss.com/docs/guides/nextjs
5. Vercel Next.js Hosting: https://vercel.com/docs/frameworks/full-stack/nextjs
6. Vercel Functions Limits: https://vercel.com/docs/functions/limitations
7. Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
8. Google Image SEO Best Practices: https://developers.google.com/search/docs/appearance/google-images
9. Google FAQ Structured Data: https://developers.google.com/search/docs/appearance/structured-data/faqpage
10. Squoosh: https://squoosh.app/
