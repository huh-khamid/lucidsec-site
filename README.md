# LucidSec

Personal security portfolio — *See beyond the surface.*
Penetration testing & research by Hamidulla Habibullayev.

Built with [Astro](https://astro.build) — static, fast, no framework. Single scrolling page for now; structured so pages (Projects, Write-ups) can be split out later.

## Stack
- Astro + TypeScript, plain CSS
- Monochrome editorial design, system-driven light/dark
- No client-side framework

## Develop
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # preview the build
```

## Deploy (Cloudflare Pages)
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build command: `npm run build` · Output directory: `dist` · Framework preset: Astro.
4. After the first deploy, add the custom domain `lucidsec.uz` (Pages → Custom domains) and point DNS as Cloudflare instructs. HTTPS is automatic.

## Editing content
All page content lives as plain data arrays at the top of `src/pages/index.astro`:
- `focus` — focus areas
- `cases` — case studies (keep these sanitized: no client names, IPs, raw PoCs)
- `writeups` — field-note list
- `certs` — certifications (`verify` is the public verification URL, or `null`)

Design tokens (colors, fonts, spacing) are at the top of `src/styles/global.css`.
The eye mark lives as inline SVG paths in `index.astro` and as `public/favicon.svg`.

## Notes
- Case studies are published sanitized under client confidentiality.
- Never commit secrets — `.env*` is gitignored.
