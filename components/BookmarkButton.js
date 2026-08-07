import { useState, useEffect } from "react";

export default function BookmarkButton({ exam }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("exam-bookmarks") || "[]");
    setSaved(bookmarks.some((b) => b.id === exam.id));
  }, [exam.id]);

  const toggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem("exam-bookmarks") || "[]");
    if (saved) {
      const updated = bookmarks.filter((b) => b.id !== exam.id);
      localStorage.setItem("exam-bookmarks", JSON.stringify(updated));
      setSaved(false);
    } else {
      bookmarks.push({ id: exam.id, title: exam.title, source: exam.source, savedAt: new Date().toISOString() });
      localStorage.setItem("exam-bookmarks", JSON.stringify(bookmarks));
      setSaved(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold border-2 transition-all text-xs sm:text-sm w-full sm:w-auto ${
        saved
          ? "bg-saffron-50 border-saffron-300 text-saffron-700"
          : "bg-white border-navy-200 text-navy-700 hover:border-navy-400"
      }`}
    >
      <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {saved ? "Saved" : "Save"}
    </button>
  );
}
