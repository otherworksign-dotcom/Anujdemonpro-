document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // AUDIO, CURSOR, PARTICLES & ANIMATIONS
    // ==========================================
    
    // 🔊 Sound Effects
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playSound(freq, type, duration) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + duration);
    }

    document.body.addEventListener('mouseenter', (e) => {
        if(e.target.closest('.snd-hover')) playSound(440, 'sine', 0.1);
    }, true);
    document.body.addEventListener('click', (e) => {
        if(e.target.closest('.snd-click, button, .vid-card')) playSound(880, 'triangle', 0.2);
    }, true);

    // 🖱️ Custom Cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX; const posY = e.clientY;
        dot.style.left = `${posX}px`; dot.style.top = `${posY}px`;
        outline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 250, fill: "forwards" });
    });

    // ✨ Interactive Particles
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; this.speedY = Math.random() * 0.6 + 0.2;
            this.opacity = Math.random() * 0.6 + 0.2;
        }
        update() {
            this.y -= this.speedY;
            if (this.y < 0) { this.y = canvas.height; this.x = Math.random() * canvas.width; }
        }
        draw() {
            ctx.fillStyle = `rgba(192, 132, 252, ${this.opacity})`;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    for (let i = 0; i < 60; i++) particles.push(new Particle());
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 📈 Stats Counter Animation
    let animated = false;
    function runCounter() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            let count = 0; const speed = Math.max(target / 40, 1); 
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count).toLocaleString() + suffix;
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target.toLocaleString() + suffix;
                    counter.classList.add('active-anim');
                }
            };
            updateCount();
        });
    }

    // 👁️ Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-card') && !animated) {
                    runCounter(); animated = true;
                }
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
