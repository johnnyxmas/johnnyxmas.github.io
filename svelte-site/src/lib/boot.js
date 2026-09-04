// Mount or hydrate, depending on what the server sent.
//
// `npm run build` prerenders each page's markup into its #app container (see
// scripts/prerender.js), so in production there is already DOM to adopt and
// hydrate() is correct — it reuses those nodes instead of discarding them,
// which is what stops the prerendered text from flashing and being replaced.
// `vite dev` serves an empty container, so fall back to mount() there.
import { mount, hydrate } from 'svelte';

export function boot(Component) {
  const target = document.getElementById('app');
  return (target.hasChildNodes() ? hydrate : mount)(Component, { target });
}
