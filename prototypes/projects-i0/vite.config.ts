import { fileURLToPath, URL } from 'node:url'
import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Resolve @shared: local copy (Vercel deploy) or parent dir (local dev)
const sharedLocal = fileURLToPath(new URL('./shared', import.meta.url))
const sharedParent = fileURLToPath(new URL('../shared', import.meta.url))
const sharedPath = existsSync(sharedLocal) ? sharedLocal : sharedParent

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': sharedPath,
    },
    dedupe: ['vue', 'vue-router', '@wordpress/icons'],
  },
  server: {
    port: 3600,
    fs: {
      allow: ['..'],
    },
  },
})
