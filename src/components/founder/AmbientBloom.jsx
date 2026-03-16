import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import styles from "./AmbientBloom.module.css";

export default function AmbientBloom() {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const springConfig = { damping: 120, stiffness: 40, mass: 2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={styles.bloomContainer}>
      <div className={styles.baseColor} />
      <motion.div
        className={styles.bloomCursor}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div className={styles.bloomStaticOne} />
      <div className={styles.bloomStaticTwo} />
      <div className={styles.textureVignette} />
    </div>
  );
}
