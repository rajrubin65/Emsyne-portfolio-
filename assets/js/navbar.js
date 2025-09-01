document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById("mainNavbar");

    // Fade down animation on page load
    setTimeout(() => {
        navbar.classList.add("show");
    }, 100); // slight delay so transition applies

    let prevScrollpos = window.pageYOffset;
    const hideAfterHeight = 400; // threshold height

    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;

        if (currentScrollPos > hideAfterHeight) {
            if (prevScrollpos > currentScrollPos) {
                // Scrolling up - show navbar
                navbar.classList.remove('hidden');
            } else {
                // Scrolling down - hide navbar
                navbar.classList.add('hidden');
            }
        } else {
            // Above the threshold - always show navbar
            navbar.classList.remove('hidden');
        }

        prevScrollpos = currentScrollPos;
    };

    const hamburger = document.getElementById('icon');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');

    if (hamburger && nav && overlay) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        // Hide menu when overlay is clicked
        overlay.addEventListener('click', function () {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Hide menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
    }
});
