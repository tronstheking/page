
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth < 1024;

    // --- 1. MISSION COUNTERS --- (Always show numbers on mobile to avoid JS lag)
    const counters = document.querySelectorAll('.counter-number');
    if (isMobile) {
        counters.forEach(c => c.innerText = c.getAttribute('data-target') + (c.getAttribute('data-target').includes('100') ? '%' : '+'));
    } else {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, parseInt(entry.target.getAttribute('data-target')));
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(el, end) {
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentVal = Math.floor((1 - Math.pow(1 - progress, 3)) * end);
            el.innerText = currentVal + (el.innerText.includes('%') ? '%' : '+');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // --- 2. MODAL LOGIC ---
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectData = {
        branding: { title: "Identidad Visual Holística", tag: "Branding", desc: "Desarrollo integral de marca.", client: "TechNova", date: "2025" },
        social: { title: "Estrategia de Reels", tag: "Social Media", desc: "Contenido de alto impacto.", client: "FitLife", date: "2025" },
        logos: { title: "Simbolismo Minimalista", tag: "Logos", desc: "Rediseño de imagen corporativa.", client: "Nexus", date: "2025" },
        ilustraciones: { title: "Arte Digital", tag: "Ilustraciones", desc: "Estilo limpio y vibrante.", client: "WonderApp", date: "2026" },
        ia: { title: "AI Concept Art", tag: "IA Design", desc: "Fusión de IA y post-procesado.", client: "CyberPunk", date: "2025" }
    };

    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', () => {
            const data = projectData[card.getAttribute('data-category')] || projectData['branding'];
            modal.querySelector('.modal-image').src = card.querySelector('img').src;
            modal.querySelector('.modal-tag').innerText = data.tag;
            modal.querySelector('.modal-title').innerText = data.title;
            modal.querySelector('.modal-desc').innerText = data.desc;
            modal.querySelector('.meta-client').innerText = data.client;
            modal.querySelector('.meta-date').innerText = data.date;
            modal.classList.add('modal-show');
            document.body.style.overflow = 'hidden';
            if (!isMobile && typeof playSound === 'function') playSound('rocket');
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    function closeModal() {
        modal.classList.remove('modal-show');
        document.body.style.overflow = '';
    }

    // --- 3. MISSION PATH ---
    const steps = document.querySelectorAll('.path-step');
    if (isMobile) {
        steps.forEach(step => {
            step.style.opacity = '1';
            step.style.transform = 'none';
        });
    } else {
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

            let ticking = false;
            step.addEventListener('mousemove', (e) => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const rect = step.getBoundingClientRect();
                        const dx = e.clientX - rect.left - rect.width / 2;
                        const dy = e.clientY - rect.top - rect.height / 2;
                        step.style.transform = `perspective(1000px) rotateY(${dx / 30}deg) rotateX(${-dy / 30}deg) translateX(5px)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            step.addEventListener('mouseleave', () => step.style.transform = 'translateX(0)');
        });
    }
});
