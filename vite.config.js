import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Public site URL (no trailing slash) used by canonical / Open Graph / JSON-LD in the HTML pages.
// PLACEHOLDER: replace with the real domain (or set VITE_SITE_URL in your host's env vars),
// and keep public/robots.txt + public/sitemap.xml in sync.
process.env.VITE_SITE_URL ??= 'https://www.bastegloballmarkets.com';

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
