import { Head, Html, Main, NextScript } from "next/document";

/* Applies the stored theme before first paint so there is no flash of the
   wrong background. Light is the default when nothing is stored. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){document.documentElement.setAttribute("data-theme","light")}})()`;

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Sofus Wenøe — making videos :)" />
        <link rel="icon" href="/assets/img/favicon/favicon.png" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
