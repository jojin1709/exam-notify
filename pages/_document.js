import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#102a43" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ExamBoard" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="description" content="Real-time government job notifications \u2014 UPSC, SSC, IBPS, Railways, Defense, State PSCs \u2014 scraped from official websites." />
        <meta property="og:title" content="Exam Notice Board \u2014 Govt Jobs" />
        <meta property="og:description" content="UPSC, SSC, IBPS, Railways, Defense \u2014 real government job notifications in one place." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://exam-notify.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exam Notice Board \u2014 Govt Jobs" />
        <meta name="twitter:description" content="UPSC, SSC, IBPS, Railways, Defense \u2014 real government job notifications." />
        <meta name="twitter:image" content="https://exam-notify.vercel.app/og-image.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(reg => {
                    if ('Notification' in window && Notification.permission === 'default') {
                      Notification.requestPermission();
                    }
                  });
                });
              }
            `,
          }}
        />
      </body>
    </Html>
  );
}
