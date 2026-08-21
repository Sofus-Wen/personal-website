import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

/* Full-size image on its own page: fills the screen, click to zoom to actual
   pixels and drag to move around, and an exit that goes back. */
export default function Viewer({ src, alt, title, back = "/taiyo" }) {
  const router = useRouter();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") router.push(back);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, back]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`viewer${zoomed ? " zoomed" : ""}`}>
        <button
          type="button"
          className="viewer-close"
          onClick={() => router.push(back)}
        >
          close
        </button>
        <img
          src={src}
          alt={alt}
          onClick={() => setZoomed((z) => !z)}
          title={zoomed ? "click to fit" : "click to zoom"}
        />
      </div>
    </>
  );
}
