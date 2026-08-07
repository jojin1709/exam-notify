import { useLang } from "./LanguageContext";

export default function EmptyState({ query, category }) {
  const { t } = useLang();

  return (
    <div className="text-center py-10 sm:py-16 px-4 sm:px-6">
      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-navy-100/50 mb-4 sm:mb-6">
        <svg className="w-7 h-7 sm:w-10 sm:h-10 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1.5 sm:mb-2">{t.noResults}</h3>
      <p className="text-navy-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
        {query ? <>{t.noResultsSearchQ} &ldquo;<span className="font-semibold text-navy-700">{query}</span>&rdquo;. {t.noResultsSearchEnd}</> : <>{t.noResultsCatStart} <span className="font-semibold text-navy-700">{category}</span> {t.noResultsCatEnd}</>}
      </p>
      <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-navy-50 text-navy-600 text-[11px] sm:text-xs font-medium">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {t.tryDifferent}
      </div>
    </div>
  );
}
