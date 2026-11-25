import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icon-192.png'],
      manifest: {
        name: 'Sadat Lineage Archive',
        short_name: 'Lineage',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F2EB',
        theme_color: '#4A5446',
        description: 'Global canonical Sadat genealogy archive & Shia community portal.',
        orientation: 'portrait-primary',
        scope: '/',
        icons: [
          { src: '/icon-72.png', sizes: '72x72', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json,webp}'],
        cleanupOutdatedCaches: true,
        navigateFallback: '/offline.html'
      },
      devOptions: { enabled: true, type: 'module' }
    })
  ],
  build: { sourcemap: true },
  server: { port: 3000, open: true }
})
