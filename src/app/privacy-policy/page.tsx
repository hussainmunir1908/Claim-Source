import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Claim Source Privacy Policy. Learn how we collect, process, and safeguard your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-bg py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="border-b border-brand-border pb-12 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
            Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-brand-text mb-6">
            Privacy Policy
          </h1>
          <p className="text-brand-muted text-xs md:text-sm">Last Updated: July 31, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm md:text-base text-brand-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">1. Introduction</h2>
            <p>
              Welcome to Claim Source. We are committed to protecting and respecting your privacy. This Privacy Policy explains how <span className="font-bold text-brand-text">CLAIM SOURCE</span> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, processes, and stores personal data when you visit our website or submit an enquiry.
            </p>
            <p>
              Under UK Data Protection Law (including the UK GDPR and the Data Protection Act 2018), we act as a Data Controller for the information collected during your initial visit, and a Data Processor when transferring your qualified enquiry details to legal partners.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">2. Information We Collect</h2>
            <p>We may collect and process the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-semibold text-brand-text">Identity Data:</span> First name, last name, date of birth.
              </li>
              <li>
                <span className="font-semibold text-brand-text">Contact Data:</span> Email address, mobile phone number, postal address, postcode.
              </li>
              <li>
                <span className="font-semibold text-brand-text">Claim Details & Circumstances Data:</span> Details regarding your housing defects, landlord notification logs, dates of accidents, types of injuries, treatment providers, and evidence availability.
              </li>
              <li>
                <span className="font-semibold text-brand-text">Attribution & Technical Data:</span> IP address, browser type, device type, operating system, landing pages, referrers, and marketing tracking parameters (UTM tags, Google Click IDs).
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">3. How and Why We Use Your Data</h2>
            <p>We use your personal data for the following purposes and under the stated lawful bases:</p>
            <table className="w-full border-collapse border border-brand-border text-left mt-4 text-xs md:text-sm">
              <thead>
                <tr className="bg-brand-card">
                  <th className="p-4 border border-brand-border font-bold text-brand-text font-serif">Purpose / Activity</th>
                  <th className="p-4 border border-brand-border font-bold text-brand-text font-serif">Lawful Basis under UK GDPR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border border-brand-border">To evaluate your enquiry and qualify your eligibility for claims matching</td>
                  <td className="p-4 border border-brand-border text-brand-accent font-semibold">Consent (explicitly given upon form submission)</td>
                </tr>
                <tr>
                  <td className="p-4 border border-brand-border">To transfer details to verified legal professionals and solicitors</td>
                  <td className="p-4 border border-brand-border text-brand-accent font-semibold">Consent / Contractual steps at your request</td>
                </tr>
                <tr>
                  <td className="p-4 border border-brand-border">To track marketing performance and monitor lead generation</td>
                  <td className="p-4 border border-brand-border text-brand-accent font-semibold">Legitimate Interests (optimizing attribution)</td>
                </tr>
                <tr>
                  <td className="p-4 border border-brand-border">To prevent spam, fraud, or duplicate entries</td>
                  <td className="p-4 border border-brand-border text-brand-accent font-semibold">Legitimate Interests (site security)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">4. Data Sharing and Third-Party Transfer</h2>
            <p>
              Claim Source is an enquiry-qualification marketing platform. Once you complete and submit an eligibility form, we will evaluate the circumstances. If eligibility requirements are met, we will share your details with our verified legal partners and panel law firms, who may contact you about your potential claim.
            </p>
            <p>
              We do not sell, rent, or trade your personal data to general marketing databases. Your data is only shared with legal partners explicitly for the purpose of processing your enquiry.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">5. Data Retention & Security</h2>
            <p>
              We retain personal data only as long as necessary to fulfill the purposes for which it was collected, typically up to 12 months for lead qualification records, unless a longer retention period is required to meet regulatory or legal disputes.
            </p>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. This includes SSL encryption, secure server firewalls, and restricted database permissions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">6. Your Rights</h2>
            <p>Under UK data protection laws, you have the following rights in relation to your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data (Subject Access Request).</li>
              <li>Request correction of inaccurate or incomplete personal data.</li>
              <li>Request erasure of your personal data (&quot;right to be forgotten&quot;).</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Withdraw your consent at any time (where processing is based on consent).</li>
            </ul>
            <p>
              To exercise any of these rights, please contact our Data Protection Team at <span className="font-bold text-brand-text">info@claimsource.uk</span>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">7. Complaints</h2>
            <p>
              If you have concerns about how we handle your data, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection (www.ico.org.uk).
            </p>
          </section>

          <section className="space-y-4 pt-8 border-t border-brand-border">
            <h3 className="font-serif text-xl font-bold text-brand-text">Contact Information</h3>
            <p>
              For privacy requests, please contact:<br />
              <span className="font-semibold text-brand-text">Data Protection Officer:</span> CLAIM SOURCE Team<br />
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
