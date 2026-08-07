export default function handler(req, res) {
  const baseUrl = "https://exam-notify.vercel.app";
  res.setHeader("Content-Type", "text/xml");
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  res.end();
}
