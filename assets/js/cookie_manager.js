/**
 * Cookie Manager
 * Handles the cookie consent popup logic and persistence.
 */

function initCookiePopup() {
    const popup = document.getElementById("cookie-consent-popup");
    const overlay = document.getElementById("cookie-consent-overlay");
    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");

    if (!popup || !acceptBtn || !rejectBtn || !overlay) return;

    // Check if consent already exists
    const consent = localStorage.getItem("emsyne_cookie_consent");

    if (!consent) {
        // Show popup with a slight delay
        setTimeout(() => {
            popup.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling behind popup
        }, 300); // Shorter delay since it blocks interaction
    }

    const setConsent = (status) => {
        localStorage.setItem("emsyne_cookie_consent", status);
        popup.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Restore scrolling

        // You could trigger analytics opt-in/opt-out here
        console.log(`Cookie consent set to: ${status}`);
    };

    acceptBtn.addEventListener("click", () => setConsent("all"));
    rejectBtn.addEventListener("click", () => setConsent("rejected"));
}

// Initialized by footer-loader.js after HTML is inserted
window.initCookiePopup = initCookiePopup;
