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

The scraper runs every hour, fetches fresh notifications, and the website auto-updates — zero manual work required.

### Why It Exists

Government job aspirants miss deadlines because notifications are scattered across dozens of websites. Exam Notice Board aggregates them in one place, updated automatically, so you never miss an opportunity.

## Features

- **Auto-updated** — Notifications refresh every hour automatically
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

## How It Works

```text
┌─────────────────────┐
│   Auto-Scraper      │
│   (runs every hour) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Official Govt     │
│   Websites          │
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
