import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Public site URL (no trailing slash) used by canonical / Open Graph / JSON-LD in the HTML pages.
// Live domain. If it ever changes, also update public/CNAME, public/robots.txt and public/sitemap.xml,
// and VITE_SITE_URL in .github/workflows/deploy.yml.
process.env.VITE_SITE_URL ??= 'https://basteglobalmarkets.in';

const page = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    rollupOptions: {
      // Home page + the three legal pages (each is a real URL: /disclaimer/, /privacy/, /terms/)
      input: {
        main: page('./index.html'),
        disclaimer: page('./disclaimer/index.html'),
        privacy: page('./privacy/index.html'),
        terms: page('./terms/index.html'),
      },
    },
  },
});
