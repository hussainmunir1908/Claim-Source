import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Claim Source Terms & Conditions. Learn about your rights and responsibilities when using our website and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-brand-bg py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="border-b border-brand-border pb-12 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
            Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-brand-text mb-6">
            Terms & Conditions
          </h1>
          <p className="text-brand-muted text-xs md:text-sm">Last Updated: July 31, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm md:text-base text-brand-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website.
            </p>
            <p>
              These Terms & Conditions govern your use of the website operated by <span className="font-bold text-brand-text">CLAIM SOURCE</span> under the brand &quot;Claim Source&quot;.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">2. Scope of Service</h2>
            <p>
              Claim Source operates as an online marketing and initial enquiry qualification platform. We collect details of circumstances surrounding housing disrepair and personal injuries, run initial eligibility checks, and transfer qualifying enquiries to verified UK claims managers, advisors, and solicitors.
            </p>
            <p className="font-bold text-brand-text">
              We are a marketing platform. We do not provide legal advice. We advertise for our partner law firms.
            </p>
            <p>
              Using our qualification check does not establish a solicitor-client relationship. Any formal contract, conditional fee agreement (CFA), or legal representation will be agreed separately and directly between you and the legal specialist we introduce.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">3. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, we own the intellectual property rights for all material on Claim Source. All intellectual property rights are reserved. You may access this from Claim Source for your own personal use subjected to restrictions set in these terms.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from Claim Source.</li>
              <li>Sell, rent or sub-license material from Claim Source.</li>
              <li>Reproduce, duplicate or copy material from Claim Source.</li>
              <li>Redistribute content from Claim Source.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">4. Accuracy of Information</h2>
            <p>
              You agree to provide true, accurate, current, and complete information when submitting enquiries. Providing fraudulent or misleading details may result in your enquiry being cancelled and details flagged for abuse.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. We will not be liable for any loss or damage of any nature arising from your use of, or inability to use, our enquiry system.
            </p>
            <p>
              We do not guarantee that the introductions we make will result in compensation recovery or successful repair enforcement. The decision to accept, assess, or pursue a claim rests entirely with the introduced legal partner and is subject to their own evaluation of your circumstances.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">6. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by and construed in accordance with the laws of England and Wales, and you submit to the exclusive jurisdiction of the English courts.
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-brand-border">
            <h3 className="font-serif text-xl font-bold text-brand-text">Contact Details</h3>
            <p className="text-xs md:text-sm">
              If you have questions about these Terms, please contact:<br />
              <span className="font-semibold text-brand-text">Email:</span> info@claimsource.uk<br />
              <span className="font-semibold text-brand-text">Address:</span> 35b Victoria Road, Wolverhampton, United Kingdom, WV10 0NG<br />
              <span className="font-semibold text-brand-text">Phone:</span> 07874391075
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
