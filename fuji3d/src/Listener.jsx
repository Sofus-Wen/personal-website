import { useFrame } from "@react-three/fiber";
import { updateListener } from "./audio.js";

/* Feeds the camera to the audio graph, so the music leans left or right as
   you orbit and gets louder as you zoom in on the stand. Renders nothing. */
export default function Listener() {
  useFrame(({ camera }) => updateListener(camera));
  return null;
}
