import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-navy-50/30 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-navy-100/50 mb-6">
          <span className="text-5xl font-extrabold text-navy-300">404</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-3">Page Not Found</h1>
        <p className="text-navy-500 text-sm sm:text-base mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. Go back to find the latest government job notifications.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl font-bold text-sm hover:bg-navy-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link href="/api/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-navy-200 text-navy-700 rounded-xl font-bold text-sm hover:border-navy-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            View API
          </Link>
        </div>
        <p className="mt-8 text-xs text-navy-400">
          Developed by <span className="font-semibold text-navy-600">JOJIN JOHN</span>
        </p>
      </div>
    </div>
  );
}
