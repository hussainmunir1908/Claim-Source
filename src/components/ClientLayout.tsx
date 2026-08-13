"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import MouseEffects from "./MouseEffects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Pages where hero extends behind the navbar (no top padding needed)
const HERO_PAGES = ["/", "/about", "/housing-disrepair", "/personal-injury", "/how-it-works", "/blog", "/contact"];
// Pages that don't use the main site chrome (Navbar, Footer, etc.)
const ADMIN_PREFIX = "/admin";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith(ADMIN_PREFIX) ?? false;
  const isHeroPage = HERO_PAGES.includes(pathname ?? "");

  useEffect(() => {
    // 1. Capture UTM and Tracking Attribution Parameters
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const trackingParams: Record<string, string> = {};
      const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
      let hasParams = false;
      keys.forEach((key) => {
        const val = urlParams.get(key);
        if (val) { trackingParams[key] = val; hasParams = true; }
      });
      if (hasParams) sessionStorage.setItem("claim_source_utm", JSON.stringify(trackingParams));
      if (!sessionStorage.getItem("claim_source_landing_page"))
        sessionStorage.setItem("claim_source_landing_page", window.location.pathname);
      if (document.referrer && !document.referrer.includes(window.location.hostname))
        sessionStorage.setItem("claim_source_referrer", document.referrer);
    }

    // 2. Initialize Smooth Scroll + GSAP (Desktop only)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = typeof window !== "undefined" && (("ontouchstart" in window) || window.innerWidth <= 768);

    if (!prefersReducedMotion && !isAdmin && !isTouchDevice) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        infinite: false,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", () => ScrollTrigger.update());

      const updateGsapTicker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(updateGsapTicker);
      gsap.ticker.lagSmoothing(0);

      // Global Scroll Line Animations
      const linesH = gsap.utils.toArray<HTMLElement>(".scroll-line-h");
      linesH.forEach((line) => {
        ScrollTrigger.create({
          trigger: line,
          start: "top 95%",
          onEnter: () => line.classList.add("scroll-line-active"),
          onLeaveBack: () => line.classList.remove("scroll-line-active"),
        });
      });

      const linesV = gsap.utils.toArray<HTMLElement>(".scroll-line-v");
      linesV.forEach((line) => {
        ScrollTrigger.create({
          trigger: line,
          start: "top 95%",
          onEnter: () => line.classList.add("scroll-line-active-v"),
          onLeaveBack: () => line.classList.remove("scroll-line-active-v"),
        });
      });

      return () => {
        if (lenisRef.current) lenisRef.current.destroy();
        gsap.ticker.remove(updateGsapTicker);
      };
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <div className="min-h-screen bg-[#0a100d]">{children}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* pt-0 for hero pages (they extend behind navbar with negative margin) */}
      {/* pt-[76px] for non-hero pages that need the offset */}
      <main className={`flex-grow ${isHeroPage ? "pt-0" : "pt-[76px] lg:pt-[88px]"}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <div className="fixed inset-0 z-[9999] pointer-events-none hidden md:block">
        <MouseEffects interactionMode="sniper" effectSize={120} />
      </div>
    </div>
  );
}
