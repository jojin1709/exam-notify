<div align="center">

# Exam Notice Board

**All India Government Job Notifications — Auto-Updated**

Real-time notifications from UPSC, SSC, IBPS, Railways, Defense, State PSCs — scraped directly from official websites.

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://exam-notify.vercel.app)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=flat)](LICENSE)

<a href="https://exam-notify.vercel.app">Visit Website</a>

---

</div>

## What is Exam Notice Board?

Exam Notice Board is an automated government job notification tracker for India. It scrapes exam notifications from official government websites and displays them in a clean, searchable interface.

The scraper runs every hour via GitHub Actions, fetches fresh notifications, and the website auto-updates — zero manual work required.

### Why It Exists

Government job aspirants miss deadlines because notifications are scattered across dozens of websites. Exam Notice Board aggregates them in one place, updated automatically, so you never miss an opportunity.

## Features

- **Auto-updated** — Notifications refresh every hour automatically
- **Multi-source** — Kerala PSC, UPSC, SSC, IBPS, RRB, Defense, State PSCs
- **Dark mode** — Toggle for comfortable night browsing (no flash on load)
- **PWA** — Install as an app on your phone (icons, service worker, offline page)
- **Multi-language** — English, Malayalam, Hindi, Tamil
- **Share** — WhatsApp, Telegram, Twitter, copy link
- **Bookmark** — Save jobs for later
- **Application tracker** — Not Applied / Interested / Applied / Exam Done
- **Countdown timer** — Live seconds countdown on each notification
- **Salary info** — Pay scale displayed on cards and detail pages
- **Eligibility filter** — Education, age limit, caste category filters
- **Exam pattern** — Written exam, interview details
- **Previous papers** — Download links for past year papers
- **Related jobs** — Suggested notifications on each detail page
- **Calendar** — Add deadline to Google Calendar
- **Job details** — Full info page for each notification
- **Search & filter** — By category, source, location
- **Urgency alerts** — Color-coded deadline indicators
- **API & RSS** — For developers and feed readers
- **Mobile-first** — Fully responsive design for all devices

## Tech Stack

- **Framework** — [Next.js 14](https://nextjs.org) (Pages Router, ISR for static regeneration)
- **Styling** — Tailwind CSS
- **Scraping** — Playwright (JS-rendered sites), Axios + Cheerio (static HTML)
- **Auto-update** — GitHub Actions scheduled workflow (hourly cron)
- **Deployment** — Vercel

## Live Demo

**[https://exam-notify.vercel.app](https://exam-notify.vercel.app)**

## Getting Started

### Prerequisites

- Node.js 18.17+ (or 20+)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Scraping

The project ships with a multi-source scraper (`scripts/scrape.js`) that:

- Scrapes Kerala PSC from static HTML
- Uses Playwright for JS-rendered sites (UPSC, SSC, IBPS, RRB)
- Cleans titles, filters junk/navigation links, deduplicates entries
- Parses deadlines and registration dates where available
- Merges new items with the existing `data/exams.json`, preserving publish dates

### Run the scraper locally

```bash
npx playwright install chromium   # first time only
npm run scrape
```

### Automated hourly scraping

A [GitHub Actions workflow](.github/workflows/scrape.yml) runs the scraper every hour and commits any changes to `data/exams.json`, which triggers a fresh Vercel build automatically.

## API

### Get All Notifications

```
GET /api/jobs
```

### Filter by Category

```
GET /api/jobs?category=UPSC
```

### Filter by Source

```
GET /api/jobs?source=IBPS
```

### Filter by Location

```
GET /api/jobs?location=Kerala
```

### Search

```
GET /api/jobs?search=civil+services
```

All filters can be combined:

```
GET /api/jobs?category=Banking&search=clerk
```

### RSS Feed

```
GET /api/rss
```

### Sitemap

```
GET /sitemap.xml
```

## Data

Notifications are a combination of curated entries and automatically scraped notifications from official government sources. Fields such as salary, eligibility, exam pattern, and previous-paper links are included when available.

## Disclaimer

Data is scraped from official government websites and updated periodically. Always verify details on the official notification PDF before applying.

## License

All Rights Reserved — Copyright (c) 2026 JOJIN JOHN

This project and its source code are proprietary. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

See [LICENSE](LICENSE) for details.

---

<div align="center">

**Developed by [JOJIN JOHN](https://github.com/jojin1709)**

</div>