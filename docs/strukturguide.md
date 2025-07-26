# Prosjektstruktur – Developer Guide

Dette dokumentet beskriver den anbefalte mappestrukturen og filorganiseringen for et Astro-prosjekt med eksemplarisk infrastruktur. Bruk dette som referanse når du setter opp nye prosjekter.

---

## 📁 Mappestruktur

```
my-project/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                 # CI/CD pipeline (4 jobs)
│   └── dependabot.yml             # Automatiske sikkerhetsopdateringer
├── docs/                          # Teknisk dokumentasjon
│   ├── tech.md                    # Infrastruktur guide
│   └── README.md                  # Prosjekt overview
├── public/                        # Statiske assets
│   ├── favicon.svg
│   ├── robots.txt                 # Genereres av astro-robots-txt
│   ├── fonts/                     # (Lokale fonter, valgfritt)
│   └── images/
├── src/
│   ├── components/                # Gjenbrukbare UI-komponenter
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── CTAButton.astro
│   ├── layouts/                   # Layout-templates
│   │   └── BaseLayout.astro       # Hovedlayout med SEO
│   ├── pages/                     # Filbasert routing
│   │   ├── index.astro            # Hjemmeside
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── api/                   # API endpoints
│   │       ├── contact.ts
│   │       └── lead.ts
│   ├── styles/
│   │   └── global.css             # Globale stiler + Tailwind imports
│   └── content/                   # Content Collections (klar for bruk)
│       └── config.ts              # (Hvis brukt)
├── tests/
│   └── e2e/                       # Playwright smoke tests
│       └── smoke.spec.js
├── .eslintrc.cjs                  # ESLint med Astro + TypeScript
├── .prettierrc.json               # Prettier med Astro plugin
├── astro.config.mjs               # Astro konfigurasjon
├── lighthouserc.cjs               # Lighthouse CI krav
├── package.json                   # Dependencies og scripts
├── playwright.config.js           # E2E test konfigurasjon
├── postcss.config.cjs             # PostCSS for Tailwind
├── tailwind.config.cjs            # Tailwind design tokens
└── vitest.config.js               # Unit test konfigurasjon
```

---

## 🔧 Konfigurasjonsfiler oversikt

### **Root-nivå konfigurasjoner**

| Fil                     | Ansvar                                    |
| ----------------------- | ----------------------------------------- |
| `package.json`          | Dependencies, scripts, Node.js versjon   |
| `astro.config.mjs`      | Astro plugins, build settings, SEO       |
| `tailwind.config.cjs`   | CSS utility classes, design tokens       |
| `postcss.config.cjs`    | CSS preprocessing (Tailwind + autoprefixer) |
| `.eslintrc.cjs`         | Code linting rules, Astro + TS parsers   |
| `.prettierrc.json`      | Code formatting, Astro plugin            |
| `vitest.config.js`      | Unit testing med happy-dom               |
| `playwright.config.js`  | E2E testing, multi-browser               |
| `lighthouserc.cjs`      | Performance requirements (≥90 score)     |

### **GitHub-spesifikke filer**

| Fil                          | Ansvar                               |
| ---------------------------- | ------------------------------------ |
| `.github/workflows/ci.yml`   | 4-step CI/CD pipeline                |
| `.github/dependabot.yml`     | Ukentlige sikkerhetsopdateringer     |

---

## 📦 Kritiske avhengigheter

### **Core Astro**
```json
"astro": "^5.12.3"
"@astrojs/tailwind": "^5.0.0"
"@astrojs/sitemap": "^3.0.0"
"astro-robots-txt": "^1.0.0"
```

### **CSS & Styling**
```json
"tailwindcss": "^3.4.0"
"postcss": "^8.4.0"
"autoprefixer": "^10.4.0"
```

### **Testing infrastruktur**
```json
"@playwright/test": "^1.40.0"     // E2E multi-browser
"vitest": "^3.2.4"               // Unit testing
"happy-dom": "^18.0.1"           // DOM simulation
"axe-core": "^4.8.0"             // Accessibility testing
```

### **Code quality**
```json
"eslint": "^8.57.0"
"eslint-plugin-astro": "^0.30.0"
"@typescript-eslint/eslint-plugin": "^8.38.0"
"@typescript-eslint/parser": "^8.38.0"
"prettier": "^3.0.0"
"prettier-plugin-astro": "^0.12.0"
```

### **PWA-ready**
```json
"workbox-build": "^7.0.0"        // Service worker (klar for implementering)
```

---

## 🏗️ Src-struktur anbefalinger

### **components/ organisering**
```
components/
├── ui/                    # Basis UI-elementer
│   ├── Button.astro
│   ├── Card.astro
│   └── Modal.astro
├── layout/                # Layout-spesifikke komponenter
│   ├── Navbar.astro
│   ├── Footer.astro
│   └── Sidebar.astro
└── features/              # Feature-spesifikke komponenter
    ├── ContactForm.astro
    ├── Newsletter.astro
    └── ProductCard.astro
```

### **pages/ routing patterns**
```
pages/
├── index.astro            # Hjemmeside (/)
├── about.astro            # Om oss (/about)
├── contact.astro          # Kontakt (/contact)
├── products/              # Produktkatalog
│   ├── index.astro        # (/products)
│   └── [slug].astro       # (/products/product-name)
├── blog/                  # Blog/nyheter
│   ├── index.astro        # (/blog)
│   └── [slug].astro       # (/blog/post-title)
└── api/                   # API endpoints
    ├── contact.ts         # POST /api/contact
    ├── newsletter.ts      # POST /api/newsletter
    └── search.ts          # GET /api/search
```

### **layouts/ hierarchy**
```
layouts/
├── BaseLayout.astro       # Root layout (HTML, head, SEO)
├── PageLayout.astro       # Standard side layout
├── BlogLayout.astro       # Blog-spesifikt layout
└── LandingLayout.astro    # Landing page layout
```

---

## 🧪 Testing struktur

### **tests/e2e/ organisering**
```
tests/e2e/
├── smoke.spec.js          # Kritiske brukerflyter
├── navigation.spec.js     # Navigasjon og routing
├── forms.spec.js          # Kontaktskjemaer og interaksjon
└── accessibility.spec.js  # A11y-spesifikke tester
```

### **Unit testing pattern**
```
src/
├── components/
│   ├── Button.astro
│   └── Button.test.js     # Unit test for Button (valgfritt)
└── utils/
    ├── helpers.js
    └── helpers.test.js    # Unit test for utility functions
```

---

## 🚀 Scripts workflow

### **Utvikling**
```bash
npm run dev                # Start dev server
npm run build              # Production build
npm run preview            # Preview production build
```

### **Kvalitetssikring**
```bash
npm run lint               # ESLint kodesjekk
npm run format             # Prettier formatering
npm run test               # Vitest unit tests
npm run test:e2e           # Playwright E2E tests
npm run audit              # npm security audit
npm run check              # Komplett kvalitetssjekk
```

---

## 🔍 Anbefalte IDE extensions

### **VS Code**
- Astro (`astro-build.astro-vscode`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- Playwright Test (`ms-playwright.playwright`)

### **Konfigurasjoner (.vscode/settings.json)**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["astro", "typescript", "javascript"],
  "[astro]": {
    "editor.defaultFormatter": "astro-build.astro-vscode"
  }
}
```

---

## 📋 Sjekkliste for nytt prosjekt

### **Infrastruktur setup**
- [ ] Kopier alle konfigurasjonsfiler
- [ ] Installer dependencies fra package.json
- [ ] Konfigurer GitHub repository settings
- [ ] Aktiver Dependabot i repository settings
- [ ] Oppdater site URL i astro.config.mjs

### **Utviklingsverifikasjon**
- [ ] `npm run dev` starter uten feil
- [ ] `npm run lint` passerer
- [ ] `npm run format -- --check` passerer
- [ ] `npm run build` bygger uten feil
- [ ] `npm run test:e2e` kjører smoke tests
- [ ] CI/CD pipeline kjører uten feil

### **Deployment**
- [ ] GitHub Pages aktivert
- [ ] Custom domain konfigurert (hvis aktuelt)
- [ ] Lighthouse score ≥90 på alle kategorier
- [ ] Accessibility audit passerer

---

## 🎯 Tips for vedlikehold

### **Ukentlig**
- Gjennomgå Dependabot PRs
- Kjør `npm run check` lokalt
- Monitor CI/CD pipeline status

### **Månedlig**
- Gjennomgå test coverage
- Oppdater documentation
- Vurder nye ESLint rules eller Prettier konfigurasjoner

### **Kvartalsvis**
- Oppdater major dependencies
- Gjennomgå Lighthouse recommendations
- Vurder nye Astro features/plugins

Denne strukturen sikrer skalerbarhet, vedlikeholdbarhet og høy kodekvalitet gjennom hele prosjektets livssyklus.


