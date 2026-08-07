import { useMemo, useState } from "react";
import Head from "next/head";
import examsData from "@/data/exams.json";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ExamCard from "@/components/ExamCard";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import SavedJobs from "@/components/SavedJobs";
import PwaInstall from "@/components/PwaInstall";
import PushNotify from "@/components/PushNotify";
import EligibilityFilter from "@/components/EligibilityFilter";
import { useLang } from "@/components/LanguageContext";

const PAGE_SIZE = 10;

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((new Date(dateStr) - today) / (1000 * 60 * 60 * 24));
}

function urgencyClasses(days) {
  if (days === null) return "bg-navy-50 text-navy-500 border border-navy-200";
  if (days < 0) return "bg-navy-50 text-navy-400 border border-navy-100";
  if (days <= 7) return "bg-danger-50 text-danger-600 border border-danger-200";
  if (days <= 30) return "bg-saffron-50 text-saffron-700 border border-saffron-200";
  return "bg-ashoka-50 text-ashoka-600 border border-ashoka-200";
}

function urgencyLabel(days, t) {
  if (days === null) return t.noDeadline;
  if (days < 0) return t.closed;
  if (days === 0) return t.closesToday;
  if (days === 1) return `1 ${t.dayLeft}`;
  return `${days} ${t.daysLeft}`;
}

function isNew(publishedDate) {
  if (!publishedDate) return false;
  const days = Math.round((new Date() - new Date(publishedDate)) / (1000 * 60 * 60 * 24));
  return days >= 0 && days <= 10;
}

function extractSalaryNum(salary) {
  if (!salary) return 0;
  const match = salary.replace(/,/g, "").match(/(\d+)\s*-\s*(\d+)/);
  if (match) return parseInt(match[2], 10);
  const single = salary.replace(/,/g, "").match(/(\d+)/);
  return single ? parseInt(single[1], 10) : 0;
}

export default function Home({ exams }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [eligFilters, setEligFilters] = useState({ education: "all", age: "all", caste: "all" });
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const { t } = useLang();

  const categories = useMemo(() => {
    const set = new Set(exams.map((e) => e.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [exams]);

  const filtered = useMemo(() => {
    return exams
      .filter((e) => (category === "All" ? true : e.category === category))
      .filter((e) => query.trim() === "" ? true : `${e.title} ${e.refNo} ${e.source} ${e.location || ""}`.toLowerCase().includes(query.trim().toLowerCase()))
      .filter((e) => {
        if (eligFilters.education !== "all" && e.education && e.education !== eligFilters.education) return false;
        if (eligFilters.caste !== "all" && e.caste && e.caste !== "all" && e.caste !== eligFilters.caste) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "deadline") {
          const da = daysLeft(a.lastDate), db = daysLeft(b.lastDate);
          const aClosed = da !== null && da < 0, bClosed = db !== null && db < 0;
          if (aClosed && !bClosed) return 1;
          if (!aClosed && bClosed) return -1;
          const deadlineA = a.lastDate ? new Date(a.lastDate) : new Date("9999-12-31");
          const deadlineB = b.lastDate ? new Date(b.lastDate) : new Date("9999-12-31");
          return deadlineA - deadlineB;
        }
        if (sortBy === "salary") {
          return extractSalaryNum(b.salary) - extractSalaryNum(a.salary);
        }
        if (sortBy === "oldest") {
          const pubA = a.publishedDate ? new Date(a.publishedDate) : new Date(0);
          const pubB = b.publishedDate ? new Date(b.publishedDate) : new Date(0);
          return pubA - pubB;
        }
        // newest (default)
        const pubA = a.publishedDate ? new Date(a.publishedDate) : new Date(0);
        const pubB = b.publishedDate ? new Date(b.publishedDate) : new Date(0);
        const pubDiff = pubB - pubA;
        if (pubDiff !== 0) return pubDiff;
        return (a.lastDate ? new Date(a.lastDate) : new Date("9999-12-31")) - (b.lastDate ? new Date(b.lastDate) : new Date("9999-12-31"));
      });
  }, [exams, query, category, eligFilters, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const urgentCount = useMemo(() => exams.filter((e) => { const d = daysLeft(e.lastDate); return d !== null && d >= 0 && d <= 7; }).length, [exams]);

  // Reset page when filters change
  const handleCategoryChange = (c) => { setCategory(c); setPage(1); };
  const handleQueryChange = (q) => { setQuery(q); setPage(1); };
  const handleSortChange = (s) => { setSortBy(s); setPage(1); };
  const handleFilterChange = (f) => { setEligFilters(f); setPage(1); };

  return (
    <>
      <Head>
        <title>{t.siteName} \u2014 All India Government Job Notifications</title>
        <meta name="description" content="Real-time government job notifications \u2014 UPSC, SSC, IBPS, Railways, Defense, State PSCs." />
        <meta property="og:title" content={t.siteName} />
        <meta property="og:description" content="UPSC, SSC, IBPS, Railways, Defense \u2014 real government job notifications, auto-updated." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.siteName} />
        <link rel="canonical" href="https://exam-notify.vercel.app" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Exam Notice Board",
          "url": "https://exam-notify.vercel.app",
          "description": "Real-time government job notifications for India — UPSC, SSC, IBPS, Railways, Defense, State PSCs.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://exam-notify.vercel.app?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }) }} />
      </Head>
      <main className="min-h-screen font-sans text-navy-900 bg-navy-50/30">
        <Header totalExams={exams.length} urgentCount={urgentCount} />
        <PwaInstall />
        <PushNotify />
        <FilterBar categories={categories} category={category} setCategory={handleCategoryChange} query={query} setQuery={handleQueryChange} exams={exams} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12">
          {/* Controls row */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 flex-wrap">
            <p className="text-[11px] sm:text-sm text-navy-500 min-w-0">
              <span className="font-semibold text-navy-700">{filtered.length}</span> {t.notifications}
              {category !== "All" && <> in <span className="font-semibold text-navy-700">{category}</span></>}
            </p>
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium bg-navy-50 border border-navy-200 rounded-lg text-navy-600 focus:outline-none focus:border-navy-400">
                <option value="newest">Newest First</option>
                <option value="deadline">Deadline Soonest</option>
                <option value="salary">Highest Salary</option>
                <option value="oldest">Oldest First</option>
              </select>
              <EligibilityFilter filters={eligFilters} setFilters={handleFilterChange} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState query={query} category={category} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
                {paginated.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} daysLeft={daysLeft} urgencyClasses={urgencyClasses} urgencyLabel={(d) => urgencyLabel(d, t)} isNew={isNew} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg bg-navy-100 text-navy-600 hover:bg-navy-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    \u2190 Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 text-[11px] sm:text-xs font-bold rounded-lg transition-colors ${
                        page === p ? "bg-navy-900 text-white shadow-md" : "bg-navy-50 text-navy-600 hover:bg-navy-100 border border-navy-200"
                      }`}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg bg-navy-100 text-navy-600 hover:bg-navy-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Next \u2192
                  </button>
                </div>
              )}
            </>
          )}
        </section>
        <SavedJobs />
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return { props: { exams: examsData }, revalidate: 3600 };
}
