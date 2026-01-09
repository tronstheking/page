// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 1000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Menú Desplegable Logic
    const menuBtn = document.querySelector('.menu-btn');
    const closeMenuBtn = document.querySelector('#close-menu');
    const sideMenu = document.querySelector('#side-menu');
    const menuOverlay = document.querySelector('#menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    const toggleMenu = () => {
        sideMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Portfolio Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Optional: Add an entry animation
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Bottom Navigation Active State Logic
    const navItems = document.querySelectorAll('.nav-item');

    // Smooth scroll and active state update
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Update active nav item based on scroll position
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Activa la sección cuando entra en el carril superior
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Buscamos el link que corresponde a este ID
                const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);

                if (activeLink) {
                    navItems.forEach(item => item.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observamos todas las secciones y el card de contacto
    const targets = ['home', 'portfolio', 'services', 'collaborate'];
    targets.forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
    });

    // Generic Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Optimized Scroll Loop
    let lastScrollY = 0;
    let ticking = false;

    function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const glow1 = document.querySelector('.bg-glow-1');
        const glow2 = document.querySelector('.bg-glow-2');

        if (glow1) glow1.style.transform = `translate3d(${scrolled * 0.05}px, ${scrolled * 0.05}px, 0)`;
        if (glow2) glow2.style.transform = `translate3d(-${scrolled * 0.03}px, -${scrolled * 0.03}px, 0)`;

        // Rocket Scroll Logic
        const rocket = document.querySelector('.ambient-rocket');
        if (rocket) {
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPercent = (scrolled / height) * 100;

            // MATH FIX: Starting at 0 (bottom) and rising to -85vh (top) as we scroll
            const currentPos = - (scrolledPercent * 0.85);

            if (rocket.dataset.isLanding !== 'true') {
                rocket.style.transform = `translateY(${currentPos}vh) translateZ(0)`;
            }
            // Visibility: Fade in after starting to scroll
            rocket.style.opacity = scrolledPercent > 1 ? '1' : '0';

            if (scrolledPercent > 92) {
                rocket.style.filter = `drop-shadow(0 0 ${15 + (scrolledPercent - 92) * 5}px #00ff84)`;
                rocket.style.color = '#ffffff';
                rocket.style.scale = '1.3';
            } else {
                rocket.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 132, 0.8))';
                rocket.style.color = '#00ff84';
                rocket.style.scale = '1';
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    });
    // Rocket Click Action
    const rocket = document.querySelector('.ambient-rocket');
    if (rocket) {
        rocket.addEventListener('click', () => {
            const contactSection = document.getElementById('collaborate');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Style container for dynamic animations
    const mainStyle = document.createElement('style');

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Hover Effect
        const hoverTargets = 'button, a, .stack-item, .portfolio-card, .service-card, .filter-btn';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // Instagram Dice Roll Logic
    const igPreviews = document.querySelectorAll('.ig-preview');
    igPreviews.forEach(preview => {
        preview.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (preview.classList.contains('rolling')) return;

            const carousel = preview.querySelector('.ig-carousel');
            preview.classList.add('rolling');

            setTimeout(() => {
                preview.classList.remove('rolling');

                // Pick a random image (1 to 4)
                const randomIndex = Math.floor(Math.random() * 4);
                const offset = randomIndex * -120;

                carousel.classList.add('snap');
                carousel.style.transform = `translateX(${offset}px)`;

                // Winning effect
                setTimeout(() => {
                    const winner = carousel.querySelectorAll('img')[randomIndex];
                    if (winner) {
                        winner.style.filter = 'brightness(1.5) contrast(1.2)';
                        setTimeout(() => winner.style.filter = '', 500);
                    }
                }, 100);

            }, 800);
        });
    });

    // System Crash Easter Egg (Cube Click)
    const cubeIcon = document.querySelector('.icon-cube');
    if (cubeIcon) {
        cubeIcon.addEventListener('click', () => {
            document.body.classList.add('glitch-flash');

            setTimeout(() => {
                const collaborate = document.getElementById('collaborate');
                const header = document.querySelector('.header');
                const bottomNav = document.querySelector('.bottom-nav');
                const rocket = document.querySelector('.ambient-rocket');
                const sections = document.querySelectorAll('main > section, .hero-section > *, .portfolio-section > *, .services-section > *');

                const allPieces = [...sections, header, bottomNav, rocket];

                allPieces.forEach((piece, index) => {
                    if (!piece || piece === collaborate || piece.contains(collaborate)) return;
                    piece.style.setProperty('--r', (Math.random() - 0.5) * 40);
                    setTimeout(() => {
                        piece.classList.add('falling-piece');
                    }, index * 10);
                });

                setTimeout(() => {
                    if (collaborate) {
                        collaborate.classList.add('mission-focus');
                        const h3 = collaborate.querySelector('h3');
                        if (h3) h3.innerHTML = "SISTEMA COMPROMETIDO.<br><span style='color:var(--primary-green)'>SOLO QUEDO YO.</span>";
                        const p = collaborate.querySelector('p');
                        if (p) p.innerText = "Reinicio completo en proceso... La única conexión estable es vía WhatsApp.";
                        const btn = collaborate.querySelector('.btn-primary');
                        if (btn) btn.innerHTML = "RESTABLECER CONEXIÓN <i class='ri-whatsapp-line'></i>";
                    }
                    document.body.classList.remove('glitch-flash');
                    document.body.style.overflow = 'hidden';
                    document.body.style.backgroundColor = '#000';
                }, 1000);
            }, 400);
        });
    }

    // Blue Energy Mode (Blue Cube Click)
    const blueCube = document.querySelector('.icon-cube-blue');
    if (blueCube) {
        blueCube.addEventListener('click', () => {
            document.body.classList.toggle('blue-energy');

            // Pulse feedback
            const pulse = document.createElement('div');
            pulse.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                background: var(--primary-blue);
                border-radius: 50%;
                z-index: 10000;
                pointer-events: none;
                animation: blue-expand 0.8s ease-out forwards;
            `;
            document.body.appendChild(pulse);

            const style = document.createElement('style');
            style.textContent = `
                @keyframes blue-expand {
                    0% { width: 0; height: 0; opacity: 1; }
                    100% { width: 300vw; height: 300vw; opacity: 0; }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => pulse.remove(), 800);
        });
    }

    // Canva Abduction Interaction
    const canvaItem = document.getElementById('canva-item');
    if (canvaItem) {
        canvaItem.addEventListener('click', () => {
            const rect = canvaItem.getBoundingClientRect();

            // Create the Abductor UFO
            const ufo = document.createElement('div');
            ufo.className = 'abducting-ufo';
            ufo.innerHTML = '<i class="ri-aliens-line"></i><div class="abduction-beam"></div>';
            ufo.style.left = (rect.left + rect.width / 2 - 25) + 'px';
            ufo.style.top = '-100px';
            document.body.appendChild(ufo);

            // 1. UFO descends
            setTimeout(() => {
                ufo.style.top = (rect.top - 150) + 'px';

                // 2. Beam activates
                setTimeout(() => {
                    ufo.querySelector('.abduction-beam').classList.add('active');

                    // 3. Canva Content is abducted
                    setTimeout(() => {
                        canvaItem.classList.add('abducted');

                        // 4. UFO departs with Canva
                        setTimeout(() => {
                            ufo.style.top = '-200px';
                            ufo.style.opacity = '0';

                            // 5. Reveal the lunar message inside the remaining box
                            const msg = document.createElement('div');
                            msg.className = 'novato-msg';
                            msg.innerHTML = '⚠ NO SOY NOVATO ⚠';
                            canvaItem.classList.add('abducted-box');
                            canvaItem.appendChild(msg);

                            setTimeout(() => {
                                msg.classList.add('visible');
                                ufo.remove();
                            }, 400);
                        }, 800);
                    }, 500);
                }, 800);
            }, 100);
        });
    }
    // Cosmic Starfield Generator
    function initCosmicEffect() {
        const starField = document.querySelector('.star-field');
        if (!starField) return;

        // Create Stars - Optimized for Mobile
        const isMobile = window.innerWidth < 768;
        const starCount = isMobile ? 50 : 150; // Reduce stars on mobile

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const size = Math.random() * 2 + 0.5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = 2 + Math.random() * 4;
            const delay = Math.random() * 5;
            const opacity = 0.3 + Math.random() * 0.7;

            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${y}%;
                left: ${x}%;
                --duration: ${duration}s;
                --delay: ${delay}s;
                --opacity: ${opacity};
                z-index: -2;
                will-change: transform, opacity; /* HARDWARE ACCEL */
            `;
            starField.appendChild(star);
        }

        // Shooting Stars Timer
        setInterval(() => {
            const shooter = document.createElement('div');
            shooter.className = 'shooting-star';
            shooter.style.top = Math.random() * 60 + '%';
            shooter.style.right = '0';
            document.body.appendChild(shooter);

            setTimeout(() => shooter.remove(), 3000);
        }, 12000);

        // Optimized Mouse Parallax (PC Only)
        if (window.matchMedia("(pointer: fine)").matches) {
            let mouseX = 0, mouseY = 0;
            let currentMouseX = 0, currentMouseY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX - window.innerWidth / 2) * 0.005;
                mouseY = (e.clientY - window.innerHeight / 2) * 0.005;
            });

            function animateParallax() {
                // Smooth interpolation
                currentMouseX += (mouseX - currentMouseX) * 0.1;
                currentMouseY += (mouseY - currentMouseY) * 0.1;

                const nebulas = document.querySelectorAll('.nebula');
                nebulas.forEach((neb, index) => {
                    const speed = (index + 1) * 2;
                    neb.style.transform = `translate(${currentMouseX * speed}px, ${currentMouseY * speed}px)`;
                });

                const stars = document.querySelectorAll('.star');
                stars.forEach((star, i) => {
                    if (i % 3 === 0) {
                        const speed = 1.5;
                        star.style.transform = `translate(${currentMouseX * speed}px, ${currentMouseY * speed}px)`;
                    }
                });

                requestAnimationFrame(animateParallax);
            }
            animateParallax();
        }
        // Generate Planets
        const planetContainer = document.querySelector('.planet-container');
        if (planetContainer) {
            const planetTypes = ['gas-giant', 'ring-planet', 'exoplanet', 'exoplanet-plasma', 'ice-giant'];

            for (let i = 0; i < 4; i++) {
                const planet = document.createElement('div');
                const type = planetTypes[Math.floor(Math.random() * planetTypes.length)];
                planet.className = `planet ${type}`;

                const size = 60 + Math.random() * 100;
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = startX + (Math.random() - 0.5) * 20; // Subtle drift
                const endY = startY + (Math.random() - 0.5) * 20;
                const speed = 60 + Math.random() * 120;

                planet.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    --start-x: ${startX}vw;
                    --start-y: ${startY}vh;
                    --end-x: ${endX}vw;
                    --end-y: ${endY}vh;
                    --p-speed: ${speed}s;
                    opacity: 0.6;
                `;
                planetContainer.appendChild(planet);
            }
            // Generate Cosmic Traffic (UFOs & Mini-Rockets)
            const ufoContainer = document.querySelector('.ufo-container');
            if (ufoContainer) {
                // Spawn UFOs
                for (let i = 0; i < 3; i++) {
                    const ufo = document.createElement('div');
                    ufo.className = 'ufo';
                    ufo.innerHTML = '<i class="ri-aliens-line"></i><div class="ufo-beam"></div>';

                    const speed = 15 + Math.random() * 15;
                    const delay = Math.random() * 10;

                    ufo.style.cssText = `
                    --u-start-x: ${Math.random() * 100}vw;
                    --u-start-y: ${110}vh;
                    --u-mid-x1: ${Math.random() * 100}vw;
                    --u-mid-y1: ${Math.random() * 50}vh;
                    --u-mid-x2: ${Math.random() * 100}vw;
                    --u-mid-y2: ${Math.random() * 80}vh;
                    --u-end-x: ${Math.random() * 100}vw;
                    --u-end-y: ${-20}vh;
                    --ufo-speed: ${speed}s;
                    animation-delay: ${delay}s;
                    left: 0; top: 0;
                `;
                    ufoContainer.appendChild(ufo);
                }
                // Spawn Mini Rockets
                for (let i = 0; i < 5; i++) {
                    const miniRocket = document.createElement('div');
                    miniRocket.className = 'mini-rocket';
                    miniRocket.innerHTML = '<i class="ri-rocket-fill"></i>';

                    const angle = Math.random() * 360;
                    const speed = 20 + Math.random() * 20;

                    miniRocket.style.cssText = `
                    --r-start-x: ${Math.random() * 120 - 10}vw;
                    --r-start-y: ${110}vh;
                    --r-end-x: ${Math.random() * 120 - 10}vw;
                    --r-end-y: ${-20}vh;
                    --r-angle: ${angle}deg;
                    --r-speed: ${speed}s;
                    animation-delay: ${Math.random() * 5}s;
                    left: 0; top: 0;
                `;
                    ufoContainer.appendChild(miniRocket);
                }
            }
        }

        // Automatic Visitor Rocket Logic
        // Automatic Visitor Rocket Logic - Force Active
        function spawnVisitorRocket() {
            const landingPad = document.querySelector('.landing-pad');
            if (!landingPad) return;

            // Prevent overlapping but allow reset
            if (landingPad.dataset.busy === 'true') {
                return;
            };
            landingPad.dataset.busy = 'true';

            // Visual Feedback on Pad
            landingPad.style.boxShadow = '0 0 50px var(--primary-green), inset 0 0 20px #fff';
            setTimeout(() => landingPad.style.boxShadow = '', 500);

            // Create Visitor Rocket
            const visitor = document.createElement('div');
            visitor.className = 'visitor-rocket';
            visitor.innerHTML = '<i class="ri-rocket-2-fill"></i>';
            // Ensure style is reset
            visitor.style.cssText = 'position: fixed; z-index: 10005; pointer-events: none; transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease;';
            document.body.appendChild(visitor);

            const padRect = landingPad.getBoundingClientRect();

            // Start position (Top Right, off screen)
            const startX = window.innerWidth + 50;
            const startY = -50;

            visitor.style.left = startX + 'px';
            visitor.style.top = startY + 'px';

            // Force reflow
            void visitor.offsetWidth;

            // Calculate Landing Position
            const targetX = padRect.left + padRect.width / 2;
            const targetY = padRect.top - 40;

            // Animate Travel
            visitor.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) rotate(-45deg)`;

            setTimeout(() => {
                // Landed
                visitor.classList.add('landed');
                visitor.style.color = '#00ff84'; // Force color change manually in case class fails
                visitor.style.filter = 'drop-shadow(0 0 30px #00ff84)';

                // Message
                const messages = ['¡NUEVO PROYECTO!', 'HABLEMOS', '¿LISTOS?', 'HOLA JAVIER', 'STARTUP 🚀'];
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];

                const msg = document.createElement('div');
                msg.className = 'rocket-message';
                msg.innerText = randomMsg;
                visitor.appendChild(msg);

                requestAnimationFrame(() => msg.classList.add('visible'));

                // Stay for a while then leave
                setTimeout(() => {
                    msg.classList.remove('visible');
                    visitor.classList.remove('landed');

                    // Fly away to the left
                    visitor.style.transform = `translate(${targetX - startX - window.innerWidth}px, ${targetY - startY - 200}px) rotate(-90deg)`;
                    visitor.style.opacity = '0';

                    setTimeout(() => {
                        visitor.remove();
                        landingPad.dataset.busy = 'false';
                    }, 1000);
                }, 2000);
            }, 1000);
        }

        // Reset busy state on init - force reset
        const pad = document.querySelector('.landing-pad');
        if (pad) {
            pad.dataset.busy = 'false';
        }

        // Setup Interval - Using a wrapper to keep scope
        window.rocketInterval = setInterval(spawnVisitorRocket, 4000);

        // Trigger one immediately
        setTimeout(spawnVisitorRocket, 500);



    }


    // --- BAIT & SWITCH LOGIC (The "Not a Rookie" Prank) ---
    function initBaitLogic() {
        const canvaItem = document.getElementById('canva-item');
        if (!canvaItem) return;

        // Cleanup any modal logic first if existing
        // No modal cleanup needed as we want in-place now

        // 1. VISUAL CLEANUP: Remove old covers
        canvaItem.querySelectorAll('.bait-cover').forEach(el => el.remove());

        // 2. CREATE VISUAL: Add the cover INSIDE the card
        const cover = document.createElement('div');
        cover.className = 'bait-cover';
        cover.innerHTML = '⚠️ NO SOY NOVATO ⚠️';
        canvaItem.appendChild(cover);

        // 3. LISTENERS
        if (canvaItem.dataset.baitInit === 'true') return;
        canvaItem.dataset.baitInit = 'true';

        canvaItem.addEventListener('click', (e) => {
            e.preventDefault();

            // Toggle logic
            if (canvaItem.classList.contains('baited')) {
                playSound('click');
                canvaItem.classList.remove('baited');
                return;
            }

            playSound('alert');
            canvaItem.classList.add('baited');
        });
    }

    // --- 3D TILT EFFECT LOGIC ---
    function initTiltEffect() {
        // Targeted all card-like elements for the holographic effect
        const cards = document.querySelectorAll('.tilt-card, .portfolio-card, .service-card, .stack-item, .bait-modal');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate percentage (0 to 1)
                const xPct = x / rect.width;
                const yPct = y / rect.height;

                // Calculate rotation (Example range: -15deg to 15deg)
                // xPct 0 -> -15deg, xPct 1 -> 15deg
                const xRot = (yPct - 0.5) * 20; // Rotate X axis based on Y position (inverted?)
                const yRot = (xPct - 0.5) * -20; // Rotate Y axis based on X position

                card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // --- AUDIO SYNTHESIZER (UI SOUNDS) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let isMuted = false;

    function playSound(type) {
        if (isMuted || audioCtx.state === 'suspended') {
            audioCtx.resume(); // Try to resume if suspended
            if (isMuted) return;
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'hover') {
            // High frequency, short blip
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);

            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.05);
        } else if (type === 'click') {
            // Lower, mechanical click
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'rocket') {
            // Low rumble for rocket (simulated with noise-ish AM modulation)
            // Just a deep sine for simplicity now
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 1);

            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 1);
        } else if (type === 'alert') {
            // Error / Glitch-like buzzy sound
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);

            // Add some noise texture (AM mod) logic if possible, or just rough distortion
            // Simple rough buzz for now
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);
        }
    }

    // --- AMBIENT SPACE DRONE (Futuristic Sci-Fi Engine) ---
    let droneOscillators = [];
    let droneGain = null;

    function startAmbientDrone() {
        if (!audioCtx || droneOscillators.length > 0) return;

        droneGain = audioCtx.createGain();
        droneGain.connect(audioCtx.destination);
        droneGain.gain.setValueAtTime(0, audioCtx.currentTime);
        // Fade in
        droneGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 3);

        // -- Layer 1: The Core (Deep Tech Hum) --
        // Sawtooth wave filtered down sounds like a powerful server or engine
        const coreOsc = audioCtx.createOscillator();
        coreOsc.type = 'sawtooth';
        coreOsc.frequency.value = 50; // Deep Bass

        const coreFilter = audioCtx.createBiquadFilter();
        coreFilter.type = 'lowpass';
        coreFilter.frequency.value = 200; // Muffled tech sound
        coreFilter.Q.value = 1;

        const coreGain = audioCtx.createGain();
        coreGain.gain.value = 0.5;

        coreOsc.connect(coreFilter);
        coreFilter.connect(coreGain);
        coreGain.connect(droneGain);

        coreOsc.start();
        droneOscillators.push(coreOsc);

        // -- Layer 2: The Data Stream (High Crystalline Resonance) --
        const etherOsc = audioCtx.createOscillator();
        etherOsc.type = 'sine';
        etherOsc.frequency.value = 800; // High tech resonance

        const etherGain = audioCtx.createGain();
        etherGain.gain.value = 0.03; // Subtle

        // LFO to make it pulse ("breathing" effect)
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.2; // Slow pulse

        const lfoAmount = audioCtx.createGain();
        lfoAmount.gain.value = 0.02;

        lfo.connect(lfoAmount);
        lfoAmount.connect(etherGain.gain);

        etherOsc.connect(etherGain);
        etherGain.connect(droneGain);

        etherOsc.start();
        lfo.start();
        droneOscillators.push(etherOsc);
        droneOscillators.push(lfo);

        // -- Layer 3: Fluctuations (Computer Processing Noise) --
        // Use a detuned triangle wave to add "instability" or "activity"
        const computerOsc = audioCtx.createOscillator();
        computerOsc.type = 'triangle';
        computerOsc.frequency.value = 120; // Mid-low range

        // Modulate pitch slightly to sound "active"
        const detuneLfo = audioCtx.createOscillator();
        detuneLfo.frequency.value = 3; // Fast flicker
        const detuneGain = audioCtx.createGain();
        detuneGain.gain.value = 2; // Slight pitch wobble

        detuneLfo.connect(detuneGain);
        detuneGain.connect(computerOsc.frequency);

        const computerGain = audioCtx.createGain();
        computerGain.gain.value = 0.05;

        computerOsc.connect(computerGain);
        computerGain.connect(droneGain);

        computerOsc.start();
        detuneLfo.start();
        droneOscillators.push(computerOsc);
        droneOscillators.push(detuneLfo);
    }

    function stopAmbientDrone() {
        if (droneGain) {
            droneGain.gain.cancelScheduledValues(audioCtx.currentTime);
            droneGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2); // Fade out

            setTimeout(() => {
                droneOscillators.forEach(osc => osc.stop());
                droneOscillators = [];
            }, 2100);
        }
    }

    // Init Interactions
    function initInteractions() {
        // Sounds
        document.querySelectorAll('a, button, .tilt-card').forEach(el => {
            el.addEventListener('mouseenter', () => playSound('hover'));
            el.addEventListener('click', () => playSound('click'));
        });

        // Mute Toggle
        const muteBtn = document.createElement('div');
        muteBtn.className = 'sound-toggle';
        muteBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
        muteBtn.title = "Activar/Desactivar Sonido";
        document.body.appendChild(muteBtn);

        // Start muted by default to respect autoplay policy
        isMuted = true;
        muteBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
        muteBtn.classList.add('muted');

        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;

            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            if (isMuted) {
                muteBtn.classList.add('muted');
                muteBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
                stopAmbientDrone();
            } else {
                muteBtn.classList.remove('muted');
                muteBtn.innerHTML = '<i class="ri-volume-up-line"></i>';
                playSound('click');
                startAmbientDrone();
            }
        });

        initTiltEffect();
        initBaitLogic();
    }

    initInteractions();
    initCosmicEffect();




    mainStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(mainStyle);
});


    // --- TOUCH RIPPLE LOGIC (Mobile Polish) ---
    document.addEventListener('click', (e) => {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        document.body.appendChild(ripple);
        
        // Position at touch point
        ripple.style.left = e.pageX + 'px';
        ripple.style.top = e.pageY + 'px';
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
