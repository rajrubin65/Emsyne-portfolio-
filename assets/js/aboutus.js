    document.addEventListener("DOMContentLoaded", function () {
      const heroH1 = document.querySelector(".hero h1");
      const heroP = document.querySelector(".hero p");

      setTimeout(() => {
        heroH1.classList.add("animate");
        heroP.classList.add("animate");
      }, 200);

      let lastScrollTop = 0;

      window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
          heroH1.classList.add("scroll-up");
          heroH1.classList.remove("scroll-down");
          heroP.classList.add("scroll-up");
          heroP.classList.remove("scroll-down");
        } else {
          heroH1.classList.add("scroll-down");
          heroH1.classList.remove("scroll-up");
          heroP.classList.add("scroll-down");
          heroP.classList.remove("scroll-up");
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      });

      function startCarousel(carousel) {
        setInterval(function () {
          carousel.find('.panel').each(function () {
            let currentLeft = parseFloat($(this).css('left'));
            $(this).css('left', (currentLeft - 0.5) + 'px');
          });

          let firstPanel = carousel.find('.panel:first');
          let panelWidth = firstPanel.outerWidth(true);
          if (Math.abs(firstPanel.position().left) >= panelWidth) {
            let newPanel = firstPanel.clone();
            newPanel.css('left', panelWidth * (carousel.find('.panel').length - 1) + 'px');
            carousel.append(newPanel);
            firstPanel.remove();
          }
        }, 16);
      }

      const carousel = $('#conTest .carousel');
      startCarousel(carousel);
    });