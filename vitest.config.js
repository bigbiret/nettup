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
