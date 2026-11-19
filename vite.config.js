import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { siteConfig } from './src/content/siteConfig';

/**
 * Injects SEO / Open Graph tags from siteConfig into index.html at build time
 * and emits sitemap.xml + robots.txt, so SEO stays editable from one file.
 */
function seoPlugin() {
  const url = siteConfig.siteUrl.replace(/\/$/, '');
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const tags = [
        `<title>${esc(siteConfig.seo.title)}</title>`,
        `<meta name="description" content="${esc(siteConfig.seo.description)}" />`,
        `<meta name="keywords" content="${esc(siteConfig.seo.keywords.join(', '))}" />`,
        `<meta name="author" content="${esc(siteConfig.seo.author)}" />`,
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:url" content="${url}/" />`,
        `<meta property="og:title" content="${esc(siteConfig.seo.title)}" />`,
        `<meta property="og:description" content="${esc(siteConfig.seo.description)}" />`,
        `<meta property="og:image" content="${url}${siteConfig.seo.ogImage}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(siteConfig.seo.title)}" />`,
        `<meta name="twitter:description" content="${esc(siteConfig.seo.description)}" />`,
        `<meta name="twitter:image" content="${url}${siteConfig.seo.ogImage}" />`,
      ].join('\n    ');
      return html.replace('<!--seo-->', tags);
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), seoPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: { manualChunks: { react: ['react', 'react-dom'], motion: ['framer-motion'] } },
    },
  },
});
