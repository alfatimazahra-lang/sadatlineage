// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
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
        ],
        categories: ['reference', 'lifestyle', 'social'],
        shortcuts: [
          { name: 'My Tree', short_name: 'Tree', url: '/tree', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
          { name: 'Add Relative', short_name: 'Add', url: '/register', icons: [{ src: '/icon-192.png', sizes: '192x192' }] }
        ],
        prefer_related_applications: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json,webp}'],
        cleanupOutdatedCaches: true,
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api/, /^\/auth/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/v1\/object\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'supabase-storage', expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'supabase-rest-get', expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 }, cacheableResponse: { statuses: [0, 200] }, matchOptions: { ignoreVary: true } }
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/(auth\/v1|realtime\/v1|rest\/v1\/.*\?(insert|update|delete|upsert))/,
            handler: 'NetworkOnly',
            options: { cacheName: 'supabase-no-cache' }
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } }
          }
        ]
      },
      devOptions: { enabled: true, type: 'module', navigateFallback: '/offline.html' }
    })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) return 'supabase'
            return 'vendor'
          }
        }
      }
    }
  },
  server: { port: 3000, open: true }
})
