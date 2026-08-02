import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, FileText, Calendar, Building2, Droplets, Wrench, Thermometer, House, Zap, Bug } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Housing Disrepair Claims",
  description: "Check if you may be eligible to make a housing disrepair claim. Learn about landlord repair responsibilities for damp, mould, leaks, and unsafe conditions.",
};

export default function HousingDisrepairPage() {
  const commonIssues = [
    {
      title: "Damp & Mould",
      desc: "Persistent dampness on walls, floors, or ceilings, and toxic mould growth caused by structural failures, poor ventilation, or water infiltration.",
      icon: <Droplets className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Water Leaks & Plumbing",
      desc: "Leaking pipes, broken drains, water damage from roofing failures, or constant toilet/sink blockages left unresolved by the landlord.",
      icon: <Wrench className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Heating & Hot Water",
      desc: "Faulty boilers, broken radiators, or lack of hot water. Landlords are legally required to provide working heating and sanitation.",
      icon: <Thermometer className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Structural Disrepair",
      desc: "Cracked brickwork, collapsing ceilings, damp walls, broken windows/doors, or roofing failures that compromise safety and weather-proofing.",
      icon: <House className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Electrical & Fire Hazards",
      desc: "Unsafe or exposed wiring, broken sockets, lack of smoke detectors, or electrical faults that cause constant blackouts or present safety risks.",
      icon: <Zap className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Pest Infestations",
      desc: "Rats, mice, cockroaches, or bedbug infestations arising from structural gaps, damp walls, or unresolved repair problems in the building.",
      icon: <Bug className="w-6 h-6 text-brand-accent mb-4" />
    },
  ];

  const eligibilityCriteria = [
    "The property is rented from a Housing Association, Local Council, or Private Landlord in the UK.",
    "The disrepair issues have been reported to the landlord or housing provider in writing.",
    "The landlord has failed to carry out the necessary repairs within a reasonable timeframe (typically 14-21 days).",
    "The disrepair is causing damage to your belongings, affecting your health, or making the property unsafe.",
  ];

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url("/bg-housing.jpg")' }}
    >
      <div className="absolute inset-0 bg-[#FAF9F6]/70 backdrop-blur-[4px] z-0" />
      
      <div className="relative z-10">
      {/* 1. Page Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-disrepair.png"
            alt="Textured interior wall with natural window light"
            fill
            priority
            className="object-cover object-center filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent-light font-semibold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-6">
            UK Campaign
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
            Housing Disrepair Assessment
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-light">
            Tenants in England and Wales are legally entitled to live in a safe, healthy home. If your landlord fails to maintain your home, you may have a route to claim repairs and compensation.
          </p>
          <Link
            href="/housing-disrepair/claim"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-brand-text px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-brand-accent hover:text-white focus:outline-none"
          >
            Check Your Eligibility
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 2. Editorial Definition Block */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                The Legal Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text leading-tight">
                What constitutes housing disrepair?
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-brand-muted text-sm md:text-base leading-relaxed">
              <p>
                Under Section 11 of the Landlord and Tenant Act 1985 and the Homes (Fitness for Human Habitation) Act 2018, landlords are legally required to keep the structure and exterior of their rented properties in repair, and ensure that the home is fit for human habitation.
              </p>
              <p>
                When a landlord receives written notice of an issue, they are expected to take action. If they fail to investigate or resolve a serious issue within a reasonable period, they may be in breach of their legal obligations. In such circumstances, tenants have a right to pursue repair enforcement and compensation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Common Problems Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
              Qualifying Defects
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text">
              Common unresolved problems.
            </h2>
            <p className="text-sm text-brand-muted mt-4">
              If your home exhibits any of these conditions and you have informed your landlord, you may be eligible to proceed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonIssues.map((issue, idx) => (
              <div
                key={idx}
                className="bg-brand-bg/80 backdrop-blur-md p-8 border border-brand-border rounded-sm hover:border-brand-accent/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {issue.icon}
                  <h3 className="font-serif text-lg md:text-xl font-bold text-brand-text mb-3">
                    {issue.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                    {issue.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Importance of Documenting */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Building Your Case
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text leading-tight mb-6">
                Why documenting disrepair matters.
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                To hold a landlord responsible, you must be able to demonstrate that they were made aware of the issues and did not resolve them. Collecting evidence is a critical component of any assessment.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-brand-card rounded-sm text-brand-accent mt-1">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                      Written Notifications
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Keep records of emails, text messages, letters, and portal requests sent to the landlord.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-brand-card rounded-sm text-brand-accent mt-1">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                      Timeline & Reference Numbers
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Maintain a timeline of events, including dates when repairs were requested or attempted.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-brand-card rounded-sm text-brand-accent mt-1">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                      Visual Evidence
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Take clear photos and videos of the damage, showing dates and scale if possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-card/80 backdrop-blur-md p-8 md:p-12 border border-brand-border rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Eligibility Checklist
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-6">
                Do you meet these conditions?
              </h3>
              <ul className="space-y-4 mb-8">
                {eligibilityCriteria.map((criterion, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent mt-1 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-brand-muted leading-relaxed">
                      {criterion}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/housing-disrepair/claim"
                className="w-full flex items-center justify-between bg-brand-accent text-brand-bg px-6 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent-hover transition-colors focus:outline-none"
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs Block */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-center text-brand-text mb-12">
            Housing Disrepair FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-brand-bg/80 backdrop-blur-md p-6 border border-brand-border rounded-sm">
              <h3 className="font-serif text-base md:text-lg font-bold text-brand-text mb-2">
                Can my landlord evict me if I report disrepair?
              </h3>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                By law, tenants are protected against &quot;retaliatory eviction&quot; under the Deregulation Act 2015, provided they have reported the disrepair and the council has issued a notice. Seeking repair enforcement is a legal right, not a ground for eviction.
              </p>
            </div>
            <div className="bg-brand-bg/80 backdrop-blur-md p-6 border border-brand-border rounded-sm">
              <h3 className="font-serif text-base md:text-lg font-bold text-brand-text mb-2">
                What compensation may I be entitled to?
              </h3>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                Compensation amounts vary depending on the severity of the disrepair, length of tenancy during the disrepair, impact on health, and damage to personal belongings. Assessment is required to determine potential paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. final call to action */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6">
            Assess your property circumstances today.
          </h2>
          <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Find out within minutes whether you qualify for legal assistance to force repairs and recover potential damages.
          </p>
          <Link
            href="/housing-disrepair/claim"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-brand-accent text-brand-bg px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:bg-brand-accent-hover focus:outline-none"
          >
            Start Check Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
