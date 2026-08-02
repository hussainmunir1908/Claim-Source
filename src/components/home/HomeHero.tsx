"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Shield, Star, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Antigravity from "../Antigravity";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(".animate-word", { y: "110%", opacity: 0 });
      gsap.set(contentRef.current, { y: 40, opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.18, filter: "brightness(0.6)" });
      gsap.set(".hero-badge", { opacity: 0, y: -20, scale: 0.9 });
      gsap.set(".stat-chip", { opacity: 0, y: 20, scale: 0.9 });

      // Cinematic entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(imageRef.current, {
        scale: 1,
        filter: "brightness(0.45)",
        duration: 2.5,
        ease: "power2.out",
      }, "0")
      .to(".hero-badge", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "0.4")
      .to(".animate-word", {
        y: "0%",
        opacity: 1,
        duration: 1.5,
        stagger: 0.12,
      }, "0.6")
      .to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      }, "0.9")
      .to(".stat-chip", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.5)",
      }, "1.2");

      // Scroll-driven Parallax
      if (!prefersReducedMotion && imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          scale: 1.3,
          yPercent: 20,
          filter: "brightness(0.25)",
          ease: "none",
        });

        // Parallax for text content
        gsap.to(".hero-content-parallax", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
          y: -80,
          ease: "none",
        });
      }
    }, containerRef);

    // Mouse parallax effect
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX = (clientX / innerWidth - 0.5) * 2;
      mouseY = (clientY / innerHeight - 0.5) * 2;

      if (parallaxLayerRef.current) {
        gsap.to(parallaxLayerRef.current, {
          x: mouseX * 12,
          y: mouseY * 8,
          duration: 1.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-brand-bg -mt-0"
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" ref={parallaxLayerRef}>
          <Image
            src="/hero-home.jpg"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center pointer-events-none scale-105"
            ref={imageRef}
          />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50 z-1" />

      {/* Floating Particles (Antigravity) */}
      <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#8AAF93"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-[15%] w-[300px] h-[300px] rounded-full bg-brand-accent/10 blur-[100px] pointer-events-none z-2 orb-1" />
      <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-brand-accent/8 blur-[120px] pointer-events-none z-2 orb-2" />



      {/* Content Container */}
      <div className="hero-content-parallax relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center px-6 py-28 md:py-36">

        {/* Large Editorial Headline */}
        <h1
          ref={titleRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl select-none"
        >
          <span className="block overflow-hidden relative pb-2">
            <span className="animate-word inline-block">Your circumstances</span>
          </span>
          <span className="block overflow-hidden relative pb-2">
            <span className="animate-word inline-block">may be worth</span>
          </span>
          <span className="block overflow-hidden relative pb-2">
            <span className="animate-word inline-block shimmer-text font-light italic">
              more than you think.
            </span>
          </span>
        </h1>

        {/* Subtitle / CTA actions */}
        <div ref={contentRef} className="mt-10 flex flex-col items-center max-w-3xl w-full">
          <p className="text-white/85 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 text-balance max-w-2xl">
            Claim Source helps individuals check eligibility for Housing Disrepair and Personal Injury campaigns, connecting qualifying enquiries with verified UK law specialists.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
            <Link
              href="#campaign-selector"
              className="group relative w-full sm:w-auto overflow-hidden inline-flex items-center justify-center bg-white text-brand-text px-10 py-4 text-sm uppercase tracking-[0.18em] font-bold transition-all duration-300 hover:bg-brand-accent hover:text-white focus:outline-none shadow-xl rounded-sm cursor-pointer glow-accent-hover"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Check Eligibility
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-white/35 text-white hover:border-white hover:bg-white/10 px-10 py-4 text-sm uppercase tracking-[0.18em] font-bold transition-all duration-300 focus:outline-none rounded-sm"
            >
              How It Works
            </Link>
          </div>

          {/* Stats Strip */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="stat-chip flex items-center gap-2.5 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-serif text-lg font-bold leading-none">286</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">Assessments</div>
              </div>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-white/20" />
            <div className="stat-chip flex items-center gap-2.5 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-serif text-lg font-bold leading-none">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">Confidential</div>
              </div>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-white/20" />
            <div className="stat-chip flex items-center gap-2.5 text-white/90">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-serif text-lg font-bold leading-none">No Win</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60 mt-0.5">No Fee</div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-white/50 font-semibold">
            Free initial enquiry • Confidential evaluation • UK regulated
          </p>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-semibold">
          Scroll Down
        </span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/70 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
