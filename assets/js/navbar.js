let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.getElementById("mainNavbar");
        const icon = document.getElementById("icon");
        const nav = document.getElementById("nav");
        const overlay = document.getElementById("overlay");

       
        let inactivityTimeout;

        function checkNavbar() {
            if (!navbar) return;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 400) {
                navbar.classList.add("hidden");
            } else {
                navbar.classList.remove("hidden");
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

            // Reset inactivity timer on scroll
            resetInactivityTimer();
        }

        function resetInactivityTimer() {
            // Clear existing timeout
            clearTimeout(inactivityTimeout);

            // // Set new timeout to hide navbar after 4 seconds
            // inactivityTimeout = setTimeout(() => {
            //     if (navbar) {
            //         navbar.classList.add("hidden");
            //     }
            // }, 2000);
        }

        checkNavbar();
        window.addEventListener("scroll", checkNavbar);
        // Add mouse movement listener to reset timer
        window.addEventListener("mousemove", resetInactivityTimer);

        // Hide navbar when any navigation link is clicked
        const navLinks = document.querySelectorAll(".desktop-menu a, #nav a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navbar) {
                    navbar.classList.add("hidden");
                }
            });
        });


         // Toggle mobile menu
        icon.addEventListener('click', function () {
            icon.classList.toggle('active');
            nav.style.display = nav.style.display === "block" ? "none" : "block";
            overlay.style.display = overlay.style.display === "block" ? "none" : "block";
        });

        // Close mobile menu when clicking overlay
        overlay.addEventListener('click', function () {
            icon.classList.remove('active');
            nav.style.display = "none";
            overlay.style.display = "none";
        });

        // Close mobile menu when clicking a menu link
        const mobileLinks = nav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                icon.classList.remove('active');
                nav.style.display = "none";
                overlay.style.display = "none";
            });
        });

        // ====== FIX FOR DESKTOP RESIZE ======
        window.addEventListener('resize', function () {
            if (window.innerWidth > 992) {
                icon.classList.remove('active');
                nav.style.display = "none";
                overlay.style.display = "none";
            }
        });

        