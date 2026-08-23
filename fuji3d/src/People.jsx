import { useState } from "react";
import { Html } from "@react-three/drei";

/* The five of us. Two worked behind the counter, three worked the front.
   Clicking someone pops their line above their head rather than opening the
   side panel — the pitch was a spoken thing, so it reads better spoken. */
export const TEAM = [
  {
    id: "sofus", name: "Sofus", where: "behind",
    position: [-0.55, 0, -0.75], rotation: [0, 0.12, 0],
    coat: "#242a38",
    line: "While I was living in Japan I met an old craftsman making chocolate with a view of Mount Fuji. I came back to India wanting to make something inspired by that. Hence Fuji.",
  },
  {
    id: "pablo", name: "Pablo", where: "behind",
    position: [0.55, 0, -0.8], rotation: [0, -0.16, 0],
    coat: "#2b3244",
    line: "You won't believe this. This morning I personally climbed Mount Fuji and picked every ingredient fresh off the mountain — the black sesame, the yuzu, the leaves for the matcha. Then I flew straight back so we could make these fresh this morning.",
  },
  {
    id: "leo", name: "Leo", where: "front",
    position: [-1.72, 0, 1.3], rotation: [0, 0.7, 0], scale: 0.9,
    coat: "#333c50",
    line: "Not only do we have someone from Japan — you also get my genius French chocolate recipes. Japan gave us the inspiration. France gave us the chocolate.",
  },
  {
    id: "krishna", name: "Krishna", where: "front",
    position: [-1.2, 0, 1.95], rotation: [0, 0.42, 0], scale: 0.88,
    coat: "#242a38",
    line: "It's inspired by Japan, but we made it for what Indians actually love — Cadbury, Royce, that kind of chocolate. You should really try it. We have a special deal going today.",
  },
  {
    id: "steve", name: "Steve", where: "front",
    position: [1.72, 0, 1.35], rotation: [0, -0.7, 0], scale: 0.9,
    coat: "#2b3244",
    line: "The cacao is from Costa Rica — where I'm from. I made sure myself we were getting insanely high quality beans from back home.",
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
        <meshStandardMaterial color={lit ? "#c9a227" : coat} roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 1.0, 0]}>
        <capsuleGeometry args={[0.16, 0.52, 6, 16]} />
        <meshStandardMaterial color={lit ? "#c9a227" : coat} roughness={0.85} />
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
