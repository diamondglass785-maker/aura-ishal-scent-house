import { defineConfig } from '@lovable.dev/vite-tanstack-config';

// Used only in the isolated export; Lovable's preview configuration is unchanged.
export default defineConfig({
  vite: { base: '/' },
  nitro: { preset: 'node-server' },
  tanstackStart: {
    server: { entry: 'server' },
    pages: ['/', '/shop/', '/aura/', '/ishal/', '/explore-fragrance/', '/contact/', '/cart/', '/checkout/', '/order-confirmation/'].map(path => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
  },
});