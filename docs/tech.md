# Teknisk oversikt

Dette dokumentet fungerer som en mal for oppsett av en moderne, rask og responsiv statisk nettside med Astro, Tailwind CSS og GitHub Pages.

## 1. Hovedteknologier og prosjektstruktur

**Astro 5.x**

* Statisk sidegenerering (SSG) for innholdsdrevne sider.
* "Islands"-arkitektur for selektiv interaktivitet.
* Innebygd bildeoptimalisering og i18n.
* Content Collections for type-sikret innholdsadministrasjon.

**Tailwind CSS**

* Utility-first CSS med design tokens definert i `tailwind.config.cjs`.

**Prosjektstruktur**

```
src/
├── pages/         (filbasert routing)
├── components/    (gjenbrukbare UI-komponenter)
├── layouts/       (felles <head> og sideoppsett)
├── styles/        (Tailwind-konfigurasjon)
├── content/       (markdown-filer og innholdstyper)
└── public/        (statisk innhold: fonter, bilder)
tests/
└── e2e/           (E2E smoke-tester)
```

Bygg: `npm run build` (Node.js v18+).
Deploy: GitHub Actions → GitHub Pages.
Mål: Lighthouse ≥ 90 (ytelse, tilgjengelighet, SEO) og WCAG 2.1 AA.

## 2. Essensielle tillegg

1. **HTTPS**

   * Bruk GitHub Pages sin innebygde HTTPS (gratis, automatisk).

2. **Sitemap & robots.txt**

   * Installer `@astrojs/sitemap` og generer `sitemap.xml` i `astro.config.mjs`.
   * Legg til `robots.txt` manuelt i `public/` som peker til `sitemap.xml`.

3. **Dynamiske SEO-metatagger**

   * Legg `<script type="application/ld+json">…</script>` med JSON-LD i `BaseLayout.astro` for schema.org.
   * Hardkod `<meta>`-tags i `BaseLayout.astro` for tittel, beskrivelse, Open Graph og canonical.

4. **Lokal business SEO**

   * Legg til LocalBusiness JSON-LD schema for bedrifter med fysisk adresse:

     ```html
     <script type="application/ld+json">
     {
       "@context": "https://schema.org",
       "@type": "LocalBusiness",
       "name": "Bedriftsnavn",
       "address": {
         "@type": "PostalAddress",
         "streetAddress": "Gateadresse 123",
         "addressLocality": "Oslo",
         "postalCode": "0123",
         "addressCountry": "NO"
       },
       "telephone": "+47 12 34 56 78",
       "openingHours": "Mo-Fr 09:00-17:00",
       "url": "https://eksempel.no"
     }
     </script>
     ```

5. **Bildeoptimalisering**

   * Bruk Astro sin innebygde `<Image />`-komponent for responsive bilder med lazy loading.

6. **Preload kritiske ressurser**

   * I `src/layouts/BaseLayout.astro`:

     ```html
     <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin font-display="swap">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     ```

7. **Canonical-tags**

   * I `BaseLayout.astro`, inkluder `<link rel="canonical" href="https://<ditt-domene>/<path>" />`.

8. **Analytics med samtykke**

   * Bytt ut Plausible med Google Analytics (GA4) og aktiver IP-anonymisering:

     ```html
     <!-- Google Analytics -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXX', { 'anonymize_ip': true });
     </script>
     ```

   * Implementer en enkel cookie-banner-komponent for GDPR-samtykke. Last først opp analytics-skriptet etter at brukeren har akseptert.

9. **Dependabot og sikkerhetsskanning**

   * Aktiver Dependabot i GitHub repo: Settings → Security & analysis → Dependabot security updates.
   * Legg til `.github/dependabot.yml` for automatiske PR-er på npm-oppdateringer:

     ```yaml
     version: 2
     updates:
       - package-ecosystem: "npm"
         directory: "/"
         schedule:
           interval: "weekly"
         open-pull-requests-limit: 5
     ```

   * Kjør `npm audit` i CI for å fange opp sårbarheter før deploy.

10. **E2E "smoke"-testing**

   * Installer Playwright for raske smoke-tester som sjekker at kritiske sider laster korrekt:

     ```javascript
     // tests/e2e/smoke.spec.js
     import { test, expect } from '@playwright/test';

     test('homepage loads correctly', async ({ page }) => {
       await page.goto('/');
       await expect(page).toHaveTitle(/.*Home.*/);
       await expect(page.locator('h1')).toBeVisible();
     });

     test('navigation works', async ({ page }) => {
       await page.goto('/');
       await page.click('nav a[href="/about"]');
       await expect(page).toHaveURL(/.*about.*/);
     });
     ```

   * Kjør smoke-tester mot `npm run preview` i CI før deploy for å fange opp byggefeil tidlig.

11. **Moderne kontaktskjema**

    * Bruk Formspree for enkle kontaktskjemaer uten backend:

      ```html
      <!-- I src/pages/kontakt.astro -->
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
        <label for="email">E-post:</label>
        <input type="email" name="email" required>
        
        <label for="message">Melding:</label>
        <textarea name="message" required></textarea>
        
        <input type="hidden" name="_subject" value="Ny henvendelse fra nettside">
        <input type="hidden" name="_next" value="https://ditt-domene.no/takk">
        
        <button type="submit">Send melding</button>
      </form>
      ```

    * Legg til spam-beskyttelse med `_gotcha` og validering med `_replyto`.

12. **Innholdsadministrasjon med Astro Content Collections**

    * Definer innholdstyper i `src/content/config.ts`:

      ```typescript
      import { defineCollection, z } from 'astro:content';

      const pages = defineCollection({
        type: 'content',
        schema: z.object({
          title: z.string(),
          description: z.string().optional(),
          publishDate: z.date(),
        }),
      });

      export const collections = {
        pages,
      };
      ```

    * Legg til innhold i `src/content/pages/`:

      ```markdown
      ---
      title: "Min Side"
      description: "En beskrivelse av siden"
      publishDate: 2024-01-01
      ---

      # Min Side

      Dette er innholdet på siden.
      ```

    * Bruk innholdet i Astro-komponenter:

      ```astro
      ---
      import { getCollection } from 'astro:content';
      const pages = await getCollection('pages');
      ---

      {pages.map(page => (
        <h2>{page.data.title}</h2>
        <p>{page.data.description}</p>
      ))}
      ```

13. **CI-basert Lighthouse-sjekk**

    * Legg til `lhci autorun` i GitHub Actions. Fail build hvis score < 90.

## 3. Ytterligere forbedringer

1. **CSP & HSTS via Cloudflare**

   * Pek DNS til Cloudflare Free Plan og aktiver HSTS (`max-age=31536000; includeSubDomains; preload`).
   * Legg til CSP i Cloudflare Transform Rules: `default-src 'self'; script-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self';`.

2. **CDN for statisk innhold**

   * Bruk Cloudflare som edge-cache for GitHub Pages uten ekstra konfigurasjon i koden.

3. **Font-subsetting**

   * Generer subset-fonter med `google-fonts-downloader` CLI, plasser i `public/fonts`, bruk `font-display: swap`.

4. **CSS-treeshaking**

   * Konfigurer `content` i `tailwind.config.cjs` med alle `.astro` og `.js` for å fjerne ubrukt CSS.

5. **Accessibility-audit i CI**

   * Legg til `npx axe-core` i GitHub Actions for å feile build ved kritiske ARIA-feil.

6. **PWA-fallback**

   * Legg til service worker med `workbox-build` i `astro.config.mjs` for caching av HTML, CSS og JS.

7. **Internasjonalisering (i18n)**

   * Bruk Astro sin innebygde i18n-støtte og konfigurer `src/pages/[lang]/...` med `hreflang`-tagger.

8. **Visuelle regresjonstester**

   * Integrer Percy ved å kjøre visuell test mot deployet URL i GitHub Actions.

> **Malkonklusjon:**
> Denne malen har alle valg forhåndsdefinert for enkel implementering av en rask, sikker og vedlikeholdsvennlig statisk nettside på GitHub Pages med Astro 5.x og Tailwind. Prosjektet er optimalisert for enkelhet, sikkerhet og ytelse uten unødvendig kompleksitet.

## 4. Oppsett av package.json

Legg følgende innhold i `package.json` for å sikre riktig Node-versjon, bygg/dev-skript og nødvendige avhengigheter:

```json
{
  "name": "mitt-prosjekt",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint . --ext .js,.ts,.astro",
    "format": "prettier --write .",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "audit": "npm audit --audit-level moderate",
    "check": "npm run lint && npm run format -- --check && npm run test && npm run audit"
  },
  "dependencies": {
    "astro": "^5.12.3",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@astrojs/sitemap": "^3.0.0",
    "astro-robots-txt": "^1.0.0",
    "workbox-build": "^7.0.0"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-plugin-astro": "^0.30.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0",
    "vitest": "^3.2.4",
    "axe-core": "^4.8.0",
    "@playwright/test": "^1.40.0",
    "happy-dom": "^18.0.1"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
```

Dette oppsettet dekker bygg- og utviklingsflyt, linting, formatering, testing, E2E smoke-tester, sikkerhetsskanning, kontaktskjemaer, type-sikker innholdsadministrasjon, bilde-/SEO-plugin'er, PWA-fallback og CI-audits.
