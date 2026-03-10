document.addEventListener("DOMContentLoaded", function () {
  
  

  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".fbs__net-navbar .scroll-link");

  function removeActiveClasses() {
    if (navLinks) {
      navLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  function addActiveClass(currentSectionId) {
    const activeLink = document.querySelector(
      `.fbs__net-navbar .scroll-link[href="#${currentSectionId}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  function getCurrentSection() {
    let currentSection = null;
    let minDistance = Infinity;
    if (sections) {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 4);

        if (distance < minDistance && rect.top < window.innerHeight) {
          minDistance = distance;
          currentSection = section.getAttribute("id");
        }
      });
    }

    return currentSection;
  }

  function updateActiveLink() {
    const currentSectionId = getCurrentSection();
    if (currentSectionId) {
      removeActiveClasses();
      addActiveClass(currentSectionId);
    }
  }

  window.addEventListener("scroll", updateActiveLink);

  const portfolioGrid = document.querySelector('#portfolio-grid');
  if (portfolioGrid) {
    var iso = new Isotope("#portfolio-grid", {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
    });

    if (iso) {
      iso.on("layoutComplete", updateActiveLink);

      imagesLoaded("#portfolio-grid", function () {
        iso.layout();
        updateActiveLink();
      });
    }

    var filterButtons = document.querySelectorAll(".filter-button");
    if (filterButtons) {
      filterButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          var filterValue = button.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });

          filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
          });
          button.classList.add("active");
          updateActiveLink();
        });
      });
    }

    updateActiveLink();
  }
});

const navbarScrollInit = () => {
  var navbar = document.querySelector(".fbs__net-navbar");

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (navbar) {
    if (scrollTop > 0) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }
  }
};

const navbarInit = () => {
  document.querySelectorAll('.dropdown-toggle[href="#"]').forEach(function (el, index) {
    el.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
};

// ======= Endless Logo Marquee =======
document.addEventListener("DOMContentLoaded", () => {
  const items = gsap.utils.toArray(".logo-item");
  if (!items.length) return;

  horizontalLoop(items, {
    speed: 0.6,   // increase = faster
    repeat: -1,
    paused: false
  });
});

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};

  let tl = gsap.timeline({
    repeat: config.repeat ?? -1,
    paused: config.paused ?? false,
    defaults: { ease: "none" }
  });

  let totalWidth = 0;
  let widths = [];

  // Measure widths
  items.forEach((el, i) => {
    widths[i] = el.offsetWidth;
    totalWidth += widths[i];
  });

  // Position items in a row
  gsap.set(items, {
    x: (i) => {
      let x = 0;
      for (let j = 0; j < i; j++) x += widths[j];
      return x;
    }
  });

  // Animate each item
  items.forEach((el, i) => {
    const distance = totalWidth;
    tl.to(
      el,
      {
        x: `-=${distance}`,
        duration: distance / ((config.speed || 1) * 100),
        modifiers: {
          x: gsap.utils.wrap(-distance, 0)
        }
      },
      0
    );
  });

  return tl;
}

// ======= Navbar Scroll =======
document.addEventListener("DOMContentLoaded", function () {

  if (typeof logoMarqueeInit === "function") {
    logoMarqueeInit();
  }

  if (typeof navbarInit === "function") {
    navbarInit();
  }

  window.addEventListener("scroll", navbarScrollInit);
});

// ======= Swiper =======
const swiperInit = () => {
  var swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    speed: 700,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: ".custom-button-next",
      prevEl: ".custom-button-prev",
    },
  });

  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  if (progressCircle && progressContent ) {
    var swiper2 = new Swiper(".sliderSwiper", {
      slidesPerView: 1,
      speed: 700,
      spaceBetween: 0,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".custom-button-next",
        prevEl: ".custom-button-prev",
      },

      on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
      }
    });
  }

};

document.addEventListener("DOMContentLoaded", swiperInit);

// ======= Glightbox =======
const glightBoxInit = () => {
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
};
document.addEventListener("DOMContentLoaded", glightBoxInit);

// ======= BS OffCanvass =======
const bsOffCanvasInit = () => {
  var offcanvasElement = document.getElementById("fbs__net-navbars");
  if (offcanvasElement) {
    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
      document.body.classList.add("offcanvas-active");
    });

    offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
      document.body.classList.remove("offcanvas-active");
    });
  }
};
document.addEventListener("DOMContentLoaded", bsOffCanvasInit);

// ======= Back To Top =======
const backToTopInit = () => {
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", backToTopInit);


// ======= Inline SVG =======
const inlineSvgInit = () => {
  const imgElements = document.querySelectorAll(".js-img-to-inline-svg");
  if (imgElements) {
    imgElements.forEach((imgElement) => {
      const imgURL = imgElement.getAttribute("src");

      fetch(imgURL)
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgText, "image/svg+xml");
          const svgElement = svgDocument.documentElement;

          Array.from(imgElement.attributes).forEach((attr) => {
            if (attr.name !== "class") {
              svgElement.setAttribute(attr.name, attr.value);
            } else {
              const classes = attr.value
                .split(" ")
                .filter((className) => className !== "js-img-to-inline-svg");
              if (classes.length > 0) {
                svgElement.setAttribute("class", classes.join(" "));
              }
            }
          });

          imgElement.replaceWith(svgElement);
        })
        .catch((error) => console.error("Error fetching SVG:", error));
    });
  }
};

document.addEventListener("DOMContentLoaded", inlineSvgInit);

// ======= AOS =======
const aosInit = () => {
  AOS.init({
    duration: 800,
    easing: 'slide',
    once: true
  });
}
document.addEventListener("DOMContentLoaded", aosInit);

// ======= PureCounter =======
const pureCounterInit = () => {
  new PureCounter({
    selector: ".purecounter",
  });
}
document.addEventListener("DOMContentLoaded", pureCounterInit);

// ======= Disable Click Navbar Dropdown =======
const addHoverEvents = (dropdown) => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

  const preventClick = (event) => event.preventDefault();
  const showDropdown = () => {
    dropdown.classList.add('show');
    dropdownToggle.setAttribute('aria-expanded', 'true');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.classList.add('show');
  };
  const hideDropdown = () => {
    dropdown.classList.remove('show');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
  };

  // Disable the click event for toggling the dropdown
  dropdownToggle.addEventListener('click', preventClick);

  // Open dropdown on hover
  dropdown.addEventListener('mouseover', showDropdown);

  // Close dropdown when mouse leaves
  dropdown.addEventListener('mouseleave', hideDropdown);

  // Store references to the event listeners for later removal
  dropdown.__events = { preventClick, showDropdown, hideDropdown };
};

const removeHoverEvents = (dropdown) => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const { preventClick, showDropdown, hideDropdown } = dropdown.__events || {};

  if (preventClick) {
    // Remove the event listeners
    dropdownToggle.removeEventListener('click', preventClick);
    dropdown.removeEventListener('mouseover', showDropdown);
    dropdown.removeEventListener('mouseleave', hideDropdown);

    // Remove the reference to the stored events
    delete dropdown.__events;
  }
};

const handleNavbarEvents = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const dropstarts = document.querySelectorAll('.navbar .dropstart');
  const dropends = document.querySelectorAll('.navbar .dropend');

  if (window.innerWidth >= 992) {

    // Add hover events to dropdowns
    dropdowns.forEach(addHoverEvents);
    dropstarts.forEach(addHoverEvents);
    dropends.forEach(addHoverEvents);
  } else {

    // Remove hover events from dropdowns
    dropdowns.forEach(removeHoverEvents);
    dropstarts.forEach(removeHoverEvents);
    dropends.forEach(removeHoverEvents);
  }
};

// Function to handle resizing
const handleResize = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const dropstarts = document.querySelectorAll('.navbar .dropstart');
  const dropends = document.querySelectorAll('.navbar .dropend');

  // Remove hover events before rechecking window size
  dropdowns.forEach(removeHoverEvents);
  dropstarts.forEach(removeHoverEvents);
  dropends.forEach(removeHoverEvents);

  // Re-apply hover events based on window size
  handleNavbarEvents();
};

// Call the function on resize event and initially
window.addEventListener('resize', handleResize);
handleNavbarEvents();



// ======= Coming Soon Countdown =======
const countdownInit = () => {

  // Get the current year
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const launchDate = new Date(`December 31, ${nextYear} 23:59:59`).getTime();

  // Change this "December 31, 2024 23:59:59" to your your website launch date
  // const launchDate = new Date("December 31, 2024 23:59:59").getTime();


  const x = setInterval(function () {

    const now = new Date().getTime();
      
    const distance = launchDate - now;
      
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    if (daysEl) {
      daysEl.innerText = days;
    }
    if (hoursEl) {
      hoursEl.innerText = hours;
    }
    if (minutesEl) {
      minutesEl.innerText = minutes;
    }
    if (secondsEl) {
      secondsEl.innerText = seconds;
    }
      
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".countdown").innerText = "Launched!";
    }
  }, 1000);
};
document.addEventListener('DOMContentLoaded', countdownInit);

