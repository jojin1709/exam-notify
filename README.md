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
- **Multi-source** — Kerala PSC, TNPSC, UPSC, SSC, IBPS, RRB, SBI, RBI, Army, Navy, Air Force, Coast Guard, KVS, AIIMS
- **Dark mode** — Toggle for comfortable night browsing (no flash on load)
- **PWA** — Install as an app on your phone (icons, service worker, offline page)
- **Push notifications** — Subscribe to browser notifications for new/urgent exams
- **Multi-language** — English, Malayalam, Hindi, Tamil
- **Share** — WhatsApp, Telegram, Twitter, copy link
- **Bookmark** — Save jobs for later
- **Application tracker** — Not Applied / Interested / Applied / Exam Done
- **Countdown timer** — Live seconds countdown on each notification
- **Salary info** — Pay scale displayed on cards and detail pages
- **Eligibility filter** — Education, age limit, caste category filters
- **Source & location filters** — Refine by exam board or state (filters persist in your browser)
- **Exam pattern** — Written exam, interview details
- **Selection process** — Prelims → Mains → Interview stages
- **Application fee & vacancies** — Shown on every notification detail page
- **Official PDF** — Direct download link to the official notification PDF when available
- **Previous papers** — Download links for past year papers
- **CSV export** — Download the filtered results as a CSV file
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

- Scrapes Kerala PSC, TNPSC from static HTML
- Uses Playwright for JS-rendered sites (UPSC, SSC, IBPS, RRB)
- Scrapes static notification pages for Navy, Air Force, Coast Guard, SBI, RBI, KVS, AIIMS
- Cleans titles, filters junk/navigation links, deduplicates entries
- Parses deadlines and registration dates where available
- Enriches each entry with salary, eligibility, age, education, exam pattern, selection process, application fee, vacancies and nationality defaults per source
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

## Push Notifications

The site supports browser push notifications. A floating "Enable Notifications" button appears on the homepage; tapping it asks for permission and subscribes the device.

### Push API

```
GET  /api/push/vapid       # public VAPID key for the browser
POST /api/push/subscribe   # save a subscription (body: push subscription JSON)
POST /api/push/send        # send a notification to all subscribers
```

`/api/push/send` accepts:

```json
{ "title": "New UPSC Notification", "body": "CSE 2026 applications open", "url": "/job/upsc-cse-2026" }
```

### VAPID keys

Generate a key pair once:

```bash
npx web-push generate-vapid-keys
```

Then set these environment variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Public VAPID key (safe to expose to the browser) |
| `VAPID_PRIVATE_KEY` | Private VAPID key (keep secret!) |
| `VAPID_SUBJECT` | Contact e.g. `mailto:you@example.com` |

### Subscription storage

Subscriptions are stored in `data/push-subs.json` by default (this file is git-ignored). For a production multi-instance deployment, provide a [Upstash Redis](https://upstash.com) database and set:

| Variable | Purpose |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Upstash REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token |

When Redis is configured, subscriptions are stored in a `push-subscriptions` set instead of the local file.

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