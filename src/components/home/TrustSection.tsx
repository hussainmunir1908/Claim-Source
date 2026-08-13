"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, HeartHandshake, Eye, ClipboardCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrustSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".trust-header", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          x: -40,
          duration: 1.3,
          ease: "power3.out",
        });

        gsap.from(".trust-card", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
          },
          opacity: 0,
          y: 50,
          scale: 0.96,
          duration: 1.1,
          stagger: 0.15,
          ease: "power4.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: <ClipboardCheck className="w-6 h-6 text-brand-accent icon-animate" />,
      title: "Clear information. Straightforward next steps.",
      description:
        "We break down complex processes into simple, understandable terms. You'll always know exactly where you stand and what is needed next.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-brand-accent icon-animate" />,
      title: "Your enquiry starts with understanding.",
      description:
        "Every situation is unique. We evaluate your details carefully, ensuring we capture the exact context of your housing issues or injury.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent icon-animate" />,
      title: "Your information is handled with care.",
      description:
        "We operate under strict data security protocols. Your private information is processed confidentially and only shared with verified professionals.",
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-accent icon-animate" />,
      title: "Transparent from the first step.",
      description:
        "No hidden terms, false promises, or high-pressure tactics. We provide objective evaluations to help you make informed decisions.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 border-b border-brand-border relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-card via-brand-bg to-brand-card" />

      {/* Large decorative "TRUST" text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] font-bold text-brand-accent/[0.03] select-none pointer-events-none whitespace-nowrap z-0">
        TRUST
      </div>

      {/* Orb accents (Desktop only) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-accent/4 blur-[100px] pointer-events-none hidden md:block" />



      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Section title */}
          <div className="lg:col-span-1 trust-header">
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-text leading-[1.12]">
              Built on trust, clarity and care.
            </h2>
            <div className="w-16 h-[2px] bg-brand-accent mt-8 mb-6" />
            <p className="text-base md:text-lg text-brand-muted leading-relaxed">
              We believe seeking repair enforcement or accident compensation should be a clear, stress-free experience. Claim Source provides a trusted bridge to qualified specialist law firms, with zero pressure.
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex flex-col gap-3">
              {["UK GDPR Compliant", "Free Initial Enquiry", "No Obligation Check"].map((badge) => (
                <div key={badge} className="flex items-center gap-3 text-xs uppercase tracking-widest text-brand-muted">
                  <div className="w-4 h-4 rounded-full bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Value cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="trust-card icon-hover-parent group relative p-8 md:p-9 bg-brand-bg border border-brand-border hover:border-brand-accent/40 transition-all duration-500 flex flex-col rounded-sm premium-card glow-accent-hover cursor-default overflow-hidden"
              >
                {/* Card background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="mb-6 p-4 bg-brand-card w-fit rounded-sm border border-brand-border group-hover:border-brand-accent/30 group-hover:bg-brand-accent-light transition-all duration-400 relative z-10">
                  {val.icon}
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-4 leading-snug relative z-10">
                  {val.title}
                </h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed relative z-10">
                  {val.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
