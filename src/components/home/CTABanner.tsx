"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && !isMobile) {
        gsap.from(".cta-element", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 35,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden border-b border-brand-border"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-[#2E3E33] to-[#1a2a1f]" />
      <div className="absolute inset-0 gradient-shift" style={{
        background: "linear-gradient(135deg, #3A4F41 0%, #2a3d30 40%, #1e3028 60%, #3A4F41 100%)",
        backgroundSize: "300% 300%"
      }} />

      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/3 blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "-5px",
              animationName: "particleDrift",
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 1.5}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <span className="cta-element text-xs uppercase tracking-[0.3em] font-semibold text-white/60 block mb-5">
          Start Today — It&apos;s Free
        </span>

        <h2 className="cta-element font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Ready to find out if you<br className="hidden md:block" />
          <span className="font-light italic text-white/80"> have a valid claim?</span>
        </h2>

        <p className="cta-element text-white/70 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Take our two-minute confidential eligibility check. No obligation, no pressure — just clear answers about your options.
        </p>

        <div className="cta-element flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/#claim-selector"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-brand-accent px-10 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 hover:bg-brand-accent-light focus:outline-none rounded-sm shadow-2xl glow-white"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              Check Eligibility
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="tel:07874391075"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/25 hover:border-white/50 px-7 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm focus:outline-none"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href="https://wa.me/447874391075"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/25 hover:border-white/50 px-7 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm focus:outline-none"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Trust micro-copy */}
        <div className="cta-element flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-white/45 font-semibold">
          <span>✦ Free Claim Check</span>
          <span>✦ No Obligation</span>
          <span>✦ Confidential</span>
          <span>✦ UK GDPR Compliant</span>
          <span>✦ No Win No Fee</span>
        </div>
      </div>
    </section>
  );
}
