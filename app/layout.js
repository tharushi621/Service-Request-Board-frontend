import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "GlobalTNA – Service Request Board",
  description: "Post and browse home service requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                GlobalTNA
              </span>
              <span className="hidden sm:inline text-sm text-gray-400 font-normal">
                Service Board
              </span>
            </Link>
            <Link
              href="/jobs/new"
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + Post a Job
            </Link>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-200 mt-16 py-6 text-center text-sm text-gray-400">
          © 2026 GlobalTNA · Service Request Board
        </footer>
      </body>
    </html>
  );
}
