# Kompresio

Kompresio is an all-in-one image optimization web app built with Next.js App Router, TypeScript, Tailwind CSS 4, and browser-first image processing. The product focuses on fast compression, conversion, resize, crop planning, metadata cleanup, image analysis, ZIP export, and image-to-PDF workflows.

The public product attribution belongs to `rifqysaputra.dev`.

## Project Status

This repository contains the MVP implementation for Kompresio:

- Production-ready Next.js App Router structure.
- Responsive marketing, tool, legal, company, pricing, and blog pages.
- Browser-first image processing for core workflows.
- SEO metadata, sitemap, robots.txt, manifest, Open Graph images, and JSON-LD.
- Focused tests for image rules and tool behavior.
- Vercel-ready configuration.

## Core Product Goals

- Help users reduce image file size quickly.
- Convert JPG, PNG, WebP, AVIF, and HEIC workflows into practical web-ready exports.
- Keep the main MVP privacy-first by processing files locally in the browser.
- Support students, creators, marketplace sellers, developers, and general users.
- Provide SEO-friendly public pages for each major image tool.
- Keep the UI responsive across mobile, tablet, and desktop.

## Main Features

- Compress images with quality presets.
- Convert images to WebP.
- Convert images to AVIF where supported by the browser.
- Convert HEIC and HEIF files through the HEIC workflow.
- Resize images with custom dimensions and practical presets.
- Crop workflow page for aspect-ratio based output planning.
- Remove common image metadata through clean re-export.
- Analyze image dimensions, format, size, metadata signals, and optimization suggestions.
- Batch process files and download results as a ZIP archive.
- Convert one or more images into a PDF with document-focused settings.
- Generate output filenames and manifests for repeatable workflows.
- Provide clear privacy messaging for local processing.

## Available Routes

### Product and Tool Pages

- `/`
- `/tools`
- `/compress-image`
- `/compress-jpg`
- `/compress-png`
- `/convert-to-webp`
- `/jpg-to-webp`
- `/png-to-webp`
- `/convert-to-avif`
- `/resize-image`
- `/crop-image`
- `/heic-to-jpg`
- `/metadata-cleaner`
- `/batch-converter`
- `/image-analyzer`
- `/image-to-pdf`

### Content and Company Pages

- `/blog`
- `/blog/[slug]`
- `/company`
- `/privacy`
- `/terms`
- `/pricing`

### Technical Routes

- `/api/health`
- `/api/optimize`
- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- `/opengraph-image`
- `/twitter-image`
- `/icon`
- `/icon.png`

## Tool Coverage

| Tool | Route | Main Output |
| --- | --- | --- |
| Compress Image | `/compress-image` | Smaller JPG, PNG, WebP, or AVIF output |
| Compress JPG | `/compress-jpg` | Optimized JPG or modern format output |
| Compress PNG | `/compress-png` | Optimized PNG or WebP output |
| Convert to WebP | `/convert-to-webp` | `.webp` files |
| JPG to WebP | `/jpg-to-webp` | `.webp` files from JPG input |
| PNG to WebP | `/png-to-webp` | `.webp` files from PNG input |
| Convert to AVIF | `/convert-to-avif` | `.avif` files where supported |
| Resize Image | `/resize-image` | Resized image output |
| Crop Image | `/crop-image` | Crop-ready workflow output |
| HEIC to JPG | `/heic-to-jpg` | JPG or WebP output from HEIC/HEIF input |
| Metadata Cleaner | `/metadata-cleaner` | Re-exported image with common metadata removed |
| Batch Converter | `/batch-converter` | Batch output and ZIP export |
| Image Analyzer | `/image-analyzer` | JSON-style analysis and recommendations |
| Image to PDF | `/image-to-pdf` | Downloadable PDF document |

## Processing Model

Kompresio is designed as a client-side first image toolkit.

- Core MVP image operations run in the user's browser.
- Files do not need to be uploaded to a server for the main optimization flow.
- Downloads are generated locally where possible.
- ZIP exports are assembled in the browser.
- Optional server-side processing exists through `sharp` for future advanced workflows.

This model reduces server cost, keeps the experience fast for light and medium work, and gives users a stronger privacy boundary.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Motion | Framer Motion |
| Upload | react-dropzone |
| Validation | Zod |
| Compression | browser-image-compression, CompressorJS, Canvas API |
| Metadata | ExifReader |
| HEIC | heic2any |
| PDF | jsPDF |
| ZIP | JSZip, FileSaver |
| Local DB ready | Dexie |
| Server-side optional | Sharp |
| Tests | Vitest, Testing Library, jsdom |
| Deployment target | Vercel |

## Folder Structure

```txt
kompresio/
|-- app/
|   |-- [toolSlug]/
|   |-- api/
|   |-- blog/
|   |-- company/
|   |-- pricing/
|   |-- privacy/
|   |-- terms/
|   |-- tools/
|   |-- layout.tsx
|   |-- page.tsx
|   |-- globals.css
|   |-- manifest.ts
|   |-- robots.ts
|   `-- sitemap.ts
|-- components/
|   |-- layout/
|   |-- marketing/
|   |-- seo/
|   |-- shared/
|   |-- tools/
|   `-- ui/
|-- docs/
|   |-- design.md
|   `-- prd.md
|-- lib/
|   |-- constants/
|   |-- image/
|   |-- seo/
|   `-- utils.ts
|-- public/
|   |-- favicon.svg
|   |-- icon.png
|   |-- logo.png
|-- types/
|-- package.json
|-- vitest.config.ts
`-- vercel.json
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open the local app:

```txt
http://localhost:3000
```

If port `3000` is already used, Next.js may run on another port such as `3001`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
pnpm test:watch
```

## Environment Variables

The app can run without custom environment variables for local MVP development.

Recommended production variable:

```env
NEXT_PUBLIC_SITE_URL=https://kompresio.center.biz.id
```

Optional future variables can be added for analytics, storage, authentication, billing, or cloud processing.

## SEO Implementation

Kompresio includes:

- Root metadata in `app/layout.tsx`.
- Dynamic metadata helpers in `lib/seo/metadata.ts`.
- Tool-specific metadata through `app/[toolSlug]/page.tsx`.
- Blog metadata through `app/blog/[slug]/page.tsx`.
- Sitemap generation in `app/sitemap.ts`.
- Robots rules in `app/robots.ts`.
- Manifest generation in `app/manifest.ts`.
- Open Graph image routes.
- Twitter image routes.
- Breadcrumb JSON-LD.
- Software application structured data for tools.

## Legal and Company Pages

The project includes complete public pages for:

- Company overview.
- Privacy policy.
- Terms of service.
- Pricing and roadmap.

These pages are part of the SEO and trust surface for the product.

## Privacy Notes

The MVP is designed around local browser processing:

- Core image files stay on the user's device.
- Image content is not required to leave the browser for the main tools.
- Metadata cleanup happens through local analysis and clean re-export.
- Analytics should not collect image content, sensitive filenames, or private metadata.
- Future cloud processing should be clearly labeled and opt-in.

## Testing and Verification

Current verification commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Test files:

- `lib/image/image-rules.test.ts`
- `lib/image/tool-behavior.test.ts`

The tests cover image presets, file rules, behavior mapping, and expected tool settings.

## Deployment

Recommended deployment target: Vercel.

Typical deployment flow:

```bash
pnpm install
pnpm build
```

Then import the GitHub repository into Vercel and keep the default Next.js build settings.

Recommended launch checks:

- Production build passes.
- TypeScript passes.
- Lint passes.
- Tests pass.
- `/sitemap.xml` works.
- `/robots.txt` works.
- `/manifest.webmanifest` works.
- `/favicon.svg` renders.
- Main tool routes work on mobile and desktop.
- Privacy, Terms, Company, Pricing, and Blog pages are reachable.

## GitHub Push

Repository target:

```txt
https://github.com/muris11/kompresio.git
```

Initial push flow:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/muris11/kompresio.git
git push -u origin main
```

## Product Ownership and Contribution

### Developer and Product Owner

- Rifqy Saputra
- `rifqysaputra.dev`

### AI-Assisted Implementation Disclosure

- Codex (ChatGPT) assisted with implementation, refinement, documentation, and verification.
- Product ownership and public developer attribution remain with Rifqy Saputra and `rifqysaputra.dev`.
- Public UI should credit `rifqysaputra.dev`; Codex attribution belongs in this README only.

## Open Source Credits

Kompresio is built on top of strong open-source projects:

- Next.js: https://github.com/vercel/next.js
- React: https://github.com/facebook/react
- Tailwind CSS: https://github.com/tailwindlabs/tailwindcss
- lucide-react: https://github.com/lucide-icons/lucide
- Framer Motion: https://github.com/motiondivision/motion
- Radix UI Slot: https://github.com/radix-ui/primitives
- class-variance-authority: https://github.com/joe-bell/cva
- clsx: https://github.com/lukeed/clsx
- tailwind-merge: https://github.com/dcastil/tailwind-merge
- react-dropzone: https://github.com/react-dropzone/react-dropzone
- browser-image-compression: https://github.com/Donaldcwl/browser-image-compression
- CompressorJS: https://github.com/fengyuanchen/compressorjs
- ExifReader: https://github.com/mattiasw/ExifReader
- heic2any: https://github.com/alexcorvi/heic2any
- jsPDF: https://github.com/parallax/jsPDF
- JSZip: https://github.com/Stuk/jszip
- FileSaver.js: https://github.com/eligrey/FileSaver.js
- react-easy-crop: https://github.com/ValeryBugakov/react-easy-crop
- Dexie: https://github.com/dexie/Dexie.js
- Sharp: https://github.com/lovell/sharp
- Zod: https://github.com/colinhacks/zod
- Vitest: https://github.com/vitest-dev/vitest
- Testing Library: https://github.com/testing-library/react-testing-library
- jsdom: https://github.com/jsdom/jsdom

## Documentation

Planning documents:

- `docs/prd.md`
- `docs/design.md`

These files describe the product vision, SEO strategy, design system, route architecture, privacy model, and launch requirements.

## Roadmap

Planned future improvements:

- Web Worker processing for heavier batch work.
- More advanced AVIF controls.
- Better visual crop editor controls.
- Saved presets.
- Local processing history.
- Optional cloud processing mode.
- API access for developers.
- Team workflow features.
- Vercel Analytics and Speed Insights integration.

## License

No open-source license has been selected yet. Add a `LICENSE` file before publishing reuse permissions.
