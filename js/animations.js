export function initAnimations() {
    // 1. Parallax Effect for Background Orbs
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // 2. Magnetic Buttons Effect
    const magneticButtons = document.querySelectorAll('.cta-button, .social-icons a');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0) scale(1)`;
        });
    });

    // 3. Upgraded Scroll Reveal with Staggering
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const index = Array.from(parent.children).indexOf(entry.target);
                
                const staggerContainers = ['zones-grid', 'features-list', 'image-gallery', 'sponsors-flex'];
                const isStaggerContainer = staggerContainers.some(cls => parent.classList.contains(cls));

                if (isStaggerContainer) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 150);
                } else {
                    entry.target.classList.add('active');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Sticky Header Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}
