export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=3600");
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY || null;
  res.status(200).json({ publicKey });
}
