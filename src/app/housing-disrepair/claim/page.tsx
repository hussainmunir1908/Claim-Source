"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  // Step 1: Location & Rent Status
  nation: string;
  tenancyType: string;
  landlordType: string;
  
  // Step 2: Property details
  postcode: string;
  addressLine1: string;
  city: string;
  lengthOfTenancy: string;
  isCurrentTenant: string;
  bedrooms: string;

  // Step 3: Issues checkboxes
  issues: string[];

  // Step 4: Issue Details
  issueStart: string;
  issueSeverity: string;
  reportedToLandlord: string;

  // Step 5: Reporting Details (Conditional)
  dateFirstReported: string;
  reportingMethod: string;
  numberOfReports: string;
  repairAttempted: string;
  repairCompleted: string;
  issueReturned: string;

  // Step 6: Evidence & Impact
  evidenceAvailable: string[];
  healthImpact: string;
  householdVulnerable: string;
  propertyDamage: string;
  additionalExpenses: string;

  // Step 7: Legal History
  previousClaim: string;
  existingSolicitor: string;
  courtProceedings: string;
  settlementReceived: string;

  // Step 8: Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  contactTime: string;

  // Step 9: Consent
  consentProcess: boolean;
  consentContact: boolean;
  consentMarketing: boolean;

  // Honeypot (Anti-spam)
  website_url: string;
}

const initialFormState: FormData = {
  nation: "",
  tenancyType: "",
  landlordType: "",
  postcode: "",
  addressLine1: "",
  city: "",
  lengthOfTenancy: "",
  isCurrentTenant: "",
  bedrooms: "",
  issues: [],
  issueStart: "",
  issueSeverity: "",
  reportedToLandlord: "",
  dateFirstReported: "",
  reportingMethod: "",
  numberOfReports: "",
  repairAttempted: "",
  repairCompleted: "",
  issueReturned: "",
  evidenceAvailable: [],
  healthImpact: "",
  householdVulnerable: "",
  propertyDamage: "",
  additionalExpenses: "",
  previousClaim: "",
  existingSolicitor: "",
  courtProceedings: "",
  settlementReceived: "",
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

export default function HousingClaimPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refNumber, setRefNumber] = useState("");
  const [showTenancyWarning, setShowTenancyWarning] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);

  // Restore state from sessionStorage if present
  useEffect(() => {
    const saved = sessionStorage.getItem("claim_source_disrepair_form");
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
      const yOffset = -100; // Account for fixed header
      const element = formTopRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [step]);

  // Autosave form changes
  const updateFormData = (fields: Partial<FormData>) => {
    const updated = { ...formData, ...fields };
    setFormData(updated);
    sessionStorage.setItem("claim_source_disrepair_form", JSON.stringify(updated));
  };

  const handleCheckboxChange = (field: "issues" | "evidenceAvailable", value: string) => {
    const current = formData[field] as string[];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    
    updateFormData({ [field]: updated });
  };

  const isReported = formData.reportedToLandlord === "Yes";
  const totalSteps = 8; 

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nation) newErrors.nation = "Please select your location.";
      if (!formData.tenancyType) newErrors.tenancyType = "Please select your renting status.";
      if (formData.tenancyType === "Rented" && !formData.landlordType) {
        newErrors.landlordType = "Please select your landlord type.";
      }
    }

    if (step === 2) {
      if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required.";
      else if (!/^[A-Z]{1,2}[0-9R][0-9A-Z]?\s?[0-9][A-Z]{2}$/i.test(formData.postcode.trim())) {
        newErrors.postcode = "Please enter a valid UK postcode.";
      }
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required.";
      if (!formData.city.trim()) newErrors.city = "City is required.";
      if (!formData.lengthOfTenancy) newErrors.lengthOfTenancy = "Please select tenancy length.";
      if (!formData.isCurrentTenant) newErrors.isCurrentTenant = "Please select tenant status.";
    }

    if (step === 3) {
      if (formData.issues.length === 0) newErrors.issues = "Please select at least one issue.";
    }

    if (step === 4) {
      if (!formData.issueStart) newErrors.issueStart = "Please select when the issue started.";
      if (!formData.issueSeverity) newErrors.issueSeverity = "Please select severity level.";
      if (!formData.reportedToLandlord) newErrors.reportedToLandlord = "Please answer if this was reported.";
    }

    if (step === 5 && isReported) {
      if (!formData.dateFirstReported) newErrors.dateFirstReported = "Please select first reported timing.";
      if (!formData.reportingMethod) newErrors.reportingMethod = "Please select reporting method.";
      if (!formData.numberOfReports) newErrors.numberOfReports = "Please select report count.";
      if (!formData.repairAttempted) newErrors.repairAttempted = "Please select repair status.";
    }

    if (step === 6) {
      if (!formData.healthImpact) newErrors.healthImpact = "Please answer health impact question.";
      if (!formData.householdVulnerable) newErrors.householdVulnerable = "Please answer vulnerable members question.";
      if (!formData.propertyDamage) newErrors.propertyDamage = "Please answer property damage question.";
    }

    if (step === 7) {
      if (!formData.previousClaim) newErrors.previousClaim = "Please answer previous claim question.";
      if (!formData.existingSolicitor) newErrors.existingSolicitor = "Please answer active representation question.";
    }

    if (step === 8) {
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

    if (step === 1 && formData.tenancyType !== "Rented" && !showTenancyWarning) {
      setShowTenancyWarning(true);
      return;
    }

    setShowTenancyWarning(false);

    if (step === 4 && !isReported) {
      setStep(6);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step === 6 && !isReported) {
      setStep(4);
    } else {
      setStep(step - 1);
    }
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
      campaign: "Housing Disrepair",
      timestamp: new Date().toISOString(),
      leadId: "HD-" + Math.floor(100000 + Math.random() * 900000),
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
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setRefNumber(payload.leadId);
      setSubmitted(true);
      sessionStorage.removeItem("claim_source_disrepair_form");
    } catch (err) {
      setRefNumber(payload.leadId);
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

  const progressPercent = Math.min(100, Math.round(((step - 1) / (totalSteps - 1)) * 100));

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-10 min-h-[75vh] flex flex-col justify-center items-center bg-brand-bg">
        <div className="inline-flex p-5 bg-brand-accent-light rounded-full text-brand-accent mb-2">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text">
          Enquiry Received
        </h1>
        <div className="bg-brand-card p-8 border border-brand-border rounded-sm w-full space-y-4 shadow-sm">
          <p className="text-xs md:text-sm text-brand-muted uppercase tracking-[0.2em] font-semibold">
            Reference Number
          </p>
          <p className="font-serif text-3xl md:text-4xl font-bold text-brand-accent tracking-wider">
            {refNumber}
          </p>
        </div>
        <div className="space-y-6 max-w-lg text-left text-sm md:text-base text-brand-muted leading-relaxed">
          <h4 className="font-bold text-brand-text text-center uppercase tracking-widest text-xs mb-4">
            What happens next?
          </h4>
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
            <p>An expert assessor will call or email you for a free, confidential consultation.</p>
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
          <span>Housing Disrepair Assessment</span>
          <span>Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full h-[3px] bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Warning Alert if Tenancy Warning Triggered */}
      {showTenancyWarning && (
        <div className="bg-amber-50 border border-amber-200 p-6 mb-8 text-amber-900 rounded-sm flex gap-4 items-start animate-[fadeIn_0.5s_ease-out]">
          <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-amber-700" />
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider">Property Eligibility Notice</h4>
            <p className="text-sm leading-relaxed">
              Housing disrepair claims are legally designated for renters (local councils, housing associations, and private tenants). If you own the property outright or have a mortgage, landlord dispute systems typically do not apply.
            </p>
            <button
              onClick={() => {
                setShowTenancyWarning(false);
                setStep(step + 1);
              }}
              className="bg-amber-950 text-white px-6 py-2.5 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-amber-900 transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      )}

      {/* Form Content Steps with dynamic key to trigger smooth entry animations */}
      <div key={step} className="flex-grow flex flex-col justify-center py-6 animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        {step === 1 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Where do you rent, and what is your tenancy status?
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
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Tenancy Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "I rent my property", value: "Rented" },
                    { label: "I own the property (Outright / Mortgaged)", value: "Owned" },
                  ].map((opt) => (
                    <div key={opt.value}>
                      <input
                        type="radio"
                        id={`tenancy-${opt.value}`}
                        name="tenancyType"
                        checked={formData.tenancyType === opt.value}
                        onChange={() => {
                          updateFormData({
                            tenancyType: opt.value,
                            landlordType: opt.value === "Owned" ? "None" : "",
                          });
                        }}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`tenancy-${opt.value}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.tenancyType && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.tenancyType}</p>}
              </div>

              {formData.tenancyType === "Rented" && (
                <div className="animate-[fadeIn_0.4s_ease-out]">
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Who is your landlord?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Council / Local Authority", value: "Council" },
                      { label: "Housing Association", value: "Housing Association" },
                      { label: "Private Landlord", value: "Private Landlord" },
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
              )}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Tenancy Length</label>
                  <select
                    value={formData.lengthOfTenancy}
                    onChange={(e) => updateFormData({ lengthOfTenancy: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Under 1 Year">Under 1 Year</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                  {errors.lengthOfTenancy && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.lengthOfTenancy}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Current Tenant?</label>
                  <select
                    value={formData.isCurrentTenant}
                    onChange={(e) => updateFormData({ isCurrentTenant: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, I currently live there</option>
                    <option value="No">No, I am a former tenant</option>
                  </select>
                  {errors.isCurrentTenant && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.isCurrentTenant}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Number of Bedrooms</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => updateFormData({ bedrooms: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Bedrooms</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Select all disrepair issues affecting the property.
            </h2>
            <p className="text-sm md:text-base text-brand-muted">Choose all relevant defects that remain unresolved.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Damp", "Mould", "Condensation", "Water leaks", "Roof leaks", 
                "Plumbing", "Heating", "Hot water", "Windows", "Doors", 
                "Electrical", "Structural defects", "Ceiling damage", "Wall damage", 
                "Flooring", "Pest issues", "Ventilation", "Drainage", "Other"
              ].map((issue) => {
                const isSelected = formData.issues.includes(issue);
                return (
                  <div key={issue}>
                    <button
                      type="button"
                      onClick={() => handleCheckboxChange("issues", issue)}
                      className={`w-full text-left border-2 py-4 px-4 text-sm md:text-base font-bold transition-all rounded-sm flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? "bg-brand-accent-light border-brand-accent text-brand-accent" 
                          : "bg-brand-card border-brand-border text-brand-text hover:border-brand-accent/50"
                      }`}
                    >
                      <span>{issue}</span>
                      {isSelected && <span className="text-xs font-black">✓</span>}
                    </button>
                  </div>
                );
              })}
            </div>
            {errors.issues && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.issues}</p>}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Issue History & Reporting
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">When did this issue start?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Under 3 months", "3-6 months", "6-12 months", "1+ years"].map((time) => (
                    <div key={time}>
                      <input
                        type="radio"
                        id={`start-${time}`}
                        name="issueStart"
                        checked={formData.issueStart === time}
                        onChange={() => updateFormData({ issueStart: time })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`start-${time}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.issueStart && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.issueStart}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Severity Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Low", "Medium", "High"].map((sev) => (
                    <div key={sev}>
                      <input
                        type="radio"
                        id={`sev-${sev}`}
                        name="issueSeverity"
                        checked={formData.issueSeverity === sev}
                        onChange={() => updateFormData({ issueSeverity: sev })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`sev-${sev}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {sev}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.issueSeverity && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.issueSeverity}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Have you reported this to the landlord?</label>
                <div className="grid grid-cols-2 gap-4">
                  {["Yes", "No"].map((rep) => (
                    <div key={rep}>
                      <input
                        type="radio"
                        id={`rep-${rep}`}
                        name="reportedToLandlord"
                        checked={formData.reportedToLandlord === rep}
                        onChange={() => updateFormData({ reportedToLandlord: rep })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`rep-${rep}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {rep === "Yes" ? "Yes, I reported it" : "No, I have not reported it"}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.reportedToLandlord && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.reportedToLandlord}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 5 && isReported && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Landlord Notification Records
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">First Reported</label>
                  <select
                    value={formData.dateFirstReported}
                    onChange={(e) => updateFormData({ dateFirstReported: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Over 3 months ago">Over 3 months ago</option>
                    <option value="1-3 months ago">1-3 months ago</option>
                    <option value="Under 1 month ago">Under 1 month ago</option>
                  </select>
                  {errors.dateFirstReported && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.dateFirstReported}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">How reported?</label>
                  <select
                    value={formData.reportingMethod}
                    onChange={(e) => updateFormData({ reportingMethod: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Email / Text / Writing">Email / Text / Writing</option>
                    <option value="Phone call">Phone call</option>
                    <option value="Online Portal">Online Portal</option>
                    <option value="In Person">In Person</option>
                  </select>
                  {errors.reportingMethod && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.reportingMethod}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">How many times?</label>
                  <select
                    value={formData.numberOfReports}
                    onChange={(e) => updateFormData({ numberOfReports: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="1 time">1 time</option>
                    <option value="2-5 times">2-5 times</option>
                    <option value="5+ times">5+ times</option>
                  </select>
                  {errors.numberOfReports && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.numberOfReports}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Repair Attempted?</label>
                  <select
                    value={formData.repairAttempted}
                    onChange={(e) => updateFormData({ repairAttempted: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.repairAttempted && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.repairAttempted}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Repair Completed?</label>
                  <select
                    value={formData.repairCompleted}
                    onChange={(e) => updateFormData({ repairCompleted: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Did issue return?</label>
                  <select
                    value={formData.issueReturned}
                    onChange={(e) => updateFormData({ issueReturned: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Evidence & Impact details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Do you have evidence available?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Photos", value: "Photos" },
                    { label: "Videos", value: "Videos" },
                    { label: "Emails/Letters", value: "Letters" },
                    { label: "Ref Numbers", value: "RefNumbers" },
                  ].map((opt) => {
                    const isSelected = formData.evidenceAvailable.includes(opt.value);
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleCheckboxChange("evidenceAvailable", opt.value)}
                        className={`py-5 px-3 text-center text-sm md:text-base font-bold border-2 rounded-sm cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-brand-accent-light border-brand-accent text-brand-accent" 
                            : "bg-brand-card border-brand-border text-brand-text hover:border-brand-accent/50"
                        }`}
                      >
                        {opt.label} {isSelected && "✓"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Affected health?</label>
                  <select
                    value={formData.healthImpact}
                    onChange={(e) => updateFormData({ healthImpact: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, caused health issues</option>
                    <option value="No">No</option>
                  </select>
                  {errors.healthImpact && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.healthImpact}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Vulnerable in home?</label>
                  <select
                    value={formData.householdVulnerable}
                    onChange={(e) => updateFormData({ householdVulnerable: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes (Children / Elderly / Sick)</option>
                    <option value="No">No</option>
                  </select>
                  {errors.householdVulnerable && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.householdVulnerable}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Damaged belongings?</label>
                  <select
                    value={formData.propertyDamage}
                    onChange={(e) => updateFormData({ propertyDamage: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.propertyDamage && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.propertyDamage}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Legal History & Representation
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Previous disrepair claim?</label>
                  <select
                    value={formData.previousClaim}
                    onChange={(e) => updateFormData({ previousClaim: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, previously claimed</option>
                    <option value="No">No</option>
                  </select>
                  {errors.previousClaim && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.previousClaim}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Active Solicitor currently?</label>
                  <select
                    value={formData.existingSolicitor}
                    onChange={(e) => updateFormData({ existingSolicitor: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, another firm represents me</option>
                    <option value="No">No, I do not have a solicitor</option>
                  </select>
                  {errors.existingSolicitor && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.existingSolicitor}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-8 animate-fade">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Review & Contact details
            </h2>
            
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_url"
                value={formData.website_url}
                onChange={(e) => updateFormData({ website_url: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

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
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-3.5 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
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
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-3.5 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
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
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-3.5 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Mobile Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-3.5 text-sm md:text-base focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                    placeholder="e.g. 07123456789"
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              {/* Consent Toggles */}
              <div className="space-y-5 pt-6 border-t border-brand-border">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="consentProcess"
                    checked={formData.consentProcess}
                    onChange={(e) => updateFormData({ consentProcess: e.target.checked })}
                    className="w-5 h-5 accent-brand-accent cursor-pointer mt-1"
                  />
                  <label htmlFor="consentProcess" className="text-xs md:text-sm text-brand-muted leading-relaxed cursor-pointer select-none">
                    <span className="font-bold text-brand-text">Data Processing:</span> I consent to Claim Source assessing my information for suitability. I agree to the privacy policy guidelines. *
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
                    <span className="font-bold text-brand-text">Contact Permission:</span> I consent to being contacted about this assessment by phone, SMS, or email by Claim Source and their legal assessment partners. *
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

      {/* Navigation Buttons footer */}
      <div className="flex justify-between items-center pt-8 border-t border-brand-border mt-8">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 border-2 border-brand-border px-6 py-4 hover:bg-brand-card text-brand-text text-xs uppercase tracking-widest font-bold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            onClick={handleNext}
            className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-8 py-4.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none flex items-center gap-2 cursor-pointer shadow-sm"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg px-10 py-4.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        )}
      </div>
    </div>
  );
}
