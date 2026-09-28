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

    // Bounded hard, and the query string is dropped. This text renders
    // inside something that looks like a real system alert, so a crafted
    // link shouldn't be able to put an arbitrary sentence — a fake support
    // number, say — on the page. 32 is comfortably longer than any real
    // path here ('/media-coverage/' is 16) and too short to carry a lure.
    const raw = window.location.pathname;
    path = raw.length > 32 ? raw.slice(0, 32) + '…' : raw;

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
  // another alert. Each Cancel stacks the next one, offset like real windows.
  // Fifteen of these are allowed to exist at once; cancelling the fifteenth
  // is the one Cancel button in this whole site that isn't a fake-out.
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
    },
    {
      heading: 'has entered a retry loop.',
      body: 'Cancel and Try Again have converged. There is currently no functional difference between the two buttons on this dialog.'
    },
    {
      heading: 'is being searched for by a disk utility that does not exist.',
      body: 'Checking… Checking… Checking. This is not a progress bar. It is just a word we like.'
    },
    {
      heading: 'has triggered a Type 11 error.',
      body: 'Type 11 errors have no documented cause and no documented fix. You are meant to just live with this now.'
    },
    {
      heading: 'is being replaced by increasingly worse news.',
      body: 'Somewhere behind this window there used to be a page. It is having a worse day than you are.'
    },
    {
      heading: 'has exceeded a reasonable number of dialogs.',
      body: 'Nine. There have been nine of these. Somebody should really be paged.'
    },
    {
      heading: 'is now a memory management problem.',
      body: 'Each dialog you cancel is a small unfreed allocation. This system will need to be restarted eventually. Possibly by you.'
    },
    {
      heading: 'is a sign, not a bug.',
      body: 'Eleven dialogs is not a technical limitation. It is a personal choice you are actively making.'
    },
    {
      heading: 'has become load-bearing.',
      body: 'Do not close this window. We are no longer sure what it is holding up, but something clearly is.'
    },
    {
      heading: 'is unlucky, as advertised.',
      body: 'Thirteen. If you were waiting for a sign to stop clicking Cancel, this was it.'
    },
    {
      heading: 'is the last normal-looking dialog you will see.',
      body: 'The next one looks different. This is your last chance to click Go Home instead.'
    },
    {
      heading: 'cannot be recovered from.',
      body: 'Cancelling this one does not produce dialog number sixteen.'
    }
  ];

  let depth = $state(0);
  let showDeadMac = $state(false);

  function cancel() {
    if (depth < dialogs.length - 1) {
      depth += 1;
    } else {
      showDeadMac = true;
    }
  }

  function reboot() {
    window.location.reload();
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

  {#if showDeadMac}
    <!-- The one Cancel button on this page that wasn't a fake-out. Fifteen
         stacked alerts is where the simulated System 6 gives up entirely. -->
    <div class="dead-mac" role="alert">
      <svg class="dead-mac-icon" viewBox="0 0 64 76" width="240" height="285" shape-rendering="crispEdges" role="img" aria-label="Sad Mac error screen">
        <rect x="2" y="2" width="60" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="10" y="9" width="44" height="32" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M20 18 L29 27 M29 18 L20 27" stroke="currentColor" stroke-width="2"/>
        <path d="M35 18 L44 27 M44 18 L35 27" stroke="currentColor" stroke-width="2"/>
        <path d="M20 35 Q32 26 44 35" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="26" y="54" width="12" height="6" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="60" width="36" height="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="6" y="64" width="52" height="4" fill="none" stroke="currentColor" stroke-width="2"/>
      </svg>
      <p class="dead-mac-code">0000000F 00000003</p>
      <p class="dead-mac-note">Fifteen dialogs was the limit. This is not a dialog.</p>
      <button type="button" class="alert-button alert-default" onclick={reboot}>Reboot</button>
    </div>
  {:else}
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
          <button type="button" class="alert-button" onclick={cancel}>Cancel</button>
          <a class="alert-button alert-default" href="/">Go Home</a>
        </div>
      </div>
    </div>

    <p class="error-hint">
      Or try <a href="/speaking/">Speaking</a> &middot;
      <a href="/media-coverage/">Media Coverage</a>
    </p>
  {/if}
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

  /* The fatal-error screen behind fifteen stacked alerts. Full desktop,
     no window chrome — a real Sad Mac wasn't in a window either. */
  .dead-mac {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  .dead-mac-icon { color: var(--ink); }

  .dead-mac-code {
    margin: 0;
    font-family: var(--pixel);
    font-size: 13px;
    letter-spacing: 0.08em;
    color: var(--ink);
  }

  .dead-mac-note {
    margin: 0;
    max-width: 320px;
    font-size: 13px;
    text-align: center;
    color: var(--ink-soft);
  }

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
