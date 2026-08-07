import DarkModeToggle from "./DarkModeToggle";

export default function Header({ totalExams, urgentCount }) {
  return (
    <header className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white">
      {/* Top bar */}
      <div className="bg-navy-950/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-ashoka-500 animate-pulse" />
            <span className="text-[11px] font-medium text-white/60 tracking-wide">
              Live — Auto-updated from official sources
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-white/50">
            <a href="/api/rss" target="_blank" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><circle cx="6.18" cy="17.82" r="2.18"/><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/></svg>
              RSS
            </a>
            <a href="/api/jobs" target="_blank" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              API
            </a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>100% Free</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>No Login Required</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Official Sources Only</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-saffron-400/80">Built by <strong>JOJIN JOHN</strong></span>
            <DarkModeToggle />
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Title */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-saffron-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-saffron-500/20 text-saffron-300 text-[10px] font-bold uppercase tracking-wider">
                Government Jobs
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Exam Notice Board
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-lg">
              Real-time government job notifications — UPSC, SSC, IBPS, Railways, Defense, State PSCs — scraped directly from official websites.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center min-w-[100px]">
              <p className="text-2xl font-bold text-white">{totalExams}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Notifications</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center min-w-[100px]">
              <p className="text-2xl font-bold text-danger-400">{urgentCount}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mt-0.5">Closing Soon</p>
            </div>
          </div>
        </div>

        {/* Source logos */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center gap-6 overflow-x-auto pb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap">Sources:</span>
            {[
              { name: "Kerala PSC", color: "bg-violet-500" },
              { name: "UPSC", color: "bg-blue-500" },
              { name: "SSC", color: "bg-indigo-500" },
              { name: "IBPS", color: "bg-emerald-500" },
              { name: "RRB", color: "bg-rose-500" },
              { name: "Defense", color: "bg-amber-500" },
            ].map((s) => (
              <span
                key={s.name}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-white/60 whitespace-nowrap hover:bg-white/10 hover:text-white/80 transition-colors cursor-default"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${s.color}`} />
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
