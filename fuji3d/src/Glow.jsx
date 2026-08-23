import { useMemo } from "react";
import * as THREE from "three";

/* A soft white halo marking something clickable.

   Two modes, and the distinction matters:

   - `flat` renders a plane that sits in the same plane as the thing it backs,
     so it stays aligned however the object is turned. Use it for anything
     flat: the posters, the board, the counter front, the photos.
   - the default renders a billboard sprite, always square, for things with
     volume like the people. A sprite is the wrong tool for a flat object,
     it always faces the camera, so once the object is angled the halo reads
     as pointing the wrong way, and stretching it makes that worse. */

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

export default function Glow({
  size = 0.6,
  height,
  lit = false,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  flat = false,
}) {
  const tex = useMemo(haloTexture, []);
  const opacity = lit ? 0.75 : 0.15;

  if (flat) {
    return (
      <mesh position={position} rotation={rotation} renderOrder={-1}>
        <planeGeometry args={[size, height ?? size]} />
        <meshBasicMaterial
          map={tex}
          transparent
          depthWrite={false}
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  // billboard: kept square, so it never skews
  return (
    <sprite position={position} scale={[size, size, 1]} renderOrder={-1}>
      <spriteMaterial
        map={tex}
        transparent
        depthWrite={false}
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}
