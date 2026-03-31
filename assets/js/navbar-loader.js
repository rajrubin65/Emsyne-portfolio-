/**
 * Navbar Loader
 * Dynamically loads the navbar component from components/navbar.html
 * into pages that use it.
 */

document.addEventListener("DOMContentLoaded", async () => {
  // Ensure navbar container and skeleton exist immediately to avoid layout jump and blank header
  let navbarContainer = document.getElementById("navbar-container");
  if (!navbarContainer) {
    navbarContainer = document.createElement("div");
    navbarContainer.id = "navbar-container";
    document.body.insertBefore(navbarContainer, document.body.firstChild);
  }

  // Show skeleton while loader runs
  navbarContainer.classList.add("navbar-loading");
  navbarContainer.innerHTML = `
    <div class="navbar-skeleton" aria-hidden="true">
      <div class="skeleton-logo"></div>
      <div class="skeleton-links">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;

  try {
    // Fetch the navbar HTML
    const response = await fetch("components/navbar.html");
    if (!response.ok) throw new Error(`Failed to load navbar: ${response.statusText}`);

    const navbarHtml = await response.text();

    // Insert the navbar HTML
    navbarContainer.innerHTML = navbarHtml;
    navbarContainer.classList.remove("navbar-loading");

    // Initialize navbar functionality (hamburger menu, overlay, etc.)
    initializeNavbar();
  } catch (error) {
    console.error("Error loading navbar:", error);
    navbarContainer.classList.remove("navbar-loading");
    navbarContainer.innerHTML = `<div class="navbar-error">Navbar failed to load. <a href="index.html">Go Home</a></div>`;
  }
});

/**
 * Initialize navbar functionality
 * Handles hamburger menu toggle, mobile menu, and overlay interactions
 */
function initializeNavbar() {
  const navbar = document.getElementById("mainNavbar");
  const hamburger = document.getElementById("icon");
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  if (navbar) {
    navbar.classList.add("show"); // Always visible
  }

  if (hamburger && nav && overlay) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    const closeMenu = () => {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    };

    overlay.addEventListener("click", closeMenu);

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => {
        if (link.classList.contains("mobile-dropdown-toggle")) {
          e.preventDefault(); // Prevent default link behavior
          const menu = link.nextElementSibling;
          if (menu) {
            menu.classList.toggle("active");
            link.classList.toggle("open");
          }
          return;
        }
        closeMenu();
      });
    });
  }
}
