// The SSR half of the build. Compiles the same components for Node so
// scripts/prerender.js can render them to HTML, into a dist-ssr/ directory
// that is never deployed — only dist/ is copied to the repo root.
//
// Separate from vite.config.js because the two builds disagree on nearly
// everything: different entry, different target, different output shape, and
// this one must not touch dist/.
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

export default defineConfig({
  // build.ssr already puts the plugin in server-generate mode.
  plugins: [svelte()],
  build: {
    ssr: resolve(__dirname, 'src/entry-server.js'),
    outDir: 'dist-ssr',
    emptyOutDir: true,
    // The stylesheet is emitted by the client build; here the import only
    // needs to not crash.
    cssCodeSplit: false,
    rollupOptions: {
      output: { entryFileNames: 'entry-server.js' },
    },
  },
})
