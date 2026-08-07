import { useLang } from "./LanguageContext";

export default function ShareButtons({ exam }) {
  const { t } = useLang();
  const text = `${exam.title} \u2014 ${exam.source} (${exam.location || "All India"})`;
  const url = typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = [
    { name: "WhatsApp", color: "bg-green-500 hover:bg-green-600", url: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}` },
    { name: "Telegram", color: "bg-blue-500 hover:bg-blue-600", url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
    { name: "Twitter", color: "bg-black hover:bg-gray-800", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {shareLinks.map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white text-[11px] sm:text-xs font-medium ${link.color} transition-colors`}>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>
          <span className="hidden sm:inline">{link.name}</span>
        </a>
      ))}
      <button onClick={() => { navigator.clipboard.writeText(url); alert(t.linkCopied); }}
        className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-white text-[11px] sm:text-xs font-medium bg-navy-600 hover:bg-navy-700 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span className="hidden sm:inline">{t.copyLink}</span>
      </button>
    </div>
  );
}
