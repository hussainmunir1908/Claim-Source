import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complaints Procedure",
  description: "Read the Claim Source Complaints Procedure. Learn how we handle and resolve service complaints.",
};

export default function ComplaintsPage() {
  return (
    <div className="bg-brand-bg py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="border-b border-brand-border pb-12 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
            Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-brand-text mb-6">
            Complaints Procedure
          </h1>
          <p className="text-brand-muted text-xs md:text-sm">Last Updated: July 31, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm md:text-base text-brand-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Our Commitment to Quality</h2>
            <p>
              At Claim Source, we aim to provide a high-quality, professional, and transparent service to all our users. However, if you feel that we have fallen short of your expectations, we would like to hear from you. We treat all complaints with seriousness and utilize feedback to refine our qualification procedures.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">How to Log a Complaint</h2>
            <p>You can submit a formal complaint using any of the following channels:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-semibold text-brand-text">By Email:</span> Send details of your complaint to <span className="font-bold text-brand-text">info@claimsource.uk</span>. Please include your full name, postcode, phone number, and any reference number you received.
              </li>
              <li>
                <span className="font-semibold text-brand-text">By Mail:</span> Send written correspondence to our registered address:<br />
                <span className="font-bold text-brand-text">35b Victoria Road, Wolverhampton, United Kingdom, WV10 0NG</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Our Review Timeline</h2>
            <p>We handle complaints systematically in accordance with the following schedule:</p>
            <table className="w-full border-collapse border border-brand-border text-left mt-4 text-xs md:text-sm">
              <thead>
                <tr className="bg-brand-card">
                  <th className="p-4 border border-brand-border font-bold text-brand-text font-serif">Stage</th>
                  <th className="p-4 border border-brand-border font-bold text-brand-text font-serif">Timeline</th>
                  <th className="p-4 border border-brand-border font-bold text-brand-text font-serif">Action Taken</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border border-brand-border font-semibold">1. Acknowledgment</td>
                  <td className="p-4 border border-brand-border">Within 5 working days</td>
                  <td className="p-4 border border-brand-border text-brand-muted">We send a written acknowledgment confirming receipt of your complaint and who is investigating it.</td>
                </tr>
                <tr>
                  <td className="p-4 border border-brand-border font-semibold">2. Investigation</td>
                  <td className="p-4 border border-brand-border">Within 4 weeks</td>
                  <td className="p-4 border border-brand-border text-brand-muted">We review logs, server entries, and process data. We aim to issue a full response or update.</td>
                </tr>
                <tr>
                  <td className="p-4 border border-brand-border font-semibold">3. Final Response</td>
                  <td className="p-4 border border-brand-border">Within 8 weeks</td>
                  <td className="p-4 border border-brand-border text-brand-muted">We issue a final written decision detailing our findings, resolution attempts, and options.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Escalation and Third-Party Review</h2>
            <p>
              If your complaint concerns the conduct of a solicitor or legal team we introduced you to, please raise the matter directly with them using their own formal complaints procedure, which they are legally required to provide.
            </p>
            <p>
              If you remain dissatisfied with their response, you have the right to contact the Legal Ombudsman (www.legalombudsman.org.uk) or the Solicitors Regulation Authority (SRA) to escalate the dispute.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
