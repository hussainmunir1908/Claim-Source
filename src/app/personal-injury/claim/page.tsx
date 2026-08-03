"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  // Step 1: Basic Accident details
  nation: string;
  accidentDate: string;
  accidentType: string;

  // Step 2: Workplace Details (Conditional)
  employmentStatus: string;
  missedWork: string;
  daysMissed: string;
  lossOfEarnings: string;

  // Step 3: Road Traffic Details (Conditional)
  roadRole: string;
  otherVehicleInvolved: string;
  policeInvolved: string;

  // Step 4: Incident details
  accidentDescription: string;
  responsibleParty: string;
  accidentReported: string;
  reportedTo: string;

  // Step 5: Injury details
  injuredBodyPart: string;
  injurySeverity: string;
  medicalAttention: string;
  treatmentProvider: string;

  // Step 6: Evidence & Legal
  evidenceAvailable: string[];
  spokenToSolicitor: string;
  activeClaim: string;

  // Step 7: Personal
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  contactTime: string;

  // Step 8: Consent
  consentProcess: boolean;
  consentContact: boolean;
  consentMarketing: boolean;

  // Honeypot
  website_url: string;
}

const initialFormState: FormData = {
  nation: "",
  accidentDate: "",
  accidentType: "",
  employmentStatus: "",
  missedWork: "",
  daysMissed: "",
  lossOfEarnings: "",
  roadRole: "",
  otherVehicleInvolved: "",
  policeInvolved: "",
  accidentDescription: "",
  responsibleParty: "",
  accidentReported: "",
  reportedTo: "",
  injuredBodyPart: "",
  injurySeverity: "",
  medicalAttention: "",
  treatmentProvider: "",
  evidenceAvailable: [],
  spokenToSolicitor: "",
  activeClaim: "",
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

export default function InjuryClaimPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [refNumber, setRefNumber] = useState("");
  const [showLimitationWarning, setShowLimitationWarning] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);

  // Restore state from sessionStorage if present
  useEffect(() => {
    const saved = sessionStorage.getItem("claim_source_injury_form");
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

  const updateFormData = (fields: Partial<FormData>) => {
    const updated = { ...formData, ...fields };
    setFormData(updated);
    sessionStorage.setItem("claim_source_injury_form", JSON.stringify(updated));
  };

  const handleCheckboxChange = (value: string) => {
    const current = formData.evidenceAvailable;
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    
    updateFormData({ evidenceAvailable: updated });
  };

  const isWorkplace = formData.accidentType === "Workplace accident" || formData.accidentType === "Construction accident";
  const isRoad = formData.accidentType === "Road traffic accident" || formData.accidentType === "Cycling/pedestrian accident";

  const totalSteps = 7;

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nation) newErrors.nation = "Please select your location.";
      if (!formData.accidentDate) newErrors.accidentDate = "Please select the date range of the accident.";
      if (!formData.accidentType) newErrors.accidentType = "Please select the type of accident.";
    }

    if (step === 2 && isWorkplace) {
      if (!formData.employmentStatus) newErrors.employmentStatus = "Please select employment status.";
      if (!formData.missedWork) newErrors.missedWork = "Please select if you missed work.";
      if (!formData.lossOfEarnings) newErrors.lossOfEarnings = "Please select if you experienced earnings loss.";
    }

    if (step === 3 && isRoad) {
      if (!formData.roadRole) newErrors.roadRole = "Please select your role in the accident.";
      if (!formData.otherVehicleInvolved) newErrors.otherVehicleInvolved = "Please answer if another vehicle was involved.";
      if (!formData.policeInvolved) newErrors.policeInvolved = "Please answer if police were informed.";
    }

    if (step === 4) {
      if (!formData.accidentDescription.trim()) newErrors.accidentDescription = "Please describe the incident.";
      if (!formData.responsibleParty) newErrors.responsibleParty = "Please select who was responsible.";
      if (!formData.accidentReported) newErrors.accidentReported = "Please answer if the incident was reported.";
    }

    if (step === 5) {
      if (!formData.injuredBodyPart) newErrors.injuredBodyPart = "Please select the body part affected.";
      if (!formData.injurySeverity) newErrors.injurySeverity = "Please select severity level.";
      if (!formData.medicalAttention) newErrors.medicalAttention = "Please select if medical attention was received.";
    }

    if (step === 6) {
      if (!formData.spokenToSolicitor) newErrors.spokenToSolicitor = "Please answer if you have spoken to a solicitor.";
      if (!formData.activeClaim) newErrors.activeClaim = "Please answer if you have an active claim.";
    }

    if (step === 7) {
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

    if (step === 1 && formData.accidentDate === "Over 3 years ago" && !showLimitationWarning) {
      setShowLimitationWarning(true);
      return;
    }

    setShowLimitationWarning(false);

    if (step === 1) {
      if (isWorkplace) setStep(2);
      else if (isRoad) setStep(3);
      else setStep(4);
    } else if (step === 2 || step === 3) {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step === 4) {
      if (isWorkplace) setStep(2);
      else if (isRoad) setStep(3);
      else setStep(1);
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
      campaign: "Personal Injury",
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
        setRefNumber("PI-" + Math.floor(1000 + Math.random() * 9000)); // Fallback
      }
      
      setSubmitted(true);
      sessionStorage.removeItem("claim_source_injury_form");
    } catch (err) {
      setRefNumber("PI-" + Math.floor(1000 + Math.random() * 9000)); // Fallback
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
          <span>Personal Injury Claim Check</span>
          <span>Step {step} of {totalSteps}</span>
        </div>
        <div className="w-full h-[3px] bg-brand-border rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Warning Alert if Limitation Period Exceeded */}
      {showLimitationWarning && (
        <div className="bg-amber-50 border border-amber-200 p-6 mb-8 text-amber-900 rounded-sm flex gap-4 items-start animate-[fadeIn_0.5s_ease-out]">
          <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5 text-amber-700" />
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider">Limitation Period Notice</h4>
            <p className="text-sm leading-relaxed">
              In the UK, personal injury claims typically carry a strict 3-year limitation period from the date of the accident. Claims originating outside this period are usually time-barred. You can still submit details if minor exceptions apply.
            </p>
            <button
              onClick={() => {
                setShowLimitationWarning(false);
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
              Where and when did the accident occur, and what is its type?
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
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {n}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.nation && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.nation}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Date of Accident</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Within the last 12 months", value: "Within 1 year" },
                    { label: "Between 1 and 3 years ago", value: "1-3 years ago" },
                    { label: "Over 3 years ago (Limitation applies)", value: "Over 3 years ago" },
                  ].map((opt) => (
                    <div key={opt.value}>
                      <input
                        type="radio"
                        id={`date-${opt.value}`}
                        name="accidentDate"
                        checked={formData.accidentDate === opt.value}
                        onChange={() => updateFormData({ accidentDate: opt.value })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`date-${opt.value}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.accidentDate && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.accidentDate}</p>}
              </div>

              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Accident Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Road traffic accident", "Workplace accident", "Slip/trip/fall", 
                    "Public place accident", "Construction accident", "Cycling/pedestrian accident", "Other"
                  ].map((t) => (
                    <div key={t}>
                      <input
                        type="radio"
                        id={`type-${t}`}
                        name="accidentType"
                        checked={formData.accidentType === t}
                        onChange={() => updateFormData({ accidentType: t })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`type-${t}`}
                        className="block text-center border-2 border-brand-border py-5 px-2 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {t}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.accidentType && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.accidentType}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && isWorkplace && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Workplace Incident details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Your Employment Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Employed", "Self-employed", "Contractor", "Other"].map((status) => (
                    <div key={status}>
                      <input
                        type="radio"
                        id={`status-${status}`}
                        name="employmentStatus"
                        checked={formData.employmentStatus === status}
                        onChange={() => updateFormData({ employmentStatus: status })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`status-${status}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.employmentStatus && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.employmentStatus}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Did you miss work?</label>
                  <select
                    value={formData.missedWork}
                    onChange={(e) => updateFormData({ missedWork: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, missed work</option>
                    <option value="No">No, I did not miss work</option>
                  </select>
                  {errors.missedWork && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.missedWork}</p>}
                </div>

                <div>
                  <label htmlFor="daysMissed" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Duration Missed</label>
                  <input
                    type="text"
                    id="daysMissed"
                    placeholder="e.g. 5 days, 3 weeks"
                    value={formData.daysMissed}
                    onChange={(e) => updateFormData({ daysMissed: e.target.value })}
                    disabled={formData.missedWork !== "Yes"}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Loss of earnings?</label>
                  <select
                    value={formData.lossOfEarnings}
                    onChange={(e) => updateFormData({ lossOfEarnings: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, lost wages</option>
                    <option value="No">No</option>
                  </select>
                  {errors.lossOfEarnings && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.lossOfEarnings}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && isRoad && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Road Collision details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Your Role</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {["Driver", "Passenger", "Pedestrian", "Cyclist", "Motorcyclist"].map((role) => (
                    <div key={role}>
                      <input
                        type="radio"
                        id={`role-${role}`}
                        name="roadRole"
                        checked={formData.roadRole === role}
                        onChange={() => updateFormData({ roadRole: role })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`role-${role}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.roadRole && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.roadRole}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Other vehicle involved?</label>
                  <select
                    value={formData.otherVehicleInvolved}
                    onChange={(e) => updateFormData({ otherVehicleInvolved: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.otherVehicleInvolved && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.otherVehicleInvolved}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Police involved?</label>
                  <select
                    value={formData.policeInvolved}
                    onChange={(e) => updateFormData({ policeInvolved: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, reported to police</option>
                    <option value="No">No</option>
                  </select>
                  {errors.policeInvolved && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.policeInvolved}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Accident Description & Responsibility
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="accidentDescription" className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">What happened? (Accident Description)</label>
                <textarea
                  id="accidentDescription"
                  rows={5}
                  required
                  value={formData.accidentDescription}
                  onChange={(e) => updateFormData({ accidentDescription: e.target.value })}
                  placeholder="Describe the incident, how the injury occurred, and who else was present."
                  className="w-full bg-brand-card border-2 border-brand-border px-5 py-4 text-sm md:text-base tracking-wide focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 rounded-sm text-brand-text"
                />
                {errors.accidentDescription && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.accidentDescription}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Who was responsible?</label>
                  <select
                    value={formData.responsibleParty}
                    onChange={(e) => updateFormData({ responsibleParty: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Another Road User">Another Road User</option>
                    <option value="My Employer">My Employer / Company</option>
                    <option value="Council / Public Body">Council / Local Authority</option>
                    <option value="Business / Landlord">Business / Private Landlord</option>
                    <option value="Other">Other party</option>
                    <option value="Unsure">I am unsure</option>
                  </select>
                  {errors.responsibleParty && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.responsibleParty}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Was it reported?</label>
                  <select
                    value={formData.accidentReported}
                    onChange={(e) => updateFormData({ accidentReported: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, reported immediately</option>
                    <option value="No">No</option>
                  </select>
                  {errors.accidentReported && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.accidentReported}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Injury & Medical details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Body Part Injured</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["Head / Face", "Neck / Back", "Arm / Hand", "Leg / Foot", "Psychological", "Multiple"].map((part) => (
                    <div key={part}>
                      <input
                        type="radio"
                        id={`part-${part}`}
                        name="injuredBodyPart"
                        checked={formData.injuredBodyPart === part}
                        onChange={() => updateFormData({ injuredBodyPart: part })}
                        className="sr-only form-radio-card"
                      />
                      <label
                        htmlFor={`part-${part}`}
                        className="block text-center border-2 border-brand-border py-5 px-3 text-sm md:text-base font-bold hover:border-brand-accent transition-all cursor-pointer bg-brand-card rounded-sm"
                      >
                        {part}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.injuredBodyPart && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.injuredBodyPart}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Severity Level</label>
                  <select
                    value={formData.injurySeverity}
                    onChange={(e) => updateFormData({ injurySeverity: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Minor">Minor (Healed / healing)</option>
                    <option value="Moderate">Moderate (Ongoing / recovering)</option>
                    <option value="Severe">Severe (Hospitalisation / long term)</option>
                  </select>
                  {errors.injurySeverity && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.injurySeverity}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Medical Attention Received?</label>
                  <select
                    value={formData.medicalAttention}
                    onChange={(e) => updateFormData({ medicalAttention: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, immediately</option>
                    <option value="Later">Yes, after a few days</option>
                    <option value="No">No medical check received</option>
                  </select>
                  {errors.medicalAttention && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.medicalAttention}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Treatment Provider</label>
                  <select
                    value={formData.treatmentProvider}
                    onChange={(e) => updateFormData({ treatmentProvider: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="NHS A&E / Hospital">NHS A&E / Hospital</option>
                    <option value="GP Surgery">GP Surgery</option>
                    <option value="Walk-in Clinic">Walk-in Clinic</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-text leading-tight">
              Evidence & Previous Claims
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Do you have evidence available?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Photos of Scene", value: "Photos" },
                    { label: "CCTV / Dashcam", value: "CCTV" },
                    { label: "Witness Names", value: "Witnesses" },
                    { label: "Police Report", value: "PoliceReport" },
                  ].map((opt) => {
                    const isSelected = formData.evidenceAvailable.includes(opt.value);
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleCheckboxChange(opt.value)}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Have you spoken to a solicitor?</label>
                  <select
                    value={formData.spokenToSolicitor}
                    onChange={(e) => updateFormData({ spokenToSolicitor: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, previously spoken</option>
                    <option value="No">No</option>
                  </select>
                  {errors.spokenToSolicitor && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.spokenToSolicitor}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm uppercase tracking-widest font-bold text-brand-muted mb-3">Do you have an active claim elsewhere?</label>
                  <select
                    value={formData.activeClaim}
                    onChange={(e) => updateFormData({ activeClaim: e.target.value })}
                    className="w-full bg-brand-card border-2 border-brand-border px-4 py-4 text-sm focus:outline-none focus:border-brand-accent rounded-sm text-brand-text"
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes, another solicitor represents me</option>
                    <option value="No">No</option>
                  </select>
                  {errors.activeClaim && <p className="text-red-600 text-xs mt-2 font-semibold">{errors.activeClaim}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
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

              {/* Consents */}
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
