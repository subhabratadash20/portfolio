"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
    const [text, setText] = useState("");
    const fullText = "Building Scalable Cross-Platform Apps with AI";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative">
            <div className="text-center max-w-[800px]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent mb-8 animate-fadeInUp">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    Available for freelance & opportunities
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fadeInUp [animation-delay:100ms]">
                    <span className="block text-text-secondary text-xl md:text-2xl font-normal mb-2">Hi, I'm</span>
                    <span className="bg-gradient-primary bg-clip-text text-transparent">Subhabrata Das</span>
                </h1>

                {/* Subtitle / Typewriter */}
                <p className="text-2xl text-text-secondary mb-6 min-h-[2.5rem] animate-fadeInUp [animation-delay:200ms]">
                    <span className="text-accent">{text}</span>
                    <span className="animate-blink">|</span>
                </p>

                {/* Description */}
                <p className="text-lg text-text-tertiary max-w-[600px] mx-auto mb-10 leading-relaxed animate-fadeInUp [animation-delay:300ms]">
                    A highly motivated Flutter Developer with 3+ years of experience creating cross-platform applications,
                    seamless AI integration, and robust backend solutions.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeInUp [animation-delay:400ms]">
                    <Link
                        href="#projects"
                        className="group px-8 py-4 bg-gradient-primary text-white font-semibold rounded-lg flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)]"
                    >
                        <span>View My Work</span>
                        <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        href="#contact"
                        className="px-8 py-4 bg-transparent border-2 border-accent text-accent font-semibold rounded-lg transition-all hover:bg-accent/10 hover:-translate-y-1"
                    >
                        Get In Touch
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="flex flex-col items-center gap-4 text-text-tertiary text-sm animate-float">
                    <div className="w-6 h-10 border-2 border-text-tertiary rounded-xl relative">
                        <div className="w-1 h-2 bg-accent rounded-sm absolute top-2 left-1/2 -translate-x-1/2 animate-scroll" />
                    </div>
                    <span>Scroll to explore</span>
                </div>
            </div>
        </section>
    );
}
