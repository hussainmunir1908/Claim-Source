"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useCounter(target: number, duration: number = 2, started: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);
  return count;
}

const stats = [
  { label: "Assessments Completed", value: 286, suffix: "", prefix: "" },
  { label: "Satisfaction Rate", value: 98, suffix: "%", prefix: "" },
  { label: "Years Experience", value: 14, suffix: "", prefix: "" },
  { label: "Partner Solicitors", value: 50, suffix: "+", prefix: "" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  const c0 = useCounter(stats[0].value, 2.2, started);
  const c1 = useCounter(stats[1].value, 1.8, started);
  const c2 = useCounter(stats[2].value, 1.5, started);
  const c3 = useCounter(stats[3].value, 2.0, started);
  const counts = [c0, c1, c2, c3];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".stat-block", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            onEnter: () => setStarted(true),
          },
          opacity: 0,
          y: 40,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
        });

        gsap.from(".stats-label", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: "power3.out",
        });
      } else {
        setStarted(true);
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden border-b border-brand-border">
      {/* Dark background with generated image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/stats-bg-dark.png"
          alt="Statistics background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0e1512]/85" />
      </div>

      {/* Orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-accent/10 blur-[100px] pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Label */}
        <div className="text-center mb-14 stats-label">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-accent-light/80 font-semibold">
            By The Numbers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mt-3 leading-tight">
            Trusted by thousands across the UK
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-block text-center py-10 px-6 group hover:bg-white/5 transition-colors duration-300 cursor-default"
            >
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 counter-number group-hover:text-brand-accent-light transition-colors duration-300">
                {stat.prefix}{counts[idx].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50 font-semibold">
                {stat.label}
              </div>
              <div className="w-8 h-[1px] bg-brand-accent mx-auto mt-4 group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
