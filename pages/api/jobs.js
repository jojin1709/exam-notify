import examsData from "@/data/exams.json";

export default function handler(req, res) {
  const { category, source, search, location } = req.query;

  let filtered = [...examsData];

  if (category) {
    filtered = filtered.filter((e) => e.category === category);
  }
  if (source) {
    filtered = filtered.filter((e) => e.source === source);
  }
  if (location) {
    filtered = filtered.filter((e) =>
      e.location?.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((e) =>
      `${e.title} ${e.refNo} ${e.source} ${e.location}`.toLowerCase().includes(q)
    );
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).json({
    total: filtered.length,
    notifications: filtered,
  });
}
