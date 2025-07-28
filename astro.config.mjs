import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-domain.github.io',
  base: '/',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt({
      sitemap: 'https://your-domain.github.io/sitemap-index.xml',
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
