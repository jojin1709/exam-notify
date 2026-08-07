import { useLang } from "./LanguageContext";

export default function ExamCard({ exam, daysLeft, urgencyClasses, urgencyLabel, isNew }) {
  const { t } = useLang();
  const days = daysLeft(exam.lastDate);
  const newFlag = isNew(exam.publishedDate);

  const categoryStyles = {
    UPSC: { badge: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
    "Central Govt": { badge: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500" },
    Railways: { badge: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
    Banking: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    Defense: { badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    "State PSC": { badge: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500" },
    Education: { badge: "bg-cyan-50 text-cyan-700 border-cyan-200", dot: "bg-cyan-500" },
  };

  const style = categoryStyles[exam.category] || { badge: "bg-navy-50 text-navy-700 border-navy-200", dot: "bg-navy-500" };

  return (
    <div className="group block bg-white rounded-xl sm:rounded-2xl border border-navy-100 shadow-card hover:shadow-card-hover hover:border-navy-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <div className={`h-1 ${
        days !== null && days <= 7
          ? "bg-gradient-to-r from-danger-500 to-danger-400"
          : days !== null && days <= 30
          ? "bg-gradient-to-r from-saffron-500 to-saffron-400"
          : "bg-gradient-to-r from-ashoka-500 to-ashoka-400"
      }`} />

      <div className="p-3.5 sm:p-5">
        <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
            <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold border ${style.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {exam.source}
            </span>
            {exam.category !== exam.source && (
              <span className="text-[9px] sm:text-[10px] font-medium text-navy-400 bg-navy-50 px-1.5 sm:px-2 py-0.5 rounded">
                {exam.category}
              </span>
            )}
          </div>
          {newFlag && (
            <span className="stamp-rotate bg-danger-500 text-white text-[8px] sm:text-[9px] font-black tracking-widest px-1.5 sm:px-2 py-0.5 rounded shadow-sm flex-shrink-0">
              {t.new}
            </span>
          )}
        </div>

        <h3 className="font-bold text-[14px] sm:text-[15px] leading-snug text-navy-900 group-hover:text-navy-700 transition-colors mb-1.5 sm:mb-2 line-clamp-2">
          {exam.title}
        </h3>

        {exam.salary && (
          <p className="text-[11px] sm:text-xs font-semibold text-ashoka-600 mb-1.5 sm:mb-2">{exam.salary}</p>
        )}

        <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3 flex-wrap">
          {exam.refNo && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-navy-500 font-mono">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="truncate">{exam.refNo}</span>
            </span>
          )}
          {exam.location && (
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] text-navy-500">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{exam.location}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-navy-100/50 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
            <span className={`inline-flex items-center gap-1 sm:gap-1.5 font-semibold text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${urgencyClasses(days)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                days !== null && days <= 7 ? "bg-danger-500 animate-pulse" : days !== null && days <= 30 ? "bg-saffron-500" : "bg-ashoka-500"
              }`} />
              {urgencyLabel(days)}
            </span>
            {days !== null && days >= 0 && (
              <span className="text-[9px] sm:text-[10px] font-mono text-navy-400">
                {days} {days === 1 ? t.dayLeft : t.daysLeft}
              </span>
            )}
          </div>

          <a
            href={`/job/${exam.id}`}
            className="inline-flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs font-semibold text-navy-600 group-hover:text-navy-800 transition-colors whitespace-nowrap flex-shrink-0"
          >
            {t.view}
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
