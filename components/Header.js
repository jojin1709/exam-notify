import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageContext";

export default function Header({ totalExams, urgentCount }) {
  return (
    <header className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
      {/* Top bar */}
      <div className="bg-navy-950/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ashoka-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-medium text-white/60 tracking-wide">
              Live — Auto-updated
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-medium text-white/50">
            <a href="/api/rss" target="_blank" className="hidden sm:flex items-center gap-1 hover:text-white/80 transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>
              RSS
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline">100% Free</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline">No Login</span>
            <span className="hidden lg:inline text-white/30">|</span>
            <span className="hidden lg:inline text-saffron-400/80">Built by <strong>JOJIN JOHN</strong></span>
            <LanguageToggle />
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-saffron-500/20 text-saffron-300 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                Government Jobs
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-1 sm:mb-2">
              Exam Notice Board
            </h1>
            <p className="text-white/60 text-xs sm:text-sm lg:text-base max-w-lg">
              Real-time government job notifications — scraped directly from official websites.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-3 text-center min-w-[70px] sm:min-w-[100px]">
              <p className="text-xl sm:text-2xl font-bold text-white">{totalExams}</p>
              <p className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Notices</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-3 text-center min-w-[70px] sm:min-w-[100px]">
              <p className="text-xl sm:text-2xl font-bold text-danger-400">{urgentCount}</p>
              <p className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Urgent</p>
            </div>
          </div>
        </div>

        {/* Sources */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">Sources:</span>
            {["Kerala PSC", "UPSC", "SSC", "IBPS", "RRB", "Defense"].map((s) => (
              <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-medium text-white/60 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
