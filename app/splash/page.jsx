"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORY_ICONS = [
  { icon: "🔧", label: "Plumbing" },
  { icon: "⚡", label: "Electrical" },
  { icon: "🎨", label: "Painting" },
  { icon: "🪵", label: "Joinery" },
  { icon: "🏠", label: "General" },
];

export default function SplashPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem("splash_seen", "true");
    router.push("/");
  };

  return (
    <div className="splash-root">
      {/* Animated grid background */}
      <div className="splash-grid" aria-hidden="true" />

      {/* Floating service bubbles */}
      <div className="splash-bubbles" aria-hidden="true">
        {CATEGORY_ICONS.map((item, i) => (
          <div key={item.label} className={`bubble bubble-${i}`}>
            <span className="bubble-icon">{item.icon}</span>
            <span className="bubble-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <main className={`splash-content ${mounted ? "is-visible" : ""}`}>
        {/* Logo mark */}
        <div className="splash-logo" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect width="56" height="56" rx="16" fill="#1a56db" />
            <path
              d="M14 28C14 20.268 20.268 14 28 14C35.732 14 42 20.268 42 28"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M20 34C20 30.134 23.134 27 27 27H29C32.866 27 36 30.134 36 34"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="28" cy="22" r="3" fill="white" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="splash-wordmark">
          <h1 className="splash-title">FixIt<span className="splash-title-accent">Hub</span></h1>
          <p className="splash-tagline">Your local trades &amp; services marketplace</p>
        </div>

        {/* Feature pills */}
        <div className="splash-pills" role="list">
          {["Post jobs in seconds", "Connect with local tradespeople", "Track work in real time"].map((f) => (
            <div className="splash-pill" role="listitem" key={f}>
              <svg className="pill-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="#1a56db" />
                <path d="M4 7.2L6.1 9.3L10 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="splash-cta" onClick={handleEnter}>
          Browse Service Requests
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="splash-sub">
          Need a tradesperson?{" "}
          <button className="splash-link" onClick={handleEnter}>
            Post a job →
          </button>
        </p>
      </main>

      {/* Bottom badge */}
      <footer className="splash-footer" aria-label="Service categories">
        {CATEGORY_ICONS.map((item) => (
          <span key={item.label} className="footer-badge">
            {item.icon} {item.label}
          </span>
        ))}
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

        .splash-root {
          min-height: 100vh;
          background: #05122b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Animated grid */
        .splash-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(26, 86, 219, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 86, 219, 0.12) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
          animation: grid-drift 20s linear infinite;
        }

        @keyframes grid-drift {
          0% { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }

        /* Floating service bubbles */
        .splash-bubbles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .bubble {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          padding: 8px 16px;
          backdrop-filter: blur(4px);
          animation: float-bubble 8s ease-in-out infinite;
        }

        .bubble-icon { font-size: 18px; }
        .bubble-label { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 500; letter-spacing: 0.02em; white-space: nowrap; }

        .bubble-0 { top: 14%; left: 8%;  animation-delay: 0s;   animation-duration: 7s; }
        .bubble-1 { top: 20%; right: 9%; animation-delay: 1.2s; animation-duration: 9s; }
        .bubble-2 { bottom: 28%; left: 6%;  animation-delay: 0.6s; animation-duration: 8s; }
        .bubble-3 { bottom: 22%; right: 7%; animation-delay: 2s;   animation-duration: 7.5s; }
        .bubble-4 { top: 50%; left: 4%;     animation-delay: 1.8s; animation-duration: 10s; }

        @keyframes float-bubble {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50%       { transform: translateY(-14px); opacity: 1; }
        }

        @media (max-width: 640px) {
          .bubble { display: none; }
        }

        /* Main content */
        .splash-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1.5rem;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .splash-content.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Logo */
        .splash-logo {
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 24px rgba(26, 86, 219, 0.5));
        }

        /* Wordmark */
        .splash-wordmark { margin-bottom: 2rem; }

        .splash-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.6rem, 6vw, 4rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 0 0 0.6rem;
        }

        .splash-title-accent {
          color: #4d8ef7;
        }

        .splash-tagline {
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        /* Pills */
        .splash-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .splash-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 40px;
          padding: 7px 16px;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .pill-check { flex-shrink: 0; }

        /* CTA button */
        .splash-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a56db;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 0 0 rgba(26, 86, 219, 0.4);
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
        }

        .splash-cta:hover {
          background: #1c4ece;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(26, 86, 219, 0.45);
        }

        .splash-cta:active {
          transform: translateY(0);
        }

        /* Sub link */
        .splash-sub {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
        }

        .splash-link {
          background: none;
          border: none;
          cursor: pointer;
          color: #4d8ef7;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s;
        }

        .splash-link:hover { color: #7eaaff; }

        /* Footer badges */
        .splash-footer {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0 1rem;
        }

        .footer-badge {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.03em;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}