import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, FileText, ClipboardList, Stethoscope, HardHat, Car, AlertCircle, Building, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Injury Claims",
  description: "Check if you may be eligible to make a personal injury claim. Learn about negligence, accidents at work, road collisions, and public slip and trips.",
};

export default function PersonalInjuryPage() {
  const commonAccidents = [
    {
      title: "Workplace Accidents",
      desc: "Injuries caused by lack of training, faulty equipment, inadequate safety gear, or general employer negligence in offices, warehouses, or construction sites.",
      icon: <HardHat className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Road Traffic Collisions",
      desc: "Collisions involving cars, motorbikes, bicycles, or pedestrians where another road user was negligent or breached the Highway Code.",
      icon: <Car className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Slips, Trips & Falls",
      desc: "Accidents in public spaces, supermarkets, or private business premises caused by wet floors, uneven surfaces, loose cables, or neglected walkways.",
      icon: <AlertCircle className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Industrial & Construction Sites",
      desc: "Serious injuries resulting from scaffolding collapses, falling objects, heavy machinery failures, or safety oversight on construction projects.",
      icon: <Building className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Public Liability Incidents",
      desc: "Accidents occurring on council-maintained property, such as broken paving stones, or on commercial property due to inadequate maintenance.",
      icon: <Building2 className="w-6 h-6 text-brand-accent mb-4" />
    },
    {
      title: "Other Negligent Incidents",
      desc: "Injuries occurring under unique circumstances where another party had a legal duty of care and failed to uphold it.",
      icon: <ShieldAlert className="w-6 h-6 text-brand-accent mb-4" />
    },
  ];

  const evidenceList = [
    {
      icon: <ClipboardList className="w-5 h-5" />,
      title: "Accident Reports",
      desc: "Log entries in a workplace accident book, police reference numbers for road traffic collisions, or incident logs with store managers.",
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: "Medical Records",
      desc: "Records from GP visits, A&E admissions, ambulance call-outs, or ongoing rehabilitation reviews that formally document your physical injuries.",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Witness Details & Media",
      desc: "Contact information for third-party witnesses, photographic/video documentation of the accident scene, and local CCTV footage if available.",
    },
  ];

  const eligibilityCriteria = [
    "The incident occurred within the last three years (standard UK limitation period, with minor exceptions).",
    "Another party was partially or entirely responsible for the accident due to negligence or breach of duty.",
    "You sustained physical or psychological injuries that required medical attention or impacted your daily life.",
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hardware-accelerated fixed background to prevent iOS Safari lag & zoom bugs */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg-injury.jpg")' }}
      />
      <div className="fixed inset-0 bg-[#FAF9F6]/70 backdrop-blur-[4px] z-0" />
      
      <div className="relative z-10">
      {/* 1. Page Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105"
          >
            <source src="/hero-injury.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent-light font-semibold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full mb-6">
            UK Claims
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
            Personal Injury Claims
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-light">
            If you have been injured due to another party&apos;s negligence, you may have a legal route to claim compensation for injuries, lost income, and rehabilitation costs.
          </p>
          <Link
            href="/personal-injury/claim"
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
                Legal Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text leading-tight">
                Establishing a duty of care.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-brand-muted text-sm md:text-base leading-relaxed">
              <p>
                A personal injury claim is built upon the legal concept of negligence. For a claim to be viable, it must be shown that the responsible party (such as an employer, local authority, or another road user) owed you a duty of care, failed to uphold that duty, and that this failure directly caused your injuries.
              </p>
              <p>
                In the UK, strict regulations govern safety in workplaces (the Health and Safety at Work etc. Act 1974), public areas, and roads. When these regulations are breached and result in injury, the law provides a pathway for the injured person to seek redress and recover expenses incurred as a direct consequence of the incident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Incident Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
              Types of Incidents
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text">
              Common accident scenarios.
            </h2>
            <p className="text-sm text-brand-muted mt-4">
              We process qualification enquiries across a wide range of accident classifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonAccidents.map((accident, idx) => (
              <div
                key={idx}
                className="bg-brand-bg/80 backdrop-blur-md p-8 border border-brand-border rounded-sm hover:border-brand-accent/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {accident.icon}
                  <h3 className="font-serif text-lg md:text-xl font-bold text-brand-text mb-3">
                    {accident.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                    {accident.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Evidence Requirements */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Evidence Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text leading-tight mb-6">
                Supporting your eligibility.
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed mb-8">
                To establish eligibility, a claims professional will need to review specific items of evidence related to the incident. Collecting these early can significantly accelerate the process.
              </p>
              <div className="space-y-6">
                {evidenceList.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="p-2.5 bg-brand-card rounded-sm text-brand-accent flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-card/80 backdrop-blur-md p-8 md:p-12 border border-brand-border rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
                Eligibility Rules
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-6">
                Qualifying Conditions
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
                href="/personal-injury/claim"
                className="w-full flex items-center justify-between bg-brand-accent text-brand-bg px-6 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-brand-accent-hover transition-colors focus:outline-none"
              >
                Check Your Eligibility
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
            Personal Injury FAQs
          </h2>
          <div className="space-y-6">
            <div className="bg-brand-bg/80 backdrop-blur-md p-6 border border-brand-border rounded-sm">
              <h3 className="font-serif text-base md:text-lg font-bold text-brand-text mb-2">
                What is the time limit for making a claim?
              </h3>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                In the UK, the standard limitation period is three years from the date of the accident or three years from the date you became aware of the injury. For children, the three-year limit begins on their 18th birthday.
              </p>
            </div>
            <div className="bg-brand-bg/80 backdrop-blur-md p-6 border border-brand-border rounded-sm">
              <h3 className="font-serif text-base md:text-lg font-bold text-brand-text mb-2">
                Will making a claim affect my employment?
              </h3>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed">
                By law, employers cannot dismiss or treat you unfairly simply because you make a personal injury claim following an accident at work. Employers are required to carry out Employers&apos; Liability Insurance to cover such events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. final call to action */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text mb-6">
            Check your eligibility today.
          </h2>
          <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-8 max-w-xl mx-auto">
            Find out within minutes whether you qualify for legal assistance to recover potential damages.
          </p>
          <Link
            href="/personal-injury/claim"
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
