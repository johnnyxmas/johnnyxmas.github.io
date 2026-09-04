# johnnyxmas.net

Johnny Xmas's personal site, styled as a System 6 Macintosh desktop — 1-bit windows, striped title bars, dithered grey background. Svelte 5 + Vite, no CSS framework, hosted on GitHub Pages.

Three pages: the homepage, `/speaking/` (talks, stages, booking), and `/media-coverage/` (press).

Live at **[johnnyxmas.net](https://johnnyxmas.net)**.

## Running it

```bash
cd svelte-site
npm install
npm run dev
```

No tests, no linter.

## Deploying — read this part

**GitHub Pages serves from the repo root of `main`, and nothing builds automatically.** The only workflow in `.github/workflows/` is a scheduled security check. So a change under `svelte-site/src/` is not live until the build output at the repo root is regenerated and committed:

```bash
cd svelte-site && npm run sync
cd .. && git add -A && git commit -m "Rebuild site" && git push
```

`sync` builds, prerenders, generates `404.html`, clears the old hashed bundles out of the root, and copies the fresh build over.

Don't do those steps by hand. Vite emits a new content hash every build, and skipping the cleanup fails quietly: `404.html` ends up pointing at an `assets/index-<oldhash>.js` that's gone, so the 404 page renders blank while the homepage looks perfectly fine.

**Everything at the repo root is generated** — `index.html`, `404.html`, `assets/`, the favicons, `CNAME`, `.nojekyll`. Never edit any of it. Source of truth is `svelte-site/src/` for code and `svelte-site/public/` for static files, including the custom domain in `public/CNAME`.

## Editing content

Most changes are one line in an array near the top of a component:

- **`src/App.svelte`** — `mediaLinks`, `contactLinks`, `socialLinks`, `podcastLinks`, `menus`. Each entry is `{ href, icon, text }`.
- **`src/lib/stages.js`** — the speaking record. `appearances` is the detailed list on `/speaking/`; `conWall` is the shelf of con names. The wall is intentionally broader than the list: `appearances` only covers talks there's a recording of, so don't "reconcile" the two.
- **`src/Speaking.svelte`** — the talk catalogue, with abstracts.
- **`src/MediaCoverage.svelte`** — press items, each with an ISO date so sections sort newest-first.

`icon` is a [Font Awesome 6](https://fontawesome.com/icons) class. Only **solid** and **brands** are loaded.

Crawler-facing metadata (title, description, canonical, OG/Twitter, JSON-LD) lives in each page's `index.html`, not in `<svelte:head>` — scrapers don't run JS. The canonical `Person` node is in the root `index.html` and the other two pages reference it by `@id`.

## Prerendering

The pages render client-side, so the built HTML used to ship an empty `<div id="app"></div>`. Google executes JS and gets there eventually; most other crawlers, including the LLM ones, don't — which made the talk abstracts and the appearance list invisible to them.

`npm run prerender` SSR-builds the same components into `dist-ssr/` (git-ignored, never deployed), then `scripts/prerender.js` renders each one and injects the markup into `dist/`, `<svelte:head>` included. The client hydrates that markup instead of replacing it: `src/lib/boot.js` picks `hydrate()` when the container has children, `mount()` when it doesn't, so `vite dev` still works.

Two things that'll bite you:

- **`src/entry-server.js` re-exports `render` from `svelte/server`, and the prerender script uses that one.** The SSR bundle inlines its own copy of Svelte's internals, so a `render()` imported separately from `node_modules` is a different module instance and dies with `Cannot read properties of null (reading 'r')`.
- **The script matches the literal `<div id="app"></div>` and exits non-zero if a page lacks it.** That's on purpose — a changed template should break the build instead of quietly shipping an unprerendered page.

## Styling

All in **`src/app.css`**, ~670 lines, no framework. Every color is a token at the top of the file; nothing hardcodes ink or paper elsewhere.

Light is the default. Dark mode is a separate charcoal palette rather than an inverted one, following the OS preference unless the menu-bar toggle overrides it via `[data-theme]` on `<html>` (see `src/lib/theme.js`). Both `index.html` files apply a stored override before paint so there's no flash.

Reusable pieces: **`.win`** (the window chrome), **`.link-list`** / **`.link-grid`** (hover inverts, the way System 6 drew selection), **`.menubar`** (real navigation, not decoration), **`.con-wall`** (the con name chips).

Two more traps:

1. **The desktop dither uses 2px squares, not 1px.** A true 1px checkerboard is more accurate but moirés into a visible cyan cast on HiDPI displays. Don't "fix" it without looking at a real screen.
2. **`.win` carries `scroll-margin-top`.** Without it, menu-bar anchor jumps land with the section's title bar hidden under the fixed menu bar.

Fonts and Font Awesome load from CDN in each component's `<svelte:head>`: **Silkscreen** for all chrome, **IBM Plex Sans** for body text. There's deliberately no Bootstrap — the markup used to load Bootstrap 5 while using Bootstrap 3 class names, so ~60 KB was being fetched to style nothing.

## The video

The deployed file is 320×240, ~6.7 MB — deliberately low-res to match the framing. It autoplays muted (browsers insist); the speaker button unmutes it.

The edit master is **not in this repo**. Masters are big enough to be a real problem in git — GitHub warns at 50 MB, rejects at 100 MB, and a committed blob that size needs a history rewrite to remove — so `svelte-site/.gitignore` blocks `src/assets/*.mkv` and `*.mov`. Keep yours wherever you keep footage.

To regenerate from a new 1920×1080 master:

```bash
ffmpeg -i /path/to/master.mkv \
  -vf "crop=1440:1080:240:0,scale=320:240:flags=bicubic" \
  -c:v libx264 -profile:v main -preset slow -crf 26 -pix_fmt yuv420p -r 24 \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart \
  svelte-site/public/assets/vid/jtv.mp4
```

`crop=1440:1080:240:0` pulls a centered 4:3 window out of a 16:9 master so there are no letterbox bars — adjust the `240` to shift it. `+faststart` moves the moov atom up front so playback starts before the download finishes. Raise `-crf` for a smaller file; 26 is a good balance here.

Then run `npm run sync` — `public/` is only build input.
