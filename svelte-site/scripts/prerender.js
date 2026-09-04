// Renders each page's Svelte component to HTML at build time and injects it
// into the built <div id="app"></div>.
//
// Why: both pages render client-side, so the served HTML carried only an
// empty container. Google executes JS and would eventually index it, but
// most other crawlers — including the LLM ones that increasingly drive
// referrals — do not, which meant the talk abstracts and the appearance list
// were invisible to them. The metadata in <head> was always static; this
// makes the body static too.
//
// The client then hydrates this markup rather than replacing it (src/lib/
// boot.js), so there is no flash and no double render.
//
// Runs after `vite build` and after the SSR build; see the "deploy" script.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ssrEntry = resolve(projectRoot, 'dist-ssr/entry-server.js');

if (!existsSync(ssrEntry)) {
  console.error('prerender: dist-ssr/entry-server.js is missing — run the SSR build first.');
  process.exit(1);
}

const { pages, render } = await import(pathToFileURL(ssrEntry).href);

// The exact empty container Vite leaves in the built HTML. Matching it
// literally means a change to the template fails loudly here rather than
// silently shipping an unprerendered page.
const CONTAINER = '<div id="app"></div>';

let count = 0;
for (const [page, Component] of Object.entries(pages)) {
  const file = resolve(projectRoot, 'dist', page);
  const html = readFileSync(file, 'utf8');

  if (!html.includes(CONTAINER)) {
    console.error(`prerender: ${page} has no empty ${CONTAINER} to fill.`);
    process.exit(1);
  }

  const { body, head } = render(Component);

  // <svelte:head> content is injected too: without it the client would add
  // those tags on hydrate and they would be missing from the served HTML,
  // which is the whole problem being fixed.
  let out = html.replace(CONTAINER, `<div id="app">${body}</div>`);
  if (head.trim()) out = out.replace('</head>', `${head}\n  </head>`);

  writeFileSync(file, out);
  console.log(`  ${page} — ${body.length.toLocaleString()} bytes of markup`);
  count++;
}

console.log(`prerendered ${count} pages`);
