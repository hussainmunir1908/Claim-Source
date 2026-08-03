import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Read the Claim Source Legal Disclaimer. Understand our role as an independent marketing platform.",
};

export default function DisclaimerPage() {
  return (
    <div className="bg-brand-bg py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="border-b border-brand-border pb-12 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
            Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-text mb-6">
            Legal Disclaimer
          </h1>
          <p className="text-brand-muted text-xs md:text-sm">Last Updated: July 31, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm md:text-base text-brand-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">1. Core Disclaimer</h2>
            <div className="bg-brand-card p-6 md:p-8 border border-brand-border rounded-sm">
              <p className="text-base md:text-lg font-semibold text-brand-text leading-relaxed">
                We are a marketing platform. We do not provide legal advice. We advertise for our partner law firms.
              </p>
            </div>
            <p>
              Claim Source operates strictly as an enquiry processing, marketing, and initial qualification service. The purpose of this website is to gather information about your circumstances, perform automated threshold reviews, and facilitate introductions to verified claims management companies (CMCs) or law firms regulated in the United Kingdom.
            </p>
            <p>
              Claim Source does not provide legal representation or legal advice. We are not regulated by the Solicitors Regulation Authority (SRA) or the Financial Conduct Authority (FCA).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">2. Introductions & Legal Partner Reviews</h2>
            <p>
              Submitting an enquiry via our forms does not guarantee that you will be accepted by a solicitor, that they will agree to act on your behalf, or that you are eligible to recover compensation.
            </p>
            <p>
              Any legal professional we introduce to you will conduct their own detailed evaluation of your circumstances, including viability checks, conflict checks, and merit reviews, before offering representation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">3. Fees & No Win No Fee Structures</h2>
            <p>
              Claim Source does not charge users any fees. If you enter into a legal services contract with a solicitor we introduce, they will typically operate on a Conditional Fee Agreement (CFA), commonly referred to as &quot;No Win, No Fee&quot;.
            </p>
            <p>
              Under a CFA, if your claim is unsuccessful, you typically do not pay your solicitor&apos;s legal fees. If successful, the solicitor will charge a success fee, which is capped by UK law and will be deducted from your compensation. The introduced solicitor will explain these fees and terms in detail before you sign any agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">4. Information Accuracy</h2>
            <p>
              The content on this website is provided for general informational purposes only and does not constitute legal, financial, or professional advice. We endeavor to keep information accurate and up to date, but make no guarantees about completeness, reliability, or applicability to your specific legal situation.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-brand-border">
            <h3 className="font-serif text-xl font-bold text-brand-text">Compliance Details</h3>
            <p className="text-xs md:text-sm">
              This website is owned and operated by <span className="font-bold text-brand-text">CLAIM SOURCE</span>.<br />
              <span className="font-semibold text-brand-text">Registered Address:</span> 35b Victoria Road, Wolverhampton, United Kingdom, WV10 0NG<br />
              <span className="font-semibold text-brand-text">Contact Email:</span> info@claimsource.uk
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
