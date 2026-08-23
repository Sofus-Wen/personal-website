import { useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Glow from "./Glow.jsx";
import Mii from "./Mii.jsx";

/* The five of us. Two worked behind the counter, three worked the front.
   Clicking someone pops their line above their head rather than opening the
   side panel, the pitch was a spoken thing, so it reads better spoken.

   The looks are my guesses from the photos: hair, glasses and shirt colour
   are placeholders until Sofus says who actually looked like what. */
export const TEAM = [
  {
    id: "sofus", name: "Sofus", where: "behind",
    position: [-0.55, 0, -0.75], rotation: [0, 0.12, 0], scale: 1.16, scale: 1,
    look: { skin: "#f0c8a8", hair: "#3a2b21", hairStyle: "swoop", glasses: false, shirt: "#1f3b2c", brow: 0.10, mouth: 1.0 },
    line: "while i was living in japan, i met this old craftsman making chocolates with a view of mount fuji. i came back to india & thought… we should make them too.",
  },
  {
    id: "pablo", name: "Pablo", where: "behind",
    position: [0.55, 0, -0.8], rotation: [0, -0.16, 0], scale: 1.16, scale: 1,
    look: { skin: "#e8b98f", hair: "#241a14", hairStyle: "curly", glasses: false, shirt: "#b8452f", brow: -0.22, mouth: 1.35 },
    line: "you won’t believe this. this morning i climbed mount fuji myself & picked the black sesame, yuzu & matcha fresh from the mountain. then i flew straight back here so we could make these today.",
  },
  {
    id: "leo", name: "Leo", where: "front",
    position: [-1.78, 0, 1.12], rotation: [0, 0.62, 0], scale: 0.9,
    look: { skin: "#f4d3b6", hair: "#8a5f2c", hairStyle: "short", glasses: false, shirt: "#e8e2d2", brow: 0.16, mouth: 0.95 },
    line: "and not only do we have someone from japan. i’m french. these are my genius french chocolate recipes.",
  },
  {
    id: "krishna", name: "Krishna", where: "front", holds: "coupon",
    position: [-0.82, 0, 2.15], rotation: [0, 0.3, 0], scale: 0.88,
    look: { skin: "#c98f62", hair: "#1d1512", hairStyle: "short", glasses: true, shirt: "#2f4a7a", brow: 0.06, mouth: 1.15 },
    line: "and i’m indian. trust me, i know what indians like. cadbury, royce… this is made for us. also, we have a special deal today.",
  },
  {
    id: "steve", name: "Steve", where: "front",
    position: [1.72, 0, 1.35], rotation: [0, -0.7, 0], scale: 0.9,
    look: { skin: "#d9a06f", hair: "#2b1d16", hairStyle: "curly", glasses: false, shirt: "#8c3f38", brow: 0.2, mouth: 1.05 },
    line: "the cacao comes all the way from costa rica, where i’m from. i’ve personally made sure we’re getting the good stuff.",
  },
];

/* The valentine's coupon, in whoever's hand. Clicking it opens its own panel
   rather than the speech bubble, so it stops the event going any further. */
function Coupon({ onOpen }) {
  const tex = useTexture("img/coupon.jpg");
  tex.colorSpace = THREE.SRGBColorSpace;
  const [hover, setHover] = useState(false);
  return (
    <group
      position={[0.34, 0.66 + (hover ? 0.035 : 0), 0.16]}
      rotation={[-0.45, 0.42, 0.3]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onOpen("coupon"); }}
    >
      {/* A generous target, the card alone is a hard thing to hit. It has to
          be transparent rather than visible={false}, because three.js skips
          invisible objects when raycasting. */}
      <mesh>
        <boxGeometry args={[0.34, 0.42, 0.18]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* flat and inside the card's own rotated group, so it stays square on */}
      <Glow size={0.3} height={0.4} lit={hover} flat position={[0, 0, -0.012]} />
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.285, 0.005]} />
        <meshStandardMaterial color="#f6eef1" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[0.19, 0.275]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Bubble({ name, line }) {
  // No `center` here: the css anchors the bubble by its bottom edge, so it
  // always sits above the head instead of across the face.
  return (
    <Html position={[0, 1.62, 0]} zIndexRange={[20, 0]}>
      <div className="bubble">
        <b>{name}</b>
        <p>{line}</p>
        <i className="tail" />
      </div>
    </Html>
  );
}

function Figure({ person, speaking, onSpeak, onOpen }) {
  const [hover, setHover] = useState(false);
  const { position, rotation = [0, 0, 0], scale = 1 } = person;
  const lit = hover || speaking;
  return (
    <group
      position={position} rotation={rotation} scale={scale}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = "auto"; }}
      onClick={(e) => { e.stopPropagation(); onSpeak(speaking ? null : person.id); }}
    >
      <Glow size={1.15} lit={lit} position={[0, 0.9, -0.06]} />
      <group position={[0, lit ? 0.03 : 0, 0]}>
        <Mii look={person.look} lit={lit} />
      </group>
      {person.holds === "coupon" && <Coupon onOpen={onOpen} />}
      {speaking && <Bubble name={person.name} line={person.line} />}
    </group>
  );
}

export default function People({ speaking, onSpeak, onOpen }) {
  return (
    <group>
      {TEAM.map((p) => (
        <Figure key={p.id} person={p} speaking={speaking === p.id} onSpeak={onSpeak} onOpen={onOpen} />
      ))}
    </group>
  );
}
