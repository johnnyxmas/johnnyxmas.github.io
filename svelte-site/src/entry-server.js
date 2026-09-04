// The server half of the build: the same components, rendered to HTML strings
// by scripts/prerender.js. Keyed by the page's built HTML file so the
// prerender script needs no separate route table.
// render is re-exported from here rather than imported by the prerender
// script directly: this bundle inlines its own copy of Svelte's internals,
// and a render() from a second copy renders against different module state
// (which fails with "Cannot read properties of null").
export { render } from 'svelte/server'

import App from './App.svelte'
import MediaCoverage from './MediaCoverage.svelte'
import Speaking from './Speaking.svelte'
import NotFound from './NotFound.svelte'

export const pages = {
  'index.html': App,
  'speaking/index.html': Speaking,
  'media-coverage/index.html': MediaCoverage,
  '404.html': NotFound,
}
