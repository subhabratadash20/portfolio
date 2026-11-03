"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "scale" | "card";
    threshold?: number;
}

export default function Reveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
    threshold = 0.1,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    const getInitialTransform = () => {
        switch (direction) {
            case "left":
                return "-translate-x-8 opacity-0";
            case "right":
                return "translate-x-8 opacity-0";
            case "down":
                return "-translate-y-8 opacity-0";
            case "scale":
                return "scale-90 translate-y-4 opacity-0";
            case "card":
                return "translate-y-8 [perspective:1000px] [transform:rotateX(6deg)] scale-[0.97] opacity-0";
            case "up":
            default:
                return "translate-y-8 opacity-0";
        }
    };

    const getVisibleTransform = () => {
        switch (direction) {
            case "card":
                return "translate-y-0 [perspective:1000px] [transform:rotateX(0deg)] scale-100 opacity-100";
            default:
                return "translate-x-0 translate-y-0 scale-100 opacity-100";
        }
    };

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
                isVisible ? getVisibleTransform() : getInitialTransform()
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
