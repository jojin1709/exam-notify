import { useLang } from "./LanguageContext";

export default function FilterBar({ categories, category, setCategory, query, setQuery, exams }) {
  const { t } = useLang();

  const categoryCounts = {};
  exams.forEach((e) => { categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1; });
  categoryCounts["All"] = exams.length;

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-navy-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-1 overflow-x-auto pb-2 -mb-1 scrollbar-hide" role="tablist">
          {categories.map((cat) => {
            const isActive = category === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(cat)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive ? "bg-navy-900 text-white shadow-md shadow-navy-900/20" : "text-navy-600 hover:bg-navy-50 hover:text-navy-800"
                }`}
              >
                <span className="flex items-center gap-1">
                  {cat === "All" ? t.all : cat}
                  <span className={`inline-flex items-center justify-center min-w-[16px] sm:min-w-[18px] h-4 sm:h-[18px] px-1 rounded-full text-[9px] sm:text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-navy-100 text-navy-500"
                  }`}>
                    {count}
                  </span>
                </span>
                {isActive && <span className="absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-0.5 bg-saffron-500 rounded-full" />}
              </button>
            );
          })}
        </div>

        <div className="relative mt-2">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-navy-50/50 border border-navy-200/50 rounded-xl focus:bg-white focus:border-navy-300 focus:ring-2 focus:ring-navy-100 placeholder:text-navy-400 transition-all"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-navy-200/50 text-navy-500 hover:bg-navy-300/50 transition-colors" aria-label="Clear">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
