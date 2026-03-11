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
  crewIndex = (newIndex + crewCards.length) % crewCards.length;
  crewCards.forEach((card, i) => {
    const offset = (i - crewIndex + crewCards.length) % crewCards.length;
    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );
    if (offset === 0) card.classList.add("center");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === 2) card.classList.add("right-2");
    else if (offset === crewCards.length - 1)
      card.classList.add("left-1");
    else if (offset === crewCards.length - 2)
      card.classList.add("left-2");
    else card.classList.add("hidden");
    // Set proper opacity and visibility
    if (!card.classList.contains("hidden")) {
      card.style.opacity = 1;
      card.style.visibility = "visible";
    } else {
      card.style.opacity = 0;
      card.style.visibility = "hidden";
    }
  });
  setTimeout(() => {
    crewAnimating = false;
  }, 800);
}
leftBtn.addEventListener("click", () =>
  updateCrewCarousel(crewIndex - 1)
);
rightBtn.addEventListener("click", () =>
  updateCrewCarousel(crewIndex + 1)
);
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

  const getIndex = (i) => (i + total) % total;

  function updateCarouselAndService() {
    cards.forEach(card =>
      card.classList.remove("active", "prev", "next")
    );

    const prevIndex = getIndex(currentIndex - 1);
    const nextIndex = getIndex(currentIndex + 1);

    cards[currentIndex].classList.add("active");
    cards[prevIndex].classList.add("prev");
    cards[nextIndex].classList.add("next");

    const cardWidth = cards[0].offsetWidth + 12; // gap = 12
    const centerOffset =
      (track.parentElement.offsetWidth / 2) - (cardWidth / 2);

    track.style.transform =
      `translateX(${centerOffset - (currentIndex * cardWidth)}px)`;

    // Show corresponding service content
    const serviceName = cards[currentIndex].getAttribute('data-service');
    showService(serviceName);
  }

  // Navigation button handlers
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = getIndex(currentIndex + 1);
      updateCarouselAndService();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = getIndex(currentIndex - 1);
      updateCarouselAndService();
    });
  }

  // Add click handlers to offer cards
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = i;
      updateCarouselAndService();
    });
  });

  // Initialize with first service (enterprise) visible on page load
  updateCarouselAndService();
});