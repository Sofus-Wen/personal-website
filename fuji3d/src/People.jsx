import { useState } from "react";
import { Html } from "@react-three/drei";

/* The five of us. Two worked behind the counter, three worked the front.
   Clicking someone pops their line above their head rather than opening the
   side panel — the pitch was a spoken thing, so it reads better spoken. */
export const TEAM = [
  {
    id: "sofus", name: "Sofus", where: "behind",
    position: [-0.55, 0, -0.75], rotation: [0, 0.12, 0],
    coat: "#2b2c26",
    line: "Japanese chocolate — but we make it here. Matcha, yuzu, black sesame.",
  },
  {
    id: "pablo", name: "Pablo", where: "behind",
    position: [0.55, 0, -0.8], rotation: [0, -0.16, 0],
    coat: "#3a3b32",
    line: "Try a piece first. Nobody buys black sesame until they've tasted it.",
  },
  {
    id: "leo", name: "Leo", where: "front",
    position: [-1.72, 0, 1.3], rotation: [0, 0.7, 0], scale: 0.9,
    coat: "#4a4b40",
    line: "There's a collectable card in every bar. Ten of them. You can't pick which.",
  },
  {
    id: "krishna", name: "Krishna", where: "front",
    position: [-1.2, 0, 1.95], rotation: [0, 0.42, 0], scale: 0.88,
    coat: "#33342c",
    line: "₹400. It's the only Japanese chocolate you'll find on a shelf in Delhi.",
  },
  {
    id: "steve", name: "Steve", where: "front",
    position: [1.72, 0, 1.35], rotation: [0, -0.7, 0], scale: 0.9,
    coat: "#404136",
    line: "We made these ourselves — recipe, packaging, all of it. Come have a look.",
  },
];

function Bubble({ name, line }) {
  return (
    <Html position={[0, 1.95, 0]} center zIndexRange={[20, 0]}>
      <div className="bubble">
        <b>{name}</b>
        <p>{line}</p>
        <i className="tail" />
      </div>
    </Html>
  );
}

function Figure({ person, speaking, onSpeak }) {
  const [hover, setHover] = useState(false);
  const { position, rotation = [0, 0, 0], scale = 1, coat } = person;
  const lit = hover || speaking;
  return (
    <group
      position={position} rotation={rotation} scale={scale}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onSpeak(speaking ? null : person.id); }}
    >
      <mesh castShadow position={[0, 1.52 + (lit ? 0.03 : 0), 0]}>
        <sphereGeometry args={[0.115, 24, 20]} />
        <meshStandardMaterial color={lit ? "#3f6b46" : coat} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 1.0, 0]}>
        <capsuleGeometry args={[0.16, 0.52, 6, 16]} />
        <meshStandardMaterial color={lit ? "#3f6b46" : coat} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.38, 0]}>
        <capsuleGeometry args={[0.13, 0.42, 6, 16]} />
        <meshStandardMaterial color={coat} roughness={0.85} />
      </mesh>
      {speaking && <Bubble name={person.name} line={person.line} />}
    </group>
  );
}

export default function People({ speaking, onSpeak }) {
  return (
    <group>
      {TEAM.map((p) => (
        <Figure key={p.id} person={p} speaking={speaking === p.id} onSpeak={onSpeak} />
      ))}
    </group>
  );
}
