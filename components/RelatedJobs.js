export default function RelatedJobs({ currentExam, allExams }) {
  const related = allExams
    .filter((e) => e.id !== currentExam.id && (e.category === currentExam.category || e.source === currentExam.source))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-6 sm:mt-8">
      <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-3 sm:mb-4">Related Jobs</h3>
      <div className="grid gap-2 sm:gap-3">
        {related.map((exam) => (
          <a
            key={exam.id}
            href={`/job/${exam.id}`}
            className="block p-3 sm:p-4 bg-navy-50 rounded-xl border border-navy-100 hover:border-navy-200 hover:bg-white transition-all"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
              <span className="text-[9px] sm:text-[10px] font-bold text-navy-500 bg-navy-100 px-1.5 sm:px-2 py-0.5 rounded">
                {exam.source}
              </span>
              {exam.lastDate && (
                <span className="text-[9px] sm:text-[10px] text-navy-400">
                  {new Date(exam.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-navy-800 line-clamp-1">{exam.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
