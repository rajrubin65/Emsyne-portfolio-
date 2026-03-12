/**
 * Footer Loader
 * Dynamically loads the footer component and cookie popup
 * into pages that use it.
 */

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch the footer HTML
    const response = await fetch("components/footer.html");
    if (!response.ok) throw new Error(`Failed to load footer: ${response.statusText}`);

    const footerHtml = await response.text();

    // Create a placeholder element if it doesn't exist
    let footerContainer = document.getElementById("footer-container");
    if (!footerContainer) {
      footerContainer = document.createElement("div");
      footerContainer.id = "footer-container";

      // Insert footer before the back-to-top button or at the end of main
      const main = document.querySelector("main");
      const backToTop = document.getElementById("back-to-top");

      if (backToTop) {
        backToTop.parentElement.insertBefore(footerContainer, backToTop);
      } else if (main) {
        main.appendChild(footerContainer);
      } else {
        document.body.appendChild(footerContainer);
      }
    }

    // Insert the footer HTML
    footerContainer.innerHTML = footerHtml;

    // Load Cookie Popup
    loadCookiePopup();

    // Initialize Legal Modals
    setupLegalModal("open-terms-modal", "close-terms-modal", "terms-modal");
    setupLegalModal("open-privacy-modal", "close-privacy-modal", "privacy-modal");
  } catch (error) {
    console.error("Error loading footer:", error);
  }
});

/**
 * Loads the cookie consent popup dynamically
 */
async function loadCookiePopup() {
  try {
    // 1. Inject CSS
    const cssId = 'cookie-popup-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'assets/css/cookie_popup.css';
      document.head.appendChild(link);
    }

    // 2. Fetch and Inject HTML
    const response = await fetch("components/cookie_popup.html");
    if (response.ok) {
      const popupHtml = await response.text();
      const popupContainer = document.createElement("div");
      popupContainer.innerHTML = popupHtml;
      document.body.appendChild(popupContainer);

      // 3. Load Script and Initialize
      const script = document.createElement('script');
      script.src = 'assets/js/cookie_manager.js';
      script.onload = () => {
        if (typeof window.initCookiePopup === 'function') {
          window.initCookiePopup();
        }
      };
      document.body.appendChild(script);
    }
  } catch (error) {
    console.error("Error loading cookie popup:", error);
  }
}

/**
 * Setup Legal Modal functionality
 * @param {string} openId - ID of the button to open the modal
 * @param {string} closeId - ID of the button to close the modal
 * @param {string} modalId - ID of the modal container
 */
function setupLegalModal(openId, closeId, modalId) {
  const openBtn = document.getElementById(openId);
  const closeBtn = document.getElementById(closeId);
  const modal = document.getElementById(modalId);
  const overlay = modal?.querySelector(".modal-overlay");

  if (!openBtn || !modal) return;

  const toggleModal = (show) => {
    modal.classList.toggle("active", show);
    document.body.classList.toggle("no-scroll", show);
  };

  openBtn.addEventListener("click", () => toggleModal(true));
  closeBtn?.addEventListener("click", () => toggleModal(false));
  overlay?.addEventListener("click", () => toggleModal(false));

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      toggleModal(false);
    }
  });
}
