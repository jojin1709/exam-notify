import { useState, useEffect } from "react";

export default function SavedJobs() {
  const [bookmarks, setBookmarks] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("exam-bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  const remove = (id) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    localStorage.setItem("exam-bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  if (bookmarks.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 px-4 py-2 bg-saffron-50 border border-saffron-200 rounded-xl text-saffron-700 text-sm font-semibold hover:bg-saffron-100 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Saved Jobs ({bookmarks.length})
        <svg className={`w-4 h-4 transition-transform ${show ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {show && (
        <div className="mt-3 bg-white rounded-xl border border-navy-100 shadow-card p-4">
          <div className="space-y-2">
            {bookmarks.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-navy-100/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-navy-900 line-clamp-1">{b.title}</p>
                  <p className="text-[11px] text-navy-400">{b.source}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a href={`/job/${b.id}`} className="text-xs font-medium text-navy-600 hover:text-navy-800">
                    View
                  </a>
                  <button onClick={() => remove(b.id)} className="text-xs text-danger-500 hover:text-danger-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
