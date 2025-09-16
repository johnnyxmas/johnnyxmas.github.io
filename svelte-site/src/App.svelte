<script>
  import { onMount } from 'svelte';
  import './app.css';
  import MatrixRain from './MatrixRain.svelte';

  let video;
  let muteToggle;
  let muteIcon;
  let isMuted = true;

  onMount(() => {
    if (video) {
      video.muted = true;
      updateMuteButtonState();
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
      
      updateMuteButtonState();
      
      if (video.paused) {
        video.play().catch(e => console.error('Error playing video:', e));
      }
    }
  }

  function updateMuteButtonState() {
    if (video && muteIcon) {
      if (video.muted) {
        muteIcon.className = 'fas fa-volume-up';
        if (muteToggle) muteToggle.setAttribute('aria-pressed', 'true');
      } else {
        muteIcon.className = 'fas fa-volume-mute';
        if (muteToggle) muteToggle.setAttribute('aria-pressed', 'false');
      }
    }
  }

  const contactLinks = [
    { href: "https://outlook.office.com/book/MeetwithJohnnyXmas1@kraftheinz.com/?ismsaljsauthenabled", icon: "glyphicon-calendar", text: "Meet with Me" },
    { href: "https://signal.group/#CjQKIGgT30VMU-FHAPM2TOqRKheN0mmwdQVSCC223V_aBM7xEhBWua03Mj5NxlAoG7AhYGxO", icon: "glyphicon-comment", text: "Signal" },
    { href: "https://t.me/j0hnnyxm4s", icon: "glyphicon-send", text: "Telegram" },
    { href: "https://keybase.io/j0hnnyxm4s", icon: "glyphicon-lock", text: "PGP Key" }
  ];

  const socialLinks = [
    { href: "https://twitter.com/J0hnnyXm4s", icon: "glyphicon-user", text: "Twitter" },
    { href: "https://www.youtube.com/johnnyxmas", icon: "glyphicon-film", text: "YouTube" },
    { href: "https://www.instagram.com/j0hnnyxm4s/", icon: "glyphicon-camera", text: "Instagram" },
    { href: "https://www.linkedin.com/in/johnnyxmas/", icon: "glyphicon-briefcase", text: "LinkedIn" },
    { href: "https://infosec.exchange/@j0hnnyxm4s", icon: "glyphicon-globe", text: "Mastodon" },
    { href: "https://bsky.app/profile/j0hnnyxm4s.bsky.social", icon: "glyphicon-cloud", text: "Bluesky" },
    { href: "https://twitch.tv/j0hnnyxm4s", icon: "glyphicon-facetime-video", text: "Twitch" }
  ];

  const mediaLinks = [
    { href: "https://www.papercall.io/speakers/johnnyxmas", icon: "glyphicon-file", text: "Current Bio and Talks" },
    { href: "https://drive.google.com/drive/folders/1b5VjAcYUbHaZuLsWK5a_RkZiYffqUUOw?usp=sharing", icon: "glyphicon-blackboard", text: "Presentation Decks" },
    { href: "https://docs.google.com/document/d/1ustVSscr-2EE0SBO3efT-VxzbbaN17UQ3vUQfpWFFVw/edit?usp=sharing", icon: "glyphicon-film", text: "Media Coverage" }
  ];

  const podcastLinks = [
    { href: "https://igot.one", icon: "glyphicon-headphones", text: '"I Got One" Improv Entrepreneur Podcast' }
  ];

  const supportLinks = [
    { href: "https://venmo.com/johnny-xmas", icon: "glyphicon-usd", text: "Venmo" },
    { href: "https://www.paypal.com/paypalme/johnnyxmas", icon: "glyphicon-credit-card", text: "PayPal" }
  ];
</script>

<svelte:head>
  <title>Johnny Xmas | Hacker</title>
  <meta name="description" content="Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con">
  
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</svelte:head>

<MatrixRain />

<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
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
              on:click={handleVideoClick}
            >
              <source src="/assets/vid/jtv.mp4" type="video/mp4">
              <p>Your browser doesn't support HTML5 video. <a href="/assets/vid/jtv.mp4">Download the video</a> instead.</p>
            </video>
            <div class="loading-indicator">
              <div class="spinner"></div>
            </div>
          </div>
          <img src="/assets/img/crt.png" alt="Johnny Xmas" class="tv-overlay">
          <button 
            bind:this={muteToggle}
            id="mute-toggle" 
            class="mute-button" 
            title="Toggle audio" 
            aria-label="Toggle audio" 
            aria-pressed="false"
            on:click={toggleMute}
          >
            <i bind:this={muteIcon} class="fas fa-volume-up"></i>
          </button>
          <div class="sound-hint">click speaker for sound</div>
        </div>
        <h1 class="profile-title">@johnnyxmas</h1>
        <p class="profile-description">Hacker as seen on Fox, NBC, Wired, TechCrunch, and your favorite infosec con<span class="terminal-cursor"></span></p>
      </div>
      
      <div id="contact-me" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Contact Me</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each contactLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <span class="glyphicon {link.icon}"></span> {link.text}
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
                <span class="glyphicon {link.icon}"></span> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>
      
      <div id="media-presentations" class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><span class="terminal-prompt">root@j0hnnyxm4s:~# </span>Media and Presentations</h3>
        </div>
        <div class="panel-body">
          <div class="list-group">
            {#each mediaLinks as link}
              <a href={link.href} class="list-group-item" target="_blank" rel="noopener noreferrer">
                <span class="glyphicon {link.icon}"></span> {link.text}
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
                <span class="glyphicon {link.icon}"></span> {link.text}
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
                <span class="glyphicon {link.icon}"></span> {link.text}
              </a>
            {/each}
          </div>
        </div>
      </div>
      
      <footer class="text-center">
        <div class="terminal-command">exit</div>
        <p>&copy; 2025 Johnny Xmas</p>
        <p>Uses code from <a href="https://github.com/twbs/bootstrap" target="_blank" rel="noopener noreferrer">Bootstrap</a> and <a href="https://github.com/Bachittarjeet/Hacker-Bootstrap-Template" target="_blank" rel="noopener noreferrer">Hacker-Bootstrap-Template</a></p>
      </footer>
    </div>
  </div>
</div>