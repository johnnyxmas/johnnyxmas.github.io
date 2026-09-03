import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/', // Since you have a custom domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mediaCoverage: resolve(__dirname, 'media-coverage/index.html'),
        speaking: resolve(__dirname, 'speaking/index.html'),
      },
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/chunk-[hash].js',
        assetFileNames: (info) => info.name?.endsWith('.css')
          ? 'assets/style-[hash][extname]'
          : 'assets/[name]-[hash][extname]',
      }
    }
  }
})