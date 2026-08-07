export default function ExamInfoSection({ exam }) {
  const hasInfo = exam.salary || exam.eligibility || exam.examPattern || exam.previousPapers;

  if (!hasInfo) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
      {exam.salary && (
        <div className="bg-ashoka-50 rounded-xl p-3 sm:p-4 border border-ashoka-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ashoka-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ashoka-700">Salary / Pay Scale</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-ashoka-900">{exam.salary}</p>
        </div>
      )}

      {exam.eligibility && (
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">Eligibility</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-blue-900">{exam.eligibility}</p>
        </div>
      )}

      {exam.examPattern && (
        <div className="bg-violet-50 rounded-xl p-3 sm:p-4 border border-violet-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-700">Exam Pattern</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-violet-900">{exam.examPattern}</p>
        </div>
      )}

      {exam.previousPapers && (
        <div className="bg-saffron-50 rounded-xl p-3 sm:p-4 border border-saffron-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-saffron-700">Previous Year Papers</p>
          </div>
          <a
            href={exam.previousPapers}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-saffron-900 hover:underline"
          >
            Download Papers →
          </a>
        </div>
      )}
    </div>
  );
}
