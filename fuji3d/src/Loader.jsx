import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

/* Centred on screen, with the dots cycling . / .. / ... */
export default function Loader() {
  const { active, progress } = useProgress();
  const [dots, setDots] = useState(".");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setInterval(
      () => setDots((d) => (d.length >= 3 ? "." : d + ".")),
      380
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setHide(true), 420);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  if (hide) return null;
  return (
    <div className={"loader" + (!active && progress >= 100 ? " gone" : "")}>
      <p>
        setting up the pop up<span className="dots">{dots}</span>
      </p>
    </div>
  );
}
