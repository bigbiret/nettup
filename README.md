# Prosjektoppsett: Astro + Tailwind + GitHub Pages

Dette er en mal-README for et statisk nettsted bygget med Astro, Tailwind CSS og deployet på GitHub Pages. Følg stegene under for å komme raskt i gang.

---

## 📦 Teknologistack

* **Rammeverk:** Astro 5.x (SSG + islands)
* **CSS:** Tailwind CSS (utility-first)
* **Bygg:** Node.js v18+
* **Deploy:** GitHub Pages via GitHub Actions
* **CI/Audit:** Lighthouse CI, axe-core
* **Testing:** Vitest (enhetstester) + Playwright (E2E smoke-tester)
* **Sikkerhet:** Dependabot, npm audit, automatiske sikkerhetsskanning
* **SEO:** @astrojs/sitemap, astro-robots-txt, JSON-LD schema, LocalBusiness SEO
* **Bilder:** Astro innebygd bildeoptimalisering
* **Kontaktskjema:** Formspree (gratis, spam-beskyttelse)
* **Innhold:** Markdown-filer og Astro Content Collections
* **Analytics:** Google Analytics (IP-anonymisering og enkel cookie-banner)
* **PWA-fallback:** workbox-build
* **i18n:** Astro innebygd internasjonalisering

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

3. **Installer Playwright (for E2E-testing)**

   ```bash
   npx playwright install
   ```

4. **Utvikling**

   ```bash
   npm run dev
   ```

   Starter Astro på [http://localhost:3000](http://localhost:3000)

5. **Bygg for produksjon**

   ```bash
   npm run build
   ```

6. **Preview produksjon**

   ```bash
   npm run preview
   ```

7. **Kjør tester**

   ```bash
   npm run test        # Enhetstester
   npm run test:e2e    # E2E smoke-tester
   ```

---

## 🔧 Scripts

| Kommando              | Beskrivelse                                    |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Starter lokal dev-server                       |
| `npm run build`       | Prod-build (output i `dist/`)                  |
| `npm run preview`     | Preview av prod-build                          |
| `npm run lint`        | ESLint på alle `.js`, `.ts`, `.astro` filer    |
| `npm run format`      | Prettier formaterer alle filer                 |
| `npm run test`        | Kjører Vitest-enhetstester                     |
| `npm run test:e2e`    | Kjører Playwright E2E smoke-tester             |
| `npm run test:e2e:ui` | Kjører E2E-tester med visuell UI               |
| `npm run audit`       | Kjører npm audit for sikkerhetssårbarheter     |
| `npm run check`       | Lint + format --check + test + audit          |

---

## 🔨 Konfigurasjonsfiler

* **`tailwind.config.cjs`**: design tokens og content paths
* **`astro.config.mjs`**: sitemap, robots.txt, image plugin, workbox
* **`playwright.config.js`**: E2E test-konfigurasjon
* **`.github/workflows/ci.yml`**: Lighthouse CI, axe-core audits, E2E-tester, deploy til Pages
* **`.github/dependabot.yml`**: automatiske sikkerhetsopdateringer
* **`tests/e2e/`**: E2E smoke-tester for kritiske brukerflyter
* **`src/content/`**: Markdown-filer og innholdstyper
* **`public/404.html`**: tilpasset 404-side
* **`public/CNAME`**: egendomenenavn (valgfritt)

---

## 🌐 Deploy til GitHub Pages

1. **Sett opp GitHub Pages**: I repo Settings → Pages → Source: "GitHub Actions"
2. **Aktiver sikkerhetsfunksjoner**: I repo Settings → Security & analysis:
   - Aktiver "Dependency graph"
   - Aktiver "Dependabot alerts"
   - Aktiver "Dependabot security updates"
3. **Eget domene (valgfritt)**: Legg til `CNAME` i `public/` for eget domene
4. **Deploy**: Push til `main` trigges GitHub Actions som:
   - Kjører linting og formatering
   - Kjører enhetstester og E2E smoke-tester
   - Kjører sikkerhetsskanning (`npm audit`)
   - Kjører Lighthouse CI og accessibility audits
   - Bygger og publiserer til GitHub Pages

---

## 🔒 Sikkerhet & personvern

* **Dependabot**: Automatiske sikkerhetsopdateringer for npm-pakker
* **Sikkerhetsskanning**: `npm audit` kjøres i CI for å fange sårbarheter
* **CSP & HSTS:** Konfigurer via Cloudflare Transform Rules
* **CDN:** Cloudflare Free Plan som edge-cache
* **Preload:** Fonts og kritiske ressurser i `<head>`
* **Font-subsetting:** subset-filer i `public/fonts` med `font-display: swap`
* **CSS-treeshaking:** Tailwind fjerner ubrukt CSS automatisert
* **Personvern:** IP-anonymisering for Google Analytics og enkel cookie-banner for GDPR-kompatibel sporing

---

## 🧪 Testing

* **Enhetstester**: Vitest for komponent- og funksjonstesting
* **E2E Smoke-tester**: Playwright for å sikre at kritiske sider og navigasjon fungerer
* **Accessibility**: axe-core i CI for WCAG 2.1 AA-kompatibilitet
* **Performance**: Lighthouse CI med krav om score ≥ 90
* **Sikkerhet**: npm audit for å fange kjente sårbarheter

E2E-testene kjøres mot `npm run preview` for å sikre at byggeprosessen ikke har introdusert feil.

---

## 📝 Innholdsadministrasjon & Kontakt

* **Kontaktskjema**: Formspree gir gratis kontaktskjemaer uten backend-kode
  - Spam-beskyttelse innebygd
  - E-post notifikasjoner på henvendelser
  - Enkel HTML-form som fungerer med statiske sider

* **Innholdsadministrasjon**: Enkelt filbasert system
  - Markdown-filer i `src/content/` mappen
  - Astro Content Collections for type-sikkerhet
  - Git-basert versjonskontroll
  - Direkte redigering i kode-editor eller GitHub web interface

---

## 🤝 Bidra

1. Fork repo
2. Lag feature-branch (`git checkout -b feature/foo`)
3. Kjør tester lokalt (`npm run check`)
4. Commit endringer (`git commit -am 'Legger til foo'`)
5. Push til origin (`git push origin feature/foo`)
6. Åpne en Pull Request

Dependabot vil automatisk lage PR-er for sikkerhetsopdateringer som kan merges etter gjennomgang.

---

## 📄 Lisens

Alle rettigheter forbehold
