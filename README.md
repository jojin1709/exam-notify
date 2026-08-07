<div align="center">

# Exam Notice Board

**All India Government Job Notifications — Auto-Updated**

Real-time notifications from UPSC, SSC, IBPS, Railways, Defense, State PSCs — scraped directly from official websites.

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://exam-notify.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat&logo=tailwindcss)](https://tailwindcss.com)

<a href="https://exam-notify.vercel.app">View Live Demo</a>

---

</div>

## What is Exam Notice Board?

Exam Notice Board is an automated government job notification tracker for India. It scrapes exam notifications from official government websites and displays them in a clean, searchable interface.

The scraper runs every hour via GitHub Actions, fetches fresh notifications, and Vercel auto-deploys on every update — zero server management required.

### Why It Exists

Government job aspirants miss deadlines because notifications are scattered across dozens of websites. Exam Notice Board aggregates them in one place, updated automatically, so you never miss an opportunity.

## Features

- **Auto-updated** — Scraper runs every hour via GitHub Actions
- **Multi-source** — Kerala PSC, UPSC, SSC, IBPS, RRB, Defense, State PSCs
- **Dark mode** — Toggle for comfortable night browsing
- **PWA** — Install as an app on your phone
- **Share** — WhatsApp, Telegram, Twitter, copy link
- **Bookmark** — Save jobs for later
- **Job details** — Full info page for each notification
- **Search & filter** — By category, source, location
- **Urgency alerts** — Color-coded deadline indicators
- **API & RSS** — For developers and feed readers
- **Mobile-first** — Responsive design for all devices

## Live Demo

**[https://exam-notify.vercel.app](https://exam-notify.vercel.app)**

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Run Locally

```bash
git clone https://github.com/jojin1709/exam-notify.git
cd exam-notify
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Scraper

```bash
npm run scrape
```

This fetches fresh notifications from government websites and updates `data/exams.json`.

## How It Works

```text
┌─────────────────────┐
│   GitHub Actions     │
│   (runs every hour)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Scraper (Playwright│
│   + Cheerio)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   data/exams.json   │
│   (git committed)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Vercel            │
│   (auto-deploy)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Live Website      │
│   exam-notify.      │
│   vercel.app        │
└─────────────────────┘
```

## API

### Get All Notifications

```
GET /api/jobs
```

### Filter by Category

```
GET /api/jobs?category=UPSC
```

### Search

```
GET /api/jobs?search=civil+services
```

### RSS Feed

```
GET /api/rss
```

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework |
| Tailwind CSS 3.4 | Styling |
| Playwright | JS-rendered site scraping |
| Cheerio | HTML parsing |
| GitHub Actions | Auto-scraping workflow |
| Vercel | Hosting & deployment |

## Project Structure

```
exam-notify/
├── components/          # React components
│   ├── Header.js        # Site header with stats
│   ├── FilterBar.js     # Category filters & search
│   ├── ExamCard.js      # Notification card
│   ├── ShareButtons.js  # WhatsApp, Telegram, Twitter
│   ├── BookmarkButton.js# Save jobs
│   ├── DarkModeToggle.js# Theme toggle
│   ├── PwaInstall.js    # Install prompt
│   ├── SavedJobs.js     # Bookmarked jobs
│   ├── EmptyState.js    # No results view
│   └── Footer.js        # Site footer
├── pages/
│   ├── index.js         # Main page
│   ├── job/[id].js      # Job detail page
│   └── api/
│       ├── jobs.js      # JSON API
│       └── rss.js       # RSS feed
├── public/
│   ├── manifest.json    # PWA manifest
│   ├── sw.js            # Service worker
│   └── offline.html     # Offline page
├── scripts/
│   └── scrape.js        # Multi-source scraper
├── data/
│   └── exams.json       # Notification data
└── styles/
    └── globals.css      # Global styles + dark mode
```

## Deployment

### GitHub + Vercel

1. Fork or clone this repo
2. Create a GitHub repository
3. Connect to Vercel
4. GitHub Actions handles auto-scraping every hour

### Environment Variables

No environment variables needed. The scraper works out of the box.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## Disclaimer

Data is scraped from official government websites and updated periodically. Always verify details on the official notification PDF before applying.

## License

MIT License — Copyright (c) 2026 JOJIN JOHN

See [LICENSE](LICENSE) for details.

---

<div align="center">

**Developed by [JOJIN JOHN](https://github.com/jojin1709)**

</div>
