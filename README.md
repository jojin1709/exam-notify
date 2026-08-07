# Exam Notice Board

Real-time government job notifications for India — UPSC, SSC, IBPS, Railways, Defense, State PSCs.

**Developed by JOJIN JOHN**

## Features

- Auto-updated notifications from official government websites
- Filter by category (UPSC, SSC, IBPS, Railways, Defense, State PSC)
- Search across all notifications
- Urgency indicators (closing soon, closed)
- Mobile-responsive design
- Zero-cost hosting (Vercel + GitHub Actions)

## Live Demo

[https://exam-notify.vercel.app](https://exam-notify.vercel.app)

## How It Works

1. **Scraper** (`scripts/scrape.js`) fetches notifications from:
   - Kerala PSC (keralapsc.gov.in)
   - UPSC (upsc.gov.in)
   - RRB (indianrailways.gov.in)
   - And more...

2. **GitHub Actions** runs the scraper every 4 hours

3. **Vercel** auto-deploys on every push

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS 3.4
- Cheerio (HTML parsing)
- Axios (HTTP requests)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scraper

```bash
npm run scrape
```

This fetches fresh notifications from government websites and updates `data/exams.json`.

## Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. GitHub Actions handles auto-scraping

## License

MIT License - Copyright (c) 2026 JOJIN JOHN

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## Disclaimer

Data is scraped from official government websites. Always verify details on the official notification before applying.
