/* =========================================
   mo.studio - INTERACTIVE ENGINE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.getElementById("cursor-dot");
    const interactables = document.querySelectorAll("a, button, .card, .events-visuals, .hz-item, .form-control, .artistic-portrait, .team-member, .flip-card-scene"); // .flip-card-scene HIER ERGÄNZEN

    if (cursorDot) {
        window.addEventListener("mousemove", (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => cursorDot.classList.add("hovered"));
            el.addEventListener("mouseleave", () => cursorDot.classList.remove("hovered"));
        });
    }

    // --- 2. Apple-Style Scroll Reveal Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // --- 3. Hide Header on Scroll ---
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 0) {
                header.classList.remove("header-hidden");
                lastScrollY = currentScrollY;
                return;
            }
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add("header-hidden");
            } else {
                header.classList.remove("header-hidden");
            }
            lastScrollY = currentScrollY;
        });
    }

    // --- 4. Apple-Style Horizontal Scroll Logic ---
    const hzWrapper = document.getElementById('hz-wrapper');
    const hzTrack = document.getElementById('hz-track');

    if (hzWrapper && hzTrack) {
        window.addEventListener('scroll', () => {
            // Check if we are on mobile (where we disabled the horizontal scroll in CSS)
            if (window.innerWidth <= 900) {
                hzTrack.style.transform = `translateX(0px)`;
                return;
            }

            const rect = hzWrapper.getBoundingClientRect();
            // Calculate progress (0 to 1) based on scroll position inside the wrapper
            const scrollProgress = -rect.top / (rect.height - window.innerHeight);
            
            // Limit the progress strictly between 0 and 1
            const clampedProgress = Math.max(0, Math.min(scrollProgress, 1));
            
            // Calculate maximum translation (width of all items minus the screen width)
            const maxScroll = hzTrack.scrollWidth - window.innerWidth + (window.innerWidth * 0.1); 
            // The + 10vw (0.1) accounts for the right padding
            
            // Apply translation directly to the GPU
            hzTrack.style.transform = `translateX(-${clampedProgress * maxScroll}px)`;
        });
    }

    // --- 5. Interactive Contact Form Mock ---
    const contactForm = document.getElementById('bzr-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Verhindert das Neuladen der Seite
            
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            
            // Lade-Status
            btn.textContent = 'Mnobv...'; 
            btn.style.opacity = '0.7';
            btn.style.transform = 'scale(0.98)';

            // Simuliere Server-Antwortzeit (1.5 Sekunden)
            setTimeout(() => {
                // Erfolgs-Status (Apple Green)
                btn.textContent = 'Qwertz Yx!'; 
                btn.style.background = '#34c759'; 
                btn.style.color = '#ffffff';
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
                
                contactForm.reset(); // Formular leeren

                // Nach 3 Sekunden zurücksetzen
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'var(--color-text)';
                    btn.style.color = 'var(--color-bg)';
                }, 3000);
            }, 1500);
        });
    }

    // --- 6. Event Portal Image Reveal Logic ---
    const eventRows = document.querySelectorAll('.event-row');
    const eventImages = document.querySelectorAll('.event-img');

    if (eventRows.length > 0 && eventImages.length > 0) {
        eventRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                // Hole die ID des Ziel-Bildes
                const targetId = row.getAttribute('data-target');
                
                // Alle Bilder unsichtbar machen
                eventImages.forEach(img => img.classList.remove('active'));
                
                // Das passende Bild aktivieren
                const targetImg = document.getElementById(targetId);
                if (targetImg) {
                    targetImg.classList.add('active');
                }
            });
        });
    }
});
