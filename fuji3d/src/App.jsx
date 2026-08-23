import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import Stall from "./Stall.jsx";
import People from "./People.jsx";
import Panel from "./Panel.jsx";

function Loading() {
  return <Html center><p className="loading">setting up the stall…</p></Html>;
}

export default function App() {
  const [open, setOpen] = useState(null);
  const [speaking, setSpeaking] = useState(null);

  return (
    <>
      <p className="nudge">click anything on the stall · drag to look around</p>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.9, 5.3], fov: 44 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#efeae1"]} />
        <mesh position={[0, 2, -6]} onClick={() => setSpeaking(null)} visible={false}>
          <planeGeometry args={[60, 40]} />
        </mesh>
        <fog attach="fog" args={["#efeae1", 9, 20]} />

        <hemisphereLight intensity={0.55} groundColor="#c9c1b2" />
        <directionalLight
          castShadow position={[3.2, 5.2, 3.4]} intensity={1.5}
          shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}
        >
          <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 20]} />
        </directionalLight>
        <directionalLight position={[-4, 3, -2]} intensity={0.35} />

        <Suspense fallback={<Loading />}>
          <Stall onOpen={setOpen} />
          <People speaking={speaking} onSpeak={setSpeaking} />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows position={[0, 0.001, 0]} opacity={0.42} scale={14} blur={2.2} far={4} />

        <OrbitControls
          target={[0, 1.1, 0]}
          enablePan={false}
          minDistance={2.6}
          maxDistance={7.5}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2.12}
          minAzimuthAngle={-Math.PI / 2.6}
          maxAzimuthAngle={Math.PI / 2.6}
          enableDamping
          dampingFactor={0.07}
        />
      </Canvas>

      <p className="foot">the stall · jan–may 2026 · Sofus, Pablo, Leo, Krishna &amp; Steve</p>

      <Panel openKey={open} onClose={() => setOpen(null)} />
    </>
  );
}
