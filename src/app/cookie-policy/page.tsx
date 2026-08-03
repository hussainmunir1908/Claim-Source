import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Read the Claim Source Cookie Policy. Learn about what cookies we use, why, and how you can manage your preferences.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-brand-bg py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="border-b border-brand-border pb-10 mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-semibold block mb-4">
            Compliance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-brand-text mb-6">
            Cookie Policy
          </h1>
          <p className="text-brand-muted text-xs">Last Updated: July 31, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs md:text-sm text-brand-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-brand-text">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-brand-text">2. How We Use Cookies</h2>
            <p>We classify cookies on our site into three main categories:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <span className="font-semibold text-brand-text block">Necessary Cookies (Always Active)</span>
                These cookies are essential for you to move around the website and use its features, such as accessing secure areas, filling out forms, or retaining cookie preferences. The website cannot function properly without these cookies.
              </li>
              <li>
                <span className="font-semibold text-brand-text block">Analytics Cookies (Optional)</span>
                These cookies collect information about how visitors use our website, such as which pages are visited most often or if error messages occur. This data helps us monitor traffic patterns, improve performance, and optimize layouts.
              </li>
              <li>
                <span className="font-semibold text-brand-text block">Marketing & Attribution Cookies (Optional)</span>
                These cookies are used to track the efficiency of our marketing ads on external networks like Google or Facebook. They store attribution tags (like GCLID or FBCLID) so we can match a completed enquiry with the ad that referred it.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-brand-text">3. Managing Your Cookies</h2>
            <p>
              When you first visited our website, you were presented with a Cookie Consent banner allowing you to Accept All, Reject Optional, or Customize Preferences. You can clear your browser cookies or storage at any time to reset these choices.
            </p>
            <p>
              Additionally, you can restrict or block cookies through your browser settings:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chrome: Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
              <li>Safari: Preferences &gt; Privacy &gt; Block all cookies</li>
              <li>Firefox: Options &gt; Privacy &gt; Enhanced Tracking Protection</li>
              <li>Edge: Settings &gt; Site Permissions &gt; Cookies and site data</li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-brand-border">
            <h3 className="font-serif text-lg font-bold text-brand-text">Questions?</h3>
            <p>
              For further questions regarding our cookie practices, please contact:<br />
              <span className="font-semibold text-brand-text">Email:</span> info@claimsource.uk
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
