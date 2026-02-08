"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show navbar at the very top of the page
            if (currentScrollY < 80) {
                setVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            // Only update if mobile menu is closed
            if (!isMobileMenuOpen) {
                // Determine scroll direction
                if (currentScrollY > lastScrollY.current) {
                    setVisible(false); // Scrolling down -> hide
                } else {
                    setVisible(true); // Scrolling up -> show
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobileMenuOpen]);

    // Force navbar visible when mobile menu opens
    useEffect(() => {
        if (isMobileMenuOpen) {
            setVisible(true);
        }
    }, [isMobileMenuOpen]);

    const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <>
            {/* Mobile menu backdrop */}
            <div
                className={`nav-backdrop ${isMobileMenuOpen ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Main navigation */}
            <nav
                className="nav"
                style={{
                    transform: visible ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="nav-container">
                    <Link href="#hero" className="nav-logo">
                        <span className="logo-bracket">&lt;</span>SD
                        <span className="logo-bracket">/&gt;</span>
                    </Link>

                    <button
                        className={`nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation"
                    >
                        <span
                            style={{
                                transform: isMobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none",
                            }}
                        />
                        <span
                            style={{
                                opacity: isMobileMenuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            style={{
                                transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                            }}
                        />
                    </button>

                    <ul
                        className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}
                    >
                        <li><Link href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                        <li><Link href="#experience" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experience</Link></li>
                        <li><Link href="#skills" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Skills</Link></li>
                        <li><Link href="#projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link></li>
                        <li><Link href="#contact" className="nav-link nav-link--cta" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
