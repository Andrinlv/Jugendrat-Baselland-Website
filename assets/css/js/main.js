/* =========================================
   mo.studio - INTERACTIVE ENGINE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.getElementById("cursor-dot");
    const interactables = document.querySelectorAll("a, button, .card");

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
});