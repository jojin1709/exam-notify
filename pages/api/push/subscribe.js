import { addSubscription } from "@/lib/push-store";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const sub = req.body;
  if (!sub || !sub.endpoint || !sub.keys) {
    return res.status(400).json({ error: "Invalid subscription" });
  }
  try {
    await addSubscription(sub);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save subscription" });
  }
}
