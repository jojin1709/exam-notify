import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

export default function PushNotify() {
  const [status, setStatus] = useState("unsupported");
  const [show, setShow] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (!("Notification" in window)) return;
    setStatus(Notification.permission);
  }, []);

  const subscribe = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
    const permission = await Notification.requestPermission();
    setStatus(permission);
    if (permission === "granted") {
      const reg = await navigator.serviceWorker.ready;
      try {
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BEl62iUYgUivxIkv69yViEtuiJEvDbCebFkQGXMBHg1vYkNc1Gz7OVsS-3vJXH8u1i8fGzMvz8tHMIeY4y7cR0bw"),
        });
        localStorage.setItem("push-subscription", JSON.stringify(sub));
        setShow(false);
      } catch (err) {
        console.error("Push subscribe error:", err);
      }
    }
  };

  if (status === "granted" || status === "denied" || status === "unsupported") return null;

  return (
    <>
      <button onClick={() => setShow(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-navy-900 text-white rounded-full shadow-lg hover:bg-navy-800 transition-all flex items-center justify-center"
        title="Enable notifications">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      {show && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShow(false)} />
          <div className="fixed bottom-20 right-4 sm:right-6 z-50 bg-white rounded-2xl shadow-2xl p-5 sm:p-6 max-w-xs border border-navy-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-navy-900 text-sm">Enable Notifications</h3>
                <p className="text-[11px] text-navy-500">Get alerts for new job postings</p>
              </div>
            </div>
            <p className="text-xs text-navy-600 mb-4 leading-relaxed">Receive push notifications when new government job notifications matching your interests are posted.</p>
            <div className="flex gap-2">
              <button onClick={subscribe} className="flex-1 px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold hover:bg-navy-800 transition-colors">Enable</button>
              <button onClick={() => setShow(false)} className="px-4 py-2 bg-navy-50 text-navy-600 rounded-xl text-xs font-semibold hover:bg-navy-100 transition-colors">Later</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) { outputArray[i] = rawData.charCodeAt(i); }
  return outputArray;
}
