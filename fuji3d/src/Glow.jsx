import { useMemo } from "react";
import * as THREE from "three";

/* A soft white halo behind a clickable thing, so you can tell what's live.
   Faint at rest, brighter under the cursor. A sprite rather than an outline
   shell, because the things it sits behind are all different shapes. */
let shared = null;
function haloTexture() {
  if (shared) return shared;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0.0, "rgba(255,255,255,0.85)");
  grad.addColorStop(0.30, "rgba(255,255,255,0.34)");
  grad.addColorStop(0.7, "rgba(255,255,255,0.12)");
  grad.addColorStop(1.0, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  shared = new THREE.CanvasTexture(c);
  return shared;
}

export default function Glow({ size = 0.6, lit = false, position = [0, 0, 0] }) {
  const tex = useMemo(haloTexture, []);
  return (
    <sprite position={position} scale={[size, size, 1]} renderOrder={-1}>
      <spriteMaterial
        map={tex}
        transparent
        depthWrite={false}
        opacity={lit ? 0.7 : 0.075}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}
