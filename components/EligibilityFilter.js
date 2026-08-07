import { useState } from "react";
import { useLang } from "./LanguageContext";

const EDUCATION_LEVELS = [
  { value: "all", key: "allEducation" },
  { value: "10th", label: "10th Pass" },
  { value: "12th", label: "12th Pass / HS" },
  { value: "graduation", label: "Graduate" },
  { value: "post-graduation", label: "Post Graduate" },
  { value: "engineering", label: "Engineering" },
  { value: "medical", label: "Medical" },
];

const AGE_GROUPS = [
  { value: "all", key: "allAges" },
  { value: "18-25", label: "18-25 years" },
  { value: "18-27", label: "18-27 years" },
  { value: "18-30", label: "18-30 years" },
  { value: "18-32", label: "18-32 years" },
  { value: "21-30", label: "21-30 years" },
  { value: "21-32", label: "21-32 years" },
];

const CASTE_CATEGORIES = [
  { value: "all", key: "allCategories" },
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "ews", label: "EWS" },
];

export default function EligibilityFilter({ filters, setFilters }) {
  const [show, setShow] = useState(false);
  const { t } = useLang();

  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hasFilters = filters.education !== "all" || filters.age !== "all" || filters.caste !== "all";

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
          hasFilters ? "bg-saffron-50 text-saffron-700 border border-saffron-200" : "bg-navy-50 text-navy-600 border border-navy-200 hover:bg-navy-100"
        }`}
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="hidden sm:inline">{t.eligibility}</span>
        <span className="sm:hidden">{t.filter}</span>
        {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-saffron-500" />}
      </button>

      {show && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShow(false)} />
          <div className="absolute top-full left-0 mt-2 w-64 sm:w-72 bg-white rounded-xl border border-navy-200 shadow-lg p-3 sm:p-4 z-50">
            <div className="space-y-2.5 sm:space-y-3">
              <div>
                <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-1 block">{t.education}</label>
                <select value={filters.education} onChange={(e) => update("education", e.target.value)} className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:border-navy-400">
                  {EDUCATION_LEVELS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.key ? t[opt.key] : opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-1 block">{t.ageLimit}</label>
                <select value={filters.age} onChange={(e) => update("age", e.target.value)} className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:border-navy-400">
                  {AGE_GROUPS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.key ? t[opt.key] : opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-1 block">{t.category}</label>
                <select value={filters.caste} onChange={(e) => update("caste", e.target.value)} className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-navy-50 border border-navy-200 rounded-lg focus:outline-none focus:border-navy-400">
                  {CASTE_CATEGORIES.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.key ? t[opt.key] : opt.label}</option>
                  ))}
                </select>
              </div>
              {hasFilters && (
                <button onClick={() => setFilters({ education: "all", age: "all", caste: "all" })} className="w-full text-[11px] sm:text-xs font-medium text-danger-600 hover:text-danger-700 py-1">
                  {t.clearFilters}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
