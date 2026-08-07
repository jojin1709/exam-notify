export default function EmptyState({ query, category }) {
  return (
    <div className="text-center py-16 px-6">
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-navy-100/50 mb-6">
        <svg
          className="w-10 h-10 text-navy-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>

      {/* Message */}
      <h3 className="text-lg font-bold text-navy-900 mb-2">
        No results found
      </h3>
      <p className="text-navy-500 text-sm max-w-sm mx-auto leading-relaxed">
        {query ? (
          <>
            No notifications match &ldquo;<span className="font-semibold text-navy-700">{query}</span>&rdquo;. Try a different search term.
          </>
        ) : (
          <>
            No notifications in <span className="font-semibold text-navy-700">{category}</span> right now. Check back soon!
          </>
        )}
      </p>

      {/* Suggestion */}
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-50 text-navy-600 text-xs font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Try selecting a different category above
      </div>
    </div>
  );
}
