
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MISSION COUNTERS ANIMATION ---
    const counters = document.querySelectorAll('.counter-number');
    const observerOptions = { threshold: 0.5 };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, endValue);
                counterObserver.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, end) {
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * end);

            el.innerText = currentVal + (el.innerText.includes('%') ? '%' : '+');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = end + (el.getAttribute('data-target').includes('%') ? '%' : '+');
            }
        }
        requestAnimationFrame(update);
    }

    // --- 2. MODAL LOGIC FOR PORTFOLIO ---
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');

    const projectData = {
        branding: { title: "Identidad Visual Holística", tag: "Branding & Strategy", desc: "Desarrollo integral de marca enfocado en la psicología del color.", client: "TechNova Solutions", date: "Noviembre 2025" },
        social: { title: "Estrategia de Reels de Alto Impacto", tag: "Motion & Content", desc: "Creación de una serie de 12 Reels optimizados.", client: "FitLife Agency", date: "Diciembre 2025" },
        logos: { title: "Simbolismo Minimalista", tag: "Identity Design", desc: "Rediseño de imagen corporativa buscando la síntesis total.", client: "Nexus Global", date: "Octubre 2025" },
        ilustraciones: { title: "Arte Digital Narrativo", tag: "Illustration", desc: "Serie de ilustraciones vectoriales para interfaces.", client: "WonderApp", date: "Enero 2026" },
        ia: { title: "Concept Art con IA Generativa", tag: "AI Design & Polish", desc: "Fusión de herramientas de IA con post-procesamiento manual.", client: "CyberPunk Project", date: "Diciembre 2025" }
    };

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const data = projectData[category] || projectData['branding'];
            const imgSrc = card.querySelector('img').src;

            modal.querySelector('.modal-image').src = imgSrc;
            modal.querySelector('.modal-tag').innerText = data.tag;
            modal.querySelector('.modal-title').innerText = data.title;
            modal.querySelector('.modal-desc').innerText = data.desc;
            modal.querySelector('.meta-client').innerText = data.client;
            modal.querySelector('.meta-date').innerText = data.date;

            modal.classList.add('modal-show');
            document.body.style.overflow = 'hidden';
            if (typeof playSound === 'function') playSound('rocket');
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    function closeModal() {
        modal.classList.remove('modal-show');
        document.body.style.overflow = '';
        if (typeof playSound === 'function') playSound('click');
    }

    // --- 3. MISSION PATH OPTIMIZED TILT ---
    const steps = document.querySelectorAll('.path-step');
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        pathObserver.observe(step);

        // Performance Optimized Tilt with rAF
        let ticking = false;
        step.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = step.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const xc = rect.width / 2;
                    const yc = rect.height / 2;
                    const dx = x - xc;
                    const dy = y - yc;
                    step.style.transform = `perspective(1000px) rotateY(${dx / 30}deg) rotateX(${-dy / 30}deg) translateX(5px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        step.addEventListener('mouseleave', () => {
            step.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateX(0)';
        });
    });
});
