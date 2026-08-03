"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeHero from "@/components/home/HomeHero";
import CampaignSelector from "@/components/home/CampaignSelector";
import TrustSection from "@/components/home/TrustSection";
import FAQPreview from "@/components/home/FAQPreview";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTABanner from "@/components/home/CTABanner";
import BlogPreview from "@/components/home/BlogPreview";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const pitchRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Pitch section
        gsap.fromTo(".pitch-fade-up",
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: pitchRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          }
        );

        // Process cards
        gsap.fromTo(".process-card",
          { opacity: 0, y: 50, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.18,
            ease: "power4.out",
          }
        );

        // Marquee ticker
        gsap.fromTo(".marquee-section",
          { opacity: 0 },
          {
            scrollTrigger: {
              trigger: ".marquee-section",
              start: "top 90%",
            },
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const tickerItems = [
    "Housing Disrepair Claims",
    "Personal Injury Claims",
    "Free Eligibility Check",
    "No Win No Fee",
    "UK Regulated",
    "Confidential Process",
    "Regulated Law Firms",
    "Fast Eligibility Check",
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Marquee Ticker Strip */}
      <div className="marquee-section bg-brand-accent py-4 overflow-hidden border-y border-brand-accent-hover relative">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-6 px-8 text-xs uppercase tracking-[0.3em] font-bold text-white/90 whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-white/60" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Brand Pitch / Editorial Text Block */}
      <section
        ref={pitchRef}
        className="bg-brand-bg py-24 md:py-36 border-b border-brand-border relative overflow-hidden"
      >
        {/* Fine vertical lines */}


        {/* Decorative watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-serif text-[18vw] font-bold text-brand-accent/[0.04] select-none pointer-events-none leading-none">
          CLAIM
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-accent font-semibold block pitch-fade-up">
                UK Claims Platform
              </span>
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-brand-text leading-[1.15] pitch-fade-up">
                Helping individuals in getting the compensation they deserve.
              </p>
              {/* Check list */}
              <div className="pt-4 space-y-3 pitch-fade-up">
                {[
                  "Free, confidential initial evaluation",
                  "Connected to SRA and FCA regulated specialist law firms",
                  "No Win, No Fee arrangements available",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-brand-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center items-start border-t lg:border-t-0 lg:border-l border-brand-border pt-10 lg:pt-0 lg:pl-12 pitch-fade-up">
              <p className="text-sm md:text-base text-brand-muted leading-relaxed mb-8">
                Claim Source acts as a secure, independent claims matching platform. We gather your details, check eligibility against common criteria, and connect you with regulated law specialists.
              </p>
              <Link
                href="/how-it-works"
                className="group inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest font-bold text-brand-accent hover:text-brand-accent-hover transition-colors"
              >
                Learn How It Works
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Full-width editorial image */}
          <div className="mt-16 md:mt-24 w-full h-[40vh] md:h-[60vh] relative overflow-hidden rounded-sm pitch-fade-up group">
            <Image
              src="/legal-office.png"
              alt="Professional legal office environment"
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 4. Stats Section */}
      <StatsSection />

      {/* 5. Campaign Selector */}
      <CampaignSelector />

      {/* 6. Trust and Philosophy */}
      <TrustSection />

      {/* 7. Quick Process Map */}
      <section
        ref={processRef}
        className="py-24 md:py-36 border-b border-brand-border relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-card/30 to-brand-bg" />

        {/* Decorative image overlay */}
        <Image
          src="/trust-bg.png"
          alt=""
          fill
          className="object-cover opacity-5 mix-blend-multiply pointer-events-none"
          aria-hidden
        />



        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
              The Path Forward
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-text leading-tight">
              How it works.
            </h2>
            <p className="text-sm md:text-base text-brand-muted mt-6 leading-relaxed">
              Three clear stages from your initial enquiry to professional solicitor consultation.
            </p>
          </div>

          {/* Process connector line on desktop */}
          <div className="hidden md:block relative mb-16">
            <div className="absolute top-6 left-[16%] right-[16%] h-[1px] bg-brand-border scroll-line-h" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {/* Step 1 */}
            <div className="process-card group relative p-8 md:p-10 bg-brand-bg border border-brand-border rounded-sm hover:border-brand-accent/40 transition-all duration-500 shadow-sm flex flex-col justify-between glow-accent-hover premium-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="font-serif text-6xl md:text-7xl font-light text-brand-accent/20 block mb-6 group-hover:text-brand-accent/35 transition-colors duration-300">
                  01
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-4 leading-snug">
                  Complete Qualification
                </h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                  Select your claim type (Housing Disrepair, Injury Claims, or Tenant Deposit) and answer our secure online questionnaire to supply the details of your situation.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Step 2 */}
            <div className="process-card group relative p-8 md:p-10 bg-brand-bg border border-brand-border rounded-sm hover:border-brand-accent/40 transition-all duration-500 shadow-sm flex flex-col justify-between glow-accent-hover premium-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="font-serif text-6xl md:text-7xl font-light text-brand-accent/20 block mb-6 group-hover:text-brand-accent/35 transition-colors duration-300">
                  02
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-4 leading-snug">
                  Evaluation & Validation
                </h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                  Our system checks for compliance indicators and stores details securely. If eligibility guidelines are met, the details are queued for solicitor consultation.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Step 3 */}
            <div className="process-card group relative p-8 md:p-10 bg-brand-bg border border-brand-border rounded-sm hover:border-brand-accent/40 transition-all duration-500 shadow-sm flex flex-col justify-between glow-accent-hover premium-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="font-serif text-6xl md:text-7xl font-light text-brand-accent/20 block mb-6 group-hover:text-brand-accent/35 transition-colors duration-300">
                  03
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-4 leading-snug">
                  Direct Contact
                </h3>
                <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                  An expert legal or claims professional will get in touch with you to explain options, confirm details, and establish if they can represent you.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQs Preview */}
      <FAQPreview />

      {/* 10. Blog Preview */}
      <BlogPreview />

      {/* 11. CTA Banner */}
      <CTABanner />
    </>
  );
}
