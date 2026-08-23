import { useMemo } from "react";
import * as THREE from "three";

/* A soft daylight gradient on a big inverted sphere. Hazier at the horizon so
   the towers dissolve into it rather than ending on a hard line. */
export default function Sky() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 4; c.height = 256;
    const g = c.getContext("2d");
    const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.00, "#6d97bf");   // zenith
    grad.addColorStop(0.38, "#8bb0cf");
    grad.addColorStop(0.60, "#adc7dc");
    grad.addColorStop(0.78, "#cfdce4");
    grad.addColorStop(0.90, "#e4e2d8");   // haze at the horizon
    grad.addColorStop(1.00, "#d6cfc2");
    g.fillStyle = grad;
    g.fillRect(0, 0, 4, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[95, 32, 24]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} fog={false} />
    </mesh>
  );
}
