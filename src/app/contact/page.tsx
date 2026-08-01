"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="bg-brand-bg py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent font-semibold block mb-4">
            Contact Us
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-text leading-[1.1]">
            Connect with Claim Source.
          </h1>
          <p className="text-brand-muted text-sm md:text-base mt-6 leading-relaxed">
            Have a general question about our service, partnership enquiries, or data requests? Use the details below or complete the enquiry form to get in touch. We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Info Details Left */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-6">
                General Enquiries
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm md:text-base text-brand-muted">
                  <Mail className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <a href="mailto:info@claimsource.uk" className="border-b border-dashed border-brand-muted/50 hover:text-brand-text transition-colors">
                    info@claimsource.uk
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm md:text-base text-brand-muted">
                  <Phone className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <a href="tel:07874391075" className="border-b border-dashed border-brand-muted/50 hover:text-brand-text transition-colors">
                    07874391075
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm md:text-base text-brand-muted">
                  <MessageCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <a href="https://wa.me/447874391075" target="_blank" rel="noopener noreferrer" className="border-b border-dashed border-brand-muted/50 hover:text-brand-text transition-colors font-semibold">
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-text mb-6">
                Registered Address
              </h3>
              <div className="flex items-start gap-4 text-sm md:text-base text-brand-muted leading-relaxed">
                <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-1" />
                <span className="border-b border-dashed border-brand-muted/50">
                  35b Victoria Road, Wolverhampton, United Kingdom, WV10 0NG
                </span>
              </div>
            </div>

            <div className="p-8 bg-brand-card border border-brand-border rounded-sm">
              <h4 className="text-xs uppercase tracking-widest font-bold text-brand-text mb-3">
                Eligibility Checks
              </h4>
              <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-4">
                Please do not submit claim details via this general contact form. Use our specific campaign qualification forms for rapid, secure processing.
              </p>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-8 bg-brand-card p-8 md:p-14 border border-brand-border rounded-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-6">
                <div className="inline-flex p-4 bg-brand-accent-light rounded-full text-brand-accent mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-text">
                  Enquiry Received
                </h3>
                <p className="text-sm md:text-base text-brand-muted max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Claim Source. Your message has been sent successfully and is currently queued for review. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs uppercase tracking-widest text-brand-accent underline hover:text-brand-accent-hover font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-wider font-bold text-brand-text mb-3"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border px-5 py-4 text-sm tracking-wide focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-wider font-bold text-brand-text mb-3"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border px-5 py-4 text-sm tracking-wide focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs uppercase tracking-wider font-bold text-brand-text mb-3"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-border px-5 py-4 text-sm tracking-wide focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wider font-bold text-brand-text mb-3"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-border px-5 py-4 text-sm tracking-wide focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-bg py-5 text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Sending Message..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
