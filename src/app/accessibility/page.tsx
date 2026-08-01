import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Read the Claim Source Accessibility Statement. Learn about our commitment to WCAG compliance and how to report issues.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-brand-bg py-24 md:py-36">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="border-b border-brand-border pb-12 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
            Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-brand-text mb-6">
            Accessibility Statement
          </h1>
          <p className="text-brand-muted text-xs md:text-sm">Last Updated: July 31, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm md:text-base text-brand-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Our Commitment</h2>
            <p>
              Claim Source is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p>
              Claim Source aims to be fully conformant with <span className="font-semibold text-brand-text">WCAG 2.1 Level AA</span> standards. Full conformance means that the content conforms to the accessibility standard without any exceptions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Accessibility Features</h2>
            <p>We have integrated several features on our platform to support accessibility:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-semibold text-brand-text">Semantic HTML structure:</span> We use appropriate heading levels, main landmark regions, and descriptive buttons to support screen readers.
              </li>
              <li>
                <span className="font-semibold text-brand-text">Contrast ratios:</span> Text color styling ensures a minimum contrast ratio of 4.5:1 against backgrounds (in most cases, charcoal text on off-white, providing &gt;7:1 contrast).
              </li>
              <li>
                <span className="font-semibold text-brand-text">Keyboard navigation:</span> Interactive cards, menus, and forms can be fully navigated and selected using the Tab, Space, and Enter keys.
              </li>
              <li>
                <span className="font-semibold text-brand-text">Focus states:</span> Clear visual focus rings are active across all interactive links and input fields.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-brand-text">Feedback & Contact</h2>
            <p>
              We welcome your feedback on the accessibility of Claim Source. If you encounter accessibility barriers on our website, please let us know:
            </p>
            <p>
              <span className="font-semibold text-brand-text">Email:</span> info@claimsource.uk
            </p>
            <p>
              We aim to respond to accessibility reports within 5 working days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
