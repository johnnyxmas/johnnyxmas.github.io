<script>
  import { onMount } from 'svelte';
  import './app.css';
  import MatrixRain from './MatrixRain.svelte';

  let video;
  let isMuted = $state(true);

  onMount(() => {
    if (video) {
      video.muted = true;
    }
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
    { href: "https://docs.google.com/document/d/1ustVSscr-2EE0SBO3efT-VxzbbaN17UQ3vUQfpWFFVw/edit?usp=sharing", icon: "fa-solid fa-clapperboard", text: "Media Coverage" }
  ];

  const podcastLinks = [
    { href: "https://igot.one", icon: "fa-solid fa-headphones", text: '"I Got One" Improv Entrepreneur Podcast' }
  ];

  const supportLinks = [
    { href: "https://venmo.com/johnny-xmas", icon: "fa-solid fa-dollar-sign", text: "Venmo" },
    { href: "https://www.paypal.com/paypalme/johnnyxmas", icon: "fa-brands fa-paypal", text: "PayPal" }
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
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/solid.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/brands.min.css">
</svelte:head>

<MatrixRain />

<div class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="text-center">
        <div class="tv-setup">
          <div class="video-container">
            <video
              bind:this={video}
              id="main-video" 
              autoplay 
              loop 
              playsinline 
              preload="auto" 
              aria-label="Johnny Xmas video"
              onclick={handleVideoClick}
            >
              <source src="/assets/vid/jtv.mp4" type="video/mp4">
              <p>Your browser doesn't support HTML5 video. <a href="/assets/vid/jtv.mp4">Download the video</a> instead.</p>
            </video>
          </div>
          <img src="/assets/img/crt.png" alt="Johnny Xmas" class="tv-overlay">
          <button
            id="mute-toggle"
            class="mute-button"
            title="Toggle audio"
            aria-label="Toggle audio"
            aria-pressed={isMuted}
            onclick={toggleMute}
          >
            <i class={isMuted ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark'}></i>
          </button>
          <div class="sound-hint">click speaker for sound</div>
        </div>
        <h1 class="profile-title">@johnnyxmas</h1>
        <p class="profile-description">Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con<span class="terminal-cursor"></span></p>
      </div>
      
      <div id="media-presentations" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Media and Presentations</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each mediaLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <i class="{link.icon}"></i> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <div id="contact-me" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Contact Me</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each contactLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <i class="{link.icon}"></i> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <div id="social-media" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Social Media</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each socialLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <i class="{link.icon}"></i> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>

      <div id="podcasts" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Podcasts</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each podcastLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <i class="{link.icon}"></i> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>
      
      <div id="support-me" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Support Me</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each supportLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <i class="{link.icon}"></i> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>
      
      <footer class="text-center">
        <div class="terminal-command">exit</div>
        <p>&copy; {new Date().getFullYear()} Johnny Xmas</p>
        <p>Uses code from <a href="https://github.com/twbs/bootstrap" target="_blank" rel="noopener noreferrer">Bootstrap</a> and <a href="https://github.com/Bachittarjeet/Hacker-Bootstrap-Template" target="_blank" rel="noopener noreferrer">Hacker-Bootstrap-Template</a></p>
      </footer>
    </div>
  </div>
</div>