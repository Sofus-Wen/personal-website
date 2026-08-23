import { useCallback, useEffect, useRef, useState } from "react";
import { TRACKS } from "./tracks.js";

/* The little player that opens when you click the speaker. Deliberately
   small: play/pause, skip, and tap a row to jump to it. */
export default function MusicPlayer({ open, onClose, playing, setPlaying }) {
  const [i, setI] = useState(0);
  const audio = useRef(null);
  const chain = useRef(null);

  /* Route the audio through a little filter chain so it sounds like it's
     coming out of the speaker on the table rather than out of your laptop:
     roll off the bass and the top, squeeze the mids, add a touch of grit. */
  const wireRadio = useCallback(() => {
    if (chain.current || !audio.current) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      const ctx = new AC();
      const src = ctx.createMediaElementSource(audio.current);

      const hp = ctx.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 380; hp.Q.value = 0.7;

      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass"; lp.frequency.value = 3200; lp.Q.value = 0.9;

      const mid = ctx.createBiquadFilter();
      mid.type = "peaking"; mid.frequency.value = 1500;
      mid.gain.value = 5; mid.Q.value = 1.1;

      // gentle saturation, the way a small cone breaks up
      const shaper = ctx.createWaveShaper();
      const curve = new Float32Array(1024);
      for (let n = 0; n < 1024; n++) {
        const x = (n / 1023) * 2 - 1;
        curve[n] = Math.tanh(x * 1.7);
      }
      shaper.curve = curve;

      const out = ctx.createGain();
      out.gain.value = 0.92;

      src.connect(hp); hp.connect(mid); mid.connect(lp);
      lp.connect(shaper); shaper.connect(out); out.connect(ctx.destination);
      chain.current = { ctx };
    } catch (e) {
      chain.current = { ctx: null };   // fall back to plain playback
    }
  }, []);

  const playable = TRACKS.filter((t) => t.src);
  const track = TRACKS[i];

  // keep the element in step with the state
  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    if (playing && track?.src) {
      wireRadio();
      chain.current?.ctx?.resume?.();
      el.play().catch(() => setPlaying(false));
    } else el.pause();
  }, [playing, i, track, setPlaying, wireRadio]);

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
        <span className="player-title">♪ music at our pop up</span>
        <button className="player-x" onClick={onClose} aria-label="Close">×</button>
      </div>

      {TRACKS.length === 0 ? (
        <p className="player-empty">
          the speaker worked. the playlist hasn’t been loaded in yet,
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
            {track ? <><b>{track.title}</b>{track.artist ? ` · ${track.artist}` : ""}</> : "···"}
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
            crossOrigin="anonymous"
          />
        </>
      )}
    </div>
  );
}
