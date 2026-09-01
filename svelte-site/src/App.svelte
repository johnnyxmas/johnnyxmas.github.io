<script>
  import { onMount, onDestroy } from 'svelte';
  import './app.css';

  let video;
  let isMuted = $state(true);
  let clock = $state('');
  let clockTimer;

  function tick() {
    clock = new Date()
      .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      .toLowerCase();
  }

  onMount(() => {
    if (video) {
      video.muted = true;
    }
    tick();
    clockTimer = setInterval(tick, 15000);
  });

  onDestroy(() => {
    if (clockTimer) clearInterval(clockTimer);
  });

  function handleVideoClick() {
    if (video) {
      video.play().catch(e => console.error('Error playing video:', e));
    }
  }

  function toggleMute(e) {
    e.preventDefault();
    e.stopPropagation();

    if (video) {
      video.muted = !video.muted;
      isMuted = video.muted;

      if (!video.muted) {
        video.volume = 1.0;
      }

      if (video.paused) {
        video.play().catch(e => console.error('Error playing video:', e));
      }
    }
  }

  const contactLinks = [
    { href: "https://signal.group/#CjQKIGgT30VMU-FHAPM2TOqRKheN0mmwdQVSCC223V_aBM7xEhBWua03Mj5NxlAoG7AhYGxO", icon: "fa-solid fa-comment", text: "Signal" },
    { href: "https://t.me/j0hnnyxm4s", icon: "fa-solid fa-paper-plane", text: "Telegram" },
    { href: "https://keybase.io/j0hnnyxm4s", icon: "fa-solid fa-lock", text: "PGP Key" }
  ];

  const socialLinks = [
    { href: "https://twitter.com/J0hnnyXm4s", icon: "fa-brands fa-x-twitter", text: "Twitter" },
    { href: "https://www.youtube.com/johnnyxmas", icon: "fa-brands fa-youtube", text: "YouTube" },
    { href: "https://www.instagram.com/j0hnnyxm4s/", icon: "fa-brands fa-instagram", text: "Instagram" },
    { href: "https://www.linkedin.com/in/johnnyxmas/", icon: "fa-brands fa-linkedin", text: "LinkedIn" },
    { href: "https://infosec.exchange/@j0hnnyxm4s", icon: "fa-brands fa-mastodon", text: "Mastodon" },
    { href: "https://bsky.app/profile/j0hnnyxm4s.bsky.social", icon: "fa-brands fa-bluesky", text: "Bluesky" },
    { href: "https://twitch.tv/j0hnnyxm4s", icon: "fa-brands fa-twitch", text: "Twitch" }
  ];

  const mediaLinks = [
    { href: "https://www.papercall.io/speakers/johnnyxmas", icon: "fa-solid fa-file-lines", text: "Current Bio and Talks" },
    { href: "https://drive.google.com/drive/folders/1b5VjAcYUbHaZuLsWK5a_RkZiYffqUUOw?usp=sharing", icon: "fa-solid fa-chalkboard", text: "Presentation Decks" },
    { href: "/media-coverage/", icon: "fa-solid fa-clapperboard", text: "Media Coverage" }
  ];

  const podcastLinks = [
    { href: "https://igot.one", icon: "fa-solid fa-headphones", text: '"I Got One" Improv Entrepreneur Podcast' }
  ];

  const supportLinks = [
    { href: "https://venmo.com/johnny-xmas", icon: "fa-solid fa-dollar-sign", text: "Venmo" },
    { href: "https://www.paypal.com/paypalme/johnnyxmas", icon: "fa-brands fa-paypal", text: "PayPal" }
  ];

  const menus = [
    { href: "#media-presentations", text: "Media" },
    { href: "#contact-me", text: "Contact" },
    { href: "#social-media", text: "Social" },
    { href: "#podcasts", text: "Podcasts" },
    { href: "#support-me", text: "Support" }
  ];
</script>

<svelte:head>
  <title>Johnny Xmas | Hacker</title>
  <meta name="description" content="Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con">

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://johnnyxmas.net/">
  <meta property="og:title" content="Johnny Xmas | Hacker">
  <meta property="og:description" content="Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con">
  <meta property="og:image" content="https://johnnyxmas.net/assets/img/opengraph.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@J0hnnyXm4s">
  <meta name="twitter:title" content="Johnny Xmas | Hacker">
  <meta name="twitter:description" content="Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con">
  <meta name="twitter:image" content="https://johnnyxmas.net/assets/img/opengraph.jpg">

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
  <meta name="theme-color" content="#ffffff">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/solid.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/brands.min.css">
</svelte:head>

<nav class="menubar" aria-label="Sections">
  <span class="menubar-apple" aria-hidden="true">
    <svg viewBox="0 0 20 24" width="13" height="16" fill="currentColor" role="presentation">
      <path d="M13.4 6.3c1.4 0 2.9.7 3.9 1.9-3.4 2.1-2.9 7 .8 8.3-.8 2.2-2.7 5.1-4.3 5.1-1.1 0-1.6-.7-2.9-.7s-1.9.7-2.9.7c-1.9 0-4.9-4.4-4.9-8.1 0-4 2.5-6 4.9-6 1.3 0 2.3.8 3.1.8.7 0 1.9-.9 2.3-.9z"/>
      <path d="M13.1 0c.2 1.8-1.1 3.8-2.9 4C10 2.2 11.5.3 13.1 0z"/>
    </svg>
  </span>
  {#each menus as menu}
    <a class="menubar-item" href={menu.href}>{menu.text}</a>
  {/each}
  <span class="menubar-clock">{clock}</span>
</nav>

<main class="desktop">

  <!-- The video, presented as a movie window on the desktop -->
  <section class="win movie">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">jtv.mp4</h2>
    </div>
    <div class="win-body">
      <div class="movie-screen">
        <video
          bind:this={video}
          id="main-video"
          autoplay
          loop
          playsinline
          preload="auto"
          aria-label="Johnny Xmas showreel"
          onclick={handleVideoClick}
        >
          <source src="/assets/vid/jtv.mp4" type="video/mp4">
          <p>Your browser doesn't support HTML5 video. <a href="/assets/vid/jtv.mp4">Download the video</a> instead.</p>
        </video>
      </div>
      <div class="movie-controls">
        <button
          id="mute-toggle"
          class="mute-button"
          title={isMuted ? 'Turn sound on' : 'Turn sound off'}
          aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
          aria-pressed={!isMuted}
          onclick={toggleMute}
        >
          <i class={isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high'}></i>
        </button>
        <span class="sound-hint">{isMuted ? 'Click for sound' : 'Sound on'}</span>
      </div>
    </div>
  </section>

  <div class="nameplate">
    <h1 class="profile-title">@johnnyxmas</h1>
    <p class="profile-description">Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con</p>
  </div>

  <div class="win-grid">

  <section id="media-presentations" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Media and Presentations</h2>
    </div>
    <div class="win-body">
      <ul class="link-list">
        {#each mediaLinks as link}
          <li>
            <a href={link.href} target={link.href.startsWith('/') ? undefined : '_blank'} rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}>
              <i class={link.icon} aria-hidden="true"></i>{link.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="contact-me" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Contact Me</h2>
    </div>
    <div class="win-body">
      <ul class="link-list">
        {#each contactLinks as link}
          <li>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <i class={link.icon} aria-hidden="true"></i>{link.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="social-media" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Social Media</h2>
    </div>
    <div class="win-body">
      <ul class="link-grid">
        {#each socialLinks as link}
          <li>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <i class={link.icon} aria-hidden="true"></i>{link.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="podcasts" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Podcasts</h2>
    </div>
    <div class="win-body">
      <ul class="link-list">
        {#each podcastLinks as link}
          <li>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <i class={link.icon} aria-hidden="true"></i>{link.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <section id="support-me" class="win">
    <div class="win-bar">
      <span class="win-close" aria-hidden="true"></span>
      <h2 class="win-title">Support Me</h2>
    </div>
    <div class="win-body">
      <ul class="link-list">
        {#each supportLinks as link}
          <li>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <i class={link.icon} aria-hidden="true"></i>{link.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  </div>

  <footer class="desk-footer">
    <span class="shutdown">Special &#9654; Shut Down</span>
    <p>&copy; {new Date().getFullYear()} Johnny Xmas</p>
    <p>Built with <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a>.</p>
  </footer>

</main>
