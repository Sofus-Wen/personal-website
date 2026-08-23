import { useMemo } from "react";
import * as THREE from "three";

/* Glass towers behind the stall — the DLF Cyber Park sort of view. Built from
   boxes like everything else here, so it costs nothing and gives real parallax
   when you orbit. Layout is seeded, not random, so it looks the same every
   load. */

function seeded(n) {
  let s = n;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/* A facade: floor bands and vertical mullions, drawn once into a canvas. */
function facadeTexture(tint) {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = tint;
  g.fillRect(0, 0, 128, 256);
  // floors
  g.fillStyle = "rgba(255,255,255,0.15)";
  for (let y = 3; y < 256; y += 6) g.fillRect(0, y, 128, 1);
  // mullions
  g.fillStyle = "rgba(0,0,0,0.13)";
  for (let x = 2; x < 128; x += 5) g.fillRect(x, 0, 1, 256);
  // a few lit rooms
  g.fillStyle = "rgba(255,246,214,0.5)";
  const r = seeded(7);
  for (let i = 0; i < 150; i++) {
    const x = Math.floor(r() * 25) * 5 + 3;
    const y = Math.floor(r() * 42) * 6 + 4;
    g.fillRect(x, y, 3, 3);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* An autorickshaw — the clearest way to say India without a caption. */
function Rickshaw({ position, rotation = 0, scale = 1 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* cabin */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.05, 0.62, 1.5]} />
        <meshStandardMaterial color="#e8c024" roughness={0.55} />
      </mesh>
      {/* canopy */}
      <mesh position={[0, 0.98, -0.1]}>
        <boxGeometry args={[1.08, 0.34, 1.15]} />
        <meshStandardMaterial color="#2f6b3f" roughness={0.7} />
      </mesh>
      {/* nose */}
      <mesh position={[0, 0.52, 0.86]}>
        <sphereGeometry args={[0.3, 14, 12]} />
        <meshStandardMaterial color="#e8c024" roughness={0.55} />
      </mesh>
      {/* wheels: one at the front, two at the back */}
      <mesh position={[0, 0.2, 0.92]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.13, 14]} />
        <meshStandardMaterial color="#20211f" roughness={0.85} />
      </mesh>
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0.2, -0.55]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.13, 14]} />
          <meshStandardMaterial color="#20211f" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* Palms, which the plaza was full of. */
function Palm({ position, h = 3.1, turn = 0 }) {
  return (
    <group position={position} rotation={[0, turn, 0]}>
      <mesh position={[0, h / 2, 0]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.09, 0.14, h, 9]} />
        <meshStandardMaterial color="#7a6a52" roughness={0.95} />
      </mesh>
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.sin(a) * 0.62, h + 0.05, Math.cos(a) * 0.62]}
                rotation={[0.62, -a, 0]}>
            <boxGeometry args={[0.16, 0.035, 1.5]} />
            <meshStandardMaterial color="#4c7040" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function City() {
  const { towers, skins } = useMemo(() => {
    const tints = ["#7d8ea3", "#8a99ab", "#6f8195", "#94a3b2", "#7f8fa1"];
    const skins = tints.map(facadeTexture);
    const r = seeded(20260824);
    const towers = [];
    // three receding ranks, left and right of the stall, none directly behind it
    const ranks = [
      { z: -30, n: 8,  spread: 62,  hMin: 5,  hMax: 11 },
      { z: -48, n: 9,  spread: 92,  hMin: 8,  hMax: 17 },
      { z: -72, n: 10, spread: 140, hMin: 11, hMax: 26 },
    ];
    ranks.forEach((rank, ri) => {
      for (let i = 0; i < rank.n; i++) {
        const t = (i + 0.5) / rank.n;
        const x = (t - 0.5) * rank.spread + (r() - 0.5) * 2.4;
        const h = rank.hMin + r() * (rank.hMax - rank.hMin);
        const w = 2.2 + r() * 2.6;
        const d = 2.2 + r() * 2.4;
        towers.push({
          key: `${ri}-${i}`,
          pos: [x, h / 2, rank.z + (r() - 0.5) * 3],
          size: [w, h, d],
          skin: ri === 0 ? Math.floor(r() * 5) : Math.floor(r() * 5),
          rot: (r() - 0.5) * 0.5,
          repeat: [Math.max(1, Math.round(w / 2.6)), Math.max(2, Math.round(h / 3.4))],
        });
      }
    });
    return { towers, skins };
  }, []);

  return (
    <group>
      {towers.map((t) => {
        const map = skins[t.skin].clone();
        map.needsUpdate = true;
        map.repeat.set(t.repeat[0], t.repeat[1]);
        return (
          <mesh key={t.key} position={t.pos} rotation={[0, t.rot, 0]}>
            <boxGeometry args={t.size} />
            <meshStandardMaterial map={map} roughness={0.32} metalness={0.22} />
          </mesh>
        );
      })}

      {/* autorickshaws waiting at the edge of the plaza */}
      <Rickshaw position={[-5.6, 0, -8.5]} rotation={0.5} scale={1.15} />
      <Rickshaw position={[6.2, 0, -9.5]} rotation={-0.55} scale={1.15} />
      <Rickshaw position={[-11.8, 0, -14]} rotation={0.15} scale={1.15} />

      {/* palms */}
      <Palm position={[-6.2, 0, -4.4]} h={3.3} turn={0.4} />
      <Palm position={[6.6, 0, -4.8]} h={3.0} turn={1.1} />
      <Palm position={[-11.5, 0, -6.6]} h={3.6} turn={2.0} />
      <Palm position={[12.2, 0, -6.2]} h={3.2} turn={0.8} />

      {/* a line of trees along the plaza, like the planting outside */}
      {Array.from({ length: 14 }).map((_, i) => {
        const r = seeded(900 + i);
        const x = (i - 6.5) * 4.4 + (r() - 0.5) * 1.4;
        const z = -7.5 + (r() - 0.5) * 1.6;
        const h = 1.3 + r() * 0.6;
        if (Math.abs(x) < 4.2) return null;         // keep the stall's view clear
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, h / 2, 0]}>
              <cylinderGeometry args={[0.06, 0.08, h, 8]} />
              <meshStandardMaterial color="#5b4a38" roughness={0.95} />
            </mesh>
            <mesh position={[0, h + 0.42, 0]}>
              <sphereGeometry args={[0.5, 14, 12]} />
              <meshStandardMaterial color="#546b45" roughness={0.95} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
