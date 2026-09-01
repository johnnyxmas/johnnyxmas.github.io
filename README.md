# johnnyxmas.net

Personal site for Johnny Xmas — a single-page link hub styled as a **System 6 Macintosh desktop**: 1-bit black-on-white windows, striped title bars, and a dithered grey desktop. Svelte 5 + Vite, no CSS framework, served by GitHub Pages.

Live at **[johnnyxmas.net](https://johnnyxmas.net)**.

---

## Quick start

```bash
cd svelte-site
npm install
npm run dev        # http://localhost:5173
```

Other scripts (all from `svelte-site/`):

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `svelte-site/dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Build, then add `.nojekyll` and `404.html` to `dist/` |

There are no tests or linters configured.

---

## Editing the content

Almost every routine change is a one-line edit to an array near the top of **`svelte-site/src/App.svelte`**. Each entry is `{ href, icon, text }`, and the page renders them with `{#each}` blocks — add, remove, or reorder freely.

| Array | Window it fills |
| --- | --- |
| `mediaLinks` | Media and Presentations |
| `contactLinks` | Contact Me |
| `socialLinks` | Social Media (renders as a grid, not a list) |
| `podcastLinks` | Podcasts |
| `supportLinks` | Support Me |
| `menus` | The menu bar at the top — anchor links to the sections |

`icon` is a [Font Awesome 6](https://fontawesome.com/icons) class string, e.g. `"fa-brands fa-twitch"` or `"fa-solid fa-lock"`. Only the **solid** and **brands** sets are loaded.

To add a whole new section, copy an existing `<section class="win">` block and give it a unique `id`, then add a matching entry to `menus`.

---

## Deploying

> **GitHub Pages serves from the repo root of `main`. There is no deploy workflow.**
> The only file in `.github/workflows/` is `workflow-drift-detection.yml`, a scheduled security check — it does not build anything.

This means a source change is **not live until you regenerate the build output at the repo root**:

```bash
cd svelte-site && npm run deploy
cd .. && rm -f assets/index-*.css assets/index-*.js && cp -R svelte-site/dist/. .
git add -A && git commit -m "Rebuild site" && git push
```

Deleting the old `assets/index-*` files first is not optional — Vite emits a new content hash on every build, so stale bundles pile up at the root otherwise.

**Don't hand-edit `index.html`, `404.html`, or `assets/index-*` at the repo root.** They're generated; your changes will be overwritten by the next build. The source of truth is `svelte-site/src/`.

Custom domain is set by `CNAME`, which exists in two places — the repo root and `svelte-site/public/` (so the build reproduces it). Keep them in sync.

---

## The video

The deployed file is **320×240, ~6.7 MB** — deliberately low-resolution, to match the retro framing.

The full-resolution edit master is **not kept in this repo**. Video masters are large enough to be a real problem in git (GitHub warns at 50 MB, rejects at 100 MB, and a committed blob that size can't be removed without rewriting history), so `svelte-site/.gitignore` blocks `src/assets/*.mkv` and `*.mov` to stop one being added by accident. Keep your master wherever you keep your footage.

To regenerate the deployed video from a new 1920×1080 master:

```bash
ffmpeg -i /path/to/your/master.mkv \
  -vf "crop=1440:1080:240:0,scale=320:240:flags=bicubic" \
  -c:v libx264 -profile:v main -preset slow -crf 26 -pix_fmt yuv420p -r 24 \
  -c:a aac -b:a 96k -ac 2 -movflags +faststart \
  svelte-site/public/assets/vid/jtv.mp4
```

- `crop=1440:1080:240:0` takes a centered 4:3 window out of a 16:9 master, so the movie window has no letterbox bars. Adjust the `240` x-offset to shift the crop left or right.
- `+faststart` moves the moov atom to the front so playback starts before the file finishes downloading.
- Raise `-crf` for a smaller file, lower it for better quality. 26 is a good balance at this resolution.

After regenerating, rebuild and copy to the repo root (see [Deploying](#deploying)) — `public/` is only the build input.

The video autoplays muted (browsers require this); the speaker button in the movie window's control strip unmutes it.

---

## How the styling works

All of it lives in **`svelte-site/src/app.css`** — roughly 400 lines, no framework, no build-time CSS tooling.

The palette is genuinely two colors, `--ink` (`#000`) and `--paper` (`#fff`), plus a dither between them. Everything else is a named token at the top of the file. The design is **deliberately single-theme** — there is no dark mode, and every color is painted explicitly rather than inherited.

Reusable pieces:

- **`.win`** — a Mac window: 2px black border, striped title bar, close box, hard offset drop shadow. Used for every section.
- **`.link-list`** / **`.link-grid`** — the two link layouts. Hover inverts to white-on-black, the way System 6 drew selection.
- **`.menubar`** — the fixed top bar. It's real navigation, not decoration.

### Two things that will bite you

1. **The desktop dither uses 2px squares, not 1px.** A true 1px checkerboard is more historically accurate but moirés into a visible cyan colour cast on scaled and HiDPI displays. Don't "fix" it back to 1px without checking on a real screen.
2. **`.win` carries `scroll-margin-top`.** Without it, menu-bar anchor jumps land with the section's title bar hidden underneath the fixed menu bar.

### Fonts and icons

Loaded from CDN in the `<svelte:head>` block of `App.svelte`:

- **Silkscreen** — pixel face, used for all chrome: menu bar, window titles, the name plate
- **IBM Plex Sans** — body text and link labels
- **Font Awesome 6.7.2** — solid + brands only

There is **no Bootstrap.** It was removed deliberately: the markup had been using Bootstrap 3 `panel` classes while loading the Bootstrap 5 stylesheet, where those classes don't exist — so ~60 KB was being fetched to style nothing.

---

## Layout

```
├── index.html, 404.html, assets/   ← generated build output (do not edit)
├── CNAME, .nojekyll, favicons      ← Pages config, copied from public/
└── svelte-site/                    ← the actual source
    ├── src/
    │   ├── App.svelte              ← all markup + content arrays
    │   ├── app.css                 ← all styling
    │   └── main.js                 ← Svelte 5 mount entrypoint
    └── public/                     ← copied verbatim into the build
        └── assets/
            ├── vid/jtv.mp4         ← deployed video
            └── img/opengraph.jpg   ← social share card
```
