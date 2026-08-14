import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) arr[i] = raw.charCodeAt(i);
  return arr;
}

export default function PushNotify() {
  const { t } = useLang();
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) return;
    setSupported(true);
    setState(Notification.permission);
  }, []);

  const subscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      setState(permission);
      if (permission !== "granted") return;
      const reg = await navigator.serviceWorker.ready;
      const res = await fetch("/api/push/vapid");
      const { publicKey } = await res.json();
      if (!publicKey) return;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      setState("subscribed");
    } catch {
      setState("denied");
    }
  };

  if (!supported || state === "granted" || state === "denied" || state === "subscribed") return null;

  return (
    <button onClick={subscribe}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-navy-900 text-white rounded-full shadow-xl hover:bg-navy-800 transition-colors">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span className="text-sm font-semibold">{t.enableNotifications}</span>
    </button>
  );
}
