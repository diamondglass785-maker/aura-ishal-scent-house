import { defineConfig } from '@lovable.dev/vite-tanstack-config';

// Used only in the isolated export; Lovable's preview configuration is unchanged.
export default defineConfig({
  vite: { base: '/' },
  // Fetch-compatible renderer is used at build time only; deploy only static HTML.
  nitro: { preset: 'cloudflare-module' },
  tanstackStart: {
    server: { entry: 'server' },
    pages: ['/', '/shop/', '/aura/', '/ishal/', '/explore-fragrance/', '/contact/', '/cart/', '/checkout/', '/order-confirmation/'].map(path => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
  },
});