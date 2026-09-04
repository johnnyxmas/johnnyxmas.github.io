<script>
  import { onMount, onDestroy } from 'svelte';
  import './app.css';
  import { readStoredTheme, applyTheme, storeTheme, nextTheme, themeIconFor, themeLabelFor } from './lib/theme.js';

  let clock = $state('');
  let clockTimer;

  let themePreference = $state('system');
  let systemPrefersDark = $state(false);
  let darkMediaQuery;
  let handleDarkMediaChange;

  let themeIcon = $derived(themeIconFor(themePreference));
  let themeLabel = $derived(themeLabelFor(themePreference, systemPrefersDark));
  let themeColor = $derived(
    (themePreference === 'dark' || (themePreference === 'system' && systemPrefersDark))
      ? '#23252B'
      : '#ffffff'
  );

  function cycleTheme() {
    themePreference = nextTheme(themePreference);
    storeTheme(themePreference);
    applyTheme(themePreference);
  }

  function tick() {
    clock = new Date()
      .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      .toLowerCase();
  }

  // The page is prerendered, so the real path isn't known at build time.
  // It stays empty through hydration and fills in on mount — the fallback
  // below is what a crawler and a no-JS visitor see.
  let path = $state('');

  onMount(() => {
    tick();
    clockTimer = setInterval(tick, 15000);

    path = window.location.pathname + window.location.search;

    themePreference = readStoredTheme();
    applyTheme(themePreference);

    darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemPrefersDark = darkMediaQuery.matches;
    handleDarkMediaChange = (e) => { systemPrefersDark = e.matches; };
    darkMediaQuery.addEventListener('change', handleDarkMediaChange);
  });

  onDestroy(() => {
    if (clockTimer) clearInterval(clockTimer);
    if (darkMediaQuery && handleDarkMediaChange) {
      darkMediaQuery.removeEventListener('change', handleDarkMediaChange);
    }
  });

  // Cancelling a Mac alert in 1988 rarely got you out of anything; it got you
  // another alert. Each Cancel stacks the next one, offset like real windows,
  // until the last one stops offering the option.
  const dialogs = [
    {
      heading: 'could not be found.',
      body: 'It may have been renamed, deleted, or moved to a server I no longer have credentials for.'
    },
    {
      heading: 'still could not be found.',
      body: 'Cancelling does not restore missing files. This was true in 1988 and remains true today.'
    },
    {
      heading: 'is not going to be found.',
      body: 'You are now three dialogs deep. This is roughly how we lost the entire 1990s.'
    },
    {
      heading: 'has been reclassified.',
      body: 'Error -404. Its current location is not something I am cleared to disclose. Ask me at a conference.'
    }
  ];

  let depth = $state(0);
  let atEnd = $derived(depth >= dialogs.length - 1);

  function cancel() {
    if (!atEnd) depth += 1;
  }
</script>

<svelte:head>
  <meta name="theme-color" content={themeColor}>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/solid.min.css">
</svelte:head>

<nav class="menubar" aria-label="Sections">
  <a class="menubar-apple" aria-hidden="false" href="/" title="Home">
    <svg viewBox="0 0 20 24" width="13" height="16" fill="currentColor" role="presentation">
      <path d="M13.4 6.3c1.4 0 2.9.7 3.9 1.9-3.4 2.1-2.9 7 .8 8.3-.8 2.2-2.7 5.1-4.3 5.1-1.1 0-1.6-.7-2.9-.7s-1.9.7-2.9.7c-1.9 0-4.9-4.4-4.9-8.1 0-4 2.5-6 4.9-6 1.3 0 2.3.8 3.1.8.7 0 1.9-.9 2.3-.9z"/>
      <path d="M13.1 0c.2 1.8-1.1 3.8-2.9 4C10 2.2 11.5.3 13.1 0z"/>
    </svg>
  </a>
  <a class="menubar-item" href="/">&larr; Home</a>
  <a class="menubar-item" href="/speaking/">Speaking</a>
  <button
    type="button"
    class="menubar-theme"
    title={themeLabel}
    aria-label={`${themeLabel}. Click to change.`}
    onclick={cycleTheme}
  >
    <i class={themeIcon} aria-hidden="true"></i>
  </button>
  <span class="menubar-clock">{clock}</span>
</nav>

<main class="desktop error-desktop">
  <h1 class="sr-only">404 — page not found</h1>

  <div class="alert-stack">
    <!-- Every dialog cancelled so far stays on screen behind the current
         one, offset, the way a stack of unhandled alerts used to look. -->
    {#each dialogs.slice(0, depth) as dialog, i}
      <div class="alert alert-buried" style="--i: {i}" aria-hidden="true">
        <div class="alert-body">
          <span class="alert-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges" role="presentation">
              <path d="M16 2 L30 28 L2 28 Z" fill="none" stroke="currentColor" stroke-width="2"/>
              <rect x="15" y="11" width="2" height="9" fill="currentColor"/>
              <rect x="15" y="22" width="2" height="2" fill="currentColor"/>
            </svg>
          </span>
          <div class="alert-text">
            <p class="alert-heading">The page &ldquo;{path || 'you asked for'}&rdquo; {dialog.heading}</p>
            <p class="alert-note">{dialog.body}</p>
          </div>
        </div>
      </div>
    {/each}

    <div class="alert" style="--i: {depth}" role="alertdialog" aria-labelledby="alert-heading">
      <div class="alert-body">
        <span class="alert-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges" role="presentation">
            <path d="M16 2 L30 28 L2 28 Z" fill="none" stroke="currentColor" stroke-width="2"/>
            <rect x="15" y="11" width="2" height="9" fill="currentColor"/>
            <rect x="15" y="22" width="2" height="2" fill="currentColor"/>
          </svg>
        </span>
        <div class="alert-text">
          <p class="alert-heading" id="alert-heading">
            The page &ldquo;{path || 'you asked for'}&rdquo; {dialogs[depth].heading}
          </p>
          <p class="alert-note">{dialogs[depth].body}</p>
        </div>
      </div>
      <div class="alert-buttons">
        {#if !atEnd}
          <button type="button" class="alert-button" onclick={cancel}>Cancel</button>
        {/if}
        <a class="alert-button alert-default" href="/">Go Home</a>
      </div>
    </div>
  </div>

  <p class="error-hint">
    Or try <a href="/speaking/">Speaking</a> &middot;
    <a href="/media-coverage/">Media Coverage</a>
  </p>
</main>

<style>
  .error-desktop {
    min-height: calc(100vh - var(--menubar-h));
    justify-content: center;
    gap: 34px;
  }

  /* The stack is positioned relative so each buried dialog can offset off
     the same origin; the live one sits in normal flow and sets the height. */
  .alert-stack {
    position: relative;
    width: 100%;
    max-width: 460px;
  }

  .alert {
    position: relative;
    background: var(--paper);
    border: var(--chrome) solid var(--ink);
    box-shadow: var(--drop) var(--drop) 0 var(--shadow);
    padding: 20px 22px 18px;
    transform: translate(calc(var(--i) * 10px), calc(var(--i) * -10px));
  }

  .alert-buried {
    position: absolute;
    inset: 0;
  }

  .alert-body {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .alert-icon {
    flex: none;
    color: var(--ink);
    line-height: 0;
  }

  .alert-heading {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--ink);
    /* A long unbroken path shouldn't push the dialog off the desktop. */
    overflow-wrap: anywhere;
  }

  .alert-note {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--ink-soft);
  }

  .alert-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
  }

  .alert-button {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    font-family: var(--pixel);
    font-size: 11px;
    letter-spacing: 0.02em;
    color: var(--ink);
    text-decoration: none;
    background: var(--paper);
    border: var(--chrome) solid var(--ink);
    cursor: pointer;
  }
  .alert-button:hover,
  .alert-button:focus-visible {
    background: var(--ink);
    color: var(--paper);
    outline: none;
  }
  .alert-button:active { transform: translate(1px, 1px); }

  /* System 6 ringed the default button with a second, outset border. */
  .alert-default {
    box-shadow: 0 0 0 2px var(--paper), 0 0 0 4px var(--ink);
    margin-right: 3px;
  }

  .error-hint {
    margin: 0;
    /* Sits directly on the desktop, which in light mode is a dither — needs
       its own paper ground to stay legible. */
    background: var(--paper);
    padding: 6px 12px;
    font-family: var(--pixel);
    font-size: 10px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }
  .error-hint a {
    color: var(--ink-soft);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .error-hint a:hover,
  .error-hint a:focus-visible { color: var(--ink); outline: none; }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
</style>
