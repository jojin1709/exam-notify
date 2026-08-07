import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="All India government job notifications — UPSC, SSC, IBPS, Railways, Defense, State PSCs — auto-updated, never miss a deadline." />
        <meta property="og:title" content="Exam Notice Board — Govt Jobs" />
        <meta property="og:description" content="UPSC, SSC, IBPS, Railways, Defense — all government job notifications in one place." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#102a43" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
