document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme == 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (currentTheme == 'light') {
        document.body.setAttribute('data-theme', 'light');
    } else if (prefersDarkScheme.matches) {
        // Fallback to system preference if no manual override
        document.body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');

        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Optional: Listen for system theme changes if user hasn't manually set a preference
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
            }
        }
    });
    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close-lightbox')[0];

    document.querySelectorAll('.project-tile').forEach(tile => {
        tile.addEventListener('click', () => {
            const img = tile.querySelector('img');
            const title = tile.querySelector('.project-title').textContent;
            const desc = tile.querySelector('.project-desc').textContent;

            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            captionText.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeBtn.onclick = function () {
        lightbox.style.display = "none";
        document.body.style.overflow = ''; // Restore scrolling
    }

    lightbox.onclick = function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = '';
        }
    }

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .hero-content').forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
