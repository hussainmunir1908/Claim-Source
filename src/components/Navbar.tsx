"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/housing-disrepair", label: "Housing Disrepair" },
    { href: "/personal-injury", label: "Personal Injury" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-brand-accent via-emerald-400 to-brand-accent transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? "py-3" : "py-4"}`}
      >
        {/* Background layer */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? "bg-[#0a100d]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
              : "bg-gradient-to-b from-black/50 via-black/10 to-transparent"
          }`}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" aria-label="Claim Source — Home" className="flex-shrink-0 group focus:outline-none">
            <div className={`relative flex items-center justify-center transition-all duration-500 ${
              scrolled
                ? "w-24 h-12 md:w-32 md:h-16"
                : "w-32 h-16 md:w-40 md:h-20"
            }`}>
              <Image
                src="/logo.png"
                alt="Claim Source"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[11px] xl:text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-300 focus:outline-none group ${
                    isActive
                      ? "text-[#8AAF93]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#8AAF93] transition-all duration-350 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/#campaign-selector"
              className={`hidden md:inline-flex items-center gap-2 text-[10px] xl:text-[11px] uppercase tracking-[0.18em] font-bold px-5 py-2.5 rounded-sm transition-all duration-300 focus:outline-none ${
                scrolled
                  ? "bg-[#8AAF93] text-[#0a100d] hover:bg-white"
                  : "bg-white text-[#0a100d] hover:bg-white/90"
              }`}
            >
              Check Eligibility
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-sm transition-colors focus:outline-none text-white hover:bg-white/10"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(10, 18, 13, 0.97)", backdropFilter: "blur(24px)" }}
      >
        {/* Top pattern line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

        <div className="flex flex-col h-full pt-24 px-8 pb-12 overflow-y-auto">
          {/* Brand mark */}
          <div className="flex items-center gap-4 mb-10">
            <div className="relative w-12 h-12 bg-white/90 rounded-lg p-1 shadow">
              <Image src="/logo.png" alt="Claim Source" fill className="object-contain" />
            </div>
            <div>
              <div className="text-white font-serif text-lg font-bold">Claim Source</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest">UK Claims Assessment</div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center justify-between py-4 border-b border-white/8 text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 focus:outline-none ${
                    isActive ? "text-brand-accent-light" : "text-white/80 hover:text-white"
                  }`}
                  style={{ transitionDelay: mobileOpen ? `${idx * 40}ms` : "0ms" }}
                >
                  {link.label}
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isActive ? "text-brand-accent-light" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                </Link>
              );
            })}
          </nav>

          <div className="mt-8">
            <Link
              href="/#campaign-selector"
              className="flex items-center justify-center gap-2 w-full bg-brand-accent text-white text-xs uppercase tracking-widest font-bold py-4 rounded-sm hover:bg-brand-accent-hover transition-colors focus:outline-none"
            >
              Check Eligibility
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
