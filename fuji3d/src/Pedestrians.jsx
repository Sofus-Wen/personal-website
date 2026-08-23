import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Mii from "./Mii.jsx";

/* People crossing the plaza in front of the stall. Not clickable — they're
   passers-by, and the stall's own five are the ones with something to say. */
const WALKERS = [
  { z: 2.75, speed: 0.5,  from: -5, scale: 0.8,
    look: { skin:"#c9925f", hair:"#171310", hairStyle:"short", glasses:false, shirt:"#b8654a", trousers:"#2f3540", brow:0.14, mouth:1.0 } },
  { z: 3.25, speed: -0.44, from: 4, scale: 0.76,
    look: { skin:"#e8c6a4", hair:"#20242c", hairStyle:"short", glasses:false, shirt:"#8d99a8", trousers:"#3b4250", brow:0.1, mouth:0.9 } },
  { z: 3.7,  speed: 0.34, from: 0, scale: 0.74,
    look: { skin:"#b87c4e", hair:"#141110", hairStyle:"curly", glasses:true, shirt:"#c8a24a", trousers:"#333a45", brow:0.12, mouth:1.0 } },
];

const SPAN = 9;   // only about ±2.7 is in shot here, so they pass through often

function Walker({ z, speed, from, look, scale = 1 }) {
  const g = useRef();
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    let x = from + t * speed;
    // wrap so the flow never stops
    const range = SPAN * 2;
    x = ((((x + SPAN) % range) + range) % range) - SPAN;
    g.current.position.x = x;
    // Gait tied to |speed| so direction doesn't invert the rhythm, and a
    // smooth sine rather than an abs() — that kink was the jerk in the walk.
    const gait = t * Math.abs(speed) * 5.2;
    g.current.position.y = 0.022 + Math.sin(gait) * 0.022;
    g.current.rotation.z = Math.sin(gait * 0.5) * 0.022;
    g.current.rotation.x = Math.sin(gait) * 0.012;
  });
  return (
    <group ref={g} position={[from, 0, z]} scale={scale}
           rotation={[0, speed > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
      <Mii look={look} lit={false} />
    </group>
  );
}

export default function Pedestrians() {
  return (
    <group>
      {WALKERS.map((w, i) => <Walker key={i} {...w} />)}
    </group>
  );
}
