import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import Glow from "./Glow.jsx";

/* Every clickable thing in the scene wraps in this: it handles the hover
   lift, the pointer cursor and firing the panel open. */
function Hot({ id, onOpen, children, lift = 0.03, position = [0, 0, 0], glow = 0.62 }) {
  const [hover, setHover] = useState(false);
  const g = useRef();
  return (
    <group
      ref={g}
      position={[position[0], position[1] + (hover ? lift : 0), position[2]]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onOpen(id); }}
    >
      {glow > 0 && <Glow size={glow} lit={hover} position={[0, glow * 0.28, -0.02]} />}
      {children}
    </group>
  );
}

/* One chocolate bar: a thin box with the real packaging art on its face. */
function Bar({ map, position, id, onOpen }) {
  const tex = useTexture(map);
  tex.colorSpace = THREE.SRGBColorSpace;
  const W = 0.195, H = 0.34, D = 0.022;   // the released packaging is a wider format
  return (
    <Hot id={id} onOpen={onOpen} position={position}>
      <mesh castShadow position={[0, H / 2, 0]} rotation={[-0.06, 0, 0]}>
        <boxGeometry args={[W, H, D]} />
        {/* +x -x +y -y +z -z : art on the front face, paper on the rest */}
        <meshStandardMaterial attach="material-0" color="#e8e2d6" roughness={0.85} />
        <meshStandardMaterial attach="material-1" color="#e8e2d6" roughness={0.85} />
        <meshStandardMaterial attach="material-2" color="#efe9dd" roughness={0.85} />
        <meshStandardMaterial attach="material-3" color="#d8d1c2" roughness={0.85} />
        <meshStandardMaterial attach="material-4" map={tex} roughness={0.62} />
        <meshStandardMaterial attach="material-5" color="#e8e2d6" roughness={0.85} />
      </mesh>
    </Hot>
  );
}

function Crate({ position, rotation = [0, 0, 0] }) {
  return (
    <mesh castShadow receiveShadow position={position} rotation={rotation}>
      <boxGeometry args={[0.34, 0.22, 0.26]} />
      <meshStandardMaterial color="#b98d4e" roughness={0.95} />
    </mesh>
  );
}

/* Triangular pennants strung between the two front posts. */
function Bunting({ y, z, halfWidth, count = 19 }) {
  const sagAt = (t) => Math.sin(t * Math.PI) * 0.22;      // the rope droops
  const flags = [];
  const pts = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = -halfWidth + t * halfWidth * 2;
    const yy = y - sagAt(t);
    pts.push(new THREE.Vector3(x, yy, z));
    const shape = new THREE.Shape();
    shape.moveTo(-0.058, 0); shape.lineTo(0.058, 0); shape.lineTo(0, -0.15); shape.closePath();
    // tilt each flag to follow the slope of the rope it hangs from
    const slope = Math.cos(t * Math.PI) * 0.34;
    flags.push(
      <mesh key={i} position={[x, yy, z]} rotation={[0, 0, slope * 0.5]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color={i % 2 ? "#efe9dc" : "#3f6b46"}
          side={THREE.DoubleSide} roughness={0.9}
        />
      </mesh>
    );
  }
  const rope = new THREE.BufferGeometry().setFromPoints(pts);
  return (
    <group>
      <line geometry={rope}>
        <lineBasicMaterial color="#9a9384" />
      </line>
      {flags}
    </group>
  );
}

function Speaker({ onSpeaker, playing, x, z }) {
  const cone = useRef();
  const rings = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (cone.current) {
      const pulse = playing ? 1 + Math.sin(t * 9) * 0.06 : 1;
      cone.current.scale.setScalar(pulse);
    }
    rings.current.forEach((m, k) => {
      if (!m) return;
      if (!playing) { m.visible = false; return; }
      m.visible = true;
      const phase = (t * 0.9 + k * 0.33) % 1;
      m.scale.setScalar(0.4 + phase * 1.5);
      m.material.opacity = 0.5 * (1 - phase);
    });
  });
  return (
    <group position={[x, 2.02, z]}>
      {/* the bracket it hangs off */}
      <mesh position={[0, 0.24, -0.04]}>
        <boxGeometry args={[0.04, 0.26, 0.04]} />
        <meshStandardMaterial color="#3a3d42" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh castShadow onClick={(e) => { e.stopPropagation(); onSpeaker(); }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => (document.body.style.cursor = "auto")}>
        <boxGeometry args={[0.26, 0.36, 0.22]} />
        <meshStandardMaterial color="#20222c" roughness={0.6} />
      </mesh>
      <mesh ref={cone} position={[0, 0.03, 0.12]}>
        <circleGeometry args={[0.085, 32]} />
        <meshStandardMaterial color="#3c3f4c" roughness={0.5} />
      </mesh>
      {[0, 1, 2].map((k) => (
        <mesh key={k} ref={(el) => (rings.current[k] = el)} position={[0, 0.03, 0.14]}>
          <ringGeometry args={[0.1, 0.115, 32]} />
          <meshBasicMaterial color="#c9a227" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

function RollUp({ id, onOpen, map, x, z = -0.1, turn }) {
  const [hover, setHover] = useState(false);
  return (
    <group
      position={[x, 0, z]} rotation={[0, turn, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onOpen(id); }}
    >
      {/* cassette base with feet */}
      <mesh castShadow receiveShadow position={[0, 0.055, 0]}>
        <boxGeometry args={[1.0, 0.11, 0.26]} />
        <meshStandardMaterial color={hover ? "#c9a227" : "#9a9ea6"} roughness={0.42} metalness={0.55} />
      </mesh>
      {[-1, 1].map((k) => (
        <mesh key={k} castShadow position={[k * 0.42, 0.015, 0.03]}>
          <boxGeometry args={[0.1, 0.03, 0.4]} />
          <meshStandardMaterial color="#3a3d42" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
      {/* pole up the back */}
      <mesh castShadow position={[0, 0.92, -0.08]}>
        <cylinderGeometry args={[0.014, 0.014, 1.62, 10]} />
        <meshStandardMaterial color="#9a9ea6" roughness={0.4} metalness={0.6} />
      </mesh>
      <group position={[0, 0.92, 0.005]}>
        <mesh castShadow>
          <boxGeometry args={[0.92, 1.61, 0.012]} />
          <meshStandardMaterial color="#15203a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.008]}>
          <planeGeometry args={[0.92, 1.61]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
        <mesh castShadow position={[0, 0.83, 0]}>
          <boxGeometry args={[0.95, 0.035, 0.035]} />
          <meshStandardMaterial color="#9a9ea6" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function pavingTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  let seed = 4242;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  g.fillStyle = "#7d766a";
  g.fillRect(0, 0, 256, 256);
  // slabs, each very slightly its own shade
  const n = 4, size = 256 / n;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const v = 118 + Math.floor(rnd() * 24);
      g.fillStyle = `rgb(${v},${v - 4},${v - 12})`;
      g.fillRect(x * size + 1.5, y * size + 1.5, size - 3, size - 3);
    }
  }
  // joints
  g.strokeStyle = "rgba(58,54,48,.7)";
  g.lineWidth = 2;
  for (let i = 0; i <= n; i++) {
    g.beginPath(); g.moveTo(i * size, 0); g.lineTo(i * size, 256); g.stroke();
    g.beginPath(); g.moveTo(0, i * size); g.lineTo(256, i * size); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(26, 26);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Stall({ onOpen, onSpeaker, playing }) {
  const paving = useMemo(pavingTexture, []);
  const cards = useTexture("img/card-01.jpg");
  const fuji = useTexture("img/mtfuji.jpg");
  const wallInk = useTexture("img/wall-ink.jpg");
  const poster = useTexture("img/poster-cards.jpg");
  const banner = useTexture("img/counter-banner.jpg");
  const standPoster = useTexture("img/stall-poster.jpg");
  const jpLawson = useTexture("img/jp-lawson.jpg");
  const jpFalls = useTexture("img/jp-falls.jpg");
  const jpAkiba = useTexture("img/jp-akihabara.jpg");
  [cards, fuji, wallInk, poster, banner, standPoster,
   jpLawson, jpFalls, jpAkiba].forEach((t) => (t.colorSpace = THREE.SRGBColorSpace));

  const COUNTER_TOP = 0.95;
  const BACK_Z = -1.5;

  return (
    <group>
      {/* floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial map={paving} roughness={0.92} />
      </mesh>

      {/* back wall, carrying the ink drawing from the deck */}
      <mesh receiveShadow position={[0, 1.35, BACK_Z]}>
        <boxGeometry args={[4.3, 2.7, 0.08]} />
        <meshStandardMaterial color="#f2eee6" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.34, BACK_Z + 0.045]}>
        <planeGeometry args={[4.16, 4.16 / 1.78]} />
        <meshStandardMaterial map={wallInk} roughness={0.95} />
      </mesh>

      {/* side returns */}
      {[-2.15, 2.15].map((x) => (
        <mesh key={x} receiveShadow castShadow position={[x, 1.35, BACK_Z / 2]}>
          <boxGeometry args={[0.08, 2.7, 1.5]} />
          <meshStandardMaterial color="#22304c" roughness={0.9} />
        </mesh>
      ))}

      {/* the card poster, pinned on the left return */}
      <Hot id="cards" onOpen={onOpen} lift={0} position={[-2.1, 1.5, BACK_Z / 2]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.15, 0.84]} />
          <meshStandardMaterial map={poster} roughness={0.9} />
        </mesh>
      </Hot>

      {/* the dark header board */}
      <Hot id="brand" onOpen={onOpen} lift={0} position={[0, 2.35, BACK_Z + 0.07]}>
        <mesh castShadow>
          <boxGeometry args={[3.1, 0.42, 0.06]} />
          <meshStandardMaterial color="#23241f" roughness={0.7} />
        </mesh>
        <Text position={[0, 0.04, 0.04]} fontSize={0.17} letterSpacing={0.32} color="#f4f1e9"
              anchorX="center" anchorY="middle">FUJI</Text>
        <Text position={[0, -0.12, 0.04]} fontSize={0.045} letterSpacing={0.28} color="#c9a227"
              anchorX="center" anchorY="middle">JAPANESE CHOCOLATES</Text>
      </Hot>

      <Bunting y={1.95} z={BACK_Z + 0.5} halfWidth={2.0} />

      {/* a speaker hung in each top corner of the stand */}
      <Speaker onSpeaker={onSpeaker} playing={playing} x={-1.78} z={BACK_Z + 0.24} />
      <Speaker onSpeaker={onSpeaker} playing={playing} x={1.78} z={BACK_Z + 0.24} />

      {/* the roll-up banner, standing to the right of the stall */}
      <RollUp id="poster" onOpen={onOpen} map={standPoster} x={3.35} z={0.5} turn={-0.5} />

      {/* the four photos, one row across the wall */}
      {[
        ["mtfuji", fuji, -1.62],
        ["jp-lawson", jpLawson, -0.88],
        ["jp-falls", jpFalls, -0.14],
        ["jp-akihabara", jpAkiba, 0.60],
      ].map(([key, tex, x]) => (
        <Hot key={key} id="ending" onOpen={onOpen} lift={0} position={[x, 1.46, BACK_Z + 0.06]}>
          <mesh castShadow>
            <boxGeometry args={[0.62, 0.44, 0.022]} />
            <meshStandardMaterial color="#fffdf8" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.014]}>
            <planeGeometry args={[0.56, 0.38]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
        </Hot>
      ))}

      {/* the counter */}
      <Hot id="stall" onOpen={onOpen} lift={0} position={[0, 0, 0]}>
        <RoundedBox args={[4.3, COUNTER_TOP, 0.72]} radius={0.012} smoothness={3}
                    castShadow receiveShadow position={[0, COUNTER_TOP / 2, 0]}>
          <meshStandardMaterial color="#1e2a44" roughness={0.94} />
        </RoundedBox>
        {/* pale counter top, so the products sit on light */}
        <mesh receiveShadow position={[0, COUNTER_TOP + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.3, 0.72]} />
          <meshStandardMaterial color="#efe9dc" roughness={0.85} />
        </mesh>
        {/* the banner that actually hung on the front of the table */}
        <mesh position={[0, COUNTER_TOP * 0.52, 0.3705]}>
          <planeGeometry args={[4.12, 4.12 / 8.56]} />
          <meshBasicMaterial map={banner} toneMapped={false} />
        </mesh>
      </Hot>

      {/* things standing on the counter */}
      <Hot id="supply" onOpen={onOpen} position={[-1.95, COUNTER_TOP, 0.06]}>
        <Crate position={[0, 0.11, 0]} />
        <Crate position={[0.06, 0.33, -0.03]} rotation={[0, 0.22, 0]} />
      </Hot>

      <Bar id="matcha" map="img/old-matcha.jpg" position={[-0.52, COUNTER_TOP, 0.05]} onOpen={onOpen} />
      <Bar id="sesame" map="img/old-sesame.jpg" position={[-0.16, COUNTER_TOP, 0.05]} onOpen={onOpen} />
      <Bar id="yuzu"   map="img/old-yuzu.jpg"   position={[0.2,   COUNTER_TOP, 0.05]} onOpen={onOpen} />

      {/* the card rack */}
      <Hot id="cards" onOpen={onOpen} position={[1.06, COUNTER_TOP, 0.0]}>
        <mesh castShadow position={[0, 0.13, 0]} rotation={[-0.34, 0.12, 0]}>
          <boxGeometry args={[0.22, 0.3, 0.012]} />
          <meshStandardMaterial map={cards} roughness={0.75} />
        </mesh>
      </Hot>

      {/* the samples, on a wooden board */}
      <Hot id="samples" onOpen={onOpen} position={[0.62, COUNTER_TOP, 0.12]}>
        <group rotation={[0, -0.18, 0]}>
          <RoundedBox args={[0.42, 0.022, 0.28]} radius={0.008} smoothness={3}
                      castShadow position={[0, 0.011, 0]}>
            <meshStandardMaterial color="#a8763f" roughness={0.72} />
          </RoundedBox>
          {/* the little handle end */}
          <RoundedBox args={[0.1, 0.02, 0.1]} radius={0.006} smoothness={3}
                      castShadow position={[0.25, 0.011, 0]}>
            <meshStandardMaterial color="#a8763f" roughness={0.72} />
          </RoundedBox>
          {/* a darker grain line or two */}
          {[-0.06, 0.05].map((z, i) => (
            <mesh key={i} position={[0, 0.023, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.38, 0.006]} />
              <meshBasicMaterial color="#8c5f30" />
            </mesh>
          ))}
          {/* pieces broken off, laid out on the board */}
          {[[-0.13, 0.04], [-0.03, 0.07], [0.06, -0.02], [-0.07, -0.06], [0.03, 0.02]]
            .map(([dx, dz], i) => (
            <mesh key={i} castShadow position={[dx, 0.032, dz]} rotation={[0, i * 0.6, 0]}>
              <boxGeometry args={[0.05, 0.014, 0.05]} />
              <meshStandardMaterial color={i % 2 ? "#4a3527" : "#2f2118"} roughness={0.5} />
            </mesh>
          ))}
        </group>
      </Hot>

      {/* cash box */}
      <Hot id="numbers" onOpen={onOpen} position={[1.6, COUNTER_TOP, 0]}>
        <mesh castShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[0.42, 0.2, 0.3]} />
          <meshStandardMaterial color="#33352c" roughness={0.6} metalness={0.15} />
        </mesh>
        <Text position={[0, 0.1, 0.16]} fontSize={0.1} color="#c9a227"
              anchorX="center" anchorY="middle">₹</Text>
      </Hot>
    </group>
  );
}
