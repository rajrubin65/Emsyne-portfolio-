/**
 * Navbar Loader
 * Dynamically loads the navbar component from components/navbar.html
 * into pages that use it.
 */

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch the navbar HTML
    const response = await fetch("components/navbar.html");
    if (!response.ok) throw new Error(`Failed to load navbar: ${response.statusText}`);

    const navbarHtml = await response.text();

    // Create a placeholder element if it doesn't exist
    let navbarContainer = document.getElementById("navbar-container");
    if (!navbarContainer) {
      navbarContainer = document.createElement("div");
      navbarContainer.id = "navbar-container";
      document.body.insertBefore(navbarContainer, document.body.firstChild);
    }

    // Insert the navbar HTML
    navbarContainer.innerHTML = navbarHtml;

    // Initialize navbar functionality (hamburger menu, overlay, etc.)
    initializeNavbar();
  } catch (error) {
    console.error("Error loading navbar:", error);
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
