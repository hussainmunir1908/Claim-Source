"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".faq-header-item", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
        });
        gsap.from(".faq-item", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -20,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const previewFaqs = [
    {
      question: "Is there a cost to make an enquiry?",
      answer: "No, submitting an eligibility check with Claim Source is completely free. We assess your circumstances without any upfront fees or obligations.",
    },
    {
      question: "How long does the assessment take?",
      answer: "Completing our online form takes about two minutes. Once submitted, we will evaluate your details, and a qualified assessor may contact you shortly to review your options.",
    },
    {
      question: "What is a 'No Win, No Fee' agreement?",
      answer: "A Conditional Fee Agreement (CFA), often referred to as 'No Win, No Fee', means that if your claim is unsuccessful, you will not have to pay your solicitor's legal fees, subject to terms and conditions. The legal professionals we refer you to will explain their terms in detail.",
    },
    {
      question: "What types of housing disrepair qualify?",
      answer: "Common qualifying issues include persistent damp, black mould, leaking roofs or pipes, broken boilers or heating systems, faulty electrical installations, unsafe flooring, and structural issues. Your landlord must have been notified and failed to repair within a reasonable timeframe.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 border-b border-brand-border relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-card/50 to-brand-bg" />
      <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-brand-accent/4 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4 faq-header-item">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text faq-header-item">
            Common Inquiries
          </h2>
          <p className="text-brand-muted mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed faq-header-item">
            Quick answers to the most common questions. Need more? Visit our full FAQ page.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-brand-border border-y border-brand-border mb-14">
          {previewFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item group transition-all duration-300 ${isOpen ? "bg-brand-accent-light/40" : "hover:bg-brand-card/50"}`}
              >
                <h3>
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex justify-between items-center w-full text-left px-6 py-6 focus:outline-none"
                  >
                    <span className={`font-serif text-lg md:text-xl font-bold transition-colors duration-300 pr-4 ${isOpen ? "text-brand-accent" : "text-brand-text group-hover:text-brand-accent"}`}>
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 ${
                        isOpen
                          ? "bg-brand-accent text-white rotate-0 scale-100"
                          : "bg-brand-card border border-brand-border text-brand-muted group-hover:border-brand-accent/40 group-hover:text-brand-accent"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm md:text-base text-brand-muted leading-relaxed px-6 pb-6 pr-16">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/faqs"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-brand-card border border-brand-border px-8 py-4 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300 focus:outline-none rounded-sm premium-card"
          >
            View All FAQs
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="https://wa.me/447874391075"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-emerald-300 text-emerald-800 bg-emerald-50 px-8 py-4 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 focus:outline-none rounded-sm"
          >
            <MessageCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
