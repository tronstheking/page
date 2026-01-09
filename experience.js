
document.addEventListener('DOMContentLoaded', () => {

    // 1. CUSTOM CURSOR LOGIC
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

        // Immediate flashlight movement
        flashlight.style.left = mouseX + 'px';
        flashlight.style.top = mouseY + 'px';
    });

    // Smooth cursor movement
    function animateCursor() {
        // Dot movement (very fast)
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;

        // Outline movement (delayed/smooth)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.transform = `translate3d(${outlineX - 20}px, ${outlineY - 20}px, 0)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover detection
    const interactiveElements = document.querySelectorAll('a, button, .folder-card, .portfolio-card, .path-step, .service-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            el.style.transform = ''; // Reset magnetic effect
        });

        // 2. MAGNETIC EFFECT
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle pull effect
            el.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0) scale(1.02)`;
        });
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

    // 3. SOUND CONTROL HUD
    const hud = document.createElement('div');
    hud.className = 'hud-control';
    hud.innerHTML = `
        <div class="hud-item sound-toggle" id="soundToggle">
            <span class="radar-dot"></span>
            <span class="hud-label">SYSTEM AUDIO: OFF</span>
            <div class="sound-waves muted">
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </div>
        <div class="hud-item">
            <span class="hud-label">STATUS: MISSION ACTIVE</span>
        </div>
    `;
    document.body.appendChild(hud);

    let isMuted = true;
    const soundToggle = document.getElementById('soundToggle');
    const hudLabel = soundToggle.querySelector('.hud-label');
    const waves = soundToggle.querySelector('.sound-waves');

    soundToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        hudLabel.innerText = isMuted ? 'SYSTEM AUDIO: OFF' : 'SYSTEM AUDIO: ON';
        waves.classList.toggle('muted', isMuted);

        if (typeof playSound === 'function') {
            playSound(isMuted ? 'click' : 'rocket');
        }
    });
});
