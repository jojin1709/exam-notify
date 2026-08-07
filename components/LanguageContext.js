import { useState, useEffect } from "react";

const LANGUAGES = {
  en: { title: "Exam Notice Board", subtitle: "All India Government Job Notifications", search: "Search jobs...", notifications: "Notifications", closingSoon: "Closing Soon", daysLeft: "days left", dayLeft: "day left", closesToday: "Closes today", closed: "Closed", noDeadline: "No deadline", viewDetails: "View", save: "Save", saved: "Saved", calendar: "Calendar", share: "Share", back: "Back", notFound: "Not Found", apply: "Apply Now", disclaimer: "Verify on official website before applying.", savedJobs: "Saved Jobs", install: "Install", all: "All", showing: "Showing", source: "Source", category: "Category", location: "Location", published: "Published", salary: "Salary", eligibility: "Eligibility", examPattern: "Exam Pattern", papers: "Previous Papers", related: "Related Jobs", countdown: "Closes in" },
  ml: { title: "പരീക്ഷാ അറിയിപ്പ് ബോര്‍ഡ്", subtitle: "इന്ത്യ മുഴുവനുമുള്ള സര്‍ക്കാര്‍ ജോലി അറിയിപ്പുകൾ", search: "ജോലികൾ തിരയുക...", notifications: "അറിയിപ്പുകൾ", closingSoon: "ഉടന്‍ അവസാനിക്കുന്നു", daysLeft: "ദിവസം ബാക്കി", dayLeft: "ദിവസം ബാക്കി", closesToday: "ഇന്ന് അവസാനിക്കുന്നു", closed: "അടച്ചു", noDeadline: "തീയതി ഇല്ല", viewDetails: "വിശദാംശം", save: "സേവ്", saved: "സേവ് ചെയ്തു", calendar: "കലണ്ടർ", share: "പങ്കിടുക", back: "തിരികെ", notFound: "കണ്ടെത്തിയില്ല", apply: "അപേക്ഷിക്കുക", disclaimer: "ഔദ്യോഗിക വെബ്സൈറ്റിൽ പരിശോധിക്കുക.", savedJobs: "സേവ് ചെയ്ത ജോലികൾ", install: "ഇൻസ്റ്റാൾ", all: "എല്ലാം", showing: "കാണിക്കുന്നു", source: "സ്രോതസ്സ്", category: "വിഭാഗം", location: "സ്ഥലം", published: "പ്രസിദ്ധീകരിച്ചു", salary: "ശമ്പളം", eligibility: "യോഗ്യത", examPattern: "പരീക്ഷാ മാതൃക", papers: "മുൻ പേപ്പറുകൾ", related: "ബന്ധമുള്ള ജോലികൾ", countdown: "അവസാനിക്കുന്നത്" },
  hi: { title: "परीक्षा सूचना बोर्ड", subtitle: "भारत भर की सरकारी नौकरी सूचनाएं", search: "नौकरियां खोजें...", notifications: "सूचनाएं", closingSoon: "जल्द बंद", daysLeft: "दिन बाकी", dayLeft: "दिन बाकी", closesToday: "आज बंद", closed: "बंद", noDeadline: "समय सीमा नहीं", viewDetails: "विवरण", save: "सेव", saved: "सेव किया", calendar: "कैलेंडर", share: "साझा करें", back: "वापस", notFound: "नहीं मिला", apply: "आवेदन करें", disclaimer: "आधिकारिक वेबसाइट पर सत्यापित करें.", savedJobs: "सेव नौकरियां", install: "इंस्टॉल", all: "सभी", showing: "दिखा रहे", source: "स्रोत", category: "श्रेणी", location: "स्थान", published: "प्रकाशित", salary: "वेतन", eligibility: "पात्रता", examPattern: "पैटर्न", papers: "पिछले पेपर", related: "संबंधित नौकरियां", countdown: "बंद होने में" },
  ta: { title: "தேர்வு அறிவிப்பு", subtitle: "இந்தியா முழுவதும் அரசு வேலை அறிவிப்புகள்", search: "வேலைகள் தேடுங்கள்...", notifications: "அறிவிப்புகள்", closingSoon: "விரைவில் மூடப்படுகிறது", daysLeft: "நாட்கள் மீதம்", dayLeft: "நாள் மீதம்", closesToday: "இன்று மூடப்படுகிறது", closed: "மூடப்பட்டது", noDeadline: "கடைசி தேதி இல்லை", viewDetails: "விவரம்", save: "சேமி", saved: "சேமிக்கப்பட்டது", calendar: "காலண்டர்", share: "பகிர்", back: "பின்", notFound: "கிடைக்கவில்லை", apply: "விண்ணப்பி", disclaimer: "அதிகாரப்பூர்வ வலைதளத்தில் சரிபார்க்கவும்.", savedJobs: "சேமிக்கப்பட்ட வேலைகள்", install: "நிறுவு", all: "அனைத்தும்", showing: "காட்டுகிறது", source: "ஆதாரம்", category: "வகை", location: "இடம்", published: "வெளியிடப்பட்டது", salary: "சம்பளம்", eligibility: "தகுதி", examPattern: "தேர்வு முறை", papers: "முந்தைய தாள்கள்", related: "தொடர்புடைய வேலைகள்", countdown: "மூடப்படுவது" },
};

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("exam-lang") || "en";
    setLang(saved);
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("exam-lang", newLang);
    setShow(false);
    window.location.reload();
  };

  const t = LANGUAGES[lang] || LANGUAGES.en;

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 text-white/70 text-[11px] font-medium hover:bg-white/20 transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        {lang.toUpperCase()}
      </button>
      {show && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-navy-200 py-1 z-50 min-w-[100px]">
          {Object.keys(LANGUAGES).map((l) => (
            <button
              key={l}
              onClick={() => changeLang(l)}
              className={`w-full px-3 py-1.5 text-left text-xs font-medium ${lang === l ? "bg-navy-50 text-navy-900" : "text-navy-600 hover:bg-navy-50"}`}
            >
              {l === "en" ? "English" : l === "ml" ? "മലയാളം" : l === "hi" ? "हिन्दी" : "தமிழ்"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { LANGUAGES };
