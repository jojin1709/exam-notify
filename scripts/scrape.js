/**
 * scrape.js
 * ------------------------------------------------------------------
 * Multi-source scraper for Indian government job notifications.
 * Only adds data that is actually scraped from official websites.
 * No fake or placeholder data.
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
  // Handle DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY
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

// ─── Kerala PSC ──────────────────────────────────────────────────
// Confirmed working: Drupal-based site, serves static HTML table.
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

// ─── UPSC ────────────────────────────────────────────────────────
// UPSC notifications page
async function scrapeUpsc() {
  const urls = [
    "https://www.upsc.gov.in/examinations/active-examinations",
    "https://www.upsc.gov.in/examinations",
    "https://upsc.gov.in/examinations/active-examinations",
  ];
  for (const url of urls) {
    try {
      const { data: html } = await axios.get(url, {
        headers: { "User-Agent": UA },
        timeout: TIMEOUT,
      });
      const $ = cheerio.load(html);
      const results = [];

      // Look for table rows with exam notifications
      $("table tbody tr").each((_, row) => {
        const link = $(row).find("a").first();
        const title = link.text().trim();
        let href = link.attr("href") || "";
        if (href && !href.startsWith("http")) {
          href = `https://www.upsc.gov.in${href}`;
        }

        // Must be an actual exam, not navigation
        if (!title || !href || title.length < 15) return;
        if (!/examination|recruitment|combined civil|engineering services|medical|nda|cds|capf|eso|ies|cse|nda.*na|cms|so.*steno/i.test(title)) return;
        // Skip generic navigation
        if (/^(examination|recruitment|active|forthcoming|marks|representation|status|online|website|union territories)/i.test(title)) return;

        results.push({
          id: `upsc-${slugify(title)}`,
          title,
          category: "UPSC",
          refNo: "",
          lastDate: null,
          publishedDate: new Date().toISOString().slice(0, 10),
          url: href,
          source: "UPSC",
          location: "All India",
        });
      });

      // Also try list items
      $("li a, .exam-item a").each((_, el) => {
        const title = $(el).text().trim();
        let href = $(el).attr("href") || "";
        if (href && !href.startsWith("http")) {
          href = `https://www.upsc.gov.in${href}`;
        }

        if (!title || !href || title.length < 15) return;
        if (!/civil services|engineering|medical|nda|cds|capf|eso|combined|recruitment.*examination/i.test(title)) return;
        if (/^(examination|recruitment|active|forthcoming|marks)/i.test(title)) return;

        results.push({
          id: `upsc-${slugify(title)}`,
          title,
          category: "UPSC",
          refNo: "",
          lastDate: null,
          publishedDate: new Date().toISOString().slice(0, 10),
          url: href,
          source: "UPSC",
          location: "All India",
        });
      });

      if (results.length > 0) return results;
    } catch {
      continue;
    }
  }
  return [];
}

// ─── SSC ─────────────────────────────────────────────────────────
// SSC site is JS-rendered, but we try multiple approaches.
async function scrapeSsc() {
  const urls = [
    "https://ssc.gov.in/portal/ExaminationNoticeDetail",
    "https://ssc.nic.in/portal/ExaminationNoticeDetail",
    "https://ssc.gov.in",
  ];
  for (const url of urls) {
    try {
      const { data: html } = await axios.get(url, {
        headers: { "User-Agent": UA },
        timeout: TIMEOUT,
      });
      const $ = cheerio.load(html);
      const results = [];

      $("a").each((_, el) => {
        const title = $(el).text().trim();
        let href = $(el).attr("href") || "";
        if (href && !href.startsWith("http")) {
          href = `https://ssc.gov.in${href}`;
        }

        if (!title || !href || title.length < 8) return;
        if (!/exam|recruit|cgl|chsl|mts|stenographer|selection|constable|si|cpo|je|gd/i.test(title)) return;

        results.push({
          id: `ssc-${slugify(title)}`,
          title,
          category: "Central Govt",
          refNo: "",
          lastDate: null,
          publishedDate: new Date().toISOString().slice(0, 10),
          url: href,
          source: "SSC",
          location: "All India",
        });
      });
      if (results.length > 0) return results;
    } catch {
      continue;
    }
  }
  return [];
}

// ─── IBPS ────────────────────────────────────────────────────────
async function scrapeIbps() {
  const urls = [
    "https://ibps.in",
    "https://www.ibps.in",
    "https://ibps.in/web-content/crp-recruitment-notifications.html",
  ];
  for (const url of urls) {
    try {
      const { data: html } = await axios.get(url, {
        headers: { "User-Agent": UA },
        timeout: TIMEOUT,
      });
      const $ = cheerio.load(html);
      const results = [];

      $("a").each((_, el) => {
        const title = $(el).text().trim();
        let href = $(el).attr("href") || "";
        if (href && !href.startsWith("http")) {
          href = new URL(href, url).href;
        }

        if (!title || !href || title.length < 10) return;
        if (!/clerk|po|officer|rrb|specialist|recruit|ibps/i.test(title)) return;

        results.push({
          id: `ibps-${slugify(title)}`,
          title,
          category: "Banking",
          refNo: "",
          lastDate: null,
          publishedDate: new Date().toISOString().slice(0, 10),
          url: href,
          source: "IBPS",
          location: "All India",
        });
      });
      if (results.length > 0) return results;
    } catch {
      continue;
    }
  }
  return [];
}

// ─── TNPSC (Tamil Nadu) ──────────────────────────────────────────
async function scrapeTnpsc() {
  try {
    const url = "https://www.tnpsc.gov.in/notifications/notifications.html";
    const { data: html } = await axios.get(url, {
      headers: { "User-Agent": UA },
      timeout: TIMEOUT,
    });
    const $ = cheerio.load(html);
    const results = [];

    $("table tbody tr a, .notification-list a").each((_, el) => {
      const title = $(el).text().trim();
      let href = $(el).attr("href") || "";
      if (href && !href.startsWith("http")) {
        href = `https://www.tnpsc.gov.in${href}`;
      }

      if (!title || !href || title.length < 5) return;
      if (!/exam|recruit|group|notification|combined/i.test(title)) return;

      results.push({
        id: `tnpsc-${slugify(title)}`,
        title,
        category: "State PSC",
        refNo: "",
        lastDate: null,
        publishedDate: new Date().toISOString().slice(0, 10),
        url: href,
        source: "TNPSC",
        location: "Tamil Nadu",
      });
    });
    return results;
  } catch {
    return [];
  }
}

// ─── UPPSC (Uttar Pradesh) ───────────────────────────────────────
async function scrapeUppsc() {
  try {
    const url = "https://www.uppsc.up.nic.in/ExamNotifications.aspx";
    const { data: html } = await axios.get(url, {
      headers: { "User-Agent": UA },
      timeout: TIMEOUT,
    });
    const $ = cheerio.load(html);
    const results = [];

    $("table tbody tr a, .notification-link").each((_, el) => {
      const title = $(el).text().trim();
      let href = $(el).attr("href") || "";
      if (href && !href.startsWith("http")) {
        href = `https://www.uppsc.up.nic.in${href}`;
      }

      if (!title || !href || title.length < 5) return;
      if (!/exam|recruit|combined|review|assistant|pcs/i.test(title)) return;

      results.push({
        id: `uppsc-${slugify(title)}`,
        title,
        category: "State PSC",
        refNo: "",
        lastDate: null,
        publishedDate: new Date().toISOString().slice(0, 10),
        url: href,
        source: "UPPSC",
        location: "Uttar Pradesh",
      });
    });
    return results;
  } catch {
    return [];
  }
}

// ─── RRB (Indian Railways) ───────────────────────────────────────
async function scrapeRrb() {
  const urls = [
    "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,554",
    "https://rrbapply.gov.in",
    "https://www.indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,554",
  ];
  for (const url of urls) {
    try {
      const { data: html } = await axios.get(url, {
        headers: { "User-Agent": UA },
        timeout: TIMEOUT,
      });
      const $ = cheerio.load(html);
      const results = [];

      // Table rows with actual notifications
      $("table tbody tr a").each((_, el) => {
        const title = $(el).text().trim();
        let href = $(el).attr("href") || "";
        if (href && !href.startsWith("http")) {
          try { href = new URL(href, url).href; } catch { return; }
        }

        if (!title || !href || title.length < 10) return;
        if (!/ntpc|group.*d|alp|technician|je|constable|guard|assistant.*loco|recruitment.*notice|rrb.*recruit/i.test(title)) return;
        // Skip generic links
        if (/^(recruitment rules|objectives|rrb|home|about|contact|general|indian railways)/i.test(title)) return;

        results.push({
          id: `rrb-${slugify(title)}`,
          title,
          category: "Railways",
          refNo: "",
          lastDate: null,
          publishedDate: new Date().toISOString().slice(0, 10),
          url: href,
          source: "RRB",
          location: "All India",
        });
      });

      // Also try notification links
      $("a").each((_, el) => {
        const title = $(el).text().trim();
        let href = $(el).attr("href") || "";
        if (href && !href.startsWith("http")) {
          try { href = new URL(href, url).href; } catch { return; }
        }

        if (!title || !href || title.length < 15) return;
        if (!/rrb.*recruitment|ntpc.*notification|group.*d.*recruit|alp.*recruit|constable.*recruit/i.test(title)) return;

        results.push({
          id: `rrb-${slugify(title)}`,
          title,
          category: "Railways",
          refNo: "",
          lastDate: null,
          publishedDate: new Date().toISOString().slice(0, 10),
          url: href,
          source: "RRB",
          location: "All India",
        });
      });

      if (results.length > 0) return results;
    } catch {
      continue;
    }
  }
  return [];
}

// ─── Main merge logic ────────────────────────────────────────────
async function main() {
  const scrapers = [
    { name: "Kerala PSC", fn: scrapeKeralaPsc },
    { name: "UPSC", fn: scrapeUpsc },
    { name: "SSC", fn: scrapeSsc },
    { name: "IBPS", fn: scrapeIbps },
    { name: "RRB", fn: scrapeRrb },
    { name: "TNPSC", fn: scrapeTnpsc },
    { name: "UPPSC", fn: scrapeUppsc },
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

  // Load existing data (preserve any we've already collected)
  let existing = [];
  if (fs.existsSync(DATA_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
    } catch {
      existing = [];
    }
  }

  // Merge: scraped data updates existing by id
  const byId = new Map(existing.map((e) => [e.id, e]));
  let added = 0;
  for (const item of allScraped) {
    if (!byId.has(item.id)) {
      added += 1;
    }
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
