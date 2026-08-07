import { useLang } from "./LanguageContext";

export default function CalendarButton({ exam }) {
  const { t } = useLang();

  const addToCalendar = () => {
    if (!exam.lastDate) return;
    const date = new Date(exam.lastDate);
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const tomorrow = new Date(date); tomorrow.setDate(tomorrow.getDate() + 1);
    const endDate = `${tomorrow.getFullYear()}${String(tomorrow.getMonth() + 1).padStart(2, "0")}${String(tomorrow.getDate()).padStart(2, "0")}`;
    const title = encodeURIComponent(`Deadline: ${exam.title}`);
    const details = encodeURIComponent(`${exam.source} \u2014 ${exam.location || "All India"}\n${exam.url}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${endDate}&details=${details}&sf=true&output=xml`, "_blank");
  };

  if (!exam.lastDate) return null;

  return (
    <button onClick={addToCalendar}
      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border-2 border-navy-200 text-navy-700 rounded-xl font-semibold text-xs sm:text-sm hover:border-navy-400 transition-colors w-full sm:w-auto">
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {t.calendar}
    </button>
  );
}
