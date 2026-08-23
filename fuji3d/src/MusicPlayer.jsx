import { useEffect, useRef, useState } from "react";
import { TRACKS } from "./tracks.js";

/* The little player that opens when you click the speaker. Deliberately
   small: play/pause, skip, and tap a row to jump to it. */
export default function MusicPlayer({ open, onClose, playing, setPlaying }) {
  const [i, setI] = useState(0);
  const audio = useRef(null);

  const playable = TRACKS.filter((t) => t.src);
  const track = TRACKS[i];

  // keep the element in step with the state
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    if (playing && track?.src) el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing, i, track, setPlaying]);

  useEffect(() => {
    if (!open) setPlaying(false);
  }, [open, setPlaying]);

  const step = (d) => {
    if (!TRACKS.length) return;
    setI((n) => (n + d + TRACKS.length) % TRACKS.length);
  };

  if (!open) return null;

  return (
    <div className="player">
      <div className="player-top">
        <span className="player-title">♪ at the stand</span>
        <button className="player-x" onClick={onClose} aria-label="Close">×</button>
      </div>

      {TRACKS.length === 0 ? (
        <p className="player-empty">
          the speaker worked. the playlist hasn’t been loaded in yet —
          tell me what we played.
        </p>
      ) : (
        <>
          <div className="player-controls">
            <button onClick={() => step(-1)} aria-label="Previous">‹‹</button>
            <button
              className="player-play"
              disabled={!track?.src}
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button onClick={() => step(1)} aria-label="Next">››</button>
          </div>

          <p className="player-now">
            {track ? <><b>{track.title}</b>{track.artist ? ` · ${track.artist}` : ""}</> : "—"}
          </p>

          <ol className="player-list">
            {TRACKS.map((t, n) => (
              <li
                key={t.title + n}
                className={(n === i ? "on" : "") + (t.src ? "" : " mute")}
                onClick={() => { setI(n); if (t.src) setPlaying(true); }}
                title={t.src ? "" : "no audio for this one yet"}
              >
                <span className="n">{String(n + 1).padStart(2, "0")}</span>
                <span className="t">{t.title}</span>
                <span className="a">{t.artist}</span>
              </li>
            ))}
          </ol>

          {playable.length < TRACKS.length && (
            <p className="player-foot">
              {playable.length} of {TRACKS.length} have audio
            </p>
          )}

          <audio
            ref={audio}
            src={track?.src}
            onEnded={() => step(1)}
            preload="none"
          />
        </>
      )}
    </div>
  );
}
