/**
 * Life @Emsyne - Dynamic Gallery and Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const galleryTrack = document.getElementById('galleryTrack');
    const yearSelector = document.getElementById('yearSelector');
    const scrollProgress = document.getElementById('scrollProgress');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let galleryData = {};

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
        const images = galleryData[year] || [];

        images.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-aos', 'fade-up');
            galleryItem.setAttribute('data-aos-delay', (index * 100).toString());

            galleryItem.innerHTML = `
                <img src="${item.url}" alt="${item.caption}">
                <div class="gallery-item-info">
                    <h5>${item.caption}</h5>
                </div>
            `;

            galleryTrack.appendChild(galleryItem);
        });

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        galleryTrack.scrollLeft = 0;
        updateScrollProgress();
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

    // Custom Scroll Controls (Gallery)
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

    // Initial load
    fetchMoments();
});
