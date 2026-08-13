"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, Stethoscope, Coins } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CampaignSelector() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo(".fade-up-selector",
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
          }
        );

        // Panels use a separate animation that starts earlier
        gsap.fromTo(".split-panel",
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      id: "housing-disrepair",
      label: "Housing Disrepair",
      labelBg: "bg-brand-accent",
      href: "/housing-disrepair/claim",
      title: "Housing Disrepair Claims",
      description:
        "Problems with damp, mould, leaks, structural defects, broken heating, or unsafe living conditions? Check if you may qualify for repair enforcement and compensation.",
      tags: ["Damp & Mould", "Structural Defects", "Heating Issues", "Water Leaks"],
      icon: <Home className="w-4 h-4 text-white" />,
      gradient: "from-brand-accent/80 via-[#0d1611]/90 to-[#0d1611]",
      image: "/hero-disrepair.png",
    },
    {
      id: "personal-injury",
      label: "Injury Claims",
      labelBg: "bg-[#2E3E33] border border-white/10",
      href: "/personal-injury/claim",
      title: "Injury Claims",
      description:
        "Injured in a road traffic collision, workplace accident, or public slip and trip due to someone else's negligence? Find out if there may be a route to compensation.",
      tags: ["Road Traffic", "Workplace Accident", "Slip & Trip", "Public Liability"],
      icon: <Stethoscope className="w-4 h-4 text-white" />,
      gradient: "from-[#1a2a1f]/80 via-[#0d1611]/90 to-[#0d1611]",
      image: "/hero-injury.png",
    },
    {
      id: "tenant-deposit",
      label: "Tenant Deposit",
      labelBg: "bg-brand-accent/65 border border-white/10",
      href: "/tenant-deposit/claim",
      title: "Tenant Deposit Claims",
      description:
        "Did your landlord fail to protect your deposit in a government scheme within 30 days? You could claim up to 3x your deposit value back.",
      tags: ["Unprotected Deposit", "Late Scheme Deposit", "No Prescribed Info"],
      icon: <Coins className="w-4 h-4 text-white" />,
      gradient: "from-[#1c2c25]/80 via-[#0d1611]/90 to-[#0d1611]",
      image: "/img4.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="claim-selector"
      className="relative py-24 md:py-36 border-b border-brand-border overflow-hidden"
    >
      {/* Full background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-campaign.jpg"
          alt="UK Building Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark frosted overlay so text is legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/90 via-brand-bg/80 to-brand-bg/90" />
      </div>

      {/* Subtle background orb (Desktop only) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-accent/4 blur-[150px] pointer-events-none z-1 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4 fade-up-selector">
            Claim Types
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-text leading-[1.12] fade-up-selector">
            Choose a claim type to check eligibility.
          </h2>
          <p className="text-base md:text-lg text-brand-muted mt-6 max-w-2xl leading-relaxed fade-up-selector">
            Select one of our primary UK claim types below to begin your confidential qualification check. The check takes approximately two minutes.
          </p>
        </div>

        {/* Interactive Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="split-panel group relative flex flex-col justify-between overflow-hidden min-h-[520px] lg:min-h-[600px] border border-brand-border cursor-pointer rounded-sm bg-[#0d1611] transition-all duration-700"
            >
              {/* Background Image and Gradient */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} mix-blend-multiply opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1611] via-transparent to-transparent opacity-80" />
              </div>

              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-sm border-2 border-transparent group-hover:border-brand-accent/50 transition-all duration-500 z-20 pointer-events-none" />

              {/* Top decorative circle */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-accent/10 blur-[80px] group-hover:bg-brand-accent/20 transition-all duration-700 z-1 hidden md:block" />

              {/* Panel Header */}
              <div className="relative z-10 p-8 md:p-12 flex items-start justify-between">
                <span className={`text-xs uppercase tracking-[0.2em] text-white font-semibold ${panel.labelBg} px-4 py-2 rounded-sm inline-block shadow-lg`}>
                  {panel.label}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  {panel.icon}
                </div>
              </div>

              {/* Panel Footer / Content */}
              <div className="relative z-10 p-8 md:p-12 text-white">
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 group-hover:text-brand-accent-light transition-colors duration-300">
                  {panel.title}
                </h3>
                <p className="text-sm sm:text-base text-white/75 max-w-lg mb-8 leading-relaxed">
                  {panel.description}
                </p>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {panel.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-white/60 border border-white/15 px-3 py-1 rounded-full bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={panel.href}
                  className="group/btn inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.16em] font-bold bg-white text-brand-text px-6 py-3.5 rounded-sm hover:bg-brand-accent hover:text-white transition-all duration-300 focus:outline-none shadow-lg"
                >
                  Check Eligibility
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>

              {/* Bottom accent line reveal */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-brand-accent w-0 group-hover:w-full transition-all duration-500 ease-out z-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
