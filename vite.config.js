import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        success: resolve(__dirname, 'success.html'),
        cancel: resolve(__dirname, 'cancel.html')
      }
    },
    // Optimizaciones para SEO
    minify: 'terser',
    sourcemap: false,
    // Optimizar assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    open: true
  },
  // Optimizaciones para Vercel
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  // Configuración para assets
  publicDir: 'public',
  // Optimizaciones de CSS
  css: {
    postcss: './postcss.config.cjs'
  }
}) 