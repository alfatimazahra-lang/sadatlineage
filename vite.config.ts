// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages + Custom Domain (sadatlineage.in) ke liye root base
  base: '/',

  plugins: [
    react(),

    // ===== PWA / SERVICE WORKER CONFIG =====
    VitePWA({
      // 1. Auto-update toast dikhaye (main.tsx ke saath kaam karta hai)
      registerType: 'autoUpdate',

      // 2. Static assets jo SW precache karega (hashed filenames automatically)
      includeAssets: ['favicon.svg', 'robots.txt', 'icon-192.png'],

      // 3. Manifest Configuration (Ye wala JSON aapne paste kiya tha — yahan andar jaata hai)
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
          {
            src: '/icon-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['reference', 'lifestyle', 'social'],
        shortcuts: [
          {
            name: 'My Tree',
            short_name: 'Tree',
            description: 'View your family tree',
            url: '/tree',
            icons: [{ src: '/icon-192.png', sizes: '192x192' }]
          },
          {
            name: 'Add Relative',
            short_name: 'Add',
            description: 'Add a family member',
            url: '/register',
            icons: [{ src: '/icon-192.png', sizes: '192x192' }]
          }
        ],
        prefer_related_applications: false
      },

      // 4. Workbox Runtime Caching Strategies (Supabase ke liye critical)
      workbox: {
        // Sabhi hashed assets (JS, CSS, fonts, images in src/assets) precache honge
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json,webp}'],

        // Purane caches auto-delete honge naye version pe
        cleanupOutdatedCaches: true,

        // Offline fallback page (public/offline.html banana padega)
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api/, /^\/auth/],

        // Runtime Caching Rules
        runtimeCaching: [
          {
            // 🟢 STORAGE: Avatars, Docs → CacheFirst (30 din)
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/v1\/object\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-storage',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // 🟡 REST API (GET): Profiles, Lists → StaleWhileRevalidate (24 ghante)
            // Turant cached data dikhata hai, background mein update karta hai
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'supabase-rest-get',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
              matchOptions: { ignoreVary: true }
            }
          },
          {
            // 🔴 AUTH / REALTIME / MUTATIONS → NetworkOnly (KABHI CACHE NAHI)
            urlPattern: /^https:\/\/.*\.supabase\.co\/(auth\/v1|realtime\/v1|rest\/v1\/.*\?(insert|update|delete|upsert))/,
            handler: 'NetworkOnly',
            options: { cacheName: 'supabase-no-cache' }
          },
          {
            // 🔵 GOOGLE FONTS → CacheFirst (1 saal)
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },

      // 5. Dev mode mein bhi SW test karne ke liye (optional)
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: '/offline.html'
      }
    })
  ],

  // Build optimizations
  build: {
    sourcemap: true,           // Debugging ke liye
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['@headlessui/react', '@heroicons/react'] // agar use kar rahe hain
        }
      }
    }
  },

  // Server config (dev)
  server: {
    port: 3000,
    open: true
  }
})
