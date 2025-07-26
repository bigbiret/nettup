import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
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
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['workbox-build']
      }
    }
  }
}); 