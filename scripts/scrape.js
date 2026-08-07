/**
 * scrape.js
 * ------------------------------------------------------------------
 * Multi-source scraper with Playwright for JS-rendered sites.
 * Fetches real notifications from official government websites.
 *
 * Run:  npm run scrape
 * ------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const DATA_PATH = path.join(__dirname, "..", "data", "exams.json");
const TIMEOUT = 20000;
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function toIsoDate(str) {
  const match = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/.exec(str || "");
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}

function slugify(str) {
  return str
    .replace(/https?:\/\/[^\s]+/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()
    .slice(0, 80)
    .replace(/-+$/, "");
}

// ─── Kerala PSC (static HTML) ────────────────────────────────────
async function scrapeKeralaPsc() {
  const url = "https://www.keralapsc.gov.in/notifications";
  const { data: html } = await axios.get(url, {
    headers: { "User-Agent": UA },
    timeout: TIMEOUT,
  });
  const $ = cheerio.load(html);
  const results = [];

  $("table tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 3) return;

    const titleLink = $(cells[0]).find("a").first();
    const title = (titleLink.text() || $(cells[0]).text()).trim();
    let href = titleLink.attr("href") || "";
    if (href && !href.startsWith("http")) {
      href = `https://www.keralapsc.gov.in${href}`;
    }
    const refNo = $(cells[1]).text().trim();
    const lastDate = toIsoDate($(cells[2]).text().trim());

    if (!title || !href) return;

    results.push({
      id: `psc-${slugify(href)}`,
      title,
      category: "State PSC",
      refNo,
      lastDate,
      publishedDate: new Date().toISOString().slice(0, 10),
      url: href,
      source: "Kerala PSC",
      location: "Kerala",
    });
  });
  return results;
}

// ─── Playwright scraper for JS-rendered sites ─────────────────────
async function scrapeWithPlaywright(url, extractor, source, category, location) {
  let browser;
  try {
    const { chromium } = require("playwright");
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(3000);

    const items = await page.evaluate(extractor);
    await browser.close();

    return items.map((item) => ({
      id: `${slugify(source)}-${slugify(item.title)}`,
      title: item.title,
      category,
      refNo: item.refNo || "",
      lastDate: item.lastDate || null,
      publishedDate: new Date().toISOString().slice(0, 10),
      url: item.url || url,
      source,
      location,
    }));
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error(`  ${source} Playwright scrape failed: ${err.message}`);
    return [];
  }
}

// ─── UPSC (Playwright) ───────────────────────────────────────────
async function scrapeUpsc() {
  return scrapeWithPlaywright(
    "https://www.upsc.gov.in/examinations/active-examinations",
    () => {
      const results = [];
      document.querySelectorAll("table tbody tr, .exam-item, li a").forEach((el) => {
        const link = el.tagName === "A" ? el : el.querySelector("a");
        if (!link) return;
        const title = link.textContent.trim();
        const href = link.href;
        if (!title || !href || title.length < 10) return;
        if (/^(home|about|contact|site map|menu|toggle|skip)/i.test(title)) return;
        if (!/exam|recruit|civil|engineering|medical|nda|cds|capf|ese|cms|combined|cse/i.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    "UPSC",
    "UPSC",
    "All India"
  );
}

// ─── SSC (Playwright) ────────────────────────────────────────────
async function scrapeSsc() {
  return scrapeWithPlaywright(
    "https://ssc.gov.in",
    () => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = el.textContent.trim();
        const href = el.href;
        if (!title || !href || title.length < 8) return;
        if (!/cgl|chsl|mts|stenographer|selection.*post|constable|si|cpo|je|gd|recruitment/i.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    "SSC",
    "Central Govt",
    "All India"
  );
}

// ─── IBPS (Playwright) ───────────────────────────────────────────
async function scrapeIbps() {
  return scrapeWithPlaywright(
    "https://ibps.in",
    () => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = el.textContent.trim();
        const href = el.href;
        if (!title || !href || title.length < 10) return;
        if (!/clerk|po|officer|rrb|specialist|recruit|ibps.*notification/i.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    "IBPS",
    "Banking",
    "All India"
  );
}

// ─── RRB (Playwright) ────────────────────────────────────────────
async function scrapeRrb() {
  return scrapeWithPlaywright(
    "https://rrbapply.gov.in",
    () => {
      const results = [];
      document.querySelectorAll("a").forEach((el) => {
        const title = el.textContent.trim();
        const href = el.href;
        if (!title || !href || title.length < 10) return;
        if (!/ntpc|group.*d|alp|technician|je|constable|recruitment|rrb.*notification/i.test(title)) return;
        results.push({ title, url: href });
      });
      return results;
    },
    "RRB",
    "Railways",
    "All India"
  );
}

// ─── Main merge logic ────────────────────────────────────────────
async function main() {
  const scrapers = [
    { name: "Kerala PSC", fn: scrapeKeralaPsc },
    { name: "UPSC", fn: scrapeUpsc },
    { name: "SSC", fn: scrapeSsc },
    { name: "IBPS", fn: scrapeIbps },
    { name: "RRB", fn: scrapeRrb },
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
    try {
      existing = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    } catch {
      existing = [];
    }
  }

  const byId = new Map(existing.map((e) => [e.id, e]));
  let added = 0;
  for (const item of allScraped) {
    if (!byId.has(item.id)) added += 1;
    const prev = byId.get(item.id);
    byId.set(item.id, {
      ...item,
      publishedDate: prev?.publishedDate || item.publishedDate,
    });
  }

  const merged = Array.from(byId.values());
  fs.writeFileSync(DATA_PATH, JSON.stringify(merged, null, 2) + "\n");
  console.log(`\nWrote ${merged.length} total notifications (${added} new) to data/exams.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
