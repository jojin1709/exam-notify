import { useState, useEffect } from "react";

export default function CountdownTimer({ lastDate }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!lastDate) return;

    const calculate = () => {
      const now = new Date();
      const target = new Date(lastDate);
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [lastDate]);

  if (!timeLeft) return null;

  const isUrgent = timeLeft.days <= 7;

  return (
    <div className={`flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono font-bold ${
      isUrgent ? "bg-danger-50 text-danger-600 border border-danger-200" : "bg-navy-50 text-navy-600 border border-navy-200"
    }`}>
      <svg className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isUrgent ? "text-danger-500" : "text-navy-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="whitespace-nowrap">
        {timeLeft.days > 0 && <>{timeLeft.days}d </>}
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
}
