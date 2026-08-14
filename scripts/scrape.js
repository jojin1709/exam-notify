/**
 * scrape.js — Multi-source scraper with Playwright + static HTML
 * Run: npm run scrape
 */
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const DATA_PATH = path.join(__dirname, "..", "data", "exams.json");
const TIMEOUT = 20000;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Titles/links that are navigation pages, not job notifications
const JUNK_RE = /about-?us|background|setup\s*of|function\s*of|vision|mission|objectives|old\s+website|policies|guidelines|rules\s*&|social\s+responsibility|debarred|recruitment\s+exams?|^recruitment$|contact\s*us|^faq$|^rti$|^sitemap$|^home$|feedback|privacy|terms\s+of|disclaimer|^advertisement$|photo\s*gallery|citizen\s*charter|gazette|extra\s*ordinary|scheme\s+of\s+examination|examination\s+calendar|tentative\s+vacancy|scribe\s+procedure|browse\s+by\s+examinations/i;

function cleanText(str) {
  return (str || "").replace(/\s+/g, " ").trim();
}

function parseDate(str) {
  if (!str) return null;
  const s = String(str).trim();
  let m = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/.exec(s); // yyyy-mm-dd
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(s); // dd-mm-yyyy
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  m = /(\d{1,2})\s*[-.\s]\s*([A-Za-z]{3,9})\s*[-.\s]\s*(\d{4})/.exec(s); // dd-Mon-yyyy
  if (m) {
    const months = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
    const mo = months[m[2].slice(0, 3).toLowerCase()];
    if (mo) return `${m[3]}-${String(mo).padStart(2, "0")}-${String(Number(m[1])).padStart(2, "0")}`;
  }
  return null;
}

function slugify(str) {
  return str
    .replace(/https?:\/\/[^\s]+/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()
    .slice(0, 80)
    .replace(/^-+|-+$/g, "");
}

// Stable id with a fallback when the title is too short to slugify
function makeId(source, title, url) {
  const base = slugify(title);
  if (base && base.length >= 5) return `${slugify(source)}-${base}`;
  let h = 5381;
  const str = `${source}|${title}|${url}`;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return `${slugify(source)}-x${(h >>> 0).toString(36)}`;
}

// Default details per source, applied when scraping does not provide them.
// Keeps cards/detail pages informative and enables eligibility filtering everywhere.
const ENRICHMENT = {
  "Kerala PSC": {
    salary: "₹19,900 - ₹63,200 (Level 10-12)", eligibility: "Degree from a recognized university, Age 18-36",
    education: "graduation", age: "18-36", caste: "all",
    examPattern: "Written Exam (OMR) + Interview", selectionProcess: "Written Exam → Interview",
    applicationFee: "₹0", vacancies: "Multiple", nationality: "Indian",
  },
  "UPSC": {
    salary: "₹56,100 - ₹1,77,500 (Level 10)", eligibility: "Bachelor's Degree from a recognized university",
    education: "graduation", age: "21-32", caste: "all",
    examPattern: "Prelims (Objective) + Mains (Descriptive) + Interview", selectionProcess: "Prelims → Mains → Interview",
    applicationFee: "₹100", vacancies: "Varies by examination", nationality: "Indian",
  },
  "SSC": {
    salary: "Pay Level 3-10 depending on post", eligibility: "10th/12th/Graduate depending on post",
    education: "12th", age: "18-30", caste: "all",
    examPattern: "Tier 1 (CBT) + Tier 2 (CBT)", selectionProcess: "CBT Tier 1 → CBT Tier 2 → Skill/DV",
    applicationFee: "₹100", vacancies: "Varies by post", nationality: "Indian",
  },
  "IBPS": {
    salary: "₹23,700 - ₹42,020 (Clerk) / ₹36,000 - ₹63,840 (PO)", eligibility: "Graduate from a recognized university",
    education: "graduation", age: "20-30", caste: "all",
    examPattern: "Prelims + Mains + Interview", selectionProcess: "Prelims → Mains → Interview/DV",
    applicationFee: "₹850 (Gen/OBC)", vacancies: "Varies by CRP", nationality: "Indian",
  },
  "RRB": {
    salary: "Pay Level 1-6 depending on post", eligibility: "10th/ITI/12th/Diploma depending on post",
    education: "10th", age: "18-33", caste: "all",
    examPattern: "CBT 1 + CBT 2 + Typing/AV test", selectionProcess: "CBT 1 → CBT 2 → Skill/Medical",
    applicationFee: "₹500", vacancies: "Varies by zone", nationality: "Indian",
  },
  "Indian Army": {
    salary: "Pay Level 3+ depending on entry", eligibility: "10th/12th/Graduate depending on entry",
    education: "12th", age: "17.5-25", caste: "all",
    examPattern: "Written + Physical Test + Medical", selectionProcess: "Written → Physical → Medical",
    applicationFee: "₹0", vacancies: "Varies by entry", nationality: "Indian",
  },
  "Indian Navy": {
    salary: "Pay Level 3+ depending on entry", eligibility: "10th/12th/Graduate depending on entry",
    education: "12th", age: "17.5-25", caste: "all",
    examPattern: "Written + Physical Test + Medical", selectionProcess: "Written → Physical → Medical",
    applicationFee: "₹0", vacancies: "Varies by entry", nationality: "Indian",
  },
  "Indian Air Force": {
    salary: "Pay Level 3+ depending on entry", eligibility: "10th/12th/Graduate depending on entry",
    education: "12th", age: "17.5-25", caste: "all",
    examPattern: "Written + Physical Test + Medical", selectionProcess: "Written → Physical → Medical",
    applicationFee: "₹0", vacancies: "Varies by entry", nationality: "Indian",
  },
  "Indian Coast Guard": {
    salary: "Pay Level 3+ depending on entry", eligibility: "10th/12th/Graduate depending on entry",
    education: "12th", age: "18-22", caste: "all",
    examPattern: "Written + Physical Test + Medical", selectionProcess: "Written → Physical → Medical",
    applicationFee: "₹0", vacancies: "Varies by entry", nationality: "Indian",
  },
  "SBI": {
    salary: "₹41,960 - ₹63,840 (PO) / ₹27,720 - ₹42,020 (Clerk)", eligibility: "Graduate from a recognized university",
    education: "graduation", age: "20-30", caste: "all",
    examPattern: "Prelims + Mains + Interview", selectionProcess: "Prelims → Mains → Interview/DV",
    applicationFee: "₹750 (Gen/OBC)", vacancies: "Varies by post", nationality: "Indian",
  },
  "RBI": {
    salary: "₹45,050 - ₹89,940 (Officer Grade B)", eligibility: "Graduate/Post Graduate depending on post",
    education: "graduation", age: "21-30", caste: "all",
    examPattern: "Phase 1 + Phase 2 + Interview", selectionProcess: "Phase 1 → Phase 2 → Interview",
    applicationFee: "₹850 (Gen/OBC)", vacancies: "Varies by post", nationality: "Indian",
  },
  "KVS": {
    salary: "Pay Level 4-8 depending on post", eligibility: "Graduate + B.Ed (Teacher posts)",
    education: "graduation", age: "18-40", caste: "all",
    examPattern: "CBT + Interview/Trade Test", selectionProcess: "CBT → Interview",
    applicationFee: "₹1,000 (Gen/OBC)", vacancies: "Varies by post", nationality: "Indian",
  },
  "AIIMS": {
    salary: "Pay Level 6+ depending on post", eligibility: "Post Graduate/Medical degree depending on post",
    education: "post-graduation", age: "18-40", caste: "all",
    examPattern: "Written + Interview", selectionProcess: "Written → Interview",
    applicationFee: "₹1,500 (Gen/OBC)", vacancies: "Varies by post", nationality: "Indian",
  },
  "TNPSC": {
    salary: "Pay Level 12+ depending on post", eligibility: "Graduate/Post Graduate depending on post",
    education: "graduation", age: "18-32", caste: "all",
    examPattern: "Prelims + Mains + Interview", selectionProcess: "Prelims → Mains → Interview",
    applicationFee: "₹200 (Gen/OBC)", vacancies: "Varies by notification", nationality: "Indian",
  },
};

function finalizeItems(rawItems, source, category, location, fallbackUrl = "") {
  const seen = new Set();
  const out = [];
  const extra = ENRICHMENT[source] || {};
  for (const item of rawItems) {
    const title = cleanText(item.title);
    const url = item.url || fallbackUrl;
    if (!title || title.length < 10) continue;
    if (/^(#|javascript:|mailto:)/i.test(url)) continue;
    if (JUNK_RE.test(title)) continue;
    const id = makeId(source, title, url);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({
      ...extra,
      id,
      title,
      category,
      refNo: item.refNo || "",
      lastDate: item.lastDate ? parseDate(item.lastDate) : null,
      publishedDate: item.publishedDate || new Date().toISOString().slice(0, 10),
      url,
      source,
      location,
    });
  }
  return out;
}

// ─── Playwright scraper for JS-rendered sites ─────────────────────
async function scrapeWithPlaywright(url, extractor, opts = {}, timeout = 30000) {
  let browser;
  try {
    const { chromium } = require("playwright");
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout });
    await page.waitForTimeout(5000);
    const items = await page.evaluate(extractor, opts);
    await browser.close();
    return Array.isArray(items) ? items : [];
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error(`  Playwright failed (${url}): ${err.message}`);
    return [];
  }
}

// ─── Kerala PSC (static HTML) ────────────────────────────────────
async function scrapeKeralaPsc() {
  try {
    const url = "https://www.keralapsc.gov.in/notifications";
    const { data: html } = await axios.get(url, { headers: { "User-Agent": UA }, timeout: TIMEOUT });
    const $ = cheerio.load(html);
    const raw = [];
    $("table tbody tr").each((_, row) => {
      const cells = $(row).find("td");
      if (cells.length < 3) return;
      const titleLink = $(cells[0]).find("a").first();
      const title = cleanText(titleLink.text() || $(cells[0]).text());
      let href = titleLink.attr("href") || "";
      if (!title || !href) return;
      if (!href.startsWith("http")) href = `https://www.keralapsc.gov.in${href.startsWith("/") ? "" : "/"}${href}`;
      raw.push({
        title,
        url: href,
        refNo: cleanText($(cells[1]).text()),
        lastDate: parseDate($(cells[2]).text()),
      });
    });
    return finalizeItems(raw, "Kerala PSC", "State PSC", "Kerala", url);
  } catch (err) {
    console.error(`  Kerala PSC failed: ${err.message}`);
    return [];
  }
}

// ─── UPSC (Playwright) ───────────────────────────────────────────
async function scrapeUpsc() {
  const raw = await scrapeWithPlaywright(
    "https://www.upsc.gov.in/examinations/active-examinations",
    (opts) => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = (el.textContent || "").replace(/\s+/g, " ").trim();
        const href = el.href || "";
        if (title.length < 15) return;
        if (opts.junk.test(title)) return;
        if (!/(exam|recruit|civil|engineering|medical|nda|cds|capf|ese|cms|combined|cse|so|steno|notification|apply)/i.test(title)) return;
        if (!/upsc\.gov\.in/.test(href)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    { junk: JUNK_RE }
  );
  return finalizeItems(raw, "UPSC", "UPSC", "All India", "https://www.upsc.gov.in");
}

// ─── SSC (Playwright) ────────────────────────────────────────────
async function scrapeSsc() {
  const raw = await scrapeWithPlaywright(
    "https://ssc.gov.in",
    (opts) => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = (el.textContent || "").replace(/\s+/g, " ").trim();
        const href = el.href || "";
        if (title.length < 15) return;
        if (opts.junk.test(title)) return;
        if (!/(cgl|chsl|mts|stenographer|selection\s*post|constable|si|cpo|je|gd|recruit|notification|exam|apply|vacancy)/i.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    { junk: JUNK_RE }
  );
  return finalizeItems(raw, "SSC", "Central Govt", "All India", "https://ssc.gov.in");
}

// ─── IBPS (Playwright + URL allowlist) ───────────────────────────
async function scrapeIbps() {
  const raw = await scrapeWithPlaywright(
    "https://www.ibps.in",
    (opts) => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = (el.textContent || "").replace(/\s+/g, " ").trim();
        const href = el.href || "";
        if (title.length < 8) return;
        if (/^(#|javascript:|mailto:)/.test(href)) return;
        if (opts.junk.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    { junk: JUNK_RE }
  );

  const ALLOW_URL = /ibpsreg\.ibps\.in|wp-content\/uploads|index\.php\/(management-trainees|specialist-officers|clerical-cadre|regional-rural-bank|recruitment)/i;

  return raw
    .filter((it) => ALLOW_URL.test(it.url))
    .filter((it) => /recruit|apply|notification|registration|candidate|vacancy/i.test(it.title) || /ibpsreg\.ibps\.in/.test(it.url))
    .map((it) => {
      const reg = it.title.match(/Registration\s*From\s*(\d{1,2}-[A-Za-z]{3}-\d{4})/i);
      return {
        ...it,
        title: cleanText(it.title.replace(/\s*Registration\s*From\s*(\d{1,2}-[A-Za-z]{3}-\d{4})\s*$/i, "")),
        publishedDate: reg ? parseDate(reg[1]) : new Date().toISOString().slice(0, 10),
      };
    });
}

// ─── RRB (Playwright) ────────────────────────────────────────────
async function scrapeRrb() {
  const raw = await scrapeWithPlaywright(
    "https://rrbapply.gov.in",
    (opts) => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = (el.textContent || "").replace(/\s+/g, " ").trim();
        const href = el.href || "";
        if (title.length < 12) return;
        if (opts.junk.test(title)) return;
        if (!/(ntpc|group\s*d|alp|technician|je|constable|rpf|recruit|notification|apply|vacancy)/i.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    { junk: JUNK_RE }
  );
  return finalizeItems(raw, "RRB", "Railways", "All India", "https://rrbapply.gov.in");
}

// ─── Defense (static) ────────────────────────────────────────────
async function scrapeDefense() {
  try {
    const base = "https://www.joinindianarmy.nic.in";
    const { data: html } = await axios.get(base, { headers: { "User-Agent": UA }, timeout: TIMEOUT });
    const $ = cheerio.load(html);
    const raw = [];
    $("a").each((_, el) => {
      const title = cleanText($(el).text());
      const href = $(el).attr("href") || "";
      if (title.length < 12) return;
      if (JUNK_RE.test(title)) return;
      if (!/(recruit|notification|rally|agniveer|tes|ssc.*tech|nda|cds|join.*army|apply)/i.test(title)) return;
      let fullUrl = href.startsWith("http") ? href : `${base}${href.startsWith("/") ? "" : "/"}${href}`;
      raw.push({ title, url: fullUrl });
    });
    return finalizeItems(raw, "Indian Army", "Defense", "All India", base);
  } catch (err) {
    console.error(`  Defense failed: ${err.message}`);
    return [];
  }
}

// ─── Config-driven static scrapers (news/notices sections) ────────
const STATIC_SOURCES = [
  { name: "Indian Navy", category: "Defense", location: "All India", base: "https://www.joinindiannavy.gov.in", url: "https://www.joinindiannavy.gov.in/en/news-and-events.html", selector: "a", keyword: /recruit|notification|apply|sailor|agniveer|ssr|mr|aa|je|officer|entry/i },
  { name: "Indian Air Force", category: "Defense", location: "All India", base: "https://indianairforce.nic.in", url: "https://indianairforce.nic.in/", selector: "a", keyword: /recruit|notification|apply|agniveer|airman|officer|entry|eligibility/i },
  { name: "Indian Coast Guard", category: "Defense", location: "All India", base: "https://joinindiancoastguard.cdac.in", url: "https://joinindiancoastguard.cdac.in/", selector: "a", keyword: /recruit|notification|apply|navik|yantrik|assistant|officer|entry/i },
  { name: "SBI", category: "Banking", location: "All India", base: "https://sbi.co.in", url: "https://sbi.co.in/web/careers/current-openings", selector: "a", keyword: /recruit|notification|apply|cadre|officer|associate|clerk|specialist|vacancy/i },
  { name: "RBI", category: "Banking", location: "All India", base: "https://www.rbi.org.in", url: "https://www.rbi.org.in/Scripts/BS_ViewNotifications.aspx", selector: "a", keyword: /recruit|apply|notification|officer|assistant|grade|vacancy/i },
  { name: "KVS", category: "Education", location: "All India", base: "https://kvsangathan.nic.in", url: "https://kvsangathan.nic.in/", selector: "a", keyword: /recruit|notification|apply|teacher|principal|vacancy|vacancies/i },
  { name: "AIIMS", category: "Health", location: "All India", base: "https://www.aiims.edu", url: "https://www.aiims.edu/en/recruitment.html", selector: "a", keyword: /recruit|notification|apply|vacancy|faculty|officer|nurse/i },
  { name: "TNPSC", category: "State PSC", location: "Tamil Nadu", base: "https://www.tnpsc.gov.in", url: "https://www.tnpsc.gov.in/", selector: "a", keyword: /notification|recruit|apply|exam|vacancy|group/i },
];

async function scrapeStaticLinks(cfg) {
  try {
    const { data: html } = await axios.get(cfg.url, { headers: { "User-Agent": UA }, timeout: TIMEOUT });
    const $ = cheerio.load(html);
    const host = new URL(cfg.base).hostname;
    const raw = [];
    $(cfg.selector).each((_, el) => {
      const title = cleanText($(el).text());
      const href = $(el).attr("href") || "";
      if (title.length < 12) return;
      if (JUNK_RE.test(title)) return;
      if (/^(#|javascript:|mailto:)/.test(href)) return;
      if (!cfg.keyword.test(title)) return;
      if (href.startsWith("http") && !href.includes(host)) return;
      let fullUrl = href.startsWith("http") ? href : `${cfg.base}${href.startsWith("/") ? "" : "/"}${href}`;
      raw.push({ title, url: fullUrl });
    });
    return finalizeItems(raw, cfg.name, cfg.category, cfg.location, cfg.url);
  } catch (err) {
    console.error(`  ${cfg.name} failed: ${err.message}`);
    return [];
  }
}

// ─── Main merge logic ────────────────────────────────────────────
async function main() {
  const scrapers = [
    { name: "Kerala PSC", fn: scrapeKeralaPsc },
    { name: "UPSC", fn: scrapeUpsc },
    { name: "SSC", fn: scrapeSsc },
    { name: "IBPS", fn: scrapeIbps },
    { name: "RRB", fn: scrapeRrb },
    { name: "Indian Army", fn: scrapeDefense },
    ...STATIC_SOURCES.map((cfg) => ({ name: cfg.name, fn: () => scrapeStaticLinks(cfg) })),
  ];

  let allScraped = [];
  for (const scraper of scrapers) {
    try {
      console.log(`Scraping ${scraper.name}...`);
      const items = await scraper.fn();
      console.log(`  Found ${items.length} notifications.`);
      allScraped.push(...items);
    } catch (err) {
      console.error(`  ${scraper.name} scrape failed: ${err.message}`);
    }
  }

  let existing = [];
  if (fs.existsSync(DATA_PATH)) {
    try { existing = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8")); } catch { existing = []; }
  }

  const byId = new Map(existing.map((e) => [e.id, e]));
  const byUrl = new Map(existing.filter((e) => e.url).map((e) => [e.url, e]));
  let added = 0;

  for (const item of allScraped) {
    if (!item.id || !item.title) continue;
    if (item.url && byUrl.has(item.url)) continue; // same link already known
    if (!byId.has(item.id)) added += 1;
    const prev = byId.get(item.id);
    byId.set(item.id, { ...item, publishedDate: prev?.publishedDate || item.publishedDate });
    if (item.url) byUrl.set(item.url, item);
  }

  const merged = Array.from(byId.values());
  fs.writeFileSync(DATA_PATH, JSON.stringify(merged, null, 2) + "\n");
  console.log(`\nWrote ${merged.length} total notifications (${added} new) to data/exams.json`);
}

main().catch((err) => { console.error(err); process.exit(1); });
