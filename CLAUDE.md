# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Personal website for Johnny Xmas (johnnyxmas.net), a hacker/infosec personality. It's a Svelte 5 single-page "link tree" style site with a retro hacker/CRT aesthetic, deployed to GitHub Pages.

## Development Commands

All commands run from the `svelte-site/` directory:

```bash
cd svelte-site
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build to svelte-site/dist/
npm run preview    # preview production build locally
```

There are no tests or linters configured.

## Deployment

- **Automatic**: Push to `main` triggers GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to GitHub Pages.
- **Manual**: `npm run deploy` builds, creates `.nojekyll`, and copies `index.html` to `404.html` in dist. Then copy `dist/` contents to repo root.
- Custom domain: `johnnyxmas.net` (configured via `CNAME` at repo root and `svelte-site/public/CNAME`).

## Architecture

The Svelte source lives in `svelte-site/src/`. The repo root contains the built/deployed static files.

- **`App.svelte`** - Single main component. Contains all page content as data-driven link arrays (`contactLinks`, `socialLinks`, `mediaLinks`, `podcastLinks`, `supportLinks`) rendered with `{#each}` blocks. Uses Bootstrap 3 panels for layout and glyphicons for icons (loaded via CDN).
- **`MatrixRain.svelte`** - Canvas-based Matrix rain background animation. Renders as a fixed full-screen canvas behind all content.
- **`app.css`** - All custom styling: CRT scanline/flicker effects, green-on-black terminal theme, video player styling, responsive overrides.
- **`main.js`** - Svelte 5 mount entrypoint.

Static assets live in `svelte-site/public/` and are copied to `dist/` on build:
- `public/assets/vid/jtv.mp4` - looping background video
- `public/assets/img/crt.png` - CRT overlay image

## Key Details

- Svelte 5 with Vite 7, no TypeScript
- External CDN dependencies: Bootstrap 3.4.1, Font Awesome 5.15.4, Google Fonts (DM Sans, VT323)
- Video starts muted with autoplay; mute toggle button controls audio
- The root `index.html` and `assets/` are the current deployed build output (not source)
