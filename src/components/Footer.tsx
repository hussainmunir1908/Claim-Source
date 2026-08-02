"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Housing Disrepair", href: "/housing-disrepair" },
    { name: "Personal Injury", href: "/personal-injury" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Complaints Procedure", href: "/complaints" },
    { name: "Accessibility Statement", href: "/accessibility" },
  ];

  return (
    <footer className="bg-[#0f1511] text-[#FAF9F6]/90 relative overflow-hidden border-t border-white/5">
      {/* Top gradient glow strip */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-accent/8 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-20 border-b border-white/8">

          {/* Brand Column */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            {/* Logo + tagline */}
            <Link href="/" className="inline-flex items-center gap-4 mb-6 focus:outline-none group" aria-label="Claim Source Home">
              <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/logo.png"
                  alt="Claim Source Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-white tracking-wide">Claim Source</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">UK Claims Assessment</div>
              </div>
            </Link>

            <p className="text-sm md:text-base text-[#A8A7A3] leading-relaxed mb-8 max-w-sm">
              Claim Source provides a secure and confidential assessment of circumstances to determine eligibility for housing disrepair and personal injury claims.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              <a href="mailto:info@claimsource.uk" className="flex items-center gap-3 text-sm text-[#A8A7A3] hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 group-hover:border-brand-accent/30 transition-all duration-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                info@claimsource.uk
              </a>
              <a href="tel:07874391075" className="flex items-center gap-3 text-sm text-[#A8A7A3] hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 group-hover:border-brand-accent/30 transition-all duration-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                07874 391 075
              </a>
              <a href="https://wa.me/447874391075" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#A8A7A3] hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-900/40 group-hover:border-emerald-700/40 transition-all duration-300">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                WhatsApp Us
              </a>
              <div className="flex items-start gap-3 text-sm text-[#A8A7A3]">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>35b Victoria Road, Wolverhampton,<br />United Kingdom, WV10 0NG</span>
              </div>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-6 pb-3 border-b border-white/8">
              Campaigns & Info
            </h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-xs uppercase tracking-widest text-[#A8A7A3] hover:text-white transition-colors duration-300 focus:outline-none flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-accent flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Col */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white mb-6 pb-3 border-b border-white/8">
              Legal & Compliance
            </h4>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-xs uppercase tracking-widest text-[#A8A7A3] hover:text-white transition-colors duration-300 focus:outline-none flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-accent flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick CTA */}
            <div className="p-5 border border-white/8 bg-white/3 rounded-sm">
              <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-3">Ready to check eligibility?</p>
              <Link
                href="/#campaign-selector"
                className="group inline-flex items-center gap-2 bg-brand-accent text-white text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-sm hover:bg-brand-accent-hover transition-colors duration-300 focus:outline-none w-full justify-center"
              >
                Start Free Assessment
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Compliance Disclaimer */}
        <div className="py-10 border-b border-white/5">
          <div className="bg-white/3 border border-white/6 p-6 md:p-8 rounded-sm">
            <h5 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-3">
              Compliance Notice & Disclaimer
            </h5>
            <p className="mb-3 text-xs md:text-sm text-[#8A8984] leading-relaxed">
              We are a marketing platform. We do not provide legal advice. We advertise for our partner law firms.
            </p>
            <p className="text-xs text-[#6a6966] leading-relaxed">
              Claim Source is an enquiry-qualification service operated by CLAIM SOURCE. Submitting an enquiry via this website constitutes a request for eligibility assessment. Eligible enquiries may be passed to third-party regulated solicitors or claims professionals who will assess your circumstances and decide whether they can represent you. A fee may be payable if you choose to enter into an agreement with a service provider, typically structured on a &quot;No Win, No Fee&quot; basis subject to their terms.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6a6966]">
          <p>&copy; {currentYear} Claim Source. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
