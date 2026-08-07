import examsData from "@/data/exams.json";

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function handler(req, res) {
  const siteUrl = "https://exam-notify.vercel.app";

  const items = examsData
    .map((exam) => {
      const pubDate = exam.publishedDate
        ? new Date(exam.publishedDate).toUTCString()
        : new Date().toUTCString();

      return `    <item>
      <title>${escapeXml(exam.title)}</title>
      <link>${escapeXml(exam.url)}</link>
      <guid isPermaLink="false">${escapeXml(exam.id)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(exam.category)}</category>
      <description>${escapeXml(exam.source)} — ${escapeXml(exam.location || "All India")} ${exam.refNo ? `| ${escapeXml(exam.refNo)}` : ""}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Exam Notice Board</title>
    <link>${siteUrl}</link>
    <description>All India government job notifications — UPSC, SSC, IBPS, Railways, Defense, State PSCs</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(xml);
}
