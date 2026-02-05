/**
 * Main JavaScript - Interactions & Animations
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initScrollProgress();
    initNavigation();
    initScrollAnimations();
    initTypewriter();
    initSkillBars();
    initCounters();
    initTiltEffect();
});

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/**
 * Navigation
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;

    // Hide/show nav on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // Also trigger immediately for elements already in viewport on page load
    requestAnimationFrame(() => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animated');
            }
        });
    });
}

/**
 * Typewriter Effect
 */
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;

    const phrases = [
        'Flutter Developer',
        'AI-Powered App Specialist',
        'Cross-Platform Expert',
        'Mobile App Developer'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/**
 * Skill Bar Animations
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/**
 * Counter Animations
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
}

/**
 * 3D Tilt Effect for Project Cards
 */
/**
 * 3D Tilt Effect for Project Cards - Smooth Physics Version
 */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(el => {
        let rotation = { x: 0, y: 0 };
        let translation = { y: 0 };
        let target = { x: 0, y: 0, yTrans: 0 };
        let animationId = null;
        let isHovering = false;

        // Smoothness factor (lower = smoother/slower, higher = snappier)
        const lerpFactor = 0.1;

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const updateTilt = () => {
            // Interpolate values
            rotation.x = lerp(rotation.x, target.x, lerpFactor);
            rotation.y = lerp(rotation.y, target.y, lerpFactor);
            translation.y = lerp(translation.y, target.yTrans, lerpFactor);

            // Apply transform
            // perspective(1000px) must be first
            el.style.transform = `perspective(1000px) rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg) translateY(${translation.y.toFixed(2)}px)`;

            // Continue loop if hovering OR if values haven't settled back to 0
            const isSettled = Math.abs(target.x - rotation.x) < 0.05 &&
                Math.abs(target.y - rotation.y) < 0.05 &&
                Math.abs(target.yTrans - translation.y) < 0.05;

            if (isHovering || !isSettled) {
                animationId = requestAnimationFrame(updateTilt);
            } else {
                animationId = null;
                // Force reset to perfect 0 when stopped
                if (!isHovering) {
                    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                }
            }
        };

        const startAnimation = () => {
            if (!animationId) {
                animationId = requestAnimationFrame(updateTilt);
            }
        };

        el.addEventListener('mouseenter', () => {
            isHovering = true;
            target.yTrans = -10; // Lift up 10px on enter (smoother/deeper feel)

            // Disable CSS transition to let JS handle the physics physics
            el.style.transition = 'none';
            startAnimation();
        });

        el.addEventListener('mousemove', (e) => {
            if (!isHovering) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation targets (max 15deg tilt)
            target.x = ((y - centerY) / centerY) * 10; // Inverted Y for natural feel? No, (y-centerY) is positive when DOWN, so rotateX positive tips items AWAY (top goes back). 
            // Usually we want: Mouse Top -> Tilt Top DOWN (rotateX positive? No, rotateX positive brings TOP towards viewer? No negative?)
            // CSS rotateX: positive = top back.
            // Mouse at top (y small): (y-centerY) is negative. rotateX negative. Top comes forward?
            // Let's stick to the previous formula: (y - centerY) / 20.

            target.x = (y - centerY) / 10; // Slightly stronger effect
            target.y = (centerX - x) / 10;
        });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            // Reset targets to 0
            target = { x: 0, y: 0, yTrans: 0 };
            // We let the loop continue running until it lerps back to 0
        });
    });
}
