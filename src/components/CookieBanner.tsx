"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("claim_source_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(consent);
        setPreferences(parsed);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = (updatedPrefs: typeof preferences) => {
    localStorage.setItem("claim_source_cookie_consent", JSON.stringify(updatedPrefs));
    setPreferences(updatedPrefs);
    setShowBanner(false);
    
    // Dispatch event so that analytics / tag managers can react to consent updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("claim_source_cookie_consent_update", { detail: updatedPrefs }));
    }
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const rejectOptional = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md bg-brand-bg border border-brand-border shadow-2xl p-6 z-50 transition-all duration-300"
      role="dialog"
      aria-label="Cookie consent banner"
    >
      {!showPreferences ? (
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-bold text-brand-text">Cookie Settings</h4>
          <p className="text-xs text-brand-muted leading-relaxed">
            We use cookies to enhance your experience, analyze site usage, and support our marketing attribution. You can choose to enable or disable optional cookies.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={acceptAll}
              className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg py-2.5 text-2xs uppercase tracking-widest font-semibold transition-colors duration-300 focus:outline-none"
            >
              Accept All
            </button>
            <button
              onClick={rejectOptional}
              className="flex-1 border border-brand-border hover:bg-brand-card text-brand-text py-2.5 text-2xs uppercase tracking-widest font-semibold transition-colors duration-300 focus:outline-none"
            >
              Reject Optional
            </button>
          </div>
          <button
            onClick={() => setShowPreferences(true)}
            className="block text-center w-full text-[10px] uppercase tracking-widest text-brand-accent underline focus:outline-none hover:text-brand-accent-hover"
          >
            Manage Preferences
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="font-serif text-lg font-bold text-brand-text">Cookie Preferences</h4>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-brand-border pb-2">
              <div>
                <span className="text-xs font-semibold text-brand-text block">Necessary Cookies</span>
                <span className="text-[10px] text-brand-muted">Required for essential site features.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="w-4 h-4 accent-brand-accent cursor-not-allowed"
              />
            </div>
            
            <div className="flex items-center justify-between border-b border-brand-border pb-2">
              <div>
                <span className="text-xs font-semibold text-brand-text block">Analytics Cookies</span>
                <span className="text-[10px] text-brand-muted">Helps us understand how visitors use our site.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 accent-brand-accent cursor-pointer"
              />
            </div>
            
            <div className="flex items-center justify-between border-b border-brand-border pb-2">
              <div>
                <span className="text-xs font-semibold text-brand-text block">Marketing Cookies</span>
                <span className="text-[10px] text-brand-muted">Used for attribution of leads.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-4 h-4 accent-brand-accent cursor-pointer"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={saveCustom}
              className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-brand-bg py-2.5 text-2xs uppercase tracking-widest font-semibold transition-colors duration-300 focus:outline-none"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setShowPreferences(false)}
              className="border border-brand-border hover:bg-brand-card text-brand-text px-4 py-2.5 text-2xs uppercase tracking-widest font-semibold transition-colors duration-300 focus:outline-none"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
