import { useLang } from "./LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-navy-900 text-white mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-bold text-base sm:text-lg">{t.siteName}</span>
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-xs">{t.footerDesc}</p>
          </div>
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-2.5 sm:mb-3 text-white/80">{t.officialSources}</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/50">
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-400" />Union Public Service Commission (UPSC)</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-indigo-400" />Staff Selection Commission (SSC)</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-400" />Institute of Banking Personnel (IBPS)</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400" />Railway Recruitment Boards (RRB)</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-400" />Defense Services & State PSCs</li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-semibold text-xs sm:text-sm mb-2.5 sm:mb-3 text-white/80">{t.disclaimer}</h4>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{t.disclaimerFooter}</p>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[10px] sm:text-[11px] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-ashoka-500 animate-pulse" />
              {t.autoUpdate}
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-[11px] text-white/30 font-mono text-center sm:text-left">&copy; {new Date().getFullYear()} Exam Notice Board. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-[11px] text-white/40">{t.developedBy} <span className="font-semibold text-white/60">JOJIN JOHN</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
