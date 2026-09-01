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

  // Every item carries an ISO date ('YYYY-MM-DD', or 'YYYY-MM' where only
  // the month is verifiable) so each section can be sorted newest-first and
  // the date can be shown. Items without a verified date sort last.
  const directInterviews = [
    { date: '2025-09-25', name: 'Cecilia Limonta', outlet: 'ISMG / BankInfoSecurity', note: '"Offensive Security in Manufacturing: Are You Red Team Ready?" — on pentesting in OT environments, ahead of the 2025 ManuSec Summit.', links: [
      'https://www.bankinfosecurity.com/offensive-security-in-manufacturing-are-you-red-team-ready-a-29555'
    ] },
    { date: '2021-09-20', name: 'Tor Constantino', outlet: 'Entrepreneur.com', links: [
      'https://www.entrepreneur.com/science-technology/5-ransomware-protection-tips-for-your-small-business/384324'
    ] },
    { date: '2019-02-05', name: 'Zack Whittaker', outlet: 'ZDNet, TechCrunch', links: [
      'https://www.zdnet.com/article/chilling-effect-lawsuits-threaten-security-research-need-it-most/',
      'https://techcrunch.com/2019/02/05/kasada-bots/'
    ] },
    { date: '2016-07-29', name: 'John Biggs', outlet: 'TechCrunch', links: [
      'https://techcrunch.com/2016/07/29/tsa-key-cracker-johnny-xmas-tells-us-how-to-stay-safe-while-traveling/'
    ] },
    { date: '2016-07-29', name: 'Fox 5 NY', outlet: 'Video', note: 'Direct interview, but cut out everything I stated that contradicted the Senator.', links: [
      'https://www.fox5ny.com/news/hackers-replicate-tsa-master-suitcase-lock-keys'
    ] },
    { date: '2016-07-29', name: 'Michael Molitch-Hou', outlet: 'Engineering.com', links: [
      'https://www.engineering.com/hacking-the-tsas-master-keys-3d-printing-adds-a-new-dimension-to-privacy-and-security/'
    ] },
    { date: '2016-07-28', name: 'Mariella Moon', outlet: 'Engadget', links: [
      'https://www.engadget.com/2016-07-28-tsa-master-key-3d-models.html'
    ] },
    { date: '2016-07-26', name: 'Catalin Cimpanu', outlet: 'Softpedia', links: [
      'https://news.softpedia.com/news/another-set-of-tsa-master-keys-published-online-506657.shtml'
    ] },
    { date: '2016-07-25', name: 'Charlie Osborne', outlet: 'ZDNet / Zero Day', links: [
      'https://www.zdnet.com/article/tsa-safe-sky-master-key-blueprints-released-by-hacking-group/'
    ] },
    { date: '2016-07-25', name: 'Alec', outlet: '3ders.org', links: [
      'https://www.3ders.org/articles/20160725-hackers-create-3d-printed-tsa-safe-skies-master-key-for-luggage-release-blueprints.html'
    ] },
    { date: '2016-07-25', name: 'Tom Brant', outlet: 'PC Mag', links: [
      'https://www.pcmag.com/news/master-key-for-tsa-approved-locks-leaked-again'
    ] },
    { date: '2016-07-24', name: 'Steve Ragan', outlet: 'CSO', links: [
      'https://www.csoonline.com/article/557099/hackers-create-safe-skies-tsa-master-key-from-scratch-release-designs.html',
      'https://www.csoonline.com/article/557141/rehashed-lessons-learned-from-the-safe-skies-tsa-master-key-leak.html'
    ] },
    { date: '2016-07-24', name: 'Nico Jurran', outlet: 'Heise Online', links: [
      'https://www.heise.de/news/Generalschluessel-fuer-Gepaeck-Weiterer-TSA-Master-Key-veroeffentlicht-3277250.html'
    ] },
    { date: '2016-07', name: 'Joe Uchill', outlet: 'The Hill', links: [
      'https://thehill.com/business-a-lobbying/289178-hackers-thwart-tsa-luggage-locks-see-same-problems-in-backdoors/'
    ] },
    { date: '2016-07', name: 'Bradley Barth', outlet: 'SC Magazine', links: [
      'https://www.scworld.com/news/tsa-master-key-hackers-expose-dangers-of-physical-and-digital-key-escrow-policies'
    ] },
    { name: 'Authority Magazine', outlet: '"The 5 Things Every American Business Leader Should Do To Shield Themselves From A Cyberattack"', links: [
      'https://medium.com/authority-magazine/cyber-defense-antonio-johnny-martinelli-of-grimm-on-the-5-things-every-american-business-leader-c33742d0da89'
    ] }
  ];

  // Linked to each show's own episode page rather than to a reupload
  // wherever one exists.
  const podcasts = [
    { date: '2024-12-29', name: 'Hacker Talk', outlet: 'New Year Special 2024', links: [
      'https://creators.spotify.com/pod/show/hacker-talk/episodes/New-Year-special-2024-e2srurq'
    ] },
    { date: '2024-12-18', name: 'Hacker History', outlet: 'The History of Johnny Xmas', links: [
      'https://hackerhistory.com/podcast/the-history-of-johnny-xmas/'
    ] },
    { date: '2023-07-13', name: 'The Route to Networking', outlet: 'E24: Johnny Xmas at GRIMM', links: [
      'https://www.hamilton-barnes.com/resources/podcast/e24---johnny-xmas-at-grimm/'
    ] },
    { date: '2022-05-09', name: 'The Maritime Risk Podcast', outlet: 'Episode 12: Marine Cyber — The Innocent Bystander Risk', links: [
      'https://maritimerisk.podbean.com/e/episode-12-marine-cyber-the-innocent-bystander-risk/'
    ] },
    { date: '2020-10', name: 'Security Headlines', outlet: 'Growing Up as a Hacker, Venmo Stalking, and WAF Bypasses', links: [
      'https://blog.firosolutions.com/2020/10/security_headlines_with_johnny_xmas/'
    ] },
    { date: '2019-09-15', name: 'Unnamed Reverse Engineering', outlet: 'Ep 028: Everyone Has a Bag of Tricks', note: 'Recorded at CCCamp19.', links: [
      'https://unnamedre.com/episode/28'
    ] },
    { date: '2019-08-19', name: 'Sysadministrivia', outlet: 'S4E13: Xmas in July', links: [
      'https://sysadministrivia.com/episodes/S4E13'
    ] },
    { date: '2019-06-17', name: 'The InfoQ Podcast', outlet: 'Web Security and the Anatomy of a Hack', links: [
      'https://www.infoq.com/podcasts/web-security-hack-anatomy/'
    ] },
    { date: '2018-10-30', name: 'Application Security Weekly', outlet: 'Episode 37, with Kasada.io', links: [
      'https://www.scworld.com/podcast-segment/4556-johnny-xmas-kasada-io'
    ] },
    { date: '2018-09-10', name: 'Sysadministrivia', outlet: 'S3E14: HOPEless', links: [
      'https://sysadministrivia.com/episodes/S3E14'
    ] },
    { date: '2018-01-22', name: 'Sysadministrivia', outlet: 'S2E22: Shitshow III — Son of Shitshow', links: [
      'https://sysadministrivia.com/episodes/S2E22'
    ] },
    { date: '2017-10-23', name: 'Sysadministrivia', outlet: 'S2E18: Dueling Banditos', links: [
      'https://sysadministrivia.com/episodes/S2E18'
    ] },
    { date: '2017-07-02', name: 'Exploring Information Security', outlet: 'The state of the infosec community, with Jayson E. Street, Dave Chronister and April Wright', links: [
      'https://www.exploresec.com/eis/93'
    ] },
    { date: '2017-05-28', name: 'Exploring Information Security', outlet: 'Why social skills are important, parts 1 and 2', links: [
      'https://www.exploresec.com/eis/88',
      'https://www.exploresec.com/eis/89'
    ] },
    { date: '2016-08-29', name: 'Sysadministrivia', outlet: 'S1E14: The HOPE Campaign, with Deviant Ollam', links: [
      'https://sysadministrivia.com/episodes/S1E14'
    ] },
    { date: '2016-03-13', name: 'Exploring Information Security', outlet: 'How to start a successful CitySec meetup, parts 1 and 2', links: [
      'https://www.exploresec.com/eis/35',
      'https://www.exploresec.com/eis/36'
    ] }
  ];

  const indirectCoverage = [
    { date: '2024-08-27', name: 'BleepingComputer', outlet: 'Malware Infiltrates Pidgin Messenger\u2019s Official Plugin Repository', note: 'Credited with confirming the keylogger hidden in the ss-otr plugin.', links: [
      'https://www.bleepingcomputer.com/news/security/malware-infiltrates-pidgin-messengers-official-plugin-repository/',
      'https://www.scworld.com/brief/darkgate-malware-spread-through-malicious-pidgin-plugin'
    ] },
    { date: '2019-06-16', name: 'TechCrunch', outlet: 'Venmo Scraping', links: [
      'https://techcrunch.com/2019/06/16/millions-venmo-transactions-scraped/'
    ] },
    { date: '2018-10-02', name: 'Dice.com', outlet: 'CTF Article', links: [
      'https://www.dice.com/hiring/recruitment/hack-to-the-future-how-dice-is-disrupting-the-disruptors'
    ] },
    { date: '2016-07-28', name: 'Adnan Farooqui', outlet: 'Ubergizmo', links: [
      'https://www.ubergizmo.com/2016/07/3d-models-of-all-tsa-master-keys-now-available-online/'
    ] },
    { date: '2016-07-27', name: 'Clare Scott', outlet: '3DPrint.com', links: [
      'https://3dprint.com/143860/tsa-master-keys-hacked-again/'
    ] },
    { date: '2016-07-27', name: 'Katie Armstrong', outlet: '3D Printing Industry', links: [
      'https://3dprintingindustry.com/news/last-tsa-master-key-hacked-90268/'
    ] },
    { date: '2016-07-27', name: 'John Biggs', outlet: 'TechCrunch', links: [
      'https://techcrunch.com/2016/07/27/security-experts-have-cloned-all-seven-tsa-master-keys/'
    ] },
    { date: '2016-07-26', name: 'Tara Seals', outlet: 'Infosecurity Magazine', note: 'An evident rewrite of the Vice piece below.', links: [
      'https://www.infosecurity-magazine.com/news/hackers-replicate-tsa-master/'
    ] },
    { date: '2016-07-25', name: 'Tess Owen', outlet: 'Vice', links: [
      'https://www.vice.com/en/article/hackers-published-replicas-and-blueprints-to-tsa-master-luggage-keys/'
    ] },
    { date: '2016-07-24', name: 'Daily Mail', links: [
      'https://www.dailymail.co.uk/news/article-3705993/Hackers-create-3D-printable-master-key-major-line-TSA-approved-luggage-locks.html'
    ] },
    { date: '2016-07', name: 'Alfred Bayle', outlet: 'Inquirer.net', links: [
      'https://technology.inquirer.net/50263/seven-master-keys-of-tsa-cloned-by-security-experts'
    ] },
    { date: '2016-07', name: 'Security.nl', links: [
      'https://www.security.nl/posting/479047/Hackers+publiceren+TSA-loper+voor+openen+van+koffers?channel=rss'
    ] }
  ];

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  // 'YYYY-MM-DD' -> 'September 25, 2025'; 'YYYY-MM' -> 'July 2016'.
  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    const month = MONTHS[Number(m) - 1];
    return d ? `${month} ${Number(d)}, ${y}` : `${month} ${y}`;
  }

  // Newest first; anything undated sorts to the bottom of its section.
  function newestFirst(items) {
    return [...items].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  const sections = [
    { id: 'direct-interviews', title: 'Direct Interviews', items: newestFirst(directInterviews) },
    { id: 'podcasts-web-shows', title: 'Podcasts & Web Shows', items: newestFirst(podcasts) },
    { id: 'indirect-coverage', title: 'Indirect Coverage', items: newestFirst(indirectCoverage) }
  ];
</script>

<!-- Crawler-facing metadata (title, description, canonical, OG/Twitter,
     favicons, JSON-LD) lives in media-coverage/index.html so it is present
     in the served HTML — this page renders client-side, and social scrapers
     don't run JS. Only genuinely dynamic tags belong here. -->
<svelte:head>
  <meta name="theme-color" content={themeColor}>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/solid.min.css">
  <!-- brands: the YouTube icon in the nameplate. -->
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
  {#each sections as section}
    <a class="menubar-item" href={`#${section.id}`}>{section.title}</a>
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
    <h1 class="profile-title">Media Coverage</h1>
    <p class="profile-description">Press, interviews, and podcast appearances featuring Johnny Xmas.</p>
    <p class="nameplate-aside">
      Conference talks are on
      <a href="https://www.youtube.com/johnnyxmas" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-youtube" aria-hidden="true"></i>YouTube</a>.
    </p>
  </div>

  <div class="win-grid">
    {#each sections as section}
      <section id={section.id} class="win">
        <div class="win-bar">
          <span class="win-close" aria-hidden="true"></span>
          <h2 class="win-title">{section.title}</h2>
        </div>
        <div class="win-body">
          <ul class="press-list">
            {#each section.items as item}
              <li class="press-item">
                {#if item.date}
                  <p class="press-date"><time datetime={item.date}>{formatDate(item.date)}</time></p>
                {/if}
                <div class="press-byline">
                  {item.name}{#if item.outlet}<span class="press-outlet"> — {item.outlet}</span>{/if}
                </div>
                {#if item.note}
                  <p class="press-note">{item.note}</p>
                {/if}
                <div class="press-links">
                  {#each item.links as link, i}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>{item.links.length > 1 ? `Link ${i + 1}` : 'Read'}
                    </a>
                  {/each}
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </section>
    {/each}
  </div>

  <footer class="desk-footer">
    <span class="shutdown">Special &#9654; Shut Down</span>
    <p><a href="/">&larr; Back to johnnyxmas.net</a></p>
  </footer>

</main>

<style>
  /* Scoped here rather than in app.css: this is the only page with dated
     entries, and the tokens it uses are already global. */
  .press-date {
    margin: 0 0 4px;
    font-family: var(--pixel);
    font-size: 9px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
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
  .nameplate-aside a:focus-visible {
    color: var(--ink);
    outline: none;
  }
  .nameplate-aside i {
    margin-right: 6px;
  }
</style>
