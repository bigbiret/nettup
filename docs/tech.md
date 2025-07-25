# Teknisk oversikt

Dette dokumentet fungerer som en mal for oppsett av en moderne, rask og responsiv statisk nettside med Astro, Tailwind CSS og GitHub Pages.

## 1. Hovedteknologier og prosjektstruktur

**Astro**

* Statisk sidegenerering (SSG) for innholdsdrevne sider.
* "Islands"-arkitektur for selektiv interaktivitet.

**Tailwind CSS**

* Utility-first CSS med design tokens definert i `tailwind.config.cjs`.

**Prosjektstruktur**

```
src/
├── pages/         (filbasert routing)
├── components/    (gjenbrukbare UI-komponenter)
├── layouts/       (felles <head> og sideoppsett)
├── styles/        (Tailwind-konfigurasjon)
└── public/        (statisk innhold: fonter, bilder)
```

Bygg: `npm run build` (Node.js v18+).
Deploy: GitHub Actions → GitHub Pages.
Mål: Lighthouse ≥ 90 (ytelse, tilgjengelighet, SEO) og WCAG 2.1 AA.

## 2. Essensielle tillegg

1. **HTTPS**

   * Bruk GitHub Pages sin innebygde HTTPS (gratis, automatisk).

2. **Sitemap & robots.txt**

   * Installer `@astrojs/sitemap` og generer `sitemap.xml` i `astro.config.mjs`.
   * Legg til `robots.txt` manuelt i `public/` som peker til `sitemap.xml`.

3. **Dynamiske SEO-metatagger**

   * Legg `<script type="application/ld+json">…</script>` med JSON-LD i `BaseLayout.astro` for schema.org.
   * Hardkod `<meta>`-tags i `BaseLayout.astro` for tittel, beskrivelse, Open Graph og canonical.

4. **Bildeoptimalisering**

   * Bruk Astro sin innebygde `<Image />`-komponent for responsive bilder med lazy loading.

5. **Preload kritiske ressurser**

   * I `src/layouts/BaseLayout.astro`:<br>

     ```html
     <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin font-display="swap">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     ```

6. **Canonical-tags**

   * I `BaseLayout.astro`, inkluder `<link rel="canonical" href="https://<ditt-domene>/<path>" />`.

7. **Analytics med samtykke**

   * Integrer Plausible ved å legge `<script defer src="https://plausible.io/js/plausible.js" data-domain="<ditt-domene>"></script>` bak cookie-banner.

8. **CI-basert Lighthouse-sjekk**

   * Legg til `lhci autorun` i GitHub Actions. Fail build hvis score < 90.

9. **Robust 404-side**

   * Opprett `public/404.html` med navigasjon tilbake til startsiden og søkefelt.

## 3. Ytterligere forbedringer

1. **CSP & HSTS via Cloudflare**

   * Pek DNS til Cloudflare Free Plan og aktiver HSTS (max-age=31536000; includeSubDomains; preload).
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

   * Installer `@astrojs/i18n` og konfigurer `src/pages/[lang]/...` med `hreflang`-tagger.

8. **Visuelle regresjonstester**

   * Integrer Percy ved å kjøre visuell test mot deployet URL i GitHub Actions.

> **Malkonklusjon:**
> Denne malen har alle valg forhåndsdefinert for enkel implementering av en rask, sikker og vedlikeholdsvennlig statisk nettside på GitHub Pages med Astro og Tailwind. (middels innsats)

For å løfte sikkerhet, robusthet og kvalitetssikring ytterligere kan du vurdere å implementere:

1. **Content Security Policy (CSP)**
   Definer en streng CSP-header for å blokkere uautoriserte skript og innhold (f.eks. `default-src 'self'; script-src 'self' https://cdn.exempel.com;`).

2. **HTTP Strict-Transport-Security (HSTS)**
   Tvinger HTTPS-trafikk og beskytter mot protocol downgrade (f.eks. `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`).

3. **CDN for statisk innhold**
   Plasser GitHub Pages bak Cloudflare/Netlify/Fastly for global edge-caching, økt ytelse og fleksible header-regler.

4. **Font-subsetting & `font-display: swap`**
   Generer subset-fonter (latin osv.), legg i `public/fonts` og bruk `font-display: swap` for å unngå FOIT/FOUT.

5. **Strukturerte data (JSON-LD)**
   Legg til schema.org-markup som `<script type="application/ld+json">…</script>` i layout for rich snippets.

6. **CSS-treeshaking**
   Sørg for at Tailwind fjerner ubrukt CSS i produksjonsbuild ved å konfigurere `content` i `tailwind.config.cjs`.

7. **Accessibility-audits i CI**
   Kjør axe-core CLI eller Lighthouse-axe i GitHub Actions og stopp build ved alvorlige tilgjengelighetsfeil.

8. **Enkel PWA-fallback**
   Legg til en service worker (f.eks. via `workbox-build`) for caching av nøkkelfiler, og gi brukere offline-fallback.

9. **Internasjonalisering (i18n)**
   Bruk Astro-i18n-plugin eller `src/pages/[lang]/…`-struktur med `hreflang`-tags for flerspråklig innhold.

10. **Visuelle regresjonstester**
    Integrer Percy.io eller Chromatic i CI for å fange visuelle UI-regresjoner automatisk.

> **Oppsummert:**
> Ved å inkludere disse tiltakene får du en sikker, rask og søkemotor-vennlig statisk side med svært liten ekstra konfigurasjon på GitHub Pages.

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
    "check": "npm run lint && npm run format -- --check && npm run test"
  },
  "dependencies": {
    "astro": "^3.0.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@astrojs/image": "^0.6.0",
    "@astrojs/sitemap": "^0.2.0",
    "astro-robots-txt": "^1.0.0",
    "@astrojs/i18n": "^1.0.0",
    "plausible-tracker": "^1.4.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "eslint-plugin-astro": "^0.8.0",
    "prettier": "^2.8.0",
    "vitest": "^0.25.0",
    "axe-core": "^4.4.0",
    "workbox-build": "^6.5.0"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
```

Dette oppsettet dekker bygg- og utviklingsflyt, linting, formatering, testing, bilde-/SEO-plugin’er, PWA-fallback og CI-audits.
