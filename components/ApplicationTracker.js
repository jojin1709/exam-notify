import { useState, useEffect } from "react";

export default function ApplicationTracker({ exam }) {
  const [status, setStatus] = useState("none");

  useEffect(() => {
    const tracker = JSON.parse(localStorage.getItem("exam-tracker") || "{}");
    setStatus(tracker[exam.id] || "none");
  }, [exam.id]);

  const updateStatus = (newStatus) => {
    const tracker = JSON.parse(localStorage.getItem("exam-tracker") || "{}");
    if (newStatus === "none") {
      delete tracker[exam.id];
    } else {
      tracker[exam.id] = newStatus;
    }
    localStorage.setItem("exam-tracker", JSON.stringify(tracker));
    setStatus(newStatus);
  };

  const statusOptions = [
    { value: "none", label: "Not Applied", color: "bg-navy-100 text-navy-600" },
    { value: "interested", label: "Interested", color: "bg-saffron-100 text-saffron-700" },
    { value: "applied", label: "Applied", color: "bg-ashoka-100 text-ashoka-700" },
    { value: "completed", label: "Exam Done", color: "bg-blue-100 text-blue-700" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
      <span className="text-[10px] sm:text-xs font-medium text-navy-500">Status:</span>
      <div className="flex gap-1 flex-wrap">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateStatus(opt.value)}
            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-bold transition-all ${
              status === opt.value
                ? `${opt.color} ring-1 sm:ring-2 ring-offset-1 ring-navy-300`
                : "bg-navy-50 text-navy-400 hover:bg-navy-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
