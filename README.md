# Exam Notice Board

A website tracking new Kerala PSC, defense, and other government exam
notifications so students don't miss deadlines. A GitHub Actions bot
scrapes fresh notifications on a schedule, commits them to the repo,
and Vercel auto-redeploys the site.

## What actually works right now

- **Kerala PSC scraping is live and tested.** `scripts/scrape.js` pulls
  `keralapsc.gov.in/notifications`, which is a plain server-rendered
  HTML table (Title / Category Number / Last date), so a normal
  axios + cheerio scrape reads it reliably. This was verified against
  the real page structure before shipping.
- **Defense sources (SSC, Army, Navy) are NOT scraped yet.** Their
  official sites are either JavaScript-rendered single-page apps
  (`ssc.gov.in`) or captcha-gated (`joinindianarmy.nic.in`), so a
  simple HTTP scrape can't read them. `data/exams.json` ships with a
  couple of placeholder defense entries so the UI has something to
  show, but you'll need to either find a defense recruitment source
  that's still static HTML, or scrape with a headless browser
  (Playwright). There's a commented example for that in
  `scripts/scrape.js` — plug in real selectors once you've inspected
  the actual DOM in a browser.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Run the scraper manually

```bash
npm run scrape
```

This updates `data/exams.json` in place (merges new notifications,
keeps existing ones, dedupes by URL).

## Automating it (the "GitHub bot")

`.github/workflows/scrape.yml` runs the scraper every 4 hours via
GitHub Actions, commits `data/exams.json` if anything changed, and
pushes to `main`. No server needed — this is entirely free on
GitHub's shared runners for a public repo.

To change how often it runs, edit the `cron` line in that file.
You can also trigger it manually from the Actions tab
("Run workflow").

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to vercel.com → New Project → import the repo.
3. Leave the default settings (Next.js is auto-detected) → Deploy.
4. Every push to `main` — including the bot's automated commits —
   triggers a redeploy automatically. Nothing else to configure.

## Adding a new source

Each entry in `data/exams.json` looks like:

```json
{
  "id": "unique-id",
  "title": "Notification title",
  "category": "PSC | Defense | Defense/Central | ...",
  "refNo": "Category/reference number",
  "lastDate": "YYYY-MM-DD or null",
  "publishedDate": "YYYY-MM-DD",
  "url": "https://...",
  "source": "Display name of the source site"
}
```

Add a new scraper function in `scripts/scrape.js` that returns an
array in this shape, then merge it into `main()` alongside
`scrapeKeralaPsc()`.

## Notes on the seed data

The Navy and SSC entries currently in `data/exams.json` are
illustrative placeholders (based on public reporting, not scraped),
just so the site isn't empty on first load. Run the scraper — or
wait for the first scheduled Action — to replace them with live PSC
data. Always double-check exact dates against the official
notification PDF before applying.
