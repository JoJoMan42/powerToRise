/* ==========================
   ANIMATIONS.JS
   Particle Canvas + Stat Counter
========================== */

document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // 1. FLOWING WAVE PARTICLE CANVAS
    // ========================

    const canvases = document.querySelectorAll(".hero-canvas");

    canvases.forEach(canvas => {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let animId;
        let width, height;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            width = canvas.width = rect.width;
            height = canvas.height = rect.height;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor(width * height / 3500), 250);

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.8 + 0.3,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.15,
                    opacity: Math.random() * 0.5 + 0.1,
                    waveOffset: Math.random() * Math.PI * 2,
                    waveSpeed: Math.random() * 0.008 + 0.003,
                    waveAmp: Math.random() * 30 + 10,
                });
            }
        }

        function drawParticle(p) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
            ctx.fill();

            if (p.radius > 1.2) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity * 0.08})`;
                ctx.fill();
            }
        }

        function connectParticles() {
            const maxDist = 100;
            const maxDistSq = maxDist * maxDist;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - dist / maxDist) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        let time = 0;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            // Flowing wave lines
            for (let w = 0; w < 3; w++) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.03 + w * 0.01})`;
                ctx.lineWidth = 1;
                for (let x = 0; x < width; x += 3) {
                    const y = height * (0.5 + w * 0.12) +
                        Math.sin(x * 0.003 + time + w * 1.5) * 40 +
                        Math.sin(x * 0.006 + time * 0.7) * 20;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Update and draw particles
            particles.forEach(p => {
                p.waveOffset += p.waveSpeed;
                p.x += p.speedX;
                p.y += p.speedY + Math.sin(p.waveOffset) * 0.3;

                if (p.x < -10) p.x = width + 10;
                if (p.x > width + 10) p.x = -10;
                if (p.y < -10) p.y = height + 10;
                if (p.y > height + 10) p.y = -10;

                drawParticle(p);
            });

            connectParticles();
            animId = requestAnimationFrame(animate);
        }

        resize();
        createParticles();
        animate();

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resize();
                createParticles();
            }, 200);
        }, { passive: true });

        // Pause when not visible
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animId) animate();
                } else {
                    cancelAnimationFrame(animId);
                    animId = null;
                }
            });
        }, { threshold: 0.1 });

        observer.observe(canvas.parentElement);
    });

    // ========================
    // 2. STAT COUNTER ANIMATION
    // ========================

    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(el) {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)(\+?)$/);
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = match[2] || "";
        const duration = 2000;
        const start = performance.now();

        el.textContent = "0" + suffix;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach(el => counterObserver.observe(el));

    // ========================
    // 3. HEADER GLOW ON SCROLL
    // ========================

    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }, { passive: true });
    }

});
