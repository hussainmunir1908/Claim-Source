"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error ?? "Invalid password. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a100d] flex items-center justify-center px-4">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#3A4F41]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#3A4F41]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-[#111a14] border border-white/8 rounded-xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
          {/* Header strip */}
          <div className="bg-gradient-to-r from-[#3A4F41] to-[#2a3d30] px-8 py-6 flex items-center gap-4">
            <div className="relative w-10 h-10 bg-white/90 rounded-lg p-1 flex-shrink-0 shadow">
              <Image src="/logo.png" alt="Claim Source" fill className="object-contain" />
            </div>
            <div>
              <div className="text-white font-serif text-lg font-bold">Claim Source</div>
              <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Admin Panel</div>
            </div>
          </div>

          <div className="px-8 py-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#3A4F41]/30 border border-white/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#8AAF93]" />
              </div>
              <div>
                <h1 className="text-white font-serif text-xl font-bold">Admin Sign In</h1>
                <p className="text-white/40 text-xs mt-0.5">Enter your password to continue</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Password field */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-white/50 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoComplete="current-password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#3A4F41] focus:bg-white/8 transition-all duration-300 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg px-4 py-3 text-red-300 text-xs">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full flex items-center justify-center gap-2 bg-[#3A4F41] hover:bg-[#4a6152] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs uppercase tracking-widest font-bold py-4 rounded-lg transition-colors duration-300 focus:outline-none"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                {loading ? "Signing In…" : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Claim Source Admin Panel
        </p>
      </div>
    </div>
  );
}
