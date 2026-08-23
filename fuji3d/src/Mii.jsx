import { RoundedBox } from "@react-three/drei";

/* Mii-ish characters: a big rounded head, a small body, flat features. Built
   from primitives so each person can be given their own hair, glasses and
   shirt without any modelling. */

function Hair({ style, colour, r }) {
  if (style === "curly") {
    /* Lumps placed on the surface of the skull rather than offset by hand —
       the earlier version sat them inside the head, so it read as bald.
       Each entry is [azimuth, elevation, size]. */
    const dirs = [
      [0, 1.35, 0.42], [-0.7, 1.15, 0.38], [0.7, 1.15, 0.38],
      [-1.5, 0.95, 0.34], [1.5, 0.95, 0.34], [Math.PI, 1.15, 0.40],
      [-2.4, 0.95, 0.34], [2.4, 0.95, 0.34], [0, 0.72, 0.30],
      [-1.05, 0.55, 0.28], [1.05, 0.55, 0.28],
    ];
    return (
      <group>
        {dirs.map(([az, el, size], i) => {
          const cr = Math.cos(el) * r * 0.92;
          return (
            <mesh key={i} castShadow
                  position={[Math.sin(az) * cr, Math.sin(el) * r * 0.95, Math.cos(az) * cr]}>
              <sphereGeometry args={[r * size, 14, 12]} />
              <meshStandardMaterial color={colour} roughness={0.9} />
            </mesh>
          );
        })}
      </group>
    );
  }
  if (style === "swoop") {
    return (
      <group>
        <mesh castShadow position={[0, r * 0.16, -r * 0.03]} scale={[1.05, 0.92, 1.05]}>
          <sphereGeometry args={[r * 1.03, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2.05]} />
          <meshStandardMaterial color={colour} roughness={0.85} />
        </mesh>
        {/* the fringe, pushed across the forehead */}
        <mesh castShadow position={[r * 0.3, r * 0.42, r * 0.66]} rotation={[0.3, 0, -0.5]}>
          <boxGeometry args={[r * 1.05, r * 0.26, r * 0.34]} />
          <meshStandardMaterial color={colour} roughness={0.85} />
        </mesh>
      </group>
    );
  }
  // "short" — a neat cap that clearly reads as hair
  return (
    <group>
      <mesh castShadow position={[0, r * 0.1, -r * 0.02]} scale={[1.06, 0.95, 1.06]}>
        <sphereGeometry args={[r * 1.04, 26, 18, 0, Math.PI * 2, 0, Math.PI / 2.25]} />
        <meshStandardMaterial color={colour} roughness={0.88} />
      </mesh>
      <mesh castShadow position={[0, r * 0.5, r * 0.5]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[r * 1.15, r * 0.2, r * 0.3]} />
        <meshStandardMaterial color={colour} roughness={0.88} />
      </mesh>
    </group>
  );
}

function Glasses({ r }) {
  const z = r * 0.94;
  return (
    <group position={[0, r * 0.06, z]}>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * r * 0.36, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r * 0.26, r * 0.035, 10, 24]} />
          <meshStandardMaterial color="#2b2b28" roughness={0.5} metalness={0.2} />
        </mesh>
      ))}
      <mesh>
        <boxGeometry args={[r * 0.22, r * 0.03, r * 0.03]} />
        <meshStandardMaterial color="#2b2b28" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Face({ r, brow, mouth }) {
  const z = r * 0.95;
  return (
    <group>
      {/* eyes */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * r * 0.34, r * 0.07, z]} scale={[1, 1.25, 0.4]}>
          <sphereGeometry args={[r * 0.085, 16, 12]} />
          <meshStandardMaterial color="#241f1c" roughness={0.4} />
        </mesh>
      ))}
      {/* eyebrows — angle carries most of the expression */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * r * 0.34, r * 0.28, z * 0.99]}
              rotation={[0, 0, s * brow]}>
          <boxGeometry args={[r * 0.28, r * 0.055, r * 0.04]} />
          <meshStandardMaterial color="#2b241f" roughness={0.7} />
        </mesh>
      ))}
      {/* nose */}
      <mesh position={[0, -r * 0.08, z * 1.01]}>
        <sphereGeometry args={[r * 0.055, 12, 10]} />
        <meshStandardMaterial color="#e0a98d" roughness={0.8} />
      </mesh>
      {/* mouth */}
      <mesh position={[0, -r * 0.34, z * 0.99]} scale={[mouth, 0.5, 0.4]}>
        <sphereGeometry args={[r * 0.16, 16, 12]} />
        <meshStandardMaterial color="#8d4a44" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Mii({ look, lit }) {
  const { skin, hair, hairStyle, glasses, shirt, trousers = "#2b3244",
          brow = 0.12, mouth = 1 } = look;
  const R = 0.27;                       // head radius, everything scales off it
  const HEAD_Y = 1.16;
  return (
    <group>
      {/* legs */}
      {[-1, 1].map((s) => (
        <mesh key={s} castShadow position={[s * 0.085, 0.21, 0]}>
          <capsuleGeometry args={[0.055, 0.2, 4, 12]} />
          <meshStandardMaterial color={trousers} roughness={0.9} />
        </mesh>
      ))}
      {/* shoes */}
      {[-1, 1].map((s) => (
        <mesh key={s} castShadow position={[s * 0.085, 0.045, 0.03]}>
          <boxGeometry args={[0.11, 0.07, 0.16]} />
          <meshStandardMaterial color="#22221f" roughness={0.8} />
        </mesh>
      ))}
      {/* torso */}
      <RoundedBox args={[0.34, 0.44, 0.23]} radius={0.1} smoothness={4}
                  castShadow position={[0, 0.62, 0]}>
        <meshStandardMaterial color={lit ? "#c9a227" : shirt} roughness={0.85} />
      </RoundedBox>
      {/* detached hands, the way a Mii has them */}
      {[-1, 1].map((s) => (
        <mesh key={s} castShadow position={[s * 0.24, 0.56, 0.03]}>
          <sphereGeometry args={[0.065, 16, 12]} />
          <meshStandardMaterial color={skin} roughness={0.8} />
        </mesh>
      ))}
      {/* head */}
      <group position={[0, HEAD_Y, 0]}>
        <mesh castShadow scale={[1, 1.07, 0.94]}>
          <sphereGeometry args={[R, 32, 24]} />
          <meshStandardMaterial color={skin} roughness={0.78} />
        </mesh>
        <Hair style={hairStyle} colour={hair} r={R} />
        <Face r={R} brow={brow} mouth={mouth} />
        {glasses && <Glasses r={R} />}
      </group>
    </group>
  );
}
