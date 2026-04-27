import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { siteContent } from './src/data';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function siteContentHtmlPlugin() {
  const replacements: Record<string, string> = {
    __SITE_LANGUAGE__: siteContent.metadata.language,
    __SITE_TITLE__: siteContent.metadata.title,
    __SITE_DESCRIPTION__: siteContent.metadata.description,
    __SITE_OG_TITLE__: siteContent.metadata.ogTitle,
    __SITE_OG_DESCRIPTION__: siteContent.metadata.ogDescription,
    __SITE_THEME_COLOR__: siteContent.metadata.themeColor,
  };

  return {
    name: 'site-content-html',
    transformIndexHtml(html: string) {
      return Object.entries(replacements).reduce(
        (result, [token, value]) => result.replaceAll(token, escapeHtml(value)),
        html,
      );
    },
  };
}

export default defineConfig({
  plugins: [siteContentHtmlPlugin(), react(), tailwindcss()],
});
