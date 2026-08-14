import { useLang } from "./LanguageContext";

export default function ExamInfoSection({ exam }) {
  const { t } = useLang();
  const hasInfo = exam.salary || exam.eligibility || exam.examPattern || exam.previousPapers || exam.applicationFee || exam.vacancies || exam.selectionProcess || exam.ageRelaxation || exam.officialPdf;
  if (!hasInfo) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
      {exam.salary && (
        <div className="bg-ashoka-50 rounded-xl p-3 sm:p-4 border border-ashoka-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ashoka-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-ashoka-700">{t.salaryPayScale}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-ashoka-900">{exam.salary}</p>
        </div>
      )}
      {exam.eligibility && (
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">{t.eligibilityLabel}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-blue-900">{exam.eligibility}</p>
        </div>
      )}
      {exam.examPattern && (
        <div className="bg-violet-50 rounded-xl p-3 sm:p-4 border border-violet-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-700">{t.examPattern}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-violet-900">{exam.examPattern}</p>
        </div>
      )}
      {exam.applicationFee && (
        <div className="bg-rose-50 rounded-xl p-3 sm:p-4 border border-rose-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9 3 9-3-9-3-9 3zm0 6l9 3 9-3m-9 3v6m-9-6v6m18-6v6" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-700">{t.applicationFee}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-rose-900">{exam.applicationFee}</p>
        </div>
      )}
      {exam.vacancies && (
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">{t.vacancies}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-blue-900">{exam.vacancies}</p>
        </div>
      )}
      {exam.selectionProcess && (
        <div className="bg-indigo-50 rounded-xl p-3 sm:p-4 border border-indigo-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-700">{t.selectionProcess}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-indigo-900">{exam.selectionProcess}</p>
        </div>
      )}
      {exam.ageRelaxation && (
        <div className="bg-teal-50 rounded-xl p-3 sm:p-4 border border-teal-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-teal-700">{t.ageRelaxation}</p>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-teal-900">{exam.ageRelaxation}</p>
        </div>
      )}
      {exam.previousPapers && (
        <div className="bg-saffron-50 rounded-xl p-3 sm:p-4 border border-saffron-200">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-saffron-700">{t.previousPapers}</p>
          </div>
          <a href={exam.previousPapers} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold text-saffron-900 hover:underline">{t.downloadPapers} &rarr;</a>
        </div>
      )}
    {exam.officialPdf && (
        <div className="bg-saffron-50 rounded-xl p-3 sm:p-4 border border-saffron-200 sm:col-span-2">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2zm3-5h4m-4-3h4" /></svg>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-saffron-700">{t.officialPdf}</p>
          </div>
          <a href={exam.officialPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-saffron-900 hover:underline">
            {t.downloadPdf}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      )}
    </div>
  );
}
