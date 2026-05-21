# Design Specification — Kompresio

**Project Name:** Kompresio  
**Document Type:** UI/UX Design System + Responsive Design + SEO Layout + Vercel Launch Design  
**Version:** 2.0 SEO + Vercel Hosting Edition  
**Primary Stack:** Next.js, Tailwind CSS 4, shadcn/ui, lucide-react, Framer Motion  

---

## 1. Design Direction

Kompresio harus terlihat seperti modern SaaS utility website, bukan sekadar halaman upload sederhana. Desain harus memberi kesan:

1. Cepat.
2. Aman.
3. Bersih.
4. Profesional.
5. Teknologi modern.
6. Mudah digunakan.
7. Cocok untuk developer dan pengguna umum.

Visual utama:

- Clean SaaS dashboard.
- Soft gradient.
- Rounded cards.
- Icon-based, tanpa emoji.
- Responsive mobile-first.
- Dark mode ready.
- Focus pada upload, preview, dan result.

---

## 2. Brand Identity

## 2.1 Brand Name

**Kompresio**

## 2.2 Brand Meaning

Kompresio berasal dari kata “kompresi” dan akhiran “io”. Nama ini menggabungkan kesan lokal Indonesia dengan nuansa teknologi global.

## 2.3 Brand Personality

| Trait | Description |
|---|---|
| Fast | Proses gambar cepat dan ringan |
| Private | File diproses lokal untuk fitur utama |
| Clean | UI rapi dan tidak ramai |
| Helpful | Memberi rekomendasi setting |
| Technical | Cocok untuk developer |
| Friendly | Tetap mudah untuk pengguna awam |

## 2.4 Tone of Voice

Gunakan bahasa UI yang:

1. Singkat.
2. Jelas.
3. Tidak lebay.
4. Profesional.
5. Tidak memakai emoji.
6. Memberi rasa aman.

Contoh copy:

- “Drop your images here”
- “Compress image”
- “Convert to WebP”
- “Your images stay on your device”
- “Saved 74%”
- “Download optimized image”
- “Batch processing ready”

---

## 3. Design Principles

## 3.1 Clarity First

User harus langsung paham:

1. Tool ini untuk apa.
2. File apa yang bisa diupload.
3. Setting apa yang perlu dipilih.
4. Output apa yang akan didapat.
5. Cara download hasilnya.

## 3.2 One Main Action

Setiap halaman tool hanya punya satu aksi utama:

- Compress image.
- Convert to WebP.
- Resize image.
- Clean metadata.
- Download ZIP.

Aksi utama harus selalu terlihat jelas.

## 3.3 Privacy Confidence

Karena user mengupload gambar, UI harus menenangkan user.

Elemen wajib:

1. Privacy badge.
2. Local processing label.
3. Privacy section.
4. Clear file button.
5. No-upload explanation.

## 3.4 Strong Visual Feedback

Setiap proses harus punya feedback:

1. Progress bar.
2. File status.
3. Success state.
4. Error state.
5. Saved percentage.
6. Before/after preview.

## 3.5 Mobile-First

Mobile layout tidak boleh hanya versi kecil dari desktop. Di mobile:

1. Upload area tetap besar.
2. Settings masuk bottom sheet.
3. Preview tampil ringkas.
4. Download button bisa sticky.
5. File queue menjadi accordion/card.

---

## 4. Color System

## 4.1 Primary Palette

```css
--brand-50: #eff6ff;
--brand-100: #dbeafe;
--brand-200: #bfdbfe;
--brand-300: #93c5fd;
--brand-400: #60a5fa;
--brand-500: #3b82f6;
--brand-600: #2563eb;
--brand-700: #1d4ed8;
--brand-800: #1e40af;
--brand-900: #1e3a8a;
```

## 4.2 Accent Palette

```css
--cyan-400: #22d3ee;
--cyan-500: #06b6d4;
--emerald-500: #10b981;
--violet-500: #8b5cf6;
```

## 4.3 Light Theme Tokens

```css
--background: #ffffff;
--foreground: #0f172a;
--muted: #f8fafc;
--muted-foreground: #64748b;
--card: #ffffff;
--card-foreground: #0f172a;
--border: #e2e8f0;
--input: #e2e8f0;
--primary: #2563eb;
--primary-foreground: #ffffff;
--secondary: #f1f5f9;
--secondary-foreground: #0f172a;
--accent: #06b6d4;
--accent-foreground: #ffffff;
--success: #16a34a;
--warning: #f59e0b;
--destructive: #ef4444;
--ring: #2563eb;
```

## 4.4 Dark Theme Tokens

```css
--background: #020617;
--foreground: #f8fafc;
--muted: #0f172a;
--muted-foreground: #94a3b8;
--card: #0f172a;
--card-foreground: #f8fafc;
--border: #1e293b;
--input: #1e293b;
--primary: #3b82f6;
--primary-foreground: #ffffff;
--secondary: #1e293b;
--secondary-foreground: #f8fafc;
--accent: #22d3ee;
--accent-foreground: #020617;
--success: #22c55e;
--warning: #fbbf24;
--destructive: #f87171;
--ring: #3b82f6;
```

## 4.5 Gradients

Primary gradient:

```css
background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
```

Hero background:

```css
background:
  radial-gradient(circle at top left, rgba(37, 99, 235, 0.22), transparent 34%),
  radial-gradient(circle at top right, rgba(6, 182, 212, 0.18), transparent 30%),
  linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
```

Dark hero background:

```css
background:
  radial-gradient(circle at top left, rgba(37, 99, 235, 0.28), transparent 35%),
  radial-gradient(circle at top right, rgba(6, 182, 212, 0.2), transparent 30%),
  #020617;
```

---

## 5. Typography

## 5.1 Font Recommendation

Primary:

- Inter
- Geist Sans
- Plus Jakarta Sans

Mono:

- Geist Mono
- JetBrains Mono

## 5.2 Typography Scale

Desktop:

```txt
Display: 64px / 72px / 800
H1: 48px / 56px / 800
H2: 36px / 44px / 750
H3: 28px / 36px / 700
H4: 22px / 30px / 700
Body Large: 18px / 30px / 400
Body: 16px / 26px / 400
Small: 14px / 22px / 400
Caption: 12px / 18px / 500
```

Mobile:

```txt
H1: 36px / 44px / 800
H2: 30px / 38px / 750
H3: 24px / 32px / 700
Body: 16px / 26px / 400
Small: 14px / 22px / 400
```

## 5.3 Text Rules

1. Heading harus pendek dan kuat.
2. Paragraph maksimal 2–3 baris pada section marketing.
3. Tool helper text harus jelas dan praktis.
4. Technical values seperti `2.4 MB`, `312 KB`, `WebP`, `74%` boleh pakai font mono.

---

## 6. Layout System

## 6.1 Container

```txt
max-width: 1280px / max-w-7xl
mobile padding: 16px
small tablet padding: 24px
desktop padding: 32px
```

## 6.2 Section Spacing

```txt
Desktop section: py-24
Tablet section: py-20
Mobile section: py-14
```

## 6.3 Grid

Marketing grid:

```txt
Mobile: 1 column
Tablet: 2 columns
Desktop: 3 or 4 columns
```

Tool layout desktop:

```txt
Left: File queue 280px
Center: Preview flexible
Right: Settings 360px
```

Tool layout mobile:

```txt
Header
Upload
Preview
Primary action
Settings bottom sheet
Queue accordion
Result cards
```

---

## 7. Radius and Shadow

## 7.1 Radius

```txt
Small button: rounded-lg
Default button: rounded-xl
Card: rounded-2xl
Panel: rounded-3xl
Modal: rounded-3xl
Badge: rounded-full
Image preview: rounded-2xl
```

## 7.2 Shadow

Light:

```css
--shadow-card: 0 12px 40px rgba(15, 23, 42, 0.08);
--shadow-soft: 0 8px 24px rgba(15, 23, 42, 0.06);
--shadow-floating: 0 20px 60px rgba(15, 23, 42, 0.14);
```

Dark:

```css
--shadow-card: 0 12px 40px rgba(0, 0, 0, 0.35);
--shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.28);
--shadow-floating: 0 20px 60px rgba(0, 0, 0, 0.5);
```

---

## 8. Icon System

Gunakan **lucide-react**.

## 8.1 Main Icons

| Use Case | Icon |
|---|---|
| Logo mark | Layers / Image |
| Upload | UploadCloud |
| Download | Download |
| ZIP | FileArchive |
| Privacy | ShieldCheck / Lock |
| Compress | Gauge |
| Convert | RefreshCcw |
| Resize | Maximize2 |
| Crop | Crop |
| Settings | Settings2 / SlidersHorizontal |
| Success | CheckCircle2 |
| Warning | AlertTriangle |
| Error | XCircle |
| Info | Info |
| Blog | FileText |
| SEO | Search |
| Developer | Code2 |
| Hosting | Globe |
| Performance | Zap |
| Dark mode | Moon |
| Light mode | Sun |

## 8.2 Icon Rules

1. Tidak memakai emoji.
2. Icon size normal 20px.
3. Feature card icon 24px.
4. Hero floating card icon 18px.
5. Status icon 16px.
6. Icon harus punya label aksesibilitas jika button icon-only.

---

## 9. Component System

## 9.1 Navbar

Desktop layout:

```txt
Logo | Tools | Compress | Convert | Resize | Blog | Pricing | Theme Toggle | CTA
```

Mobile layout:

```txt
Logo | Menu Button
```

Mobile drawer:

- Tools
- Compress Image
- Convert to WebP
- Resize Image
- Blog
- Privacy
- CTA Start Optimizing

Style:

- Height 72px.
- Sticky top.
- Backdrop blur.
- Border bottom.
- Active nav indicator.

## 9.2 Logo

Logo concept:

- Rounded square with layered image icon.
- Gradient blue to cyan.
- Wordmark “Kompresio”.

Logo layout:

```txt
[Icon] Kompresio
```

## 9.3 Hero Section

Desktop:

```txt
Left: Copy + CTA + trust badges
Right: Upload preview panel
```

Mobile:

```txt
Copy
CTA
Upload panel
Trust badges
```

Copy:

```txt
H1: Compress and convert images in seconds
Subtitle: Optimize JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Fast, private, and ready for websites, documents, marketplaces, and social media.
CTA Primary: Start optimizing
CTA Secondary: Explore tools
```

Trust badges:

- Browser-based
- Batch ready
- WebP and AVIF
- No sign-up required

## 9.4 Upload Dropzone

States:

1. Idle.
2. Drag active.
3. Files selected.
4. Processing.
5. Error.

Idle content:

```txt
Icon: UploadCloud
Title: Drop images here or browse
Description: Supports JPG, PNG, WebP, AVIF, HEIC, GIF, and SVG.
Hint: Your images stay on your device for basic tools.
```

Drag active:

- Border primary.
- Background primary/5.
- Text: “Release to add images”.

Error:

- Border destructive.
- Alert icon.
- Message with reason.

## 9.5 Tool Shell

Tool shell is reusable layout for all tools.

Desktop:

```txt
-------------------------------------------------
Tool Header
-------------------------------------------------
File Queue | Preview Area | Settings Panel
-------------------------------------------------
Result Summary / SEO Content
-------------------------------------------------
```

Mobile:

```txt
Tool Header
Upload Dropzone
Preview Card
Primary Action Sticky
Settings Sheet
File Queue Accordion
Result Cards
SEO Content
FAQ
```

## 9.6 Settings Panel

Sections:

1. Preset.
2. Output format.
3. Quality.
4. Resize.
5. Metadata.
6. Rename.
7. Advanced.

Controls:

- Select.
- Slider.
- Switch.
- Input.
- Button group.
- Collapsible advanced section.

Desktop style:

- Sticky right panel.
- Max height viewport.
- Scroll inside.

Mobile style:

- Bottom sheet.
- Sticky apply button.

## 9.7 File Queue

Display:

- Thumbnail.
- Filename.
- File size.
- Format.
- Status.
- Progress.
- Remove action.

Status badges:

| Status | Color |
|---|---|
| Waiting | muted |
| Processing | primary |
| Completed | success |
| Failed | destructive |
| Skipped | warning |

## 9.8 Preview Area

Features:

1. Original preview.
2. Optimized preview.
3. Before/after slider.
4. Zoom.
5. Fit to container.
6. Checkerboard for transparency.
7. File details.

Empty state:

```txt
Title: Upload an image to preview results
Description: Compare original and optimized images side by side.
```

## 9.9 Result Summary

Cards:

1. Original size.
2. New size.
3. Saved percentage.
4. Output format.
5. Dimensions.
6. Processing time.

Saved percentage card should be visually strongest.

## 9.10 Batch Table

Desktop columns:

| File | Original | Output | Saved | Format | Status | Action |
|---|---:|---:|---:|---|---|---|

Mobile:

- Convert rows into stacked cards.
- Download action in each card.

---

## 10. Page Blueprints

## 10.1 Homepage

Sections:

1. Navbar.
2. Hero with upload panel.
3. Popular tools.
4. Before/after compression demo.
5. How it works.
6. Supported formats.
7. Why Kompresio.
8. Use cases.
9. SEO content block.
10. Developer section.
11. Vercel/privacy friendly section.
12. FAQ.
13. CTA.
14. Footer.

## Homepage Wireframe

```txt
[Navbar]

[Hero]
Compress and convert images in seconds
Subtitle
[Start optimizing] [Explore tools]
[Upload Panel]

[Popular Tools Grid]
Compress Image | Convert WebP | Resize Image | Metadata Cleaner

[Before After Demo]
Original 2.4 MB → WebP 312 KB | Saved 87%

[How It Works]
Upload → Choose settings → Preview → Download

[Supported Formats]
JPG PNG WebP AVIF HEIC GIF SVG

[Use Cases]
Websites | Marketplace | Social Media | Documents | Developers | Students

[SEO Content]
Short educational content about image optimization

[FAQ]

[Footer]
```

## 10.2 Compress Image Page

Above the fold:

- H1: Compress Image Online
- Subtitle.
- Upload dropzone.
- Privacy badge.

Tool layout:

- File queue.
- Preview.
- Settings.
- Result.

SEO content below tool:

1. How to compress images.
2. Why image compression matters.
3. Supported formats.
4. Related tools.
5. FAQ.

## 10.3 Convert to WebP Page

Above the fold:

- H1: Convert Images to WebP
- Subtitle.
- Upload dropzone.

Specific content:

1. What is WebP?
2. When to use WebP.
3. JPG to WebP.
4. PNG to WebP.
5. Related tools.

## 10.4 Resize Image Page

Main components:

1. Upload.
2. Resize preset grid.
3. Custom width/height.
4. Aspect ratio lock.
5. Preview.
6. Download.

Preset cards:

- Instagram Square.
- Instagram Story.
- YouTube Thumbnail.
- Website Hero.
- Blog Cover.
- Marketplace Product.
- Profile Picture.
- Document Upload.

## 10.5 Metadata Cleaner Page

Main components:

1. Upload.
2. Metadata scan result.
3. Privacy explanation.
4. Clean metadata button.
5. Download cleaned image.

Visual tone:

- More security-focused.
- Use ShieldCheck and Lock icons.

## 10.6 Blog Page

Layout:

```txt
Blog Hero
Search Articles
Category Tabs
Featured Article
Article Grid
Newsletter optional
Footer
```

Categories:

- Compression.
- WebP.
- AVIF.
- Resize.
- SEO.
- Privacy.
- Developer.

## 10.7 Blog Detail Page

Structure:

1. Breadcrumb.
2. Title.
3. Description.
4. Author/date.
5. Table of contents.
6. Content.
7. Related tools CTA.
8. Related articles.
9. FAQ if relevant.

---

## 11. SEO UX Design

SEO must be visible in page structure without making UI feel spammy.

## 11.1 Tool Page SEO Layout

Each tool page should have:

```txt
Tool UI first
Short benefit copy
How-to section
Use cases section
Supported formats section
Related tools
FAQ
```

Reason:

- User gets tool immediately.
- Search engine still gets helpful content.
- Content does not block user from using tool.

## 11.2 SEO Content Style

Avoid keyword stuffing.

Good:

```txt
Use Kompresio to compress JPG, PNG, and WebP images directly in your browser. This helps reduce file size before uploading to websites, documents, or marketplaces.
```

Bad:

```txt
Compress image online free image compressor compress JPG compress PNG image compressor online free.
```

## 11.3 FAQ Design

Use accordion.

FAQ examples:

1. Are my images uploaded to a server?
2. What image formats are supported?
3. Does compression reduce quality?
4. Can I convert multiple images to WebP?
5. What is the best format for websites?
6. Can I use Kompresio on mobile?

## 11.4 Breadcrumb Design

Desktop:

```txt
Home / Tools / Compress Image
```

Mobile:

```txt
Tools / Compress Image
```

Breadcrumb should be small but readable.

## 11.5 Related Tools Design

Cards at bottom of tool page:

- Small icon.
- Tool name.
- One-line description.
- Arrow indicator.

Example:

```txt
Convert to WebP
Create lightweight WebP images for faster websites.
```

---

## 12. Vercel Hosting UX and Launch Design

## 12.1 Production URL Strategy

During development:

```txt
https://kompresio.vercel.app
```

Production target:

```txt
https://kompresio.app
```

Fallback:

```txt
https://kompresio.id
https://kompresio.tools
```

## 12.2 Preview Deployment UX

Every GitHub pull request should generate preview deployment.

Use preview deployments for:

1. UI review.
2. Mobile testing.
3. SEO metadata check.
4. Tool processing test.
5. Before/after validation.

## 12.3 Production Launch Checklist UI

Create internal route optional:

```txt
/internal/launch-checklist
```

Only for development or admin.

Checklist:

- Metadata ready.
- Sitemap ready.
- Robots ready.
- OG image ready.
- Privacy page ready.
- Terms page ready.
- Core tools tested.
- Mobile tested.
- Vercel env ready.
- Custom domain ready.

## 12.4 Error Page Design

404:

```txt
Title: Page not found
Description: The page you are looking for does not exist or has moved.
CTA: Explore tools
Secondary CTA: Go home
```

500:

```txt
Title: Something went wrong
Description: Please refresh the page or try again.
CTA: Retry
```

---

## 13. Responsive Design Rules

## 13.1 Mobile 320–639px

Rules:

1. Single column only.
2. Upload dropzone full width.
3. Tool settings in bottom sheet.
4. Result as cards.
5. CTA sticky at bottom after file selected.
6. Typography compact.
7. Avoid table overflow.
8. Navbar collapsed.

## 13.2 Tablet 640–1023px

Rules:

1. Two-column cards.
2. Tool layout stacked.
3. Settings below preview.
4. Queue can be horizontal scroll or card list.

## 13.3 Desktop 1024–1279px

Rules:

1. Three-column tool layout.
2. Sticky settings.
3. Full before/after preview.
4. Table view enabled.

## 13.4 Large Desktop 1280px+

Rules:

1. max-w-7xl container.
2. Spacious hero.
3. Larger preview.
4. Better dashboard density.

---

## 14. Animation Specification

Use Framer Motion.

## 14.1 Motion Timing

```txt
Fast: 150ms
Normal: 250ms
Slow: 450ms
```

## 14.2 Easing

- easeOut for fade/slide.
- spring for cards.
- linear for progress.

## 14.3 Animation Rules

Navbar:

- Fade in.
- Background blur on scroll.

Hero:

- Text fade up.
- Upload panel scale in.
- Floating stat cards slow movement.

Cards:

- Hover translateY -4px.
- Shadow increase.
- Border primary transition.

Upload:

- Drag active border animation.
- File row slide in.

Processing:

- Smooth progress bar.
- Button loading spinner.
- Success card fade in.

Modal/sheet:

- Overlay fade.
- Sheet slide up.
- Modal scale 0.96 to 1.

## 14.4 Reduced Motion

Respect `prefers-reduced-motion`.

If enabled:

- Disable floating animation.
- Disable large transitions.
- Keep essential state changes instant.

---

## 15. Accessibility Design

Required:

1. Keyboard-accessible upload.
2. Visible focus ring.
3. Icon-only buttons must have aria-label.
4. Progress bar must have accessible text.
5. Error messages must be text-based.
6. Modal must trap focus.
7. Escape closes modal.
8. Color contrast must pass WCAG AA.
9. Use semantic HTML.
10. Do not rely only on color.

Example:

```tsx
<button aria-label="Remove file">
  <X className="size-4" />
</button>
```

---

## 16. Empty States

## 16.1 Upload Empty

Icon:

- Image

Title:

```txt
No image selected
```

Description:

```txt
Upload JPG, PNG, WebP, AVIF, HEIC, GIF, or SVG images to start optimizing.
```

CTA:

```txt
Browse images
```

## 16.2 Result Empty

Icon:

- Gauge

Title:

```txt
Ready to optimize
```

Description:

```txt
Choose your settings and start processing to see the optimized result.
```

## 16.3 Failed Processing

Icon:

- AlertCircle

Title:

```txt
Processing failed
```

Description:

```txt
We could not process this image. Try another format or reduce the file size.
```

CTA:

```txt
Retry
```

---

## 17. Loading States

Use:

1. Skeleton for page sections.
2. Progress bar for file processing.
3. Spinner for button actions.
4. Shimmer for preview loading.
5. Status badge for queue.
6. Disable action during processing.

Avoid:

1. Fullscreen loading for small actions.
2. Blocking entire page during single file processing.
3. Infinite spinner without explanation.

---

## 18. Toast System

Toast types:

1. Success.
2. Error.
3. Warning.
4. Info.

Examples:

```txt
Image compressed successfully.
3 files failed to process.
ZIP download is ready.
Unsupported file format.
Metadata removed successfully.
```

Rules:

1. Toast should not be the only error message.
2. Important errors must also appear inline.
3. Toast should be short.

---

## 19. Tool-Specific UI Details

## 19.1 Compress Image UI

Settings:

- Preset selector.
- Quality slider.
- Output format.
- Resize toggle.
- Strip metadata switch.
- Target size input.

Result:

- Original size.
- New size.
- Saved percentage.
- Download button.

## 19.2 Convert to WebP UI

Settings:

- Quality.
- Lossless.
- Resize optional.
- Remove metadata.
- Rename pattern.

Result:

- Output `.webp`.
- Compatibility note.
- Batch ZIP.

## 19.3 Resize UI

Settings:

- Width.
- Height.
- Percentage.
- Aspect ratio lock.
- Preset cards.
- Fit mode.

## 19.4 Metadata Cleaner UI

Settings:

- Show metadata summary.
- Remove GPS.
- Remove camera info.
- Remove all metadata.

Privacy card:

```txt
Your photo metadata can include camera model, date, software, and location data. Kompresio helps remove hidden information before sharing images online.
```

---

## 20. Design Tokens for Tailwind CSS 4

`app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", sans-serif;
  --font-mono: "Geist Mono", monospace;

  --radius-card: 1.25rem;
  --radius-panel: 1.5rem;
  --radius-modal: 1.75rem;

  --shadow-card: 0 12px 40px rgba(15, 23, 42, 0.08);
  --shadow-soft: 0 8px 24px rgba(15, 23, 42, 0.06);
}
```

Recommended utility patterns:

```txt
Card: rounded-2xl border bg-card shadow-sm
Panel: rounded-3xl border bg-card/80 backdrop-blur
Button: rounded-xl font-medium transition
Badge: rounded-full border px-3 py-1 text-xs
```

---

## 21. shadcn/ui Components

Install components:

```bash
pnpm dlx shadcn@latest add button card badge slider tabs dialog dropdown-menu progress table input label select sheet separator toast textarea accordion tooltip popover command
```

Use components for:

- Button.
- Card.
- Badge.
- Slider.
- Dialog.
- Sheet.
- Table.
- Input.
- Select.
- Tabs.
- Accordion FAQ.
- Tooltip.
- Command menu.

---

## 22. Footer Design

Footer columns:

1. Product
   - Tools
   - Compress Image
   - Convert to WebP
   - Resize Image
   - Batch Converter
2. Resources
   - Blog
   - Image SEO Guide
   - WebP Guide
   - AVIF Guide
3. Company
   - Privacy
   - Terms
   - Contact
4. Developer
   - API optional
   - GitHub optional
   - Status optional

Footer bottom:

```txt
© 2026 Kompresio. Fast and private image optimization.
```

No emoji.

---

## 23. SEO Page Design Checklist

Each public page must have:

1. One H1.
2. SEO title.
3. Meta description.
4. Canonical URL.
5. Open Graph image.
6. Twitter image.
7. Breadcrumb.
8. Internal links.
9. FAQ section if useful.
10. Related tools.
11. Mobile-friendly layout.
12. Fast loading content.
13. Descriptive image alt text.
14. Structured data if eligible.

---

## 24. Vercel Deployment Design Checklist

Before launch:

1. Production domain connected.
2. HTTPS active.
3. Environment variables set.
4. Sitemap works.
5. Robots works.
6. OG image works.
7. No preview domain in canonical URL.
8. Analytics enabled.
9. Speed Insights enabled.
10. Build passes.
11. Mobile tested.
12. Large image tested.
13. ZIP export tested.
14. Error pages tested.
15. Privacy page complete.

---

## 25. Launch Landing Page Copy

## Hero

```txt
Compress and convert images in seconds
```

```txt
Optimize JPG, PNG, WebP, AVIF, and HEIC images directly in your browser. Kompresio is fast, private, and built for websites, documents, marketplaces, and social media.
```

CTA:

```txt
Start optimizing
Explore all tools
```

## Privacy Section

```txt
Your images stay on your device
```

```txt
Kompresio processes core image optimization tasks directly in your browser, so your files do not need to be uploaded to a server for basic tools.
```

## Developer Section

```txt
Built for modern web workflows
```

```txt
Convert images to WebP, resize assets, clean metadata, export batches, and prepare images for fast-loading Next.js websites.
```

---

## 26. Final Design Acceptance Criteria

Design is approved if:

1. UI looks professional and modern.
2. No emoji in interface.
3. Icons use lucide-react.
4. Layout is responsive.
5. Upload area is easy to use.
6. Tool settings are clear.
7. Before/after preview is understandable.
8. Result metrics are visible.
9. SEO content does not disturb tool usage.
10. Mobile layout is clean.
11. Dark mode works.
12. Empty states are polished.
13. Error states are helpful.
14. Vercel deployment pages are production-ready.
15. Footer and legal pages are complete.

---

## 27. References

1. Next.js Metadata and OG Images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
2. Next.js Sitemap File Convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
3. Next.js Robots File Convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
4. Tailwind CSS with Next.js: https://tailwindcss.com/docs/guides/nextjs
5. Vercel Next.js Hosting: https://vercel.com/docs/frameworks/full-stack/nextjs
6. Vercel Functions Limits: https://vercel.com/docs/functions/limitations
7. Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
8. Google Image SEO Best Practices: https://developers.google.com/search/docs/appearance/google-images
9. Squoosh: https://squoosh.app/
