import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Stall from "./Stall.jsx";
import City from "./City.jsx";
import Sky from "./Sky.jsx";
import People from "./People.jsx";
import Panel from "./Panel.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import Loader from "./Loader.jsx";
import Pedestrians from "./Pedestrians.jsx";

export default function App() {
  const [open, setOpen] = useState(null);
  const [speaking, setSpeaking] = useState(null);
  const [music, setMusic] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <Loader />
      <p className="nudge">click anything on the pop up · drag to look around</p>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2.2, 7.6], fov: 44 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#cdd8e2"]} />
        <mesh position={[0, 2, -6]} onClick={() => setSpeaking(null)} visible={false}>
          <planeGeometry args={[60, 40]} />
        </mesh>
        <fog attach="fog" args={["#d6dfe6", 20, 95]} />

        <hemisphereLight intensity={0.48} groundColor="#8e877a" />
        <directionalLight
          castShadow position={[3.2, 5.2, 3.4]} intensity={1.25}
          shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004}
        >
          <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 20]} />
        </directionalLight>
        <directionalLight position={[-4, 3, -2]} intensity={0.35} />

        <Suspense fallback={null}>
          <Sky />
          <City />
          <Pedestrians />
          <Stall onOpen={setOpen} onSpeaker={() => setMusic((m) => !m)} playing={playing} />
          <People speaking={speaking} onSpeak={setSpeaking} onOpen={setOpen} />
          <Environment preset="city" />
        </Suspense>

        <ContactShadows position={[0, 0.001, 0]} opacity={0.42} scale={14} blur={2.2} far={4} />

        <OrbitControls
          target={[0, 1.1, 0]}
          enablePan={false}
          minDistance={1.3}
          maxDistance={24}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2.12}
          minAzimuthAngle={-Math.PI / 2.6}
          maxAzimuthAngle={Math.PI / 2.6}
          enableDamping
          dampingFactor={0.07}
        />
      </Canvas>

      <p className="foot">the pop up · jan–may 2026 · Sofus, Pablo, Leo, Krishna &amp; Steve</p>

      <Panel openKey={open} onClose={() => setOpen(null)} />
      <MusicPlayer
        open={music} onClose={() => setMusic(false)}
        playing={playing} setPlaying={setPlaying}
      />
    </>
  );
}
