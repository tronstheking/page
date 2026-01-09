
document.addEventListener('DOMContentLoaded', () => {
    // Detect low-end / mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;

    if (isMobile) {
        console.log("Optimizing for low-spec device...");
        return; // Kill custom cursor and heavy JS for mobile
    }

    // 1. CUSTOM CURSOR LOGIC (Desktop Only)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const outline = document.createElement('div');
    outline.className = 'cursor-outline';
    document.body.appendChild(outline);

    const flashlight = document.createElement('div');
    flashlight.className = 'mouse-flashlight';
    document.body.appendChild(flashlight);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        flashlight.style.left = mouseX + 'px';
        flashlight.style.top = mouseY + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .folder-card, .portfolio-card, .path-step, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));

        // 2. MAGNETIC EFFECT (Desktop Only)
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0) scale(1.02)`;
        });
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
});
