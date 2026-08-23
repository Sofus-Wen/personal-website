import { useState } from "react";

/* The five of us: two working behind the counter, three out front. Simple
   figures rather than photographs — they read at any angle and don't pretend
   to be something they aren't. */
function Figure({ id, onOpen, position, rotation = [0, 0, 0], scale = 1, colour = "#2b2c26" }) {
  const [hover, setHover] = useState(false);
  return (
    <group
      position={position} rotation={rotation} scale={scale}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onOpen(id); }}
    >
      <mesh castShadow position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.115, 24, 20]} />
        <meshStandardMaterial color={hover ? "#3f6b46" : colour} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 1.0, 0]}>
        <capsuleGeometry args={[0.16, 0.52, 6, 16]} />
        <meshStandardMaterial color={hover ? "#3f6b46" : colour} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.38, 0]}>
        <capsuleGeometry args={[0.13, 0.42, 6, 16]} />
        <meshStandardMaterial color={hover ? "#3f6b46" : colour} roughness={0.85} />
      </mesh>
    </group>
  );
}

export default function People({ onOpen }) {
  return (
    <group>
      {/* behind the counter */}
      <Figure id="team" onOpen={onOpen} position={[-0.55, 0, -0.75]} rotation={[0, 0.12, 0]} />
      <Figure id="team" onOpen={onOpen} position={[0.55, 0, -0.8]} rotation={[0, -0.16, 0]} />
      {/* out front */}
      <Figure id="popups" onOpen={onOpen} position={[-2.55, 0, 1.5]} rotation={[0, 0.85, 0]} scale={0.94} />
      <Figure id="retail" onOpen={onOpen} position={[-1.75, 0, 2.1]} rotation={[0, 0.5, 0]} scale={0.92} />
      <Figure id="pitch"  onOpen={onOpen} position={[2.45, 0, 1.6]}  rotation={[0, -0.85, 0]} scale={0.94} />
    </group>
  );
}
