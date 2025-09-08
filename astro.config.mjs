import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://nettup.no',
  base: '/',
  output: 'static',
  redirects: {
    '/blog/hvorofr-sette-opp-nettside': '/blog/hvorfor-sette-opp-nettside',
  },
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt({
      sitemap: 'https://nettup.no/sitemap-index.xml',
    }),
  ],

  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        external: ['workbox-build'],
        output: {
          manualChunks: undefined,
        },
      },
    },
    // Load environment variables from .env file
    envDir: '.',
  },
});
