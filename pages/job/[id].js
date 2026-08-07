import { useRouter } from "next/router";
import Head from "next/head";
import examsData from "@/data/exams.json";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";
import CalendarButton from "@/components/CalendarButton";
import ApplicationTracker from "@/components/ApplicationTracker";
import ExamInfoSection from "@/components/ExamInfoSection";
import RelatedJobs from "@/components/RelatedJobs";
import CountdownTimer from "@/components/CountdownTimer";

function daysLeft(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

export default function JobDetail({ exam, allExams }) {
  const router = useRouter();

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50/30 px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">Notification Not Found</h1>
          <p className="text-navy-500 text-sm mb-4">This notification may have been removed.</p>
          <button onClick={() => router.push("/")} className="px-4 py-2 bg-navy-900 text-white rounded-lg font-medium text-sm hover:bg-navy-800">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const days = daysLeft(exam.lastDate);
  const isClosed = days !== null && days < 0;
  const isUrgent = days !== null && days >= 0 && days <= 7;

  return (
    <>
      <Head>
        <title>{exam.title} — Exam Notice Board</title>
        <meta name="description" content={`${exam.source} notification — ${exam.title}`} />
      </Head>

      <main className="min-h-screen bg-navy-50/30">
        {/* Header bar */}
        <div className="bg-navy-900 text-white sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => router.push("/")} className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">Back</span>
            </button>
            <span className="text-xs sm:text-sm font-bold">Exam Notice Board</span>
            <div className="w-16" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
          {/* Main card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-navy-100 shadow-card overflow-hidden">
            {/* Status bar */}
            <div className={`px-4 sm:px-6 py-2.5 sm:py-3 ${isClosed ? "bg-navy-100" : isUrgent ? "bg-danger-50" : "bg-ashoka-50"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs sm:text-sm font-bold ${isClosed ? "text-navy-500" : isUrgent ? "text-danger-600" : "text-ashoka-600"}`}>
                  {isClosed ? "Closed" : isUrgent ? `${days}d left` : `${days} days left`}
                </span>
                {!isClosed && exam.lastDate && (
                  <CountdownTimer lastDate={exam.lastDate} />
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Source & category */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-navy-50 text-navy-700 text-[10px] sm:text-xs font-bold border border-navy-200">{exam.source}</span>
                <span className="px-2.5 py-1 rounded-lg bg-navy-50 text-navy-500 text-[10px] sm:text-xs font-medium">{exam.category}</span>
                {exam.location && (
                  <span className="flex items-center gap-1 text-[10px] sm:text-xs text-navy-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exam.location}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-navy-900 mb-3 sm:mb-4 leading-tight">
                {exam.title}
              </h1>

              {/* Reference */}
              {exam.refNo && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-500 mb-4 sm:mb-6">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="font-mono">{exam.refNo}</span>
                </div>
              )}

              {/* Application Tracker */}
              <div className="mb-4">
                <ApplicationTracker exam={exam} />
              </div>

              {/* Actions - mobile: 2 columns */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-6">
                <a
                  href={exam.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-navy-900 text-white rounded-xl font-bold text-sm hover:bg-navy-800 transition-colors"
                >
                  Apply on Official Website
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <CalendarButton exam={exam} />
                <BookmarkButton exam={exam} />
              </div>

              {/* Info section */}
              <ExamInfoSection exam={exam} />

              {/* Share */}
              <div className="border-t border-navy-100 pt-4 sm:pt-6 mt-6">
                <p className="text-xs sm:text-sm font-semibold text-navy-700 mb-3">Share this notification</p>
                <ShareButtons exam={exam} />
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-navy-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-0.5 sm:mb-1">Source</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900">{exam.source}</p>
                </div>
                <div className="bg-navy-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-0.5 sm:mb-1">Category</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900">{exam.category}</p>
                </div>
                <div className="bg-navy-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-0.5 sm:mb-1">Location</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900">{exam.location || "All India"}</p>
                </div>
                <div className="bg-navy-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-navy-400 mb-0.5 sm:mb-1">Published</p>
                  <p className="text-xs sm:text-sm font-bold text-navy-900">
                    {exam.publishedDate ? new Date(exam.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Jobs */}
          <RelatedJobs currentExam={exam} allExams={allExams} />

          {/* Disclaimer */}
          <div className="mt-4 sm:mt-6 bg-saffron-50 border border-saffron-200 rounded-xl p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-saffron-800">
              <strong>Disclaimer:</strong> This notification is scraped from official sources. Always verify details on the official website before applying.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = examsData.map((exam) => ({ params: { id: exam.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const exam = examsData.find((e) => e.id === params.id);
  if (!exam) return { notFound: true };
  return { props: { exam, allExams: examsData } };
}
