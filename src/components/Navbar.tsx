"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [lastScroll, setLastScroll] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll && currentScroll > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 h-20 z-[1000] bg-background-primary/80 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${isHidden ? "-translate-y-full" : "translate-y-0"
                }`}
        >
            <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
                    <span className="text-accent">&lt;</span>SD
                    <span className="text-accent">/&gt;</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {["About", "Experience", "Projects", "Skills"].map((item) => (
                        <Link
                            key={item}
                            href={`/#${item.toLowerCase()}`}
                            className="relative text-sm font-medium text-text-secondary hover:text-white transition-colors py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-primary after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link href="/#contact" className="px-6 py-2 bg-gradient-primary rounded-lg text-white text-sm font-medium hover:-translate-y-0.5 hover:shadow-glow transition-all">
                        Contact Me
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden flex flex-col gap-[5px] p-2 z-[1001] w-8 ${isMobileMenuOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                >
                    <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                    <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                    <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 w-3/4 max-w-xs h-screen bg-background-secondary flex flex-col justify-center px-8 gap-8 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
                        }`}
                >
                    <Link href="/#about" onClick={toggleMenu} className="text-lg text-text-secondary hover:text-accent">About</Link>
                    <Link href="/#experience" onClick={toggleMenu} className="text-lg text-text-secondary hover:text-accent">Experience</Link>
                    <Link href="/#projects" onClick={toggleMenu} className="text-lg text-text-secondary hover:text-accent">Projects</Link>
                    <Link href="/#skills" onClick={toggleMenu} className="text-lg text-text-secondary hover:text-accent">Skills</Link>
                    <Link href="/#contact" onClick={toggleMenu} className="text-lg text-accent font-semibold">Contact Me</Link>
                </div>
            </div>
        </nav>
    );
}
