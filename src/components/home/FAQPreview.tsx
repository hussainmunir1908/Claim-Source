"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stack from "../Stack";

const STACK_IMAGES = [
  "/img1.jpeg",
  "/img2.jpg",
  "/bg-housing.jpg",
  "/hero-injury.png",
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".faq-content-item", {
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
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const previewFaqs = [
    {
      question: "Is there a cost to make an enquiry?",
      answer: "No, submitting an eligibility check with Claim Source is completely free. We review your circumstances without any upfront fees or obligations.",
    },
    {
      question: "How long does the eligibility check take?",
      answer: "Completing our online form takes about two minutes. Once submitted, we will evaluate your details, and a qualified claims specialist may contact you shortly to review your options.",
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
      className="py-24 md:py-36 border-b border-brand-border relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Stack card widget */}
          <div className="faq-content-item relative hidden lg:flex flex-col gap-8">
            {/* Stack widget */}
            <div className="relative" style={{ height: 340 }}>
              <Stack
                randomRotation
                sensitivity={80}
                sendToBackOnClick={true}
                cards={STACK_IMAGES.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt={`card-${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ))}
                autoplay
                autoplayDelay={2500}
                pauseOnHover
              />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-muted text-center">
              Click or drag to browse ↗
            </p>

            {/* Info card below */}
            <div className="bg-brand-card border border-brand-border rounded-xl p-7 flex flex-col gap-4">
              <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-text">Still have questions?</h3>
              <p className="text-brand-muted text-sm leading-relaxed">Our support team is ready to help you navigate your claim process with expert guidance.</p>
              <a
                href="https://wa.me/447874391075"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                Ask on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: FAQ List */}
          <div className="faq-content-item">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Help & Support
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-brand-text">
                Common Inquiries
              </h2>
            </div>

            <div className="space-y-4">
              {previewFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-brand-border rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="flex justify-between items-center w-full text-left px-6 py-5 bg-white hover:bg-brand-accent-light/20 focus:outline-none"
                    >
                      <span className={`font-semibold transition-colors duration-300 ${isOpen ? "text-brand-accent" : "text-brand-text"}`}>
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-brand-accent" />
                      ) : (
                        <Plus className="w-4 h-4 text-brand-muted" />
                      )}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-brand-muted text-sm leading-relaxed px-6 pb-5">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
