export default function ExportCsv({ exams, label }) {
  const exportCsv = () => {
    const headers = [
      "Title", "Category", "Source", "Location", "Reference No", "Last Date", "Published Date",
      "Salary", "Eligibility", "Education", "Exam Pattern", "Selection Process", "Application Fee", "Vacancies", "URL",
    ];
    const rows = exams.map((e) => [
      e.title || "", e.category || "", e.source || "", e.location || "All India", e.refNo || "", e.lastDate || "", e.publishedDate || "",
      e.salary || "", e.eligibility || "", e.education || "", e.examPattern || "", e.selectionProcess || "", e.applicationFee || "", e.vacancies || "", e.url || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exam-notifications.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportCsv} disabled={exams.length === 0}
      className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg bg-ashoka-50 text-ashoka-700 border border-ashoka-200 hover:bg-ashoka-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {label}
      </span>
    </button>
  );
}
