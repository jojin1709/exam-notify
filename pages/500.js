export default function Custom500() {
  return (
    <div className="min-h-screen bg-navy-50/30 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-danger-50 mb-6">
          <span className="text-5xl font-extrabold text-danger-400">!</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-3">Server Error</h1>
        <p className="text-navy-500 text-sm sm:text-base mb-8 leading-relaxed">
          Something went wrong on our end. Please try again later.
        </p>
        <a href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl font-bold text-sm hover:bg-navy-800 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  );
}
