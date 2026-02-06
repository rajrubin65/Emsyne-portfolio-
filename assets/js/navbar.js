document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.getElementById("mainNavbar");
  const hamburger = document.getElementById("icon");
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  /* -------------------------
     1. NAVBAR VISIBILITY
  -------------------------- */
  if (navbar) {
    navbar.classList.add("show"); // Always visible
  }

  /* -------------------------
     2. HAMBURGER MENU
  -------------------------- */
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
      link.addEventListener("click", closeMenu);
    });
  }

});
