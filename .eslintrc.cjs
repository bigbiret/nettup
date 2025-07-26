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
  globals: {
    // Google Analytics
    gtag: 'readonly',
    dataLayer: 'readonly',
    // Calendly
    Calendly: 'readonly',
    // Allow common browser globals
    window: 'readonly',
    document: 'readonly',
  },
  rules: {
    // Disable problematic rules for now
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-console': 'warn',
  },
};
