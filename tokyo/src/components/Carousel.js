import { useCallback, useEffect, useState } from "react";
import Link from "./Link";

/* One image at a time with its own line of the story. No dots, no autoplay,
   no transitions. Arrow keys work too. */
function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={dir === "prev" ? "M15 4 L7 12 L15 20" : "M9 4 L17 12 L9 20"}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Carousel({ slides }) {
  const [i, setI] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (step) => setI((current) => (current + step + count) % count),
    [count]
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = slides[i];

  return (
    <div className="carousel">
      {/* The frame hugs the picture, so the arrows sit on its real edges
          whatever the aspect ratio. Each one is a half-width hit area. */}
      <div className="carousel-frame">
        {slides.map((s, index) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            hidden={index !== i}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
        <button
          type="button"
          className="carousel-arrow prev"
          onClick={() => go(-1)}
          aria-label="Previous image"
        >
          <Chevron dir="prev" />
        </button>
        <button
          type="button"
          className="carousel-arrow next"
          onClick={() => go(1)}
          aria-label="Next image"
        >
          <Chevron dir="next" />
        </button>
      </div>

      <p className="line carousel-caption">{slide.caption}</p>

      <p className="line carousel-controls">
        <span className="year-label">
          {i + 1} / {count}
        </span>
        {slide.full ? <Link href={slide.full}>open full size</Link> : null}
      </p>
    </div>
  );
}
