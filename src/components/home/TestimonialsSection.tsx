"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "I had no idea my housing situation could even be considered for a claim. Claim Source made the process completely stress-free from start to finish. Within days I was speaking to a solicitor.",
    name: "Margaret T.",
    location: "Manchester",
    type: "Housing Disrepair",
    stars: 5,
  },
  {
    quote: "After my road accident I wasn't sure I had any options. The team were professional, non-pushy and genuinely helpful. Highly recommend using Claim Source as a first step.",
    name: "James R.",
    location: "Birmingham",
    type: "Personal Injury",
    stars: 5,
  },
  {
    quote: "The damp in my flat had been ignored by my landlord for over a year. Claim Source assessed my case quickly and I was connected with a fantastic law firm the same week.",
    name: "Priya K.",
    location: "London",
    type: "Housing Disrepair",
    stars: 5,
  },
  {
    quote: "I was sceptical at first, but the whole process was transparent and free. No pressure, no gimmicks. Just clear information and a proper referral to a specialist.",
    name: "David M.",
    location: "Leeds",
    type: "Personal Injury",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".testimonial-section-header", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 30,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
        });
        gsap.from(".testimonial-wrapper", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: "power4.out",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        goNext();
      }
    }, 5500);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, isAnimating]);

  const animateCard = (nextIdx: number, dir: "left" | "right") => {
    if (isAnimating || nextIdx === activeIdx) return;
    setIsAnimating(true);
    setDirection(dir);

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        x: dir === "right" ? -40 : 40,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setActiveIdx(nextIdx);
          gsap.fromTo(
            cardRef.current,
            { x: dir === "right" ? 40 : -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    } else {
      setActiveIdx(nextIdx);
      setIsAnimating(false);
    }
  };

  const goPrev = () => {
    const prev = (activeIdx - 1 + testimonials.length) % testimonials.length;
    animateCard(prev, "left");
  };

  const goNext = () => {
    const next = (activeIdx + 1) % testimonials.length;
    animateCard(next, "right");
  };

  const t = testimonials[activeIdx];

  return (
    <section ref={sectionRef} className="py-24 md:py-36 border-b border-brand-border relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/testimonial-bg.png"
          alt="Testimonials background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/50 via-brand-card/70 to-brand-bg/50" />
      </div>

      {/* Orb (Desktop only) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-accent/6 blur-[120px] pointer-events-none z-1 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4 testimonial-section-header">
            What People Say
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text testimonial-section-header">
            Real experiences. Real results.
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="testimonial-wrapper max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="relative bg-white/80 backdrop-blur-sm border border-brand-border rounded-sm p-8 md:p-12 shadow-xl"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Large quote mark */}
            <div className="absolute top-6 right-8 text-brand-accent/10">
              <Quote className="w-16 h-16 fill-current" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-text leading-relaxed mb-8 font-light italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-brand-text text-sm uppercase tracking-widest">{t.name}</div>
                <div className="text-brand-muted text-xs mt-1">{t.location}</div>
              </div>
              <span className={`text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full ${
                t.type === "Housing Disrepair"
                  ? "bg-brand-accent-light text-brand-accent border border-brand-accent/20"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}>
                {t.type}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => animateCard(idx, idx > activeIdx ? "right" : "left")}
                  className={`rounded-full transition-all duration-300 focus:outline-none ${
                    idx === activeIdx
                      ? "w-8 h-2 bg-brand-accent"
                      : "w-2 h-2 bg-brand-border hover:bg-brand-accent/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-full border border-brand-border bg-brand-card hover:bg-brand-accent hover:text-white hover:border-brand-accent flex items-center justify-center transition-all duration-300 focus:outline-none group premium-card"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-full border border-brand-border bg-brand-card hover:bg-brand-accent hover:text-white hover:border-brand-accent flex items-center justify-center transition-all duration-300 focus:outline-none group premium-card"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
