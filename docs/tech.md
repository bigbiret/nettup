# Teknisk infrastruktur - Implementasjonsguide

Dette dokumentet beskriver den eksemplariske infrastrukturen for moderne statisk nettside med Astro, Tailwind CSS og GitHub Pages. Alle konfigurasjoner er basert på faktisk implementering.

## 1. Hovedteknologier og arkitektur

**Astro 5.x**

- Statisk sidegenerering (SSG) for innholdsdrevne sider
- "Islands"-arkitektur for selektiv interaktivitet
- Innebygd bildeoptimalisering
- Content Collections for type-sikret innholdsadministrasjon

**Tailwind CSS**

- Utility-first CSS med design tokens definert i `tailwind.config.cjs`
- Purging av ubrukt CSS via content-scanning

**Prosjektstruktur**

```
src/
├── pages/         (filbasert routing + API endpoints)
├── components/    (gjenbrukbare UI-komponenter)
├── layouts/       (felles <head> og sideoppsett)
├── styles/        (global CSS + Tailwind)
└── content/       (markdown-filer, klar for Collections)

tests/
└── e2e/           (Playwright smoke-tester)

.github/
├── workflows/     (CI/CD pipeline)
└── dependabot.yml (automatiske oppdateringer)
```

**Bygg**: `npm run build` (Node.js v18+)
**Deploy**: GitHub Actions → GitHub Pages
**Mål**: Lighthouse ≥ 90 på alle kategorier, WCAG 2.1 AA

## 2. Testing infrastruktur

### **Vitest (Unit testing)**

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom', // Rask DOM simulation
    globals: true, // describe, it, expect globalt
    exclude: ['**/tests/e2e/**', '**/node_modules/**'],
    passWithNoTests: true, // Ikke feil hvis ingen tester
  },
});
```

**Fordeler med happy-dom:**

- 10x raskere enn jsdom
- Bedre Astro-kompatibilitet
- Mindre memory footprint

### **Playwright (E2E testing)**

```javascript
// playwright.config.js
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Forhindre test.only i CI
  retries: process.env.CI ? 2 : 0, // Retry kun på CI
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4321', // Astro dev server
    trace: 'on-first-retry', // Debug på feilverminskning
  },

  // Multi-browser testing
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Automatisk dev server start
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

**E2E smoke test pattern:**

```javascript
// tests/e2e/smoke.spec.js
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*YourSite.*/);
  await expect(page.locator('main h1').first()).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/about"]');
  await expect(page).toHaveURL(/.*about.*/);
});
```

## 3. Code quality infrastructure

### **ESLint (Advanced Astro + TypeScript)**

```javascript
// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:astro/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      // Astro filer med TypeScript parser
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    {
      // Dedikert TypeScript parser
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
  globals: {
    // Define globals for external libraries
    gtag: 'readonly', // Google Analytics
    dataLayer: 'readonly', // GA4 data layer
    Calendly: 'readonly', // Calendly widget
  },
  rules: {
    'no-unused-vars': 'off', // TypeScript håndterer dette
    'no-undef': 'off', // TypeScript håndterer dette
    'no-console': 'warn', // Tillatt, men advarsler
  },
};
```

**Kritiske features:**

- Separate parsere for `.astro` og `.ts` filer
- TypeScript ESLint integration
- Global declarations for external scripts

### **Prettier (Astro formatering)**

```json
// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro" // Astro-spesifikk formatering
      }
    }
  ]
}
```

## 4. CI/CD Pipeline (4-step workflow)

### **Job 1: lint-and-test** (Foundation)

```yaml
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint # ESLint
      - run: npm run format -- --check # Prettier check
      - run: npm run test # Vitest unit tests
      - run: npm run audit # Security vulnerabilities

      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e # Playwright multi-browser
```

### **Job 2 & 3: Parallel quality audits**

```yaml
accessibility-audit:
  needs: lint-and-test
  steps:
    - run: npm run preview &
    - run: sleep 10
    - run: npx @axe-core/cli http://localhost:4321 --exit

lighthouse-audit:
  needs: lint-and-test
  steps:
    - run: npm install -g @lhci/cli@0.12.x
    - run: lhci autorun # Performance ≥90 score
```

### **Job 4: Deploy** (Only on main)

```yaml
deploy:
  if: github.ref == 'refs/heads/main'
  needs: [lint-and-test, accessibility-audit, lighthouse-audit]
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
```

**Pipeline features:**

- **Parallellisering**: Accessibility + Lighthouse kjører simultant
- **Fail-fast**: Deploy kun hvis alle tester passerer
- **Artifacts**: Test results lagres i 30 dager
- **Security**: Dependabot PRs kjører samme pipeline

## 5. Performance & quality requirements

### **Lighthouse CI (Strict scoring)**

```javascript
// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4321'],
      numberOfRuns: 3, // Konsistenssjekk
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

**Scoring rationale:**

- **90% threshold**: Industri-standard for produksjon
- **3 runs**: Eliminerer flakiness
- **Error level**: Hard requirement, feiler build hvis ikke oppfylt

## 6. Security & maintenance automation

### **Dependabot (Smart oppdateringer)**

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly' # Balanse mellom sikkerhet og stabilitet
    open-pull-requests-limit: 5 # Ikke overvelm med PRs
    reviewers:
      - 'owner'
    assignees:
      - 'owner'
    commit-message:
      prefix: 'deps' # Konsistent commit historikk
      include: 'scope'
```

**npm audit integration:**

```bash
npm run audit                    # Moderate level som default
```

**Rationale:**

- Weekly updates balanserer sikkerhet med stabilitet
- Alle Dependabot PRs kjører full CI pipeline
- Moderate audit level fanger kritiske sårbarheter uten false positives

## 7. Astro-spesifkke optimaliseringer

### **astro.config.mjs (Production-ready)**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://your-domain.github.io',
  base: '/',
  integrations: [
    tailwind(),
    sitemap(), // Automatisk sitemap generering
    robotsTxt({
      sitemap: 'https://your-domain.github.io/sitemap-index.xml',
    }),
  ],
  output: 'static', // Statisk generering
  build: {
    assets: 'assets', // Asset organisering
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['workbox-build'], // PWA-ready dependency
      },
    },
  },
});
```

### **Tailwind optimalisering**

```javascript
// tailwind.config.cjs
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ], // Komplett purging scope
  theme: {
    extend: {
      // Custom design tokens
    },
  },
  plugins: [],
};
```

## 8. Package.json (Komplett setup)

```json
{
  "name": "my-project",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=18" // GitHub Actions kompatibilitet
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint . --ext .js,.ts,.astro",
    "format": "prettier --write .",
    "test": "vitest run", // Non-interactive for CI
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "audit": "npm audit --audit-level moderate",
    "check": "npm run lint && npm run format -- --check && npm run test && npm run audit"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "astro": "^5.12.3",
    "astro-robots-txt": "^1.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "workbox-build": "^7.0.0" // PWA-ready
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@typescript-eslint/eslint-plugin": "^8.38.0",
    "@typescript-eslint/parser": "^8.38.0",
    "axe-core": "^4.8.0",
    "eslint": "^8.57.0",
    "eslint-plugin-astro": "^0.30.0",
    "happy-dom": "^18.0.1",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0",
    "vitest": "^3.2.4"
  },
  "browserslist": [">0.2%", "not dead", "not op_mini all"]
}
```

## 9. Developer Experience optimaliseringer

### **Fast feedback loops:**

- `npm run dev` - Hot reload på alle endringer
- `npm run test` - Rask unit tests med happy-dom
- `npm run check` - Komplett kvalitetssjekk lokalt

### **Pre-commit workflow:**

```bash
npm run lint                    # Fang syntax errors
npm run format -- --check      # Verify consistent formatting
npm run test                    # Unit test verification
npm run build                   # Build verification
```

### **IDE integration:**

- ESLint extension for live linting
- Prettier extension for format-on-save
- Astro extension for syntax highlighting

## 10. Deployment & monitoring

### **GitHub Pages setup:**

1. Repository Settings → Pages → Source: "GitHub Actions"
2. Security & analysis → Aktiver Dependabot alerts
3. Branch protection rules (anbefalt):
   - Require status checks to pass
   - Require up-to-date branches

### **Performance monitoring:**

- Lighthouse CI kjører på hver deploy
- GitHub Actions artifacts for debugging
- axe-core accessibility rapporter

**Malkonklusjon:**
Denne infrastrukturen leverer enterprise-grade kvalitetssikring for statiske nettsider. Utviklere får øyeblikkelig feedback på code quality, security og performance, mens automatiserte pipelines sikrer at kun høykvalitets kode når produksjon.

**Neste steg for nye prosjekter:**

1. Kopier alle konfigurasjonsfiler
2. Installer dependencies fra package.json
3. Konfigurer GitHub repository settings
4. Tilpass site URL i astro.config.mjs
5. Kjør `npm run check` for å verifisere setup
