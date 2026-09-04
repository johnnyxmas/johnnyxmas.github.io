# CLAUDE.md

**Read [README.md](README.md) first — it is the real documentation for this repo.**

Two facts worth loading up front, because both have caused wrong assumptions before:

1. **GitHub Pages serves from the repo root of `main`, and there is no deploy workflow.** A change to `svelte-site/src/` is *not* live until the build output at the repo root is regenerated and committed. `.github/workflows/` contains only a scheduled security check — nothing that builds. (An earlier version of this file claimed a `deploy.yml` existed; it never did.)

2. **Everything at the repo root is generated** — `index.html`, `404.html`, `.nojekyll`, `CNAME`, the favicons, and `assets/index-*`. Never edit any of it by hand. The source of truth is `svelte-site/src/` for code (`App.svelte`, `app.css`) and `svelte-site/public/` for static files, including the custom domain in `public/CNAME`.

To publish, run this and commit the result — don't do the steps by hand:

```bash
cd svelte-site && npm run sync
```

`sync` builds all four pages (`404.html` is built from its own template, not copied from the homepage), prerenders each one's markup into its `<div id="app">`, clears the previous hashed bundles from the root, and copies the fresh build over. Clearing the old bundles is the part that matters: Vite emits a new content hash every build, and a copy that skips it leaves `404.html` referencing an `assets/index-<oldhash>.js` that no longer exists — the 404 page renders blank while the homepage still looks fine.
