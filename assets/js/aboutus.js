document.addEventListener("DOMContentLoaded", function () {
  // ── Your existing hero animation code (keep if you still use it) ──
  const heroH1 = document.querySelector(".hero h1");
  const heroP = document.querySelector(".hero p");

  if (heroH1 && heroP) {
    setTimeout(() => {
      heroH1.classList.add("animate");
      heroP.classList.add("animate");
    }, 200);

    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        heroH1.classList.add("scroll-up");
        heroH1.classList.remove("scroll-down");
        heroP.classList.add("scroll-up");
        heroP.classList.remove("scroll-down");
      } else {
        heroH1.classList.add("scroll-down");
        heroH1.classList.remove("scroll-up");
        heroP.classList.add("scroll-down");
        heroP.classList.remove("scroll-up");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  }

  // ── Carousel logic ────────────────────────────────────────────────────────
  const carouselElement = document.querySelector('#storiesCarousel');
  if (!carouselElement) return;

  const container = document.querySelector('.carousel-container');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!container || !prevBtn || !nextBtn) return;

  let panelWidth = 305;
  const firstPanel = carouselElement.querySelector('.panel');
  if (firstPanel) {
    // Get width + margin-right
    const style = window.getComputedStyle(firstPanel);
    const marginRight = parseFloat(style.marginRight) || 0;
    panelWidth = firstPanel.offsetWidth + marginRight;
  }

  let animationFrameId = null;
  let isHovered = false;
  let isManualActive = false;
  let direction = -1;               // -1 = left (auto), +1 = right
  let speed = 0.5;                  // px per frame – auto speed

  // Initialize panel positions
  const panels = carouselElement.querySelectorAll('.panel');
  panels.forEach((panel, index) => {
    panel.style.left = (index * panelWidth) + 'px';
  });

  function moveCarousel() {
    // Recalculate panelWidth on resize if needed? 
    // Usually easier to handle in a separate observer, but for now let's just use the initial or current one.
    
    // Pause auto-movement when hovered (unless manually dragging)
    if (isHovered && !isManualActive) {
      animationFrameId = requestAnimationFrame(moveCarousel);
      return;
    }

    const currentPanels = carouselElement.querySelectorAll('.panel');

    currentPanels.forEach(panel => {
      let currentLeft = parseFloat(panel.style.left) || 0;
      panel.style.left = (currentLeft + (direction * speed)) + 'px';
    });

    // Seamless infinite loop
    const first = carouselElement.querySelector('.panel:first-child');
    const last = carouselElement.querySelector('.panel:last-child');

    if (!first || !last) return;

    // Moving left (auto)
    if (direction < 0 && parseFloat(first.style.left) <= -panelWidth) {
      const lastLeft = parseFloat(last.style.left);
      first.style.left = (lastLeft + panelWidth) + 'px';
      carouselElement.appendChild(first);
    }

    // Moving right (manual)
    if (direction > 0 && parseFloat(last.style.left) >= carouselElement.offsetWidth + panelWidth) {
      const firstLeft = parseFloat(first.style.left);
      last.style.left = (firstLeft - panelWidth) + 'px';
      carouselElement.insertBefore(last, first);
    }

    animationFrameId = requestAnimationFrame(moveCarousel);
  }

  function startAnimation() {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(moveCarousel);
    }
  }

  function stopAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // ── Hover → pause auto-scroll ────────────────────────────────
  container.addEventListener('mouseenter', () => {
    isHovered = true;
    if (!isManualActive) {
      stopAnimation();
    }
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    if (!isManualActive) {
      startAnimation();
    }
  });

  // ── Button controls (hold to scroll faster) ──────────────────
  function handlePointerDown(dir) {
    isManualActive = true;
    direction = dir;
    speed = 2.2;                // faster when holding button
    stopAnimation();
    startAnimation();
  }

  function handlePointerUp() {
    if (isManualActive) {
      isManualActive = false;
      direction = -1;           // always return to auto-left
      speed = 0.5;

      if (!isHovered) {
        startAnimation();
      }
      // if still hovering → remain paused (correct behavior)
    }
  }

  prevBtn.addEventListener('mousedown',  () => handlePointerDown(-1));
  nextBtn.addEventListener('mousedown',  () => handlePointerDown(+1));

  prevBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handlePointerDown(-1);
  });
  nextBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handlePointerDown(+1);
  });

  document.addEventListener('mouseup',   handlePointerUp);
  document.addEventListener('touchend',  handlePointerUp);
  // Safety: in case mouse leaves window while holding
  document.addEventListener('mouseleave', handlePointerUp);

  // ── Start auto-scroll immediately ──
  startAnimation();
});