<script>
  import { onMount, onDestroy } from 'svelte';
  import './app.css';
  import { readStoredTheme, applyTheme, storeTheme, nextTheme, themeIconFor, themeLabelFor } from './lib/theme.js';
  import { appearances, conWall } from './lib/stages.js';

  const BOOKING_EMAIL = 'booking@johnnyxmas.net';

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

  onMount(() => {
    tick();
    clockTimer = setInterval(tick, 15000);

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

  // The talk catalogue, mirrored from sessionize.com/johnnyxmas onto this
  // domain on purpose: an organizer searching for "OT pentest speaker"
  // should land here, not on a third-party profile page. Each abstract is
  // real body copy, not a bare title — the searchable terms live in it.
  const talks = [
    {
      title: "Your OT Environment Isn't Ready for a Pentest",
      abstract: 'What actually has to be true before a penetration test of an operational technology environment produces anything but a scared plant manager. Asset inventory, network segmentation and the foundational controls that decide whether a red team engagement in an ICS network is useful or merely expensive.',
      tags: ['OT security', 'ICS', 'penetration testing']
    },
    {
      title: 'Couch to Compromise: How to Hack (and Defend) Large Companies',
      abstract: 'A candid, step-by-step walkthrough of the attack chain used to compromise a large enterprise — every piece of low-hanging fruit, why each one works, and what to do about it. Attendees leave with actions they can take on Monday that raise their security posture with little to no budget, make future penetration tests more cost-effective by removing the cheap shots, and, incidentally, with the ability to become domain admin of an average corporation from their couch.',
      tags: ['red teaming', 'enterprise security', 'attack chains']
    },
    {
      title: 'Artificial Intelligence, Real Threats',
      abstract: 'AI has transcended buzzword status into a potent and accessible tool, and that power cuts both ways. A look at the darker side: how adversaries actually harness AI in sophisticated information security attacks, what that changes about social engineering and enterprise compromise, and which defensive strategies keep you ahead of it.',
      tags: ['AI security', 'social engineering', 'threat landscape']
    },
    {
      title: '5 Lies Enterprise Security Still Tells Itself',
      abstract: 'Expired risk acceptances that quietly became policy, asset inventories nobody maintains, an identity perimeter held together with exceptions, vendor risk theater, and expensive controls that detect nothing. Five systemic enterprise security failures, and what to change on Monday.',
      tags: ['security governance', 'risk', 'CISO']
    },
    {
      title: 'Superposition, not Superstition',
      abstract: 'A sober analysis of what quantum computing actually does to your cryptography, minus the vendor panic. Realistic timelines for a cryptographically-relevant quantum computer, the engineering hurdles still in the way, where quantum key distribution genuinely helps, and how a CISO or architect should be planning post-quantum migration today.',
      tags: ['post-quantum', 'cryptography', 'security architecture']
    },
    {
      title: 'Airgap the Airheads: Imprisoning Serial Phish Clickers',
      abstract: 'How a $53B company took internet access away from its repeat phishing clickers, and what happened next. Phishing campaign design that measures something real, the technical implementation, the exception process, business continuity fallout, and the long-term effect on click rates.',
      tags: ['phishing', 'security awareness', 'social engineering']
    },
    {
      title: 'Poisoning Pidgins in the Park',
      abstract: 'A play-by-play of a hobbyist incident response to an active supply-chain attack against a widely used free and open-source communication tool. How the malicious plugin was found, how the community defended itself, and how to build real incident response experience without a badge.',
      tags: ['supply chain', 'incident response', 'malware']
    },
    {
      title: 'SIEM and the Art of Motorcycle Maintenance',
      abstract: 'Selecting, deploying and actually maintaining a SIEM, explained through the mechanics of motorcycle ownership. Why the industry keeps buying detection it never tunes, and what ongoing care a security monitoring platform genuinely requires.',
      tags: ['SIEM', 'detection engineering', 'security operations']
    },
    {
      title: "Saving Ryan's Privates",
      abstract: 'Despite strong passwords and MFA, the world\u2019s most private digital assets are still being stolen and leaked. Exposes the privacy myths that fail, the methods actually used to take this material, and actionable steps to reclaim control. Works for general audiences as well as security teams.',
      tags: ['privacy', 'security awareness']
    },
    {
      title: 'Ask a (Real) Hacker!',
      abstract: 'An unfiltered live Q&A: adversarial mindset, motivations, money laundering, and the tactics behind real intrusions, without the corporate gatekeeping. Works as a closing keynote or an executive session.',
      tags: ['keynote', 'Q&A', 'adversarial mindset']
    },
    {
      title: 'InfoSecs and the City',
      abstract: 'What makes a regional security community work, drawn from two decades in the Midwest scene and the CitySec meetup framework. How to start, revive, or hand off a local security meetup that outlives its founder.',
      tags: ['community', 'meetups', 'career development']
    },
    {
      title: 'IC (What You Did There)',
      abstract: 'Advancing a technical career — and the salary attached to it — without moving into management. Negotiation, levelling, and staying hands-on as an individual contributor.',
      tags: ['career development', 'individual contributor']
    },
    {
      title: 'Travel Hacks for the Traveling Hacker',
      abstract: 'Road-tested tactics from a career of nonstop travel: flight pricing, accelerating airline status, surviving coach, packing, jetlag, airport navigation, eating well on the road, and picking a hotel that will not ruin the week.',
      tags: ['business travel', 'lifestyle']
    }
  ];

  const menus = [
    { href: '#booking', text: 'Booking' },
    { href: '#talks', text: 'Talks' },
    { href: '#appearances', text: 'Stages' },
    { href: '#bio', text: 'Bio' }
  ];
</script>

<!-- Crawler-facing metadata (title, description, canonical, OG/Twitter,
     favicons, JSON-LD) lives in speaking/index.html so it is present in the
     served HTML — this page renders client-side, and search crawlers and
     social scrapers don't reliably run JS. Only dynamic tags belong here. -->
<svelte:head>
  <meta name="theme-color" content={themeColor}>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/solid.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/brands.min.css">
</svelte:head>

<nav class="menubar" aria-label="Sections">
  <a class="menubar-apple" aria-hidden="false" href="/" title="Home">
    <svg viewBox="0 0 20 24" width="13" height="16" fill="currentColor" role="presentation">
      <path d="M13.4 6.3c1.4 0 2.9.7 3.9 1.9-3.4 2.1-2.9 7 .8 8.3-.8 2.2-2.7 5.1-4.3 5.1-1.1 0-1.6-.7-2.9-.7s-1.9.7-2.9.7c-1.9 0-4.9-4.4-4.9-8.1 0-4 2.5-6 4.9-6 1.3 0 2.3.8 3.1.8.7 0 1.9-.9 2.3-.9z"/>
      <path d="M13.1 0c.2 1.8-1.1 3.8-2.9 4C10 2.2 11.5.3 13.1 0z"/>
    </svg>
  </a>
  <a class="menubar-item" href="/">&larr; Home</a>
  {#each menus as menu}
    <a class="menubar-item" href={menu.href}>{menu.text}</a>
  {/each}
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

<main class="desktop">

  <div class="nameplate">
    <h1 class="profile-title">Speaking</h1>
    <p class="profile-description">
      Keynotes, technical sessions and panels on offensive security, OT and
      industrial control systems, and the human side of the whole mess.
    </p>
    <p class="nameplate-aside">
      Booking: <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>
    </p>
  </div>

  <section class="win" aria-label="Conferences spoken at">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Stages Since 2004</h2>
    </div>
    <div class="win-body">
      <ul class="con-wall">
        {#each conWall as con}
          <li>{con}</li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="booking" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Book Johnny Xmas</h2>
    </div>
    <div class="win-body">
      <div class="prose">
        <p>
          I'm Johnny Xmas — a hacker and offensive security leader. I've
          keynoted and presented at DEF CON, HOPE, DefCamp, DerbyCon, GrrCON,
          THOTCON, CypherCon, Hackfest, BSides and the ManuSec Summit, on
          stages from Chicago to Bucharest, since 2004.
        </p>
        <p>
          I speak to security practitioners, executive audiences and general
          conference crowds alike, in sessions from a 20-minute keynote to a
          full-day workshop, in person or remote. Tell me the room and the
          outcome you want and I'll build the talk around it.
        </p>
        <p class="booking-cta">
          <a class="button-link" href={`mailto:${BOOKING_EMAIL}?subject=Speaking%20inquiry`}>
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>{BOOKING_EMAIL}
          </a>
        </p>
      </div>
      <ul class="link-list resource-list">
        <li>
          <a href="https://sessionize.com/johnnyxmas" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-file-lines" aria-hidden="true"></i>Speaker profile and current CFP bio
          </a>
        </li>
        <li>
          <a href="https://drive.google.com/drive/folders/1b5VjAcYUbHaZuLsWK5a_RkZiYffqUUOw?usp=sharing" target="_blank" rel="noopener noreferrer">
            <i class="fa-solid fa-chalkboard" aria-hidden="true"></i>Presentation decks
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/johnnyxmas" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-youtube" aria-hidden="true"></i>Recorded talks on YouTube
          </a>
        </li>
        <li>
          <a href="/media-coverage/">
            <i class="fa-solid fa-clapperboard" aria-hidden="true"></i>Press and interviews
          </a>
        </li>
      </ul>
    </div>
  </section>

  <section id="talks" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Talks Currently on Offer</h2>
    </div>
    <div class="win-body">
      <ul class="talk-list">
        {#each talks as talk}
          <li class="talk">
            <h3 class="talk-title">{talk.title}</h3>
            <p class="talk-abstract">{talk.abstract}</p>
            <p class="talk-tags">{talk.tags.join(' · ')}</p>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="appearances" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Where I've Spoken</h2>
    </div>
    <div class="win-body">
      <p class="win-prose">
        Not a complete history — only the talks there's a recording of.
        Twenty-plus years of conferences leaves a lot of rooms undocumented.
      </p>
      <ul class="stage-list">
        {#each appearances as a}
          <li class="stage">
            <span class="stage-event">{a.event}</span>
            {#if a.year}<span class="stage-year">{a.year}</span>{/if}
            <span class="stage-talk">{a.talk}</span>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="bio" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Speaker Bio</h2>
    </div>
    <div class="win-body">
      <div class="prose">
        <p>
          Johnny Xmas serves as Global Head of Offensive Security for a Fortune 200
          manufacturing and agriculture corporation, leading penetration testing,
          red teaming, adversarial simulation and exposure assessment. With more
          than 16 years in information security and 26 in IT operations, his work
          centers on the gap between what an organization claims it can detect and
          what it actually detects.
        </p>
        <p>
          A fixture of the Chicago security community since 2002, he holds board
          positions at BurbSec and BSides312. Earlier roles include Director of
          Cyber Training at GRIMM, infrastructure defense at Kasada, and Lead
          Researcher on Uptake's industrial cybersecurity platform. He is best
          known publicly for exposing the TSA master key leaks and the Venmo
          public-feed privacy failures — research covered by Fox, NBC, Wired,
          TechCrunch, ZDNet, Engadget, PCMag, CSO, Vice, The Hill, Entrepreneur,
          SC Magazine, Infosecurity Magazine and BleepingComputer, and picked up
          by the German, Dutch and Filipino press. He holds the CISSP.
        </p>
        <p class="bio-tagline">&ldquo;I don't seek to be well-known, I seek to be worth knowing.&rdquo;</p>
      </div>
    </div>
  </section>

  <footer class="desk-footer">
    <span class="shutdown">Special &#9654; Shut Down</span>
    <p><a href="/">&larr; Back to johnnyxmas.net</a></p>
  </footer>

</main>

<style>
  /* Scoped here: this is the only page with running body copy and a
     three-column appearance list. Every value comes from a global token. */
  /* Capped measure: the window itself runs to 1100px on a wide desktop,
     and body copy at that line length is unreadable. */
  .prose {
    padding: 16px 18px;
    max-width: 74ch;
    font-size: 15px;
    color: var(--ink-soft);
  }
  .prose p { margin: 0 0 14px; }
  .prose p:last-child { margin-bottom: 0; }

  .booking-cta { margin: 18px 0 4px; }

  /* Full-bleed rows below the prose, matching the other windows' lists. */
  .resource-list { border-top: 1px solid var(--rule-soft); }

  /* A System 6 push button — the one call to action on the page. */
  .button-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    font-family: var(--pixel);
    font-size: 11px;
    letter-spacing: 0.02em;
    color: var(--ink);
    text-decoration: none;
    background: var(--paper);
    border: var(--chrome) solid var(--ink);
    box-shadow: 2px 2px 0 var(--ink);
  }
  .button-link:hover,
  .button-link:focus-visible {
    background: var(--ink);
    color: var(--paper);
    outline: none;
  }
  .button-link:active { transform: translate(2px, 2px); box-shadow: none; }

  .talk-list, .stage-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .talk {
    padding: 14px 18px;
    border-top: 1px solid var(--rule-soft);
  }
  .talk:first-child { border-top: 0; }

  .talk-title {
    margin: 0 0 6px;
    font-family: var(--pixel);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--ink);
    line-height: 1.5;
  }

  .talk-abstract {
    margin: 0 0 6px;
    max-width: 78ch;
    font-size: 14px;
    color: var(--ink-soft);
  }

  .talk-tags {
    margin: 0;
    font-family: var(--pixel);
    font-size: 9px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }

  .stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 2px 12px;
    padding: 10px 18px;
    border-top: 1px solid var(--rule-soft);
  }
  .stage:first-child { border-top: 0; }

  .stage-event {
    font-family: var(--pixel);
    font-size: 11px;
    color: var(--ink);
  }
  .stage-year {
    font-family: var(--pixel);
    font-size: 9px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--ink-faint);
    text-align: right;
  }
  .stage-talk {
    grid-column: 1 / -1;
    font-size: 14px;
    color: var(--ink-soft);
  }

  .bio-tagline {
    font-style: italic;
    color: var(--ink-faint);
  }

  .nameplate-aside {
    margin: 10px 0 0;
    font-size: 13px;
    color: var(--ink-faint);
  }
  .nameplate-aside a {
    color: var(--ink-soft);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .nameplate-aside a:hover,
  .nameplate-aside a:focus-visible { color: var(--ink); outline: none; }
</style>
