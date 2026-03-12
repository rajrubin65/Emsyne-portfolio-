// const toggleArrow = document.getElementById("toggleArrow");
// const extraServices = document.querySelector(".extra-services");
// const servicesSection = document.getElementById("services");
// toggleArrow.addEventListener("click", () => {
//   extraServices.classList.toggle("show");
//   if (extraServices.classList.contains("show")) {
//     toggleArrow.textContent = "▲ Show Less";
//   } else {
//     toggleArrow.textContent = "▼ Show More";
//     // Scroll to bottom of the services section instead of testimonials
//     servicesSection.scrollIntoView({ behavior: "smooth", block: "end" });
//   }
// });
// document.addEventListener('DOMContentLoaded', () => {
const tiles = document.querySelectorAll(".vision-tile");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.1 }
);
tiles.forEach((tile) => observer.observe(tile));
const headings = document.querySelectorAll(".sticky-heading");
const waveObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) el.classList.add("animate");
      else el.classList.remove("animate");
    });
  },
  { threshold: 0.5 }
);
headings.forEach((h) => waveObserver.observe(h));
// Tips cards fade/slide in for all sections
const tips = document.querySelectorAll(".tip");
if (tips.length) {
  const tipsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
  );
  tips.forEach((tip) => tipsObserver.observe(tip));
}
// Sticky + hide/show ONLY for headings inside a .left
const stickyPairs = [];
headings.forEach((heading) => {
  const left = heading.closest(".left");
  if (!left) return; // Skip headings not in .left
  let section = left.closest(".section");
  if (!section) section = heading.closest(".section");
  const right = section ? section.querySelector(".right") : null;
  if (right) {
    stickyPairs.push({ heading, right });
  }
});
function updateStickyVisibility() {
  stickyPairs.forEach(({ heading, right }) => {
    const rect = right.getBoundingClientRect();
    if (rect.bottom < 40) {
      heading.classList.add("hidden");
    } else {
      heading.classList.remove("hidden");
    }
  });
}
if (stickyPairs.length) {
  window.addEventListener("scroll", updateStickyVisibility, {
    passive: true,
  });
  window.addEventListener("resize", updateStickyVisibility);
  updateStickyVisibility();
}
// Trigger scroll event on load
window.dispatchEvent(new Event("scroll"));
// });
const crewCards = document.querySelectorAll(".crew-card");
const leftBtn = document.querySelector(".crew-left");
const rightBtn = document.querySelector(".crew-right");
let crewIndex = 0;
let crewAnimating = false;

function updateCrewCarousel(newIndex) {
  if (crewAnimating) return;
  crewAnimating = true;

  const total = crewCards.length;
  // Handle continuous loop in both directions
  crewIndex = (newIndex % total + total) % total;

  crewCards.forEach((card, i) => {
    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );

    // Calculate distance forward and backward to find shortest path in the ring
    let distForward = (i - crewIndex + total) % total;
    let distBackward = (crewIndex - i + total) % total;

    if (distForward === 0) {
      card.classList.add("center");
      card.style.opacity = 1;
      card.style.visibility = "visible";
    } else if (distForward === 1) {
      card.classList.add("right-1");
      card.style.opacity = 1;
      card.style.visibility = "visible";
    } else if (distForward === 2) {
      card.classList.add("right-2");
      card.style.opacity = 0.6; // Keep visible but faded per CSS
      card.style.visibility = "visible";
    } else if (distBackward === 1) {
      card.classList.add("left-1");
      card.style.opacity = 1;
      card.style.visibility = "visible";
    } else if (distBackward === 2) {
      card.classList.add("left-2");
      card.style.opacity = 0.6;
      card.style.visibility = "visible";
    } else {
      card.classList.add("hidden");
      card.style.opacity = 0;
      card.style.visibility = "hidden";
    }
  });

  setTimeout(() => {
    crewAnimating = false;
  }, 800);
}

leftBtn.addEventListener("click", () => updateCrewCarousel(crewIndex - 1));
rightBtn.addEventListener("click", () => updateCrewCarousel(crewIndex + 1));

crewCards.forEach((card, i) =>
  card.addEventListener("click", () => updateCrewCarousel(i))
);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
  else if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
});

let touchStart = 0;
let touchEnd = 0;

document.addEventListener("touchstart", (e) => {
  touchStart = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEnd = e.changedTouches[0].screenX;
  const diff = touchStart - touchEnd;
  if (Math.abs(diff) > 50) {
    if (diff > 0) updateCrewCarousel(crewIndex + 1);
    else updateCrewCarousel(crewIndex - 1);
  }
});
// Initialize carousel correctly
updateCrewCarousel(0);

/* ================= Service Carousel Content Switcher ================= */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector(".offer-track");
  const cards = Array.from(document.querySelectorAll(".offer-card"));
  const prevBtn = document.querySelector(".nav-btn.prev");
  const nextBtn = document.querySelector(".nav-btn.next");
  const rightContainer = document.querySelector('.right');

  if (!rightContainer || !cards.length) return;

  const serviceContainers = rightContainer.querySelectorAll('[data-service]');

  // Function to show specific service and hide others
  function showService(serviceName) {
    // Hide all service content
    serviceContainers.forEach(container => {
      container.classList.remove('active');
    });

    // Show the selected service
    const activeService = rightContainer.querySelector(`[data-service="${serviceName}"]`);
    if (activeService) {
      activeService.classList.add('active');
    }

    // Update offer card styling
    cards.forEach(card => {
      if (card.getAttribute('data-service') === serviceName) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  const total = cards.length;
  let currentIndex = 0;
  let isTransitioning = false;

  // Clone items for infinite loop
  const cloneCount = 3;
  for (let i = 0; i < cloneCount; i++) {
    const firstClone = cards[i].cloneNode(true);
    const lastClone = cards[total - 1 - i].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstChild);
  }

  const allCards = Array.from(track.querySelectorAll(".offer-card"));

  function updateCarouselAndService(instant = false) {
    if (instant) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.8s ease';
    }

    allCards.forEach(card => card.classList.remove("active", "prev", "next"));

    // Real index (accounting for clones at the start)
    const activeIndex = currentIndex + cloneCount;
    allCards[activeIndex].classList.add("active");
    allCards[activeIndex - 1].classList.add("prev");
    allCards[activeIndex + 1].classList.add("next");

    const cardWidth = cards[0].offsetWidth + 12; // gap = 12
    const centerOffset = (track.parentElement.offsetWidth / 2) - (cardWidth / 2);

    track.style.transform = `translateX(${centerOffset - (activeIndex * cardWidth)}px)`;

    // Show corresponding service content
    const serviceName = allCards[activeIndex].getAttribute('data-service');
    showService(serviceName);

    if (instant) {
      // Force repaint
      track.offsetHeight;
    }
  }

  function handleBoundary() {
    if (currentIndex >= total) {
      currentIndex = 0;
      updateCarouselAndService(true);
    } else if (currentIndex < 0) {
      currentIndex = total - 1;
      updateCarouselAndService(true);
    }
  }

  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    handleBoundary();
  });

  // Navigation button handlers
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateCarouselAndService();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex--;
      updateCarouselAndService();
    });
  }

  // Add click handlers to offer cards (including clones)
  allCards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (isTransitioning) return;
      e.stopPropagation();

      // Calculate the correct actual index, even if a clone is clicked
      let actualIndex = i - cloneCount;
      if (actualIndex >= total) actualIndex -= total;
      if (actualIndex < 0) actualIndex += total;

      currentIndex = actualIndex;
      isTransitioning = true;
      updateCarouselAndService();
    });
  });


  // Initialize
  updateCarouselAndService(true);
});