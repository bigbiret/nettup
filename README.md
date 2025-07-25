# Prosjektoppsett: Astro + Tailwind + GitHub Pages

Dette er en mal-README for et statisk nettsted bygget med Astro, Tailwind CSS og deployet på GitHub Pages. Følg stegene under for å komme raskt i gang.

---

## 📦 Teknologistack

* **Rammeverk:** Astro (SSG + islands)
* **CSS:** Tailwind CSS (utility-first)
* **Bygg:** Node.js v18+
* **Deploy:** GitHub Pages via GitHub Actions
* **CI/Audit:** Lighthouse CI, axe-core
* **SEO:** @astrojs/sitemap, astro-robots-txt, JSON-LD schema
* **Bilder:** @astrojs/image (lazy loading)
* **Analytics:** Plausible (cookie-banner)
* **PWA-fallback:** workbox-build
* **i18n:** @astrojs/i18n (valgfritt)

---

## 🚀 Komme i gang

1. **Clone repo**

   ```bash
   git clone https://github.com/<org>/<repo>.git
   cd <repo>
   ```

2. **Installer avhengigheter**

   ```bash
   npm install
   ```

3. **Utvikling**

   ```bash
   npm run dev
   ```

   Starter Astro på [http://localhost:3000](http://localhost:3000)

4. **Bygg for produksjon**

   ```bash
   npm run build
   ```

5. **Preview produksjon**

   ```bash
   npm run preview
   ```

---

## 🔧 Scripts

| Kommando          | Beskrivelse                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Starter lokal dev-server                    |
| `npm run build`   | Prod-build (output i `dist/`)               |
| `npm run preview` | Preview av prod-build                       |
| `npm run lint`    | ESLint på alle `.js`, `.ts`, `.astro` filer |
| `npm run format`  | Prettier formaterer alle filer              |
| `npm run test`    | Kjører Vitest-enhetstester                  |
| `npm run check`   | Lint + format --check + test                |

---

## 🔨 Konfigurasjonsfiler

* **`tailwind.config.cjs`**: design tokens og content paths
* **`astro.config.mjs`**: sitemap, robots.txt, image plugin, workbox
* **`.github/workflows/ci.yml`**: Lighthouse CI & axe-core audits, deploy til Pages
* **`public/404.html`**: tilpasset 404-side
* **`public/CNAME`**: egendomenenavn (valgfritt)

---

## 🌐 Deploy til GitHub Pages

1. Sett opp `gh-pages`-branch i GitHub Settings ■ Pages ■ Publish branch: `gh-pages`.
2. Legg eventuelt til `CNAME` i `public/` for eget domene.
3. Pushe til `main` trigges GitHub Actions og publiserer til Pages.

---

## 🔒 Sikkerhet & ytelse

* **CSP & HSTS:** Konfigurer via Cloudflare Transform Rules
* **CDN:** Cloudflare Free Plan som edge-cache
* **Preload:** Fonts og kritiske ressurser i `<head>`
* **Font-subsetting:** subset-filer i `public/fonts` med `font-display: swap`
* **CSS-treeshaking:** Tailwind fjerner ubrukt CSS automatisert

---

## 🤝 Bidra

1. Fork repo
2. Lag feature-branch (`git checkout -b feature/foo`)
3. Commit endringer (`git commit -am 'Legger til foo'`)
4. Push til origin (`git push origin feature/foo`)
5. Åpne en Pull Request

---

## 📄 Lisens

&#x20;

Alle rettigheter forbehold
