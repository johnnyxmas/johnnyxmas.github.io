// Generates dist/sitemap.xml with a real per-page <lastmod>.
//
// The date comes from git rather than from the build clock: a rebuild that
// changes nothing shouldn't advance lastmod, or crawlers learn to distrust
// it. For each page we look at the sources that actually compose it — if any
// have uncommitted edits the page is changing right now, so we date it today;
// otherwise we use the last commit that touched them.
//
// Runs after `vite build` (see the "sitemap" script in package.json) and
// writes into dist/, so it overwrites nothing in public/. Sitemaps aren't
// served by `vite dev`, which is fine — only the deployed copy matters.

import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const SITE_URL = 'https://johnnyxmas.net';

// Sources every page is built from, so a change to the shared stylesheet or
// theme module counts toward all of them.
const SHARED_SOURCES = ['src/app.css', 'src/lib'];

const PAGES = [
  {
    loc: '/',
    priority: '1.0',
    changefreq: 'monthly',
    sources: ['index.html', 'src/App.svelte', 'src/main.js'],
  },
  {
    loc: '/media-coverage/',
    priority: '0.8',
    changefreq: 'monthly',
    sources: [
      'media-coverage/index.html',
      'src/MediaCoverage.svelte',
      'src/media-coverage-main.js',
    ],
  },
];

const today = () => new Date().toISOString().slice(0, 10);

function git(args) {
  return execFileSync('git', args, { cwd: projectRoot, encoding: 'utf8' }).trim();
}

function lastModified(sources) {
  const paths = [...sources, ...SHARED_SOURCES].filter((p) =>
    existsSync(resolve(projectRoot, p)),
  );
  if (paths.length === 0) return today();

  try {
    // Uncommitted edits (staged or not) mean the page is changing today.
    if (git(['status', '--porcelain', '--', ...paths])) return today();
    return git(['log', '-1', '--format=%cs', '--', ...paths]) || today();
  } catch {
    // No git, or not a repo — a build-clock date beats emitting nothing.
    return today();
  }
}

const body = PAGES.map((page) => {
  const lastmod = lastModified(page.sources);
  return [
    '  <url>',
    `    <loc>${SITE_URL}${page.loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    '  </url>',
  ].join('\n');
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = resolve(projectRoot, 'dist/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`sitemap.xml written for ${PAGES.length} pages`);
for (const page of PAGES) {
  console.log(`  ${page.loc} — lastmod ${lastModified(page.sources)}`);
}
