import { useCallback, useEffect, useState } from "react";
import Link from "./Link";

/* One image at a time with its own line of the story. Text controls, no dots,
   no autoplay, no transitions. Arrow keys work too. */
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
      <div className="carousel-frame">
        {/* Every slide stays mounted so moving between them doesn't refetch
            or flash; only the current one is shown. */}
        {slides.map((s, index) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            hidden={index !== i}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <p className="line carousel-caption">{slide.caption}</p>

      <p className="line carousel-controls">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image">
          ←
        </button>
        <span className="year-label">
          {i + 1} / {count}
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next image">
          →
        </button>
        {slide.full ? <Link href={slide.full}>open full size</Link> : null}
      </p>
    </div>
  );
}
