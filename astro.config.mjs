import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://nettup.no',
  base: '/',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt({
      sitemap: 'https://nettup.no/sitemap-index.xml',
    }),
  ],

  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['workbox-build'],
      },
    },
    // Load environment variables from .env file
    envDir: '.',
  },
});
