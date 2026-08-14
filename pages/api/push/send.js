import webpush from "web-push";
import { getSubscriptions, removeSubscription } from "@/lib/push-store";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:admin@exam-notify.vercel.app";

  if (!publicKey || !privateKey) {
    return res.status(500).json({ error: "VAPID keys not configured" });
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);

  const { title = "Exam Notice Board", body = "New government job notification!", url = "/" } = req.body || {};

  const subs = await getSubscriptions();
  if (subs.length === 0) {
    return res.status(200).json({ sent: 0, failed: 0, message: "No subscribers" });
  }

  let sent = 0;
  let failed = 0;
  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(sub, JSON.stringify({ title, body, url }));
        sent += 1;
      } catch (err) {
        failed += 1;
        if (err.statusCode === 404 || err.statusCode === 410) {
          await removeSubscription(sub);
        }
      }
    })
  );

  res.status(200).json({ sent, failed });
}
