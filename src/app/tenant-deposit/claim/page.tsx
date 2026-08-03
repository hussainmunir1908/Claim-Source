"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  // Step 1: Location & Landlord
  nation: string;
  landlordType: string;

  // Step 2: Tenancy Details
  postcode: string;
  addressLine1: string;
  city: string;
  tenancyStart: string;
  isCurrentTenant: string;

  // Step 3: Deposit details
  depositAmount: string;
  depositPaid: string;
  depositProtected: string;

  // Step 4: Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  contactTime: string;

  // Step 5: Consent
  consentProcess: boolean;
  consentContact: boolean;
  consentMarketing: boolean;

  // Honeypot
  website_url: string;
}

const initialFormState: FormData = {
  nation: "",
  landlordType: "",
  postcode: "",
  addressLine1: "",
  city: "",
  tenancyStart: "",
  isCurrentTenant: "",
  depositAmount: "",
  depositPaid: "",
  depositProtected: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "Phone",
  contactTime: "Morning",
  consentProcess: false,
  consentContact: false,
  consentMarketing: false,
  website_url: "",
};

export default function TenantDepositClaimPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refNumber, setRefNumber] = useState("");
  const formTopRef = useRef<HTMLDivElement>(null);

  // Restore state from sessionStorage if present
  useEffect(() => {
    const saved = sessionStorage.getItem("claim_source_deposit_form");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  // Scroll to top of form when step changes
  useEffect(() => {
    if (formTopRef.current) {
      const yOffset = -100;
      const element = formTopRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [step]);

  // Autosave form changes
  const updateFormData = (fields: Partial<FormData>) => {
    const updated = { ...formData, ...fields };
    setFormData(updated);
    sessionStorage.setItem("claim_source_deposit_form", JSON.stringify(updated));
  };

  const totalSteps = 5;

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nation) newErrors.nation = "Please select your location.";
      if (!formData.landlordType) newErrors.landlordType = "Please select your landlord type.";
    }

    if (step === 2) {
      if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required.";
      else if (!/^[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][A-Z]{2}$/i.test(formData.postcode.trim())) {
        newErrors.postcode = "Please enter a valid UK postcode.";
      }
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required.";
      if (!formData.city.trim()) newErrors.city = "City is required.";
      if (!formData.tenancyStart) newErrors.tenancyStart = "Please select or enter tenancy start year.";
      if (!formData.isCurrentTenant) newErrors.isCurrentTenant = "Please select tenant status.";
    }

    if (step === 3) {
      if (!formData.depositPaid) newErrors.depositPaid = "Please answer if you paid a deposit.";
      if (!formData.depositProtected) newErrors.depositProtected = "Please answer if your deposit was protected.";
    }

    if (step === 4) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
      else if (!/^(?:\+44|0)7[0-9]{9}$/.test(formData.phone.trim().replace(/\s/g, ""))) {
        newErrors.phone = "Please enter a valid UK mobile number.";
      }
      if (!formData.consentProcess) newErrors.consentProcess = "Consent to process data is required.";
      if (!formData.consentContact) newErrors.consentContact = "Consent to be contacted is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);

    let utm: Record<string, string> = {};
    let landingPage = "";
    let referrer = "";
    try {
      const savedUtm = sessionStorage.getItem("claim_source_utm");
      if (savedUtm) utm = JSON.parse(savedUtm);
      landingPage = sessionStorage.getItem("claim_source_landing_page") || "/";
      referrer = sessionStorage.getItem("claim_source_referrer") || "";
    } catch (e) {
      // Ignore
    }

    const payload = {
      campaign: "Tenant Deposit",
      timestamp: new Date().toISOString(),
      ...formData,
      utmSource: utm.utm_source || "",
      utmMedium: utm.utm_medium || "",
      utmCampaign: utm.utm_campaign || "",
      utmTerm: utm.utm_term || "",
      utmContent: utm.utm_content || "",
      gclid: utm.gclid || "",
      fbclid: utm.fbclid || "",
      landingPage,
      referrer,
      device: typeof window !== "undefined" && window.innerWidth < 768 ? "Mobile" : "Desktop",
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      
      if (responseData.leadId) {
        setRefNumber(responseData.leadId);
      } else {
        setRefNumber("TDP-" + Math.floor(1000 + Math.random() * 9000));
      }
      
      setSubmitted(true);
      sessionStorage.removeItem("claim_source_deposit_form");
    } catch (err) {
      console.error(err);
      setRefNumber("TDP-" + Math.floor(1000 + Math.random() * 9000));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < totalSteps) {
      e.preventDefault();
      handleNext();
    }
  };

  const progressPercent = (step / totalSteps) * 100;

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 min-h-[85vh] flex flex-col justify-center items-center text-center bg-brand-bg">
        <CheckCircle2 className="w-20 h-20 text-brand-accent mb-8 animate-[scaleUp_0.6s_cubic-bezier(0.16,1,0.3,1)]" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mb-4">
          Claim Enquiry Submitted
        </h1>
        <p className="text-sm uppercase tracking-widest text-brand-accent font-bold mb-8">
          Reference Number: {refNumber}
        </p>
        <p className="text-base md:text-lg text-brand-muted max-w-xl leading-relaxed mb-12">
          Thank you for checking your eligibility. Your tenant deposit claim enquiry has been received securely.
        </p>

        <div className="w-full max-w-lg space-y-4 text-left text-xs md:text-sm text-brand-muted border-t border-brand-border/60 pt-8 mb-12">
          <h3 className="font-bold text-brand-text uppercase tracking-wider mb-2">Next Steps</h3>
          <div className="flex gap-4 items-start bg-brand-card p-4 border border-brand-border/60 rounded-sm">
            <span className="p-2 bg-brand-accent/10 rounded-full text-brand-accent font-bold text-xs flex-shrink-0">1</span>
            <p>Your details are evaluated securely against compliance rules.</p>
          </div>
          <div className="flex gap-4 items-start bg-brand-card p-4 border border-brand-border/60 rounded-sm">
            <span className="p-2 bg-brand-accent/10 rounded-full text-brand-accent font-bold text-xs flex-shrink-0">2</span>
            <p>We connect qualifying enquiries with verified UK claims specialists and law firms.</p>
          </div>
          <div className="flex gap-4 items-start bg-brand-card p-4 border border-brand-border/60 rounded-sm">
            <span className="p-2 bg-brand-accent/10 rounded-full text-brand-accent font-bold text-xs flex-shrink-0">3</span>
            <p>A claims specialist will call or email you for a free, confidential consultation.</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-10 py-5 text-sm uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none shadow-md cursor-pointer"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div ref={formTopRef} className="max-w-3xl mx-auto px-6 py-16 md:py-24 min-h-[85vh] flex flex-col justify-between bg-brand-bg" onKeyDown={handleKeyDown}>
      {/* Progress Bar Header */}
      <div className="mb-12 space-y-5">
        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-brand-muted font-bold">
          <span>Tenant Deposit Claim Check</span>
          <span>Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full h-[3px] bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Form Content Steps */}
      <div key={step} className="flex-grow flex flex-col justify-center py-6 animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        {step === 1 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Where was the property, and who is your landlord?
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">UK Nation</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["England", "Wales", "Scotland", "Northern Ireland"].map((n) => (
                    <div key={n}>
                      <input
                        type="radio"
                        id={`nation-${n}`}
                        name="nation"
                        checked={formData.nation === n}
                        onChange={() => updateFormData({ nation: n })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`nation-${n}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm active:ring-2 active:ring-brand-accent/20"
                      >
                        {n}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.nation && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.nation}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Who is/was your landlord?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Private Landlord", value: "Private Landlord" },
                    { label: "Housing Association", value: "Housing Association" },
                    { label: "Council / Local Authority", value: "Council" },
                  ].map((opt) => (
                    <div key={opt.value}>
                      <input
                        type="radio"
                        id={`landlord-${opt.value}`}
                        name="landlordType"
                        checked={formData.landlordType === opt.value}
                        onChange={() => updateFormData({ landlordType: opt.value })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`landlord-${opt.value}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.landlordType && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.landlordType}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight uppercase tracking-wider">
              ADDRESS INFORMATION
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-1">
                  <label htmlFor="postcode" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Postcode</label>
                  <input
                    type="text"
                    id="postcode"
                    required
                    value={formData.postcode}
                    onChange={(e) => updateFormData({ postcode: e.target.value.toUpperCase() })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.postcode && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.postcode}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine1" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Address Line 1</label>
                  <input
                    type="text"
                    id="addressLine1"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => updateFormData({ addressLine1: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.addressLine1 && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.addressLine1}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Town / City</label>
                <input
                  type="text"
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => updateFormData({ city: e.target.value })}
                  className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                />
                {errors.city && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.city}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Tenancy Start Year</label>
                  <select
                    value={formData.tenancyStart}
                    onChange={(e) => updateFormData({ tenancyStart: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map((yr) => (
                      <option key={yr} value={String(yr)}>{yr}</option>
                    ))}
                  </select>
                  {errors.tenancyStart && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.tenancyStart}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Are you currently living there?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Yes", "No"].map((opt) => (
                      <div key={opt}>
                        <input
                          type="radio"
                          id={`living-${opt}`}
                          name="isCurrentTenant"
                          checked={formData.isCurrentTenant === opt}
                          onChange={() => updateFormData({ isCurrentTenant: opt })}
                          className="sr-only form-radio-card"
                        />
                        <label
                          htmlFor={`living-${opt}`}
                          className="block text-center border-2 border-brand-border py-4 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                        >
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.isCurrentTenant && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.isCurrentTenant}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Tell us about your Tenancy Deposit
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Did you pay a cash / scheme deposit?</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Yes", "No"].map((opt) => (
                    <div key={opt}>
                      <input
                        type="radio"
                        id={`depositPaid-${opt}`}
                        name="depositPaid"
                        checked={formData.depositPaid === opt}
                        onChange={() => updateFormData({ depositPaid: opt })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`depositPaid-${opt}`}
                        className="block text-center border-2 border-brand-border py-4 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.depositPaid && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.depositPaid}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Was the deposit protected within 30 days?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Yes, protected", value: "Yes" },
                    { label: "No / Unprotected", value: "No" },
                    { label: "I don't know / Unsure", value: "Unsure" },
                  ].map((opt) => (
                    <div key={opt.value}>
                      <input
                        type="radio"
                        id={`protected-${opt.value}`}
                        name="depositProtected"
                        checked={formData.depositProtected === opt.value}
                        onChange={() => updateFormData({ depositProtected: opt.value })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`protected-${opt.value}`}
                        className="block text-center border-2 border-brand-border py-4 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.depositProtected && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.depositProtected}</p>}
              </div>

              <div>
                <label htmlFor="depositAmount" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Approximate Deposit Amount (£) - Optional</label>
                <input
                  type="text"
                  id="depositAmount"
                  placeholder="e.g. 1200"
                  value={formData.depositAmount}
                  onChange={(e) => updateFormData({ depositAmount: e.target.value.replace(/[^0-9]/g, "") })}
                  className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight uppercase tracking-wider">
              CONTACT INFORMATION
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateFormData({ firstName: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.firstName && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateFormData({ lastName: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.lastName && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Mobile Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="e.g. 07123456789"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Preferred Contact Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Phone", "SMS", "Email"].map((opt) => (
                      <div key={opt}>
                        <input
                          type="radio"
                          id={`pref-${opt}`}
                          name="contactMethod"
                          checked={formData.contactMethod === opt}
                          onChange={() => updateFormData({ contactMethod: opt })}
                          className="sr-only form-radio-card"
                        />
                        <label
                          htmlFor={`pref-${opt}`}
                          className="block text-center border-2 border-brand-border py-4 px-1 text-xs md:text-sm font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                        >
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Best Time to Call</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Morning", "Afternoon", "Evening"].map((opt) => (
                      <div key={opt}>
                        <input
                          type="radio"
                          id={`time-${opt}`}
                          name="contactTime"
                          checked={formData.contactTime === opt}
                          onChange={() => updateFormData({ contactTime: opt })}
                          className="sr-only form-radio-card"
                        />
                        <label
                          htmlFor={`time-${opt}`}
                          className="block text-center border-2 border-brand-border py-4 px-1 text-xs md:text-sm font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                        >
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Honeypot field (hidden from users) */}
              <div className="hidden">
                <label htmlFor="website_url">Website URL</label>
                <input
                  type="text"
                  id="website_url"
                  value={formData.website_url}
                  onChange={(e) => updateFormData({ website_url: e.target.value })}
                />
              </div>

              {/* Consent Ticks */}
              <div className="pt-4 space-y-4 border-t border-brand-border/60">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="consentProcess"
                    checked={formData.consentProcess}
                    onChange={(e) => updateFormData({ consentProcess: e.target.checked })}
                    className="w-5 h-5 accent-brand-accent cursor-pointer mt-1"
                  />
                  <label htmlFor="consentProcess" className="text-xs md:text-sm text-brand-muted leading-relaxed cursor-pointer select-none">
                    <span className="font-bold text-brand-text">Data Processing:</span> I consent to Claim Source processing my information to match with legal partners. I agree to the privacy policy guidelines. *
                  </label>
                </div>
                {errors.consentProcess && <p className="text-red-600 text-xs font-semibold">{errors.consentProcess}</p>}

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="consentContact"
                    checked={formData.consentContact}
                    onChange={(e) => updateFormData({ consentContact: e.target.checked })}
                    className="w-5 h-5 accent-brand-accent cursor-pointer mt-1"
                  />
                  <label htmlFor="consentContact" className="text-xs md:text-sm text-brand-muted leading-relaxed cursor-pointer select-none">
                    <span className="font-bold text-brand-text">Contact Permission:</span> I consent to being contacted about my claim check by phone, SMS, or email by Claim Source and their legal partners. *
                  </label>
                </div>
                {errors.consentContact && <p className="text-red-600 text-xs font-semibold">{errors.consentContact}</p>}

                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="consentMarketing"
                    checked={formData.consentMarketing}
                    onChange={(e) => updateFormData({ consentMarketing: e.target.checked })}
                    className="w-5 h-5 accent-brand-accent cursor-pointer mt-1"
                  />
                  <label htmlFor="consentMarketing" className="text-xs md:text-sm text-brand-muted leading-relaxed cursor-pointer select-none">
                    <span className="font-bold text-brand-text">Marketing Option (Optional):</span> I would like to receive general UK legal newsletters or service updates from Claim Source.
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Navigation Controls */}
      <div className="flex justify-between items-center pt-8 border-t border-brand-border/60 mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted hover:text-brand-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-8 py-4 text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 rounded-sm shadow-md"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-10 py-5 text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-2 rounded-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
