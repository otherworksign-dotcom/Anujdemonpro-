document.addEventListener('DOMContentLoaded', () => {

    // 🔥 1. 3D TILT & MOUSE TRACKING GLOW EFFECT 🔥
    // Yeh tere cards ko real life object jaisa 3D feel dega
    const tiltElements = document.querySelectorAll('.vibe-card, .timeline-box, .setup-item');
    
    tiltElements.forEach(el => {
        // Jab mouse card ke upar chalega
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X position
            const y = e.clientY - rect.top;  // Mouse Y position
            
            // Rotation calculate karna (Max 12 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            
            // 3D Tilt lagana
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Cursor ke piche Purple Glow move karna
            el.style.background = `
                radial-gradient(circle at ${x}px ${y}px, rgba(168, 85, 247, 0.25) 0%, rgba(15, 10, 25, 0.95) 50%)
            `;
            el.style.zIndex = "10";
        });
        
        // Jab mouse card se bahar niklega (Reset)
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Original background wapas
            el.style.background = `linear-gradient(180deg, rgba(20, 15, 30, 0.8) 0%, rgba(5, 5, 10, 0.9) 100%)`; 
            el.style.zIndex = "1";
        });
    });

    // 🧲 2. MAGNETIC CTA BUTTONS 🧲
    // Jab mouse button ke paas aayega toh button mouse ki taraf khichega
    const magnets = document.querySelectorAll('.cta-btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Mouse ki taraf halka sa pull karna
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            // Wapas apni jagah par
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });
});
