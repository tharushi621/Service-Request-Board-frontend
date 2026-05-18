"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SplashPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [view, setView] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = view === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        view === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Something went wrong"); return; }
      login(data.token, data.user);
      router.push("/");
    } catch {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body { height: 100%; }

        .sp {
          font-family: 'Inter', sans-serif;
          height: 100vh;
          display: grid;
          grid-template-columns: 480px 1fr;
          background: #060d1f;
          overflow: hidden;
          position: relative;
        }

        /* ── BACKGROUND GLOWS ── */
        .sp::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 65%);
          top: -200px; left: -150px;
          pointer-events: none; z-index: 0;
        }
        .sp::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%);
          bottom: -150px; left: 100px;
          pointer-events: none; z-index: 0;
        }

        /* ════════════════════════════
           LEFT PANEL
        ════════════════════════════ */
        .sp-left {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100vh;
          padding: 2.75rem 3rem;
          overflow-y: auto;
        }

        /* ── BRAND ── */
        .sp-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 3.5rem;
          flex-shrink: 0;
        }
        .sp-brand-icon {
          width: 42px; height: 42px;
          background: linear-gradient(140deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(37,99,235,0.45);
          flex-shrink: 0;
        }
        .sp-brand-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .sp-brand-accent { color: #60a5fa; }

        /* ── HOME VIEW ── */
        .sp-home {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          animation: fadeUp 0.5s ease both;
        }

        .sp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,99,235,0.12);
          border: 1px solid rgba(59,130,246,0.28);
          color: #93c5fd;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 2rem;
          width: fit-content;
        }
        .sp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
          animation: blink 2.2s ease-in-out infinite;
        }

        .sp-h1 {
          font-size: 3rem;
          font-weight: 900;
          color: #f1f5f9;
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin-bottom: 1.25rem;
        }
        .sp-h1-grad {
          display: block;
          background: linear-gradient(95deg, #60a5fa 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sp-desc {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.75;
          margin-bottom: 2.5rem;
          max-width: 360px;
        }

        .sp-ctas {
          display: flex;
          gap: 12px;
          margin-bottom: 3.25rem;
        }

        .sp-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          padding: 13px 26px;
          border-radius: 10px; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(37,99,235,0.42);
          transition: all 0.2s;
          letter-spacing: -0.01em;
        }
        .sp-btn-primary:hover {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          box-shadow: 0 6px 28px rgba(37,99,235,0.58);
          transform: translateY(-2px);
        }

        .sp-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.05);
          color: #cbd5e1;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          padding: 13px 24px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.2s;
        }
        .sp-btn-ghost:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        .sp-stats {
          display: flex;
          gap: 0;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .sp-stat {
          flex: 1;
          padding-right: 1.5rem;
          margin-right: 1.5rem;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .sp-stat:last-child { border-right: none; padding-right: 0; margin-right: 0; }
        .sp-stat-num {
          font-size: 1.55rem; font-weight: 800;
          color: #f1f5f9; letter-spacing: -0.04em;
          line-height: 1; margin-bottom: 4px;
        }
        .sp-stat-label { font-size: 0.7rem; color: #475569; font-weight: 500; }

        /* ── AUTH VIEW ── */
        .sp-auth {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          animation: fadeUp 0.35s ease both;
        }

        .sp-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem; color: #475569; font-weight: 500;
          padding: 0; margin-bottom: 2.25rem;
          transition: color 0.15s;
        }
        .sp-back:hover { color: #94a3b8; }

        .sp-auth-title {
          font-size: 1.9rem; font-weight: 800;
          color: #f1f5f9; letter-spacing: -0.035em;
          margin-bottom: 6px; line-height: 1.1;
        }
        .sp-auth-sub {
          font-size: 0.875rem; color: #64748b;
          margin-bottom: 2rem; line-height: 1.6;
        }

        .sp-tabs {
          display: flex; gap: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 4px;
          margin-bottom: 1.75rem; width: fit-content;
        }
        .sp-tab {
          padding: 8px 22px;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          border: none; background: transparent;
          color: #475569; border-radius: 7px;
          cursor: pointer; transition: all 0.15s;
          letter-spacing: -0.01em;
        }
        .sp-tab.on {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
          box-shadow: 0 2px 10px rgba(37,99,235,0.45);
        }

        .sp-fields { display: flex; flex-direction: column; gap: 14px; }
        .sp-field { display: flex; flex-direction: column; gap: 6px; }
        .sp-label { font-size: 0.75rem; font-weight: 600; color: #64748b; letter-spacing: 0.03em; text-transform: uppercase; }

        .sp-input {
          width: 100%; padding: 11px 14px;
          font-size: 0.875rem; font-family: 'Inter', sans-serif;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 9px; color: #f1f5f9;
          outline: none; transition: all 0.15s;
        }
        .sp-input::placeholder { color: #1e293b; }
        .sp-input:focus {
          border-color: #3b82f6;
          background: rgba(59,130,246,0.07);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.14);
        }

        .sp-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5; font-size: 0.8rem; font-weight: 500;
          border-radius: 8px; padding: 10px 13px; margin-top: 8px;
        }

        .sp-submit {
          width: 100%; padding: 12px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          border: none; border-radius: 9px; cursor: pointer;
          transition: all 0.15s; margin-top: 14px;
          box-shadow: 0 4px 16px rgba(37,99,235,0.38);
          letter-spacing: -0.01em;
        }
        .sp-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          box-shadow: 0 6px 22px rgba(37,99,235,0.52);
        }
        .sp-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .sp-switch {
          text-align: center; margin-top: 1.25rem;
          font-size: 0.81rem; color: #334155;
        }
        .sp-switch button {
          background: none; border: none; cursor: pointer;
          color: #60a5fa; font-weight: 600;
          font-family: 'Inter', sans-serif; font-size: 0.81rem;
          padding: 0; margin-left: 5px;
          transition: color 0.15s;
        }
        .sp-switch button:hover { color: #93c5fd; }

        /* ════════════════════════════
           RIGHT PANEL
        ════════════════════════════ */
        .sp-right {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        /* Image sits edge-to-edge in the right panel */
        .sp-hero-img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: brightness(0.75) saturate(0.85);
        }

        /* Multi-directional overlays to blend image into dark theme */
        .sp-overlay-left {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #060d1f 0%, rgba(6,13,31,0.55) 28%, transparent 55%);
          z-index: 2;
        }
        .sp-overlay-top {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(6,13,31,0.5) 0%, transparent 35%);
          z-index: 2;
        }
        .sp-overlay-bottom {
          position: absolute; inset: 0;
          background: linear-gradient(0deg, rgba(6,13,31,0.75) 0%, transparent 45%);
          z-index: 2;
        }
        .sp-overlay-right {
          position: absolute; inset: 0;
          background: linear-gradient(270deg, rgba(6,13,31,0.4) 0%, transparent 30%);
          z-index: 2;
        }

        /* Floating card */
        .sp-card {
          position: absolute;
          bottom: 2.5rem; right: 2.5rem;
          z-index: 4;
          background: rgba(8,18,42,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 16px;
          padding: 1.1rem 1.4rem;
          display: flex; align-items: center; gap: 14px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.03);
          min-width: 260px;
        }
        .sp-card-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          background: rgba(37,99,235,0.18);
          border: 1px solid rgba(59,130,246,0.28);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .sp-card-label {
          font-size: 0.8rem; font-weight: 600; color: #e2e8f0; margin-bottom: 2px;
        }
        .sp-card-sub { font-size: 0.69rem; color: #475569; }
        .sp-card-num {
          margin-left: auto;
          font-size: 1.6rem; font-weight: 800;
          color: #60a5fa; letter-spacing: -0.04em;
        }

        /* Top-right platform tag */
        .sp-tag {
          position: absolute;
          top: 2rem; right: 2rem;
          z-index: 4;
          background: rgba(8,18,42,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 8px;
          padding: 5px 13px;
          font-size: 0.68rem; font-weight: 700;
          color: #60a5fa; letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .sp { grid-template-columns: 1fr; height: auto; min-height: 100vh; }
          .sp-left { height: auto; padding: 2rem 1.75rem; }
          .sp-right { height: 280px; }
          .sp-card { display: none; }
          .sp-h1 { font-size: 2.4rem; }
          .sp-stats { gap: 0; }
        }
        @media (max-width: 480px) {
          .sp-left { padding: 1.75rem 1.25rem; }
          .sp-ctas { flex-direction: column; }
          .sp-btn-primary, .sp-btn-ghost { justify-content: center; }
        }
      `}</style>

      <div className="sp">

        {/* ══ LEFT ══ */}
        <div className="sp-left">

          {/* Brand — always visible */}
          <div className="sp-brand">
            <div className="sp-brand-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 11a8 8 0 0116 0" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
                <path d="M6.5 15.5a4.5 4.5 0 019 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="11" cy="7.5" r="2.2" fill="white"/>
              </svg>
            </div>
            <span className="sp-brand-name">
              FixIt<span className="sp-brand-accent">Hub</span>
            </span>
          </div>

          {/* ── HOME VIEW ── */}
          {view === "home" && (
            <div className="sp-home">
              <div className="sp-eyebrow">
                <div className="sp-eyebrow-dot" />
                Trusted by homeowners &amp; tradespeople
              </div>

              <h1 className="sp-h1">
                Find skilled trades,
                <span className="sp-h1-grad">faster than ever.</span>
              </h1>

              <p className="sp-desc">
                Post a job in minutes and connect with verified local tradespeople — plumbers, electricians, painters, joiners and more.
              </p>

              <div className="sp-ctas">
                <button className="sp-btn-primary" onClick={() => setView("register")}>
                  Get started free
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M3 7.5h9M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="sp-btn-ghost" onClick={() => setView("login")}>
                  Sign in
                </button>
              </div>

              <div className="sp-stats">
                <div className="sp-stat">
                  <div className="sp-stat-num">2,400+</div>
                  <div className="sp-stat-label">Jobs posted</div>
                </div>
                <div className="sp-stat">
                  <div className="sp-stat-num">98%</div>
                  <div className="sp-stat-label">Satisfaction</div>
                </div>
                <div className="sp-stat">
                  <div className="sp-stat-num">500+</div>
                  <div className="sp-stat-label">Tradespeople</div>
                </div>
              </div>
            </div>
          )}

          {/* ── AUTH VIEW ── */}
          {(view === "login" || view === "register") && (
            <div className="sp-auth">
              <button className="sp-back" onClick={() => { setView("home"); setError(""); }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to home
              </button>

              <h2 className="sp-auth-title">
                {view === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p className="sp-auth-sub">
                {view === "login"
                  ? "Sign in to manage and post service requests."
                  : "Join FixItHub free — takes under a minute."}
              </p>

              <div className="sp-tabs">
                <button
                  className={`sp-tab ${view === "login" ? "on" : ""}`}
                  onClick={() => { setView("login"); setError(""); }}
                  type="button"
                >Sign in</button>
                <button
                  className={`sp-tab ${view === "register" ? "on" : ""}`}
                  onClick={() => { setView("register"); setError(""); }}
                  type="button"
                >Register</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="sp-fields">
                  {view === "register" && (
                    <div className="sp-field">
                      <label className="sp-label">Full name</label>
                      <input className="sp-input" type="text" name="name"
                        value={form.name} onChange={handleChange}
                        placeholder="Jane Smith" required />
                    </div>
                  )}
                  <div className="sp-field">
                    <label className="sp-label">Email address</label>
                    <input className="sp-input" type="email" name="email"
                      value={form.email} onChange={handleChange}
                      placeholder="jane@example.com" required />
                  </div>
                  <div className="sp-field">
                    <label className="sp-label">Password</label>
                    <input className="sp-input" type="password" name="password"
                      value={form.password} onChange={handleChange}
                      placeholder={view === "register" ? "Minimum 6 characters" : "••••••••"}
                      minLength={6} required />
                  </div>
                </div>

                {error && (
                  <div className="sp-error">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.5" stroke="#fca5a5"/>
                      <path d="M7 4v3M7 10v.3" stroke="#fca5a5" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    {error}
                  </div>
                )}

                <button className="sp-submit" type="submit" disabled={loading}>
                  {loading
                    ? view === "login" ? "Signing in..." : "Creating account..."
                    : view === "login" ? "Sign in" : "Create account"}
                </button>
              </form>

              <div className="sp-switch">
                {view === "login" ? "Don't have an account?" : "Already have an account?"}
                <button onClick={() => { setView(view === "login" ? "register" : "login"); setError(""); }}>
                  {view === "login" ? "Sign up free" : "Sign in"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ══ RIGHT — hero image ══ */}
        <div className="sp-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Skilled tradespeople" className="sp-hero-img" />

          {/* Gradient overlays — blends image seamlessly into dark left panel */}
          <div className="sp-overlay-left" />
          <div className="sp-overlay-top" />
          <div className="sp-overlay-bottom" />
          <div className="sp-overlay-right" />

          {/* Floating stat card */}
          <div className="sp-card">
            <div className="sp-card-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2z" stroke="#60a5fa" strokeWidth="1.5"/>
                <path d="M6 9l2 2 4-4" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="sp-card-label">Jobs completed this week</div>
              <div className="sp-card-sub">Across all trade categories</div>
            </div>
            <div className="sp-card-num">124</div>
          </div>

          {/* Top tag */}
          <div className="sp-tag">Live platform</div>
        </div>

      </div>
    </>
  );
}