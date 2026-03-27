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

    // --- BENTO BOX DATENBANK (Startseite) ---
    // Hier bestimmst du die Vorschau-Kacheln auf der Startseite.
    const bentoProjects = [
        {
            tag: "Highlight",
            title: "Die neue Jugend-Lounge",
            description: "Wir haben den alten Raum komplett renoviert. Ein neuer Treffpunkt für alle ab 14 Jahren mit Gaming-Ecke und Workspace.",
            image: "https://picsum.photos/seed/bento1/1200/1200",
            link: "projekte.html" // Wohin soll die Kachel führen?
        },
        {
            tag: "Event",
            title: "Politik-Talk 2026",
            description: "Diskutiere mit lokalen Politikern über die Zukunft von Pratteln.",
            image: "https://picsum.photos/seed/bento2/800/800",
            link: "events.html"
        },
        {
            tag: "Team",
            title: "Wir suchen dich!",
            description: "Werde Teil des Jugendrats und verändere deine Gemeinde aktiv mit.",
            image: "https://picsum.photos/seed/bento3/800/800",
            link: "team.html"
        },
        {
            tag: "Projekt",
            title: "Skatepark Upgrade",
            description: "Neue Rampen und Flutlichter für längere Sessions im Sommer.",
            image: "https://picsum.photos/seed/bento4/800/800",
            link: "projekte.html"
        }
    ];

    // --- AUTOMATISCHER BENTO-GENERATOR ---
    const bentoContainer = document.getElementById('bento-grid-container');
    
    if (bentoContainer) {
        let bentoHtml = '';
        
        bentoProjects.forEach((item, index) => {
            const delayClass = `delay-${(index % 3) + 1}`;
            
            bentoHtml += `
                <a href="${item.link}" class="bento-item ${delayClass}">
                    <img src="${item.image}" alt="${item.title}" class="bento-img">
                    <div class="bento-content">
                        <span class="bento-tag">${item.tag}</span>
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </a>
            `;
        });
        
        bentoContainer.innerHTML = bentoHtml;
    }

    // --- TEAM DATENBANK ---
    // Hier kannst du Mitglieder extrem einfach hinzufügen, ändern oder löschen.
    const teamMembers = [
        {
            name: "Qwertz Ui",
            roleFront: "Zxcvbn Qwe",
            roleBack: "Qwertz Uiops Lkjhg",
            age: "17",
            quote: "Asdfg hjklz xcvbn mqwer tyuio pasdf ghjkl mnbv.",
            instagram: "Vbnm_qwe",
            image: "https://picsum.photos/seed/member1/800/1000"
        },
        {
            name: "Plmko Ij",
            roleFront: "Yxcvb Nm",
            roleBack: "Zxcvb Nmqwe rtyui opasd.",
            age: "19",
            quote: "Qwert yuiop asdfg hjkl zxcvb nmqwe rtyui opasd fghjk.",
            instagram: "Plmko_insta",
            image: "https://picsum.photos/seed/member2/800/1000"
        },
        {
            name: "Rtuz Vb",
            roleFront: "Qwerty Uiop",
            roleBack: "Asdfg hjkl zxcvb nmqwer tyu.",
            age: "16",
            quote: "Vbnm kljhgf dsaqw ertyuio pasdf ghjkl.",
            instagram: "Rtuz_official",
            image: "https://picsum.photos/seed/member3/800/1000"
        },
        {
            name: "Qwertz Ui",
            roleFront: "Zxcvbn Qwe",
            roleBack: "Qwertz Uiops Lkjhg",
            age: "17",
            quote: "Asdfg hjklz xcvbn mqwer tyuio pasdf ghjkl mnbv.",
            instagram: "Vbnm_qwe",
            image: "https://picsum.photos/seed/member1/800/1000"
        },
        {
            name: "Plmko Ij",
            roleFront: "Yxcvb Nm",
            roleBack: "Zxcvb Nmqwe rtyui opasd.",
            age: "19",
            quote: "Qwert yuiop asdfg hjkl zxcvb nmqwe rtyui opasd fghjk.",
            instagram: "Plmko_insta",
            image: "https://picsum.photos/seed/member2/800/1000"
        },
        {
            name: "Rtuz Vb",
            roleFront: "Qwerty Uiop",
            roleBack: "Asdfg hjkl zxcvb nmqwer tyu.",
            age: "16",
            quote: "Vbnm kljhgf dsaqw ertyuio pasdf ghjkl.",
            instagram: "Rtuz_official",
            image: "https://picsum.photos/seed/member3/800/1000"
        },
        {
            name: "Qwertz Ui",
            roleFront: "Zxcvbn Qwe",
            roleBack: "Qwertz Uiops Lkjhg",
            age: "17",
            quote: "Asdfg hjklz xcvbn mqwer tyuio pasdf ghjkl mnbv.",
            instagram: "Vbnm_qwe",
            image: "https://picsum.photos/seed/member1/800/1000"
        },
        {
            name: "Plmko Ij",
            roleFront: "Yxcvb Nm",
            roleBack: "Zxcvb Nmqwe rtyui opasd.",
            age: "19",
            quote: "Qwert yuiop asdfg hjkl zxcvb nmqwe rtyui opasd fghjk.",
            instagram: "Plmko_insta",
            image: "https://picsum.photos/seed/member2/800/1000"
        },
        {
            name: "Rtuz Vb",
            roleFront: "Qwerty Uiop",
            roleBack: "Asdfg hjkl zxcvb nmqwer tyu.",
            age: "16",
            quote: "Vbnm kljhgf dsaqw ertyuio pasdf ghjkl.",
            instagram: "Rtuz_official",
            image: "https://picsum.photos/seed/member3/800/1000"
        }
        // Willst du ein neues Mitglied hinzufügen? Kopiere einfach einen Block von { bis }, füge ihn hier ein und ändere den Text!
    ];

    // --- AUTOMATISCHER KARTEN-GENERATOR ---
    const teamContainer = document.getElementById('team-grid-container');
    
    if (teamContainer) {
        let htmlContent = '';
        
        teamMembers.forEach((member, index) => {
            // Berechnet dynamisch den Delay (1, 2, 3) für die Einblend-Animation
            const delayClass = `delay-${(index % 3) + 1}`;
            
            htmlContent += `
                <div class="flip-card-scene ${delayClass}">
                    <div class="flip-card-inner">
                        
                        <div class="flip-card-front">
                            <img src="${member.image}" alt="${member.name}">
                            <div class="flip-card-front-info">
                                <h3>${member.name}</h3>
                                <p>${member.roleFront}</p>
                            </div>
                        </div>

                        <div class="flip-card-back">
                            <div class="card-back-header">
                                <h3>${member.name}</h3>
                                <div class="card-back-meta">
                                    <p><strong>Alter:</strong> ${member.age} Jahre</p>
                                    <p><strong>Ressort:</strong> ${member.roleBack}</p>
                                </div>
                            </div>
                            <div class="card-back-quote">
                                “${member.quote}”
                            </div>
                            <div class="card-back-action">
                                <a href="https://instagram.com/${member.instagram}" target="_blank">@${member.instagram}</a>
                            </div>
                        </div>

                    </div>
                </div>
            `;
        });
        
        // Fügt das generierte HTML in die Seite ein
        teamContainer.innerHTML = htmlContent;
        
        // WICHTIG: Falls du den Custom Cursor (cursor-dot) verwendest, 
        // müssen wir den neu generierten Elementen mitteilen, dass sie hoverbar sind.
        if (typeof updateCursorHoverElements === 'function') {
            updateCursorHoverElements(); 
        }
    }

    // --- HORIZONTAL FILM ROLL LOGIC (Projekte) ---
    const filmWrapper = document.querySelector('.film-roll-wrapper');
    const filmTrack = document.querySelector('.film-roll-track');

    if (filmWrapper && filmTrack) {
        window.addEventListener('scroll', () => {
            // Holt die Position des Wrappers
            const wrapperRect = filmWrapper.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Wenn der obere Rand des Wrappers den oberen Bildschirmrand erreicht hat
            if (wrapperRect.top < 0 && wrapperRect.bottom > windowHeight) {
                // Berechne, wie viel Prozent wir schon durch den Wrapper gescrollt sind (0 bis 1)
                const scrollProgress = Math.abs(wrapperRect.top) / (wrapperRect.height - windowHeight);
                
                // Berechne die maximale Verschiebung nach links
                // (Gesamtbreite der Rolle minus Bildschirmbreite + etwas Puffer)
                const maxTranslate = filmTrack.scrollWidth - window.innerWidth + 100;
                
                // Wende die Verschiebung an
                filmTrack.style.transform = `translateX(-${scrollProgress * maxTranslate}px)`;
            } else if (wrapperRect.top >= 0) {
                // Setze zurück, wenn wir oben drüber sind
                filmTrack.style.transform = `translateX(0px)`;
            }
        });
        
        // Cursor-Hover für die neuen Film-Karten aktivieren
        if (typeof updateCursorHoverElements === 'function') {
            updateCursorHoverElements();
        }
    }

});

document.addEventListener('DOMContentLoaded', () => {
    // --- MAGNETIC BUTTON LOGIC ---
    const magneticWraps = document.querySelectorAll('.magnetic-wrap');

    magneticWraps.forEach(wrap => {
        const btn = wrap.querySelector('.btn-magnetic');
        
        // Magnet zieht an
        wrap.addEventListener('mousemove', (e) => {
            const position = wrap.getBoundingClientRect();
            // Berechnet die Mausposition relativ zur Mitte des Buttons
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Bewegt den Button sanft zur Maus (Faktor 0.3 für einen subtilen Effekt)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        // Magnet lässt los
        wrap.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            // Kurze Transition für das "Zurückschnappen" hinzufügen
            btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                btn.style.transition = 'transform 0.1s linear'; // Zurücksetzen für flüssige Mausbewegung
            }, 500);
        });
    });

    // --- FORMULAR SUBMIT ANIMATION ---
    const contactForm = document.getElementById('interactive-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Verhindert das Neuladen der Seite
            
            const submitBtn = contactForm.querySelector('.btn-magnetic');
            const originalText = submitBtn.innerHTML;
            
            // 1. Lade-Status
            submitBtn.innerHTML = 'Wird gesendet... ⏳';
            submitBtn.style.opacity = '0.8';
            
            // 2. Fake-Server-Delay (tut so, als würde er senden)
            setTimeout(() => {
                // 3. Erfolgs-Status
                submitBtn.classList.add('success');
                submitBtn.innerHTML = 'Nachricht gesendet! 🚀';
                submitBtn.style.opacity = '1';
                
                // Formular leeren
                contactForm.reset();
                
                // Optional: Button nach 5 Sekunden wieder normalisieren
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.innerHTML = originalText;
                }, 5000);
                
            }, 1500); // 1.5 Sekunden "Ladezeit"
        });
    }
});