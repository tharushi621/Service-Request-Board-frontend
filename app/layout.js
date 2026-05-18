"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./globals.css";

function NavBar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/splash");
  };

  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid #e8ecf0",
      position: "sticky",
      top: 0,
      zIndex: 50,
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 1.5rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>

        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "10px",
          textDecoration: "none", flexShrink: 0,
        }}>
          <div style={{
            width: "34px", height: "34px",
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            borderRadius: "9px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9a6 6 0 0112 0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5.5 13a3.5 3.5 0 017 0" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              <circle cx="9" cy="6" r="1.7" fill="white"/>
            </svg>
          </div>
          <span style={{
            fontSize: "1rem", fontWeight: 800,
            color: "#0f172a", letterSpacing: "-0.03em",
          }}>
            FixIt<span style={{ color: "#2563eb" }}>Hub</span>
          </span>
        </Link>

        <nav style={{
          display: "flex", alignItems: "center", gap: "4px",
          flex: 1, justifyContent: "center",
        }}>
          <NavLink href="/">Browse Jobs</NavLink>
          {user && <NavLink href="/jobs/new">Post a Job</NavLink>}
        </nav>

        <div style={{
          display: "flex", alignItems: "center", gap: "10px", flexShrink: 0,
        }}>
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/jobs/new" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "#fff",
                    fontSize: "0.82rem", fontWeight: 600,
                    padding: "8px 18px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 2px 10px rgba(37,99,235,0.28)",
                    transition: "opacity 0.15s",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                  }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    Post a Job
                  </Link>

                  <div style={{ width: "1px", height: "28px", background: "#e8ecf0" }} />

                  <div style={{
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <div style={{
                      width: "32px", height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                      color: "#1d4ed8",
                      fontSize: "0.8rem", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      border: "2px solid #e0eaff",
                      letterSpacing: "0",
                      userSelect: "none",
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div style={{ lineHeight: 1.2 }}>
                      <div style={{
                        fontSize: "0.82rem", fontWeight: 600,
                        color: "#0f172a", letterSpacing: "-0.01em",
                      }}>
                        {user.name.split(" ")[0]}
                      </div>
                      <div style={{
                        fontSize: "0.68rem", color: "#94a3b8", fontWeight: 400,
                      }}>
                        {user.email}
                      </div>
                    </div>

                    {/* Sign out */}
                    <button
                      onClick={handleLogout}
                      title="Sign out"
                      style={{
                        display: "flex", alignItems: "center", gap: "5px",
                        background: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.15)",
                        borderRadius: "7px",
                        padding: "6px 11px",
                        fontSize: "0.75rem", fontWeight: 600,
                        color: "#ef4444",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.01em",
                        whiteSpace: "nowrap",
                        marginLeft: "2px",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(239,68,68,0.12)";
                        e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(239,68,68,0.06)";
                        e.currentTarget.style.borderColor = "rgba(239,68,68,0.15)";
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M4.5 2H2A1.5 1.5 0 00.5 3.5v5A1.5 1.5 0 002 10h2.5M8 8.5l3-2.5L8 3.5M11 6H4.5"
                          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <Link href="/splash" style={{
                  display: "inline-flex", alignItems: "center",
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "#fff",
                  fontSize: "0.82rem", fontWeight: 600,
                  padding: "8px 18px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 2px 10px rgba(37,99,235,0.28)",
                }}>
                  Sign in
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} style={{
      fontSize: "0.85rem",
      fontWeight: isActive ? 600 : 500,
      color: isActive ? "#2563eb" : "#64748b",
      textDecoration: "none",
      padding: "6px 14px",
      borderRadius: "7px",
      background: isActive ? "rgba(37,99,235,0.07)" : "transparent",
      transition: "all 0.15s",
      letterSpacing: "-0.01em",
    }}>
      {children}
    </Link>
  );
}

function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const isSplash = pathname === "/splash";

  useEffect(() => {
    if (loading) return;
    if (!isSplash && !user) {
      router.replace("/splash");
    }
  }, [loading, user, isSplash, router]);

  if (isSplash) return <>{children}</>;

  if (loading || !user) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f8fafc",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: "28px", height: "28px",
          border: "3px solid #dbeafe",
          borderTop: "3px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <NavBar />

      <main style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2.5rem 1.5rem",
      }}>
        {children}
      </main>

      <footer style={{
        borderTop: "1px solid #e8ecf0",
        background: "#fff",
        padding: "1.25rem 1.5rem",
        marginTop: "4rem",
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "0.5rem",
        }}>
          <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 500 }}>
            © 2026 FixItHub. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Support"].map(label => (
              <span key={label} style={{
                fontSize: "0.78rem", color: "#94a3b8",
                cursor: "pointer", fontWeight: 500,
              }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>FixItHub — Local Trades &amp; Services</title>
        <meta name="description" content="Post and browse local trade service requests." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f8fafc" }}>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}