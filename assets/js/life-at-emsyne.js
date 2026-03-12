/**
 * Life @Emsyne - Dynamic Gallery and Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const galleryTrack = document.getElementById('galleryTrack');
    const yearSelector = document.getElementById('yearSelector');
    const scrollProgress = document.getElementById('scrollProgress');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Lightbox elements
    const galleryLightbox = document.getElementById('galleryLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCaptionList = document.getElementById('lightboxCaptionList');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxProgress = document.getElementById('lightboxProgress');

    let galleryData = {};
    let cardAutoScrollIntervals = []; // Store intervals for each card

    // Lightbox State
    let currentGalleryImages = []; // Stores all items for the active year
    let currentLightboxImages = []; // Stores urls for the active caption
    let currentLightboxIndex = 0;

    // Year Selector Nav
    const yearPrevBtn = document.getElementById('yearPrevBtn');
    const yearNextBtn = document.getElementById('yearNextBtn');
    let currentYearIndex = 0;
    let years = [];

    // Fetch Moments Data
    async function fetchMoments() {
        try {
            const response = await fetch('assets/json/moments.json');
            galleryData = await response.json();

            // Setup Years
            years = Object.keys(galleryData).sort((a, b) => b - a);
            yearSelector.innerHTML = '';

            years.forEach((year, index) => {
                const button = document.createElement('button');
                button.className = `year-btn ${index === 0 ? 'active' : ''}`;
                button.setAttribute('data-year', year);
                button.textContent = year;
                yearSelector.appendChild(button);
            });

            // Initial load
            if (years.length > 0) {
                loadGallery(years[0]);
                updateYearNavVisibility();
            }
        } catch (error) {
            console.error('Error loading moments:', error);
        }
    }

    // Load Gallery for a specific year
    function loadGallery(year) {
        galleryTrack.innerHTML = '';
        clearCardIntervals(); // Stop old intervals
        const images = galleryData[year] || [];

        images.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-aos', 'fade-up');
            galleryItem.setAttribute('data-aos-delay', (index * 100).toString());

            const urls = item.urls || [item.url];

            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = urls[0];
            imgElement.alt = item.caption;

            // Caption overlay
            const infoDiv = document.createElement('div');
            infoDiv.className = 'gallery-item-info';
            infoDiv.innerHTML = `<h5>${item.caption}</h5>`;

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(infoDiv);

            // Item active internal auto-scroll logic
            if (urls.length > 1) {
                let imgIndex = 0;
                const interval = setInterval(() => {
                    imgIndex = (imgIndex + 1) % urls.length;
                    imgElement.src = urls[imgIndex];
                }, 2000);
                cardAutoScrollIntervals.push(interval);
            }

            // On click, open lightbox
            galleryItem.addEventListener('click', () => {
                openLightbox(images, index);
            });

            galleryTrack.appendChild(galleryItem);
        });

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        galleryTrack.scrollLeft = 0;
        updateScrollProgress();
    }

    function clearCardIntervals() {
        cardAutoScrollIntervals.forEach(interval => clearInterval(interval));
        cardAutoScrollIntervals = [];
    }

    // Year Navigation Logic
    function updateYearNavVisibility() {
        const itemWidth = yearSelector.children[0]?.clientWidth || 0;
        const gap = 10;
        const moveX = currentYearIndex * (itemWidth + gap);
        yearSelector.style.transform = `translateX(-${moveX}px)`;

        yearPrevBtn.style.opacity = currentYearIndex === 0 ? '0.3' : '1';
        yearPrevBtn.style.pointerEvents = currentYearIndex === 0 ? 'none' : 'auto';

        const MaxIndex = Math.max(0, years.length - 3);
        yearNextBtn.style.opacity = currentYearIndex >= MaxIndex ? '0.3' : '1';
        yearNextBtn.style.pointerEvents = currentYearIndex >= MaxIndex ? 'none' : 'auto';
    }

    yearNextBtn.addEventListener('click', () => {
        if (currentYearIndex < years.length - 3) {
            currentYearIndex++;
            updateYearNavVisibility();
        }
    });

    yearPrevBtn.addEventListener('click', () => {
        if (currentYearIndex > 0) {
            currentYearIndex--;
            updateYearNavVisibility();
        }
    });

    // Update Scroll Progress Bar
    function updateScrollProgress() {
        const total = galleryTrack.scrollWidth - galleryTrack.clientWidth;
        if (total > 0) {
            const progress = (galleryTrack.scrollLeft / total) * 100;
            scrollProgress.style.width = `${progress}%`;
        } else {
            scrollProgress.style.width = '100%';
        }
    }

    // Event Listeners for Year Buttons
    yearSelector.addEventListener('click', (e) => {
        const btn = e.target.closest('.year-btn');
        if (btn && !btn.classList.contains('active')) {
            document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const year = btn.getAttribute('data-year');
            galleryTrack.style.opacity = '0';
            setTimeout(() => {
                loadGallery(year);
                galleryTrack.style.opacity = '1';
            }, 300);
        }
    });

    // Custom Scroll Controls (Gallery track manual navigation)
    nextBtn.addEventListener('click', () => {
        const itemWidth = galleryTrack.querySelector('.gallery-item')?.clientWidth || 400;
        galleryTrack.scrollBy({ left: itemWidth + 20, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = galleryTrack.querySelector('.gallery-item')?.clientWidth || 400;
        galleryTrack.scrollBy({ left: -(itemWidth + 20), behavior: 'smooth' });
    });

    // Track Scroll
    galleryTrack.addEventListener('scroll', updateScrollProgress);


    // ==========================================
    // Lightbox Logic (Single Image View)
    // ==========================================
    function openLightbox(imagesData, startIndex) {
        if (!galleryLightbox) return;

        currentGalleryImages = imagesData;
        populateCaptionList();
        selectLightboxItem(startIndex);

        galleryLightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    const lightboxCaptionPrev = document.getElementById('lightboxCaptionPrev');
    const lightboxCaptionNext = document.getElementById('lightboxCaptionNext');

    function populateCaptionList() {
        if (!lightboxCaptionList) return;
        lightboxCaptionList.innerHTML = '';
        currentGalleryImages.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.caption;
            // Removed click listener since they are navigated via arrows now
            lightboxCaptionList.appendChild(li);
        });
    }

    function selectLightboxItem(index) {
        if (index < 0) index = currentGalleryImages.length - 1;
        if (index >= currentGalleryImages.length) index = 0;

        // Ensure we store index to know which caption is active
        // Let's use a module-level variable to store current active caption index
        window.currentLightboxCaptionIndex = index; 

        const item = currentGalleryImages[index];
        currentLightboxImages = item.urls || [item.url];
        currentLightboxIndex = 0;

        // Update active class on captions and slide the list
        if (lightboxCaptionList) {
            // Slide the caption list to show the active index
            lightboxCaptionList.style.transform = `translateX(-${index * 100}%)`;
        }

        updateLightboxView();
    }

    if (lightboxCaptionPrev) {
        lightboxCaptionPrev.addEventListener('click', () => {
            selectLightboxItem(window.currentLightboxCaptionIndex - 1);
        });
    }

    if (lightboxCaptionNext) {
        lightboxCaptionNext.addEventListener('click', () => {
            selectLightboxItem(window.currentLightboxCaptionIndex + 1);
        });
    }

    function updateLightboxView() {
        if (!lightboxImage || currentLightboxImages.length === 0) return;
        lightboxImage.src = currentLightboxImages[currentLightboxIndex];

        // Hide navigation arrows if only 1 image
        if (currentLightboxImages.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
            if (lightboxProgress) lightboxProgress.style.width = '100%';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
            updateLightboxProgress();
        }
    }

    function changeLightboxImage(direction) {
        if (currentLightboxImages.length <= 1) return;

        currentLightboxIndex += direction;

        // Loop around
        if (currentLightboxIndex < 0) {
            currentLightboxIndex = currentLightboxImages.length - 1;
        } else if (currentLightboxIndex >= currentLightboxImages.length) {
            currentLightboxIndex = 0;
        }

        updateLightboxView();
    }

    function closeLightbox() {
        if (!galleryLightbox) return;
        galleryLightbox.classList.remove('active');
        document.body.style.overflow = ''; // restore scrolling
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (galleryLightbox) {
        const overlay = galleryLightbox.querySelector('.lightbox-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeLightbox);
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!galleryLightbox || !galleryLightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
    });

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => changeLightboxImage(1));
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => changeLightboxImage(-1));
    }

    // Touch event listeners for swipe navigation on mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightboxImage) {
        lightboxImage.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightboxImage.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const threshold = 50; // Minimum pixel distance to be considered a swipe
        if (touchEndX < touchStartX - threshold) {
            // Swiped left
            changeLightboxImage(1);
        }
        if (touchEndX > touchStartX + threshold) {
            // Swiped right
            changeLightboxImage(-1);
        }
    }

    function updateLightboxProgress() {
        if (!lightboxProgress || currentLightboxImages.length <= 1) return;
        const total = currentLightboxImages.length - 1;
        const progress = (currentLightboxIndex / total) * 100;
        lightboxProgress.style.width = `${progress}%`;
    }

    // Initial load
    fetchMoments();
});
