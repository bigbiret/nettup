# Prosjektoppsett: Astro + Tailwind + GitHub Pages

Dette er en komplett utviklerguide for et statisk nettsted bygget med Astro, Tailwind CSS og deployet på GitHub Pages. Følg stegene under for å replikere den eksemplariske infrastrukturen.

---

## 📦 Teknologistack

- **Rammeverk:** Astro 5.x (SSG + islands)
- **CSS:** Tailwind CSS (utility-first)
- **Bygg:** Node.js v18+
- **Deploy:** GitHub Pages via GitHub Actions
- **Linting:** ESLint med Astro + TypeScript support
- **Formatering:** Prettier med Astro plugin
- **Testing:** Vitest (enhetstester med happy-dom) + Playwright (E2E multi-browser)
- **CI/CD:** Lighthouse CI (≥90 score), axe-core accessibility audit
- **Sikkerhet:** Dependabot, npm audit, automatiske sikkerhetsskanning
- **SEO:** @astrojs/sitemap, astro-robots-txt
- **PWA-ready:** workbox-build dependency (klar for implementering)

---

## 🚀 Komme i gang

1. **Opprett nytt prosjekt**

   ```bash
   npm create astro@latest my-project
   cd my-project
   ```

2. **Installer alle avhengigheter**

   ```bash
   npm install @astrojs/sitemap @astrojs/tailwind astro-robots-txt autoprefixer postcss tailwindcss workbox-build
   ```

3. **Installer utviklingsverktøy**

   ```bash
   npm install -D @playwright/test @typescript-eslint/eslint-plugin @typescript-eslint/parser axe-core eslint eslint-plugin-astro happy-dom prettier prettier-plugin-astro vitest
   ```

4. **Installer Playwright browsers**

   ```bash
   npx playwright install
   ```

5. **Kopier alle konfigurasjonsfiler** (se seksjon nedenfor)

6. **Utvikling**

   ```bash
   npm run dev
   ```

---

## 🔧 Scripts (Eksakt implementering)

| Kommando              | Implementering                                  |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | `astro dev`                                     |
| `npm run build`       | `astro build`                                   |
| `npm run preview`     | `astro preview`                                 |
| `npm run lint`        | `eslint . --ext .js,.ts,.astro`                |
| `npm run format`      | `prettier --write .`                           |
| `npm run test`        | `vitest run`                                    |
| `npm run test:e2e`    | `playwright test`                               |
| `npm run test:e2e:ui` | `playwright test --ui`                         |
| `npm run audit`       | `npm audit --audit-level moderate`             |
| `npm run check`       | `lint + format --check + test + audit` (kjede) |

---

## 📁 Kritiske konfigurasjonsfiler

### **package.json** (Komplette avhengigheter)

```json
{
  "name": "my-project",
  "type": "module",
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
    "test": "vitest run",
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
    "workbox-build": "^7.0.0"
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

### **astro.config.mjs**

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
    sitemap(),
    robotsTxt({
      sitemap: 'https://your-domain.github.io/sitemap-index.xml',
    }),
  ],
  output: 'static',
  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['workbox-build'],
      },
    },
  },
});
```

### **tailwind.config.cjs**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      // Legg til dine design tokens her
    },
  },
  plugins: [],
};
```

---

## 🧪 Testing-konfigurasjon

### **vitest.config.js**

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    // Ekskluder Playwright e2e tester fra Vitest
    exclude: ['**/tests/e2e/**', '**/node_modules/**'],
    // Ikke feil hvis ingen tester finnes
    passWithNoTests: true,
  },
});
```

### **playwright.config.js** (Multi-browser + CI-optimalisert)

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

### **E2E smoke test eksempel** (`tests/e2e/smoke.spec.js`)

```javascript
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*MyProject.*/);
  await expect(page.locator('main h1').first()).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/about"]');
  await expect(page).toHaveURL(/.*about.*/);
});
```

---

## 🔍 Linting & formatering

### **.eslintrc.cjs** (Astro + TypeScript support)

```javascript
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
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-console': 'warn',
  },
};
```

### **.prettierrc.json** (Astro plugin)

```json
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
        "parser": "astro"
      }
    }
  ]
}
```

### **postcss.config.cjs**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## ⚡ Performance & kvalitet

### **lighthouserc.cjs** (Score ≥90 krav)

```javascript
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      url: ['http://localhost:4321'],
      numberOfRuns: 3,
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

---

## 🔒 Sikkerhet & vedlikehold

### **.github/dependabot.yml**

```yaml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    open-pull-requests-limit: 5
    reviewers:
      - 'owner'
    assignees:
      - 'owner'
    commit-message:
      prefix: 'deps'
      include: 'scope'
```

---

## 🚀 GitHub Actions CI/CD

### **.github/workflows/ci.yml** (4 parallelle jobs)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  lint-and-test:
    name: Lint, Format & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Lint code
        run: npm run lint
      - name: Check formatting
        run: npm run format -- --check
      - name: Run unit tests
        run: npm run test
      - name: Security audit
        run: npm run audit
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Build project
        run: npm run build
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
          retention-days: 30

  accessibility-audit:
    name: Accessibility Audit
    runs-on: ubuntu-latest
    needs: lint-and-test
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Start preview server and run accessibility tests
        run: |
          npm run preview &
          sleep 10
          npx @axe-core/cli http://localhost:4321 --exit
          kill %1

  lighthouse-audit:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: lint-and-test
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

  deploy:
    name: Deploy to GitHub Pages
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    needs: [lint-and-test, accessibility-audit, lighthouse-audit]
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## ✅ Deploy setup

1. **GitHub Pages**: I repo Settings → Pages → Source: "GitHub Actions"
2. **Security features**: I repo Settings → Security & analysis:
   - Aktiver "Dependency graph"
   - Aktiver "Dependabot alerts"
   - Aktiver "Dependabot security updates"
3. **Custom domain** (valgfritt): Legg til `CNAME` i `public/` for eget domene

---

## 🎯 Resultater

Med dette oppsettet får du:
- **Automatisk testing**: Unit + E2E i 3 browsere
- **Kvalitetssikring**: Linting, formatting, accessibility, performance
- **Sikkerhet**: Dependabot + npm audit
- **Professional deployment**: Zero-downtime med Pages
- **Utvikleropplevelse**: Hot reload, TypeScript support, moderne tooling

---

## 📄 Lisens

Alle rettigheter forbehold
