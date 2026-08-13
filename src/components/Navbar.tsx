"use client";

import { useEffect, useRef, useState } from "react";
import CardNav from "./CardNav";

export default function Navbar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;

          if (progressBarRef.current) {
            const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            progressBarRef.current.style.width = `${pct}%`;
          }

          const isScrolled = scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    {
      label: "Our Services",
      bgColor: "rgba(255,255,255,0.05)",
      textColor: "#fff",
      links: [
        { label: "Housing Disrepair", href: "/housing-disrepair" },
        { label: "Personal Injury", href: "/personal-injury" },
      ],
    },
    {
      label: "Information",
      bgColor: "rgba(255,255,255,0.08)",
      textColor: "#fff",
      links: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "About Us", href: "/about" },
      ],
    },
    {
      label: "Connect",
      bgColor: "rgba(255,255,255,0.11)",
      textColor: "#fff",
      links: [
        { label: "Latest News", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-brand-accent via-emerald-400 to-brand-accent transition-all duration-75 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      <div className="fixed top-[2px] left-0 right-0 z-50">
        <CardNav
          logo="/logo.png"
          logoAlt="Claim Source Logo"
          items={navItems}
          baseColor={scrolled ? "rgba(10, 16, 13, 0.95)" : "transparent"}
          menuColor="#fff"
          buttonBgColor="#8AAF93"
          buttonTextColor="#0a100d"
        />
      </div>
    </>
  );
}
