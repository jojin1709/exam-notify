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
import EligibilityFilter from "@/components/EligibilityFilter";

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function urgencyClasses(days) {
  if (days === null) return "bg-navy-50 text-navy-500 border border-navy-200";
  if (days < 0) return "bg-navy-50 text-navy-400 border border-navy-100";
  if (days <= 7) return "bg-danger-50 text-danger-600 border border-danger-200";
  if (days <= 30) return "bg-saffron-50 text-saffron-700 border border-saffron-200";
  return "bg-ashoka-50 text-ashoka-600 border border-ashoka-200";
}

function urgencyLabel(days) {
  if (days === null) return "No deadline";
  if (days < 0) return "Closed";
  if (days === 0) return "Closes today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

function isNew(publishedDate) {
  if (!publishedDate) return false;
  const days = Math.round(
    (new Date() - new Date(publishedDate)) / (1000 * 60 * 60 * 24)
  );
  return days >= 0 && days <= 10;
}

export default function Home({ exams }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [eligFilters, setEligFilters] = useState({ education: "all", age: "all", caste: "all" });

  const categories = useMemo(() => {
    const set = new Set(exams.map((e) => e.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [exams]);

  const filtered = useMemo(() => {
    return exams
      .filter((e) => (category === "All" ? true : e.category === category))
      .filter((e) =>
        query.trim() === ""
          ? true
          : `${e.title} ${e.refNo} ${e.source} ${e.location || ""}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())
      )
      .filter((e) => {
        if (eligFilters.education !== "all" && e.education && e.education !== eligFilters.education) return false;
        if (eligFilters.caste !== "all" && e.caste && e.caste !== "all" && e.caste !== eligFilters.caste) return false;
        return true;
      })
      .sort((a, b) => {
        const da = daysLeft(a.lastDate);
        const db = daysLeft(b.lastDate);
        const aClosed = da !== null && da < 0;
        const bClosed = db !== null && db < 0;
        if (aClosed && !bClosed) return 1;
        if (!aClosed && bClosed) return -1;
        const pubA = a.publishedDate ? new Date(a.publishedDate) : new Date(0);
        const pubB = b.publishedDate ? new Date(b.publishedDate) : new Date(0);
        const pubDiff = pubB - pubA;
        if (pubDiff !== 0) return pubDiff;
        const deadlineA = a.lastDate ? new Date(a.lastDate) : new Date("9999-12-31");
        const deadlineB = b.lastDate ? new Date(b.lastDate) : new Date("9999-12-31");
        return deadlineA - deadlineB;
      });
  }, [exams, query, category, eligFilters]);

  const urgentCount = useMemo(() => {
    return exams.filter((e) => {
      const d = daysLeft(e.lastDate);
      return d !== null && d >= 0 && d <= 7;
    }).length;
  }, [exams]);

  return (
    <>
      <Head>
        <title>Exam Notice Board — All India Government Job Notifications</title>
        <meta name="description" content="Real-time government job notifications — UPSC, SSC, IBPS, Railways, Defense, State PSCs — scraped from official websites." />
        <meta property="og:title" content="Exam Notice Board" />
        <meta property="og:description" content="UPSC, SSC, IBPS, Railways, Defense — real government job notifications, auto-updated." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen font-sans text-navy-900 bg-navy-50/30">
        <Header totalExams={exams.length} urgentCount={urgentCount} />
        <PwaInstall />

        <FilterBar
          categories={categories}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
          exams={exams}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12">
          {/* Filters row */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
            <p className="text-[11px] sm:text-sm text-navy-500 min-w-0">
              <span className="font-semibold text-navy-700">{filtered.length}</span> notification{filtered.length !== 1 ? "s" : ""}
              {category !== "All" && <> in <span className="font-semibold text-navy-700">{category}</span></>}
            </p>
            <EligibilityFilter filters={eligFilters} setFilters={setEligFilters} />
          </div>

          {filtered.length === 0 ? (
            <EmptyState query={query} category={category} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
              {filtered.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  daysLeft={daysLeft}
                  urgencyClasses={urgencyClasses}
                  urgencyLabel={urgencyLabel}
                  isNew={isNew}
                />
              ))}
            </div>
          )}
        </section>

        <SavedJobs />
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { exams: examsData },
    revalidate: 3600,
  };
}
