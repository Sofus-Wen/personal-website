import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

/* Every clickable thing in the scene wraps in this: it handles the hover
   lift, the pointer cursor and firing the panel open. */
function Hot({ id, onOpen, children, lift = 0.03, position = [0, 0, 0] }) {
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

function Speaker({ onSpeaker, playing, z }) {
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
    <group position={[1.75, 1.62, z]}>
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

export default function Stall({ onOpen, onSpeaker, playing }) {
  const cards = useTexture("img/card-01.jpg");
  const fuji = useTexture("img/mtfuji.jpg");
  const wallInk = useTexture("img/wall-ink.jpg");
  const poster = useTexture("img/poster-cards.jpg");
  const banner = useTexture("img/counter-banner.jpg");
  const standPoster = useTexture("img/stall-poster.jpg");
  [cards, fuji, wallInk, poster, banner, standPoster].forEach((t) => (t.colorSpace = THREE.SRGBColorSpace));

  const COUNTER_TOP = 0.95;
  const BACK_Z = -1.5;

  return (
    <group>
      {/* floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#b8a58c" roughness={1} />
      </mesh>

      {/* back wall, carrying the ink drawing from the deck */}
      <mesh receiveShadow position={[0, 1.35, BACK_Z]}>
        <boxGeometry args={[4.3, 2.7, 0.08]} />
        <meshStandardMaterial color="#f2eee6" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.42, BACK_Z + 0.045]}>
        <planeGeometry args={[4.16, 1.72]} />
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
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[3.02, 0.34]} />
          <meshBasicMaterial color="#23241f" />
        </mesh>
      </Hot>

      <Bunting y={1.95} z={BACK_Z + 0.5} halfWidth={2.0} />

      {/* the photo pinned on the back wall */}
      <Hot id="ending" onOpen={onOpen} lift={0} position={[-1.35, 1.35, BACK_Z + 0.06]}>
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.44, 0.03]} />
          <meshStandardMaterial color="#fffdf8" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[0.55, 0.37]} />
          <meshBasicMaterial map={fuji} />
        </mesh>
      </Hot>

      {/* speaker in the corner — opens the player, and moves while it plays */}
      <Speaker onSpeaker={onSpeaker} playing={playing} z={BACK_Z + 0.2} />

      {/* the poster that stood outside the stall */}
      <Hot id="poster" onOpen={onOpen} lift={0} position={[-2.26, 0, 0.62]}>
        <group rotation={[0, 0.62, 0]}>
          {/* legs and foot */}
          <mesh castShadow position={[0, 0.03, 0.06]}>
            <boxGeometry args={[0.42, 0.05, 0.3]} />
            <meshStandardMaterial color="#2a2c26" roughness={0.7} />
          </mesh>
          <mesh castShadow position={[0, 0.42, 0]}>
            <boxGeometry args={[0.05, 0.8, 0.05]} />
            <meshStandardMaterial color="#2a2c26" roughness={0.7} />
          </mesh>
          {/* the board, leaning back a touch like a real A-frame */}
          <group position={[0, 1.28, 0.02]} rotation={[-0.07, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.66, 1.12, 0.035]} />
              <meshStandardMaterial color="#15203a" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[0.62, 1.08]} />
              <meshBasicMaterial map={standPoster} toneMapped={false} />
            </mesh>
          </group>
        </group>
      </Hot>

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
      <Hot id="supply" onOpen={onOpen} position={[-1.72, COUNTER_TOP, 0.02]}>
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

      {/* the plate of samples */}
      <Hot id="samples" onOpen={onOpen} position={[0.62, COUNTER_TOP, 0.12]}>
        <mesh castShadow position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.018, 40]} />
          <meshStandardMaterial color="#f6f2e8" roughness={0.5} />
        </mesh>
        {[[-0.06, 0.03], [0.05, 0.05], [0.0, -0.05], [0.07, -0.03], [-0.05, -0.02]].map(([dx, dz], i) => (
          <mesh key={i} castShadow position={[dx, 0.028, dz]} rotation={[0, i * 0.7, 0]}>
            <boxGeometry args={[0.045, 0.014, 0.045]} />
            <meshStandardMaterial color={i % 2 ? "#4a3527" : "#2f2118"} roughness={0.55} />
          </mesh>
        ))}
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
