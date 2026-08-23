import { useEffect } from "react";
import { CONTENT, CARDS } from "./content.js";

export default function Panel({ openKey, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);

  const c = openKey ? CONTENT[openKey] : null;

  return (
    <>
      <div className={"scrim" + (c ? " on" : "")} onClick={onClose} />
      <aside className={"panel" + (c ? " on" : "")} aria-hidden={!c}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        {c && (
          <div className="panel-in">
            <p className="kicker">{c.kicker}</p>
            <h2>{c.title}</h2>
            {c.img && <img className="hero" src={c.img} alt="" />}
            <div dangerouslySetInnerHTML={{ __html: c.html }} />
            {c.figs && (
              <>
                <div className="figs">
                  {c.figs.map(([b, s]) => (
                    <div className="fig" key={s}><b>{b}</b><span>{s}</span></div>
                  ))}
                </div>
                {c.after && <div dangerouslySetInnerHTML={{ __html: c.after }} />}
              </>
            )}
            {c.two && (
              <div className="two">
                {c.two.map(([src, cap]) => (
                  <figure key={src}><img src={src} alt="" /><figcaption>{cap}</figcaption></figure>
                ))}
              </div>
            )}
            {c.grid && (
              <div className="grid">
                {c.grid.map((src) => <img key={src} src={src} alt="" />)}
              </div>
            )}
            {c.cards && (
              <div className="grid">
                {CARDS.map(([f, place, name]) => (
                  <figure key={f} style={{ margin: 0 }}>
                    <img src={`img/${f}.jpg`} alt={place} />
                    <figcaption>{name}<br />{place}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
