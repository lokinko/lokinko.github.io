// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkTierTags from './src/utils/remarkTierTags.mjs';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://lokinko.github.io',
  base: '/',
  // Expand {{tags: ...}} tokens into deterministic, colored badges.
  markdown: {
    remarkPlugins: [remarkTierTags],
  },
  integrations: [sitemap()],
});
