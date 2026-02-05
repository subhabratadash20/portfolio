 "use client";
 
 import { useEffect } from "react";
 
 export default function LegacyInteractions() {
     useEffect(() => {
         const cleanups: Array<() => void> = [];
 
         const initScrollProgress = () => {
             const progressBar = document.getElementById("scrollProgress");
             if (!progressBar) return;
 
             const handleScroll = () => {
                 const scrollTop = window.scrollY;
                 const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                 const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                 progressBar.style.width = `${progress}%`;
             };
 
             window.addEventListener("scroll", handleScroll);
             handleScroll();
 
             cleanups.push(() => window.removeEventListener("scroll", handleScroll));
         };
 
         const initNavigation = () => {
             const nav = document.getElementById("nav");
             if (!nav) return;
 
             let lastScroll = 0;
             const handleScroll = () => {
                 const currentScroll = window.scrollY;
 
                 if (currentScroll > lastScroll && currentScroll > 100) {
                     nav.classList.add("hidden");
                 } else {
                     nav.classList.remove("hidden");
                 }
 
                 lastScroll = currentScroll;
             };
 
             window.addEventListener("scroll", handleScroll);
             cleanups.push(() => window.removeEventListener("scroll", handleScroll));
 
const navToggle = document.getElementById("navToggle");
            const navMenu = document.getElementById("navMenu");
            const navBackdrop = document.getElementById("navBackdrop");
            const navLinks = Array.from(document.querySelectorAll<HTMLElement>(".nav-link"));

            if (navToggle && navMenu) {
                const toggleMenu = () => {
                    navToggle.classList.toggle("active");
                    navMenu.classList.toggle("active");
                    navBackdrop?.classList.toggle("active");
                    // Prevent body scroll when menu is open
                    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
                };

                const closeMenu = () => {
                    navToggle.classList.remove("active");
                    navMenu.classList.remove("active");
                    navBackdrop?.classList.remove("active");
                    document.body.style.overflow = "";
                };

                navToggle.addEventListener("click", toggleMenu);
                cleanups.push(() => navToggle.removeEventListener("click", toggleMenu));

                // Close menu when clicking backdrop
                if (navBackdrop) {
                    navBackdrop.addEventListener("click", closeMenu);
                    cleanups.push(() => navBackdrop.removeEventListener("click", closeMenu));
                }

                navLinks.forEach((link) => {
                    link.addEventListener("click", closeMenu);
                    cleanups.push(() => link.removeEventListener("click", closeMenu));
                });

                // Close menu on escape key
                const handleEscape = (e: KeyboardEvent) => {
                    if (e.key === "Escape" && navMenu.classList.contains("active")) {
                        closeMenu();
                    }
                };
                document.addEventListener("keydown", handleEscape);
                cleanups.push(() => document.removeEventListener("keydown", handleEscape));
            }
 
             navLinks.forEach((link) => {
                 const handleClick = (e: Event) => {
                     const targetId = link.getAttribute("href");
                     if (targetId && targetId.startsWith("#")) {
                         e.preventDefault();
                         const targetSection = document.querySelector(targetId);
 
                         if (targetSection) {
                             const offsetTop = (targetSection as HTMLElement).offsetTop - 80;
                             window.scrollTo({
                                 top: offsetTop,
                                 behavior: "smooth",
                             });
                         }
                     }
                 };
 
                 link.addEventListener("click", handleClick);
                 cleanups.push(() => link.removeEventListener("click", handleClick));
             });
         };
 
         const initScrollAnimations = () => {
             const animatedElements = document.querySelectorAll<HTMLElement>(".animate-on-scroll");
             if (!animatedElements.length) return;
 
             const observer = new IntersectionObserver(
                 (entries) => {
                     entries.forEach((entry) => {
                         if (entry.isIntersecting) {
                             entry.target.classList.add("animated");
                         }
                     });
                 },
                 {
                     threshold: 0.1,
                     rootMargin: "0px 0px -50px 0px",
                 }
             );
 
             animatedElements.forEach((el) => observer.observe(el));
 
             const rafId = requestAnimationFrame(() => {
                 animatedElements.forEach((el) => {
                     const rect = el.getBoundingClientRect();
                     if (rect.top < window.innerHeight && rect.bottom > 0) {
                         el.classList.add("animated");
                     }
                 });
             });
 
             cleanups.push(() => {
                 observer.disconnect();
                 cancelAnimationFrame(rafId);
             });
         };
 
         const initTypewriter = () => {
             const typewriter = document.getElementById("typewriter");
             if (!typewriter) return;
 
             const phrases = [
                 "Flutter Developer",
                 "AI-Powered App Specialist",
                 "Cross-Platform Expert",
                 "Mobile App Developer",
             ];
 
             let phraseIndex = 0;
             let charIndex = 0;
             let isDeleting = false;
             let typeSpeed = 100;
             let timeoutId: number | null = null;
 
             const type = () => {
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
                     typeSpeed = 2000;
                     isDeleting = true;
                 } else if (isDeleting && charIndex === 0) {
                     isDeleting = false;
                     phraseIndex = (phraseIndex + 1) % phrases.length;
                     typeSpeed = 500;
                 }
 
                 timeoutId = window.setTimeout(type, typeSpeed);
             };
 
             type();
 
             cleanups.push(() => {
                 if (timeoutId) {
                     clearTimeout(timeoutId);
                 }
             });
         };
 
         const initSkillBars = () => {
             const skillBars = document.querySelectorAll<HTMLElement>(".skill-progress");
             if (!skillBars.length) return;
 
             const observer = new IntersectionObserver(
                 (entries) => {
                     entries.forEach((entry) => {
                         if (entry.isIntersecting) {
                             const progress = entry.target.getAttribute("data-progress");
                             if (progress) {
                                 (entry.target as HTMLElement).style.width = `${progress}%`;
                             }
                             observer.unobserve(entry.target);
                         }
                     });
                 },
                 { threshold: 0.5 }
             );
 
             skillBars.forEach((bar) => observer.observe(bar));
             cleanups.push(() => observer.disconnect());
         };
 
         const initCounters = () => {
             const counters = document.querySelectorAll<HTMLElement>(".stat-number");
             if (!counters.length) return;
 
             const animationIds = new Set<number>();
 
             const animateCounter = (element: HTMLElement) => {
                 const targetValue = parseInt(element.getAttribute("data-count") || "0", 10);
                 const duration = 2000;
                 const step = targetValue / (duration / 16);
                 let current = 0;
 
                 const update = () => {
                     current += step;
                     if (current < targetValue) {
                         element.textContent = Math.floor(current).toString();
                         const id = requestAnimationFrame(update);
                         animationIds.add(id);
                     } else {
                         element.textContent = targetValue.toString();
                     }
                 };
 
                 const id = requestAnimationFrame(update);
                 animationIds.add(id);
             };
 
             const observer = new IntersectionObserver(
                 (entries) => {
                     entries.forEach((entry) => {
                         if (entry.isIntersecting) {
                             animateCounter(entry.target as HTMLElement);
                             observer.unobserve(entry.target);
                         }
                     });
                 },
                 { threshold: 0.5 }
             );
 
             counters.forEach((counter) => observer.observe(counter));
 
             cleanups.push(() => {
                 observer.disconnect();
                 animationIds.forEach((id) => cancelAnimationFrame(id));
             });
         };
 
const initTiltEffect = () => {
            // Disable tilt effect on touch devices
            const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
            if (isTouchDevice) return;

            const tiltElements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
            if (!tiltElements.length) return;
 
             tiltElements.forEach((el) => {
                 let rotation = { x: 0, y: 0 };
                 let translation = { y: 0 };
                 let target = { x: 0, y: 0, yTrans: 0 };
                 let animationId: number | null = null;
                 let isHovering = false;
                 const lerpFactor = 0.1;
 
                 const lerp = (start: number, end: number, factor: number) =>
                     start + (end - start) * factor;
 
                 const updateTilt = () => {
                     rotation.x = lerp(rotation.x, target.x, lerpFactor);
                     rotation.y = lerp(rotation.y, target.y, lerpFactor);
                     translation.y = lerp(translation.y, target.yTrans, lerpFactor);
 
                     el.style.transform = `perspective(1000px) rotateX(${rotation.x.toFixed(
                         2
                     )}deg) rotateY(${rotation.y.toFixed(2)}deg) translateY(${translation.y.toFixed(2)}px)`;
 
                     const isSettled =
                         Math.abs(target.x - rotation.x) < 0.05 &&
                         Math.abs(target.y - rotation.y) < 0.05 &&
                         Math.abs(target.yTrans - translation.y) < 0.05;
 
                     if (isHovering || !isSettled) {
                         animationId = requestAnimationFrame(updateTilt);
                     } else {
                         animationId = null;
                         if (!isHovering) {
                             el.style.transform =
                                 "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
                         }
                     }
                 };
 
                 const startAnimation = () => {
                     if (!animationId) {
                         animationId = requestAnimationFrame(updateTilt);
                     }
                 };
 
                 const handleMouseEnter = () => {
                     isHovering = true;
                     target.yTrans = -10;
                     el.style.transition = "none";
                     startAnimation();
                 };
 
                 const handleMouseMove = (e: MouseEvent) => {
                     if (!isHovering) return;
 
                     const rect = el.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     const y = e.clientY - rect.top;
 
                     const centerX = rect.width / 2;
                     const centerY = rect.height / 2;
 
                     target.x = (y - centerY) / 10;
                     target.y = (centerX - x) / 10;
                 };
 
                 const handleMouseLeave = () => {
                     isHovering = false;
                     target = { x: 0, y: 0, yTrans: 0 };
                 };
 
                 el.addEventListener("mouseenter", handleMouseEnter);
                 el.addEventListener("mousemove", handleMouseMove);
                 el.addEventListener("mouseleave", handleMouseLeave);
 
                 cleanups.push(() => {
                     el.removeEventListener("mouseenter", handleMouseEnter);
                     el.removeEventListener("mousemove", handleMouseMove);
                     el.removeEventListener("mouseleave", handleMouseLeave);
                     if (animationId) cancelAnimationFrame(animationId);
                 });
             });
         };
 
         initScrollProgress();
         initNavigation();
         initScrollAnimations();
         initTypewriter();
         initSkillBars();
         initCounters();
         initTiltEffect();
 
         return () => {
             cleanups.forEach((cleanup) => cleanup());
         };
     }, []);
 
     return null;
 }
