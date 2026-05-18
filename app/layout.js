"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isSplash = pathname === "/splash";

  useEffect(() => {
    // On first visit, send to splash. Skip if already there or splash was seen.
    const seen = sessionStorage.getItem("splash_seen");
    if (!seen && pathname !== "/splash") {
      router.replace("/splash");
    }
  }, [pathname, router]);

  // Splash page renders full-screen with no shell
  if (isSplash) {
    return (
      <html lang="en">
        <head>
          <title>FixItHub — Local Trades & Services</title>
          <meta name="description" content="Post and browse local trade service requests." />
        </head>
        <body style={{ margin: 0, padding: 0 }}>{children}</body>
      </html>
    );
  }

  // Main app shell
  return (
    <html lang="en">
      <head>
        <title>FixItHub</title>
        <meta name="description" content="Post and browse local trade service requests." />
      </head>
      <body className="bg-gray-50 min-h-screen">
        {/* Top nav */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8a5 5 0 0110 0" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M5 11a3 3 0 016 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="8" cy="5.5" r="1.2" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 text-sm tracking-tight group-hover:text-brand-600 transition-colors">
                FixIt<span className="text-brand-600">Hub</span>
              </span>
            </Link>

            {/* Nav actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block"
              >
                Browse Jobs
              </Link>
              <Link
                href="/jobs/new"
                className="text-sm bg-brand-600 text-white px-4 py-1.5 rounded-lg hover:bg-brand-700 transition-colors font-medium"
              >
                + Post a Job
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}