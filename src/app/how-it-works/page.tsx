import Link from "next/link";
import { ArrowRight, ClipboardCheck, Award, MessageSquareCheck, Check } from "lucide-react";
import type { Metadata } from "next";
import RoundCarousel from "@/components/RoundCarousel";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how the Claim Source enquiry process works. See our step-by-step assessment of your housing or injury circumstances.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      icon: <ClipboardCheck className="w-6 h-6 text-brand-accent" />,
      title: "Provide Your Circumstances",
      desc: "Complete our tailored, step-by-step questionnaire. The questions will dynamically adapt based on your answers (e.g. if you select a workplace accident, we will gather employment details). This takes less than two minutes.",
    },
    {
      num: "02",
      icon: <Award className="w-6 h-6 text-brand-accent" />,
      title: "Initial Qualification Check",
      desc: "Our secure platform evaluates your details against common legal criteria in the UK—such as tenancy status, notification dates, or accident limitation periods—to determine if there is a potential route to compensation.",
    },
    {
      num: "03",
      icon: <MessageSquareCheck className="w-6 h-6 text-brand-accent" />,
      title: "Review & Solicitor Contact",
      desc: "If your circumstances meet the initial campaign thresholds, your details are securely passed to a verified legal professional. They will contact you for a friendly, no-obligation conversation to discuss your options.",
    },
  ];

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url("/bg-how-it-works.jpg")' }}
    >
      {/* Background overlay so text remains legible */}
      <div className="absolute inset-0 bg-[#FAF9F6]/90 backdrop-blur-[2px] z-0" />
      
      <div className="relative z-10">
      {/* 1. Page Header */}
      <section className="py-20 md:py-32 border-b border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Our Process
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-text leading-[1.1] max-w-2xl">
                A simple, secure path to clarity.
              </h1>
              <p className="text-brand-muted text-base md:text-lg max-w-xl leading-relaxed mt-8 font-light">
                We believe checking your eligibility should be transparent and straightforward. Here is how we guide your enquiry from initial check to professional review.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full flex items-center justify-center">
              <RoundCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Timeline Grid */}
      <section className="py-24 md:py-36 bg-brand-card/40 backdrop-blur-sm border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-8 bg-brand-bg/80 backdrop-blur-md border border-brand-border rounded-sm hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div className="p-3 bg-brand-card/80 backdrop-blur-sm rounded-sm text-brand-accent">
                      {step.icon}
                    </div>
                    <span className="font-serif text-3xl font-light text-brand-accent/20">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-brand-text mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Explainer / Accordion Text */}
      <section className="py-24 md:py-32 border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="max-w-3xl mb-16 text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
              What to Expect
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text">
              Frequently Asked Process Details
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4 items-start pb-6 border-b border-brand-border">
              <div className="p-1 bg-brand-accent-light rounded-full text-brand-accent mt-1 flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-text mb-2">
                  What documents will I need to prepare?
                </h3>
                <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                  For housing disrepair, keeping a record of letters, emails, and photos of the mould/leaks is essential. For personal injury, medical summaries, GP notes, and witness names are highly useful. You do not need these immediately to perform the check, but having them ready will speed up the process.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start pb-6 border-b border-brand-border">
              <div className="p-1 bg-brand-accent-light rounded-full text-brand-accent mt-1 flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-text mb-2">
                  Will I have to pay anything to use this service?
                </h3>
                <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                  No, our service is completely free to users. We are funded by the verified claims management teams and solicitors we refer you to. They will explain their own terms, typically structured on a &quot;No Win, No Fee&quot; model, so you don&apos;t risk upfront costs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-1 bg-brand-accent-light rounded-full text-brand-accent mt-1 flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-text mb-2">
                  How long does the whole process take?
                </h3>
                <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                  Our online check takes 2 minutes. Once submitted, eligible enquiries are typically reviewed within 24-48 hours. The legal team representing you will update you directly on court filings or settlement timelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Footer CTA */}
      <section className="bg-brand-bg/50 backdrop-blur-sm py-24 text-center border-b border-brand-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6">
            Check your eligibility in 2 minutes.
          </h2>
          <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Answer our questions to evaluate your housing disrepair or personal injury circumstances.
          </p>
          <Link
            href="/#campaign-selector"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-brand-accent text-brand-bg px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-brand-accent-hover focus:outline-none"
          >
            Start Qualification Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
