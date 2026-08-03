"use client";

import { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Housing Disrepair", "Personal Injury", "Eligibility", "Privacy & Safety"];

  const faqs: FAQItem[] = [
    {
      category: "Housing Disrepair",
      question: "What is my landlord's main responsibility regarding mould and damp?",
      answer: "Under UK law, landlords must keep the property structural features (walls, roofs, windows) in good repair. If mould or damp is caused by structural issues, leaks, or inadequate ventilation features provided by the landlord, it is their legal responsibility to fix it. If they ignore written notifications, you may be entitled to claim.",
    },
    {
      category: "Housing Disrepair",
      question: "Can I stop paying rent if my landlord refuses to make repairs?",
      answer: "No, you should never withhold rent. Withholding rent is a breach of your tenancy agreement and can give your landlord grounds to start eviction proceedings against you. Instead, you should proceed with formal dispute resolution or explore legal channels to enforce repairs.",
    },
    {
      category: "Housing Disrepair",
      question: "How long does a landlord have to fix a reported issue?",
      answer: "There is no single fixed timeframe in law, but repairs must be completed within a 'reasonable time'. For urgent issues like loss of heating in winter or major leaks, this is typically within 24-48 hours. For less urgent structural repairs, a reasonable time is usually 14 to 21 days from receiving written notice.",
    },
    {
      category: "Personal Injury",
      question: "What should I do immediately after an accident at work?",
      answer: "First, seek medical attention. Then, ensure the accident is logged in your employer's accident book. Take photographs of the scene and the cause of the accident, collect contact details of any witnesses, and write down your own account of what happened as soon as possible.",
    },
    {
      category: "Personal Injury",
      question: "What is the three-year time limit for personal injury claims?",
      answer: "In the UK, court proceedings for a personal injury claim must be initiated within three years of the date of the accident, or the date you first realized your injury was linked to the incident (date of knowledge). If this period expires, your claim may become time-barred.",
    },
    {
      category: "Personal Injury",
      question: "Can I claim if I was partially responsible for the accident?",
      answer: "Yes, you may still be able to make a claim. This is known as 'contributory negligence'. If you were partly at fault, the compensation amount may be reduced by a percentage that reflects your share of the responsibility (e.g., if you were 25% responsible, your compensation would be reduced by 25%).",
    },
    {
      category: "Eligibility",
      question: "How does Claim Source qualify my enquiry?",
      answer: "We analyze your answers regarding your tenancy type, dates of notifications, type of injury, reporting records, and location. If they match UK criteria thresholds (such as renting status or time limits), we validate your enquiry and match you with a legal specialist.",
    },
    {
      category: "Eligibility",
      question: "What happens if my enquiry is not qualified?",
      answer: "If your circumstances do not meet the legal criteria for our services (for example, if you rent from a private landlord but did not notify them in writing, or if your accident occurred more than three years ago), we will explain this clearly. We will not charge you any fees.",
    },
    {
      category: "Privacy & Safety",
      question: "How is my personal data protected?",
      answer: "We treat data privacy with extreme seriousness. Your details are encrypted using SSL protocols and stored securely. We only share your data with verified, regulated UK legal professionals after receiving your explicit consent during submission.",
    },
  ];

  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-brand-bg py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
            Support Center
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-text mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-muted text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Find answers to common questions regarding UK housing disrepair duties, personal injury laws, and our eligibility checks.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-card border border-brand-border px-5 py-4 pl-12 text-xs font-medium tracking-wide focus:outline-none focus:border-brand-accent rounded-sm placeholder:text-brand-muted/70 text-brand-text"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-brand-border pb-6 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null); // Reset open states
              }}
              className={`px-4 py-2 text-3xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-accent text-brand-bg"
                  : "bg-brand-card text-brand-muted border border-brand-border hover:border-brand-accent/50 hover:text-brand-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        {filteredFaqs.length > 0 ? (
          <div className="border-t border-brand-border divide-y divide-brand-border">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-6">
                  <h3>
                    <button
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                      className="flex justify-between items-center w-full text-left font-serif text-lg md:text-xl font-bold text-brand-text hover:text-brand-accent transition-colors focus:outline-none py-2"
                    >
                      <span>{faq.question}</span>
                      <span className="ml-4 p-1.5 bg-brand-card rounded-full text-brand-text flex items-center justify-center">
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    role="region"
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-brand-muted leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                      <span className="inline-block mt-4 text-[9px] uppercase tracking-widest font-semibold bg-brand-card px-2 py-0.5 text-brand-accent rounded-sm">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-brand-muted">
            <p className="text-xs">No FAQs found matching your criteria. Please try another search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
