<script>
  import { onMount, onDestroy } from 'svelte';

  let canvas;
  let ctx;
  let animationId;

  onMount(() => {
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Fill with black background initially
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    
    // Characters to use in the rain
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?~`';
    const chars = matrixChars.split('');
    
    // Trail effect array to store character brightness
    const trails = new Array(columns).fill(null).map(() => []);
    
    function draw() {
      // Much stronger black background for maximum contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px VT323, monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Draw the trail
        for (let j = 0; j < trails[i].length; j++) {
          const trail = trails[i][j];
          if (trail.opacity > 0) {
            ctx.fillStyle = `rgba(0, 255, 0, ${trail.opacity})`;
            ctx.fillText(trail.char, i * fontSize, trail.y);
            trail.opacity -= 0.02;
          }
        }
        
        // Clean up old trails
        trails[i] = trails[i].filter(t => t.opacity > 0);
        
        // Pick a random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Brighter green for the leading character with more glow
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00ff00';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;
        
        // Add to trail
        trails[i].push({
          char: char,
          y: drops[i] * fontSize,
          opacity: 0.8
        });
        
        // Keep trail length manageable
        if (trails[i].length > 20) {
          trails[i].shift();
        }
        
        // Reset drop to top with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          trails[i] = [];
        }
        
        // Move drop down
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  });

  onDestroy(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
</script>

<canvas 
  bind:this={canvas}
  class="matrix-rain"
></canvas>

<style>
  .matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 1;
    pointer-events: none;
    background-color: #000;
  }
</style>