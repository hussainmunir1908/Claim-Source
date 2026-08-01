"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, HeartHandshake, Eye, CheckCircle2 } from "lucide-react";
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);
  return count;
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [counterStarted, setCounterStarted] = useState(false);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  const c1 = useCounter(286, 2.2, counterStarted);
  const c2 = useCounter(14, 1.5, counterStarted);
  const c3 = useCounter(50, 2.0, counterStarted);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Hero entrance
        gsap.from(".about-hero-title", {
          opacity: 0,
          y: 50,
          duration: 1.4,
          ease: "power4.out",
          delay: 0.2,
        });
        gsap.from(".about-hero-sub", {
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5,
        });
        gsap.from(".about-hero-img", {
          scale: 1.1,
          filter: "brightness(0.7)",
          duration: 2,
          ease: "power2.out",
        });

        // Mission section
        gsap.from(".mission-item", {
          scrollTrigger: { trigger: ".mission-section", start: "top 80%" },
          opacity: 0,
          y: 40,
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
        });

        // Pillars
        gsap.from(".pillar-card", {
          scrollTrigger: { trigger: ".pillars-section", start: "top 80%" },
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 1.0,
          stagger: 0.15,
          ease: "power4.out",
        });

        // Stats counters
        gsap.from(".about-stat", {
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: "top 80%",
            onEnter: () => setCounterStarted(true),
          },
          opacity: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        });
      } else {
        setCounterStarted(true);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-brand-bg">
      {/* 1. Hero with parallax image */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end overflow-hidden border-b border-brand-border"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.png"
            alt="Professional legal office interior"
            fill
            className="object-cover about-hero-img"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Editorial lines */}
        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] scroll-line-v hidden md:block opacity-20 z-5" />
        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] scroll-line-v hidden md:block opacity-20 z-5" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pb-16 md:pb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-semibold block mb-5 about-hero-sub">
            Who We Are
          </span>
          <h1 className="about-hero-title font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl">
            Bringing clarity and confidence to UK claims.
          </h1>
          <p className="about-hero-sub text-white/70 text-base md:text-xl max-w-2xl leading-relaxed mt-8 font-light">
            Claim Source is a dedicated enquiry assessment and qualification service — helping people understand whether their circumstances align with legal requirements.
          </p>
        </div>
      </section>

      {/* 2. Mission Section */}
      <section className="mission-section py-24 md:py-36 bg-brand-bg border-b border-brand-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 mission-item">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text leading-tight">
                A calm, respectful bridge to legal assistance.
              </h2>
              <div className="w-16 h-[2px] bg-brand-accent mt-8" />
            </div>
            <div className="lg:col-span-7 space-y-6 text-brand-muted text-base md:text-lg leading-relaxed mission-item">
              <p>
                Navigating the legal claims environment can be intimidating. Many websites use aggressive marketing, exaggerated compensation figures, or high-pressure tactics. At Claim Source, we do things differently.
              </p>
              <p>
                We believe in providing clean, transparent information. We collect relevant details securely, run initial compliance filters, and help individuals identify if they have a valid path forward.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "We do not act as solicitors",
                  "We act as a trusted filter",
                  "Zero high-pressure tactics",
                  "Data handled with strict security",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats / Numbers */}
      <div ref={statsSectionRef} className="border-b border-brand-border bg-brand-card">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
            {[
              { value: c1, suffix: "", label: "Assessments Completed" },
              { value: c2, suffix: " Years", label: "Industry Experience" },
              { value: c3, suffix: "+ Partners", label: "Verified Solicitors" },
            ].map((stat, idx) => (
              <div key={idx} className="about-stat text-center py-10 px-6 group hover:bg-brand-bg/50 transition-colors duration-300">
                <div className="font-serif text-5xl md:text-6xl font-bold text-brand-accent mb-2 counter-number">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-brand-muted font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Principles / Values */}
      <section className="pillars-section py-24 md:py-36 border-b border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-card/30" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
              Core Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text leading-tight">
              The values that define us.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <HeartHandshake className="w-6 h-6 text-brand-accent icon-animate" />,
                title: "Human-Centric Care",
                description: "We handle every enquiry with respect. We don't treat you like a lead — we treat you like an individual who needs support and clear direction.",
              },
              {
                icon: <Eye className="w-6 h-6 text-brand-accent icon-animate" />,
                title: "Complete Transparency",
                description: "We are clear about what we do and what we don't do. We don't exaggerate compensation or promise results — we give you facts, not hype.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-brand-accent icon-animate" />,
                title: "Secure & Compliant",
                description: "We protect your data at all times. Our systems operate under strict compliance with UK data protection laws, safeguarding your sensitive records.",
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className="pillar-card icon-hover-parent group p-8 md:p-10 bg-brand-card border border-brand-border rounded-sm hover:border-brand-accent/40 transition-all duration-500 premium-card glow-accent-hover relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="p-4 bg-brand-bg rounded-sm text-brand-accent w-fit mb-6 border border-brand-border group-hover:border-brand-accent/30 group-hover:bg-brand-accent-light transition-all duration-400 relative z-10">
                  {val.icon}
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-3 relative z-10">
                  {val.title}
                </h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed relative z-10">
                  {val.description}
                </p>
                <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="relative py-24 md:py-32 text-center overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent via-[#2E3E33] to-[#1a2a1f]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold block mb-5">
            Start Today — Free
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Find out if you have a path to a claim.
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Take a two-minute confidential assessment to evaluate your circumstances.
          </p>
          <Link
            href="/#campaign-selector"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-brand-accent px-10 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 hover:bg-brand-accent-light focus:outline-none rounded-sm shadow-2xl"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              Start Eligibility Check
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
