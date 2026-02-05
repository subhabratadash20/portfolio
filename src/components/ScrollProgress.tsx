"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const calculatedProgress = (scrollTop / docHeight) * 100;
            setProgress(calculatedProgress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-[3px] bg-gradient-brand z-[9999] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
        />
    );
}
