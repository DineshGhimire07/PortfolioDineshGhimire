import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring for the primary crisp dot
  const springConfigInner = { damping: 40, stiffness: 400, mass: 0.5 };
  const smoothXInner = useSpring(cursorX, springConfigInner);
  const smoothYInner = useSpring(cursorY, springConfigInner);
  
  // Looser spring for the outer lagging ring/blob
  const springConfigOuter = { damping: 30, stiffness: 200, mass: 1 };
  const smoothXOuter = useSpring(cursorX, springConfigOuter);
  const smoothYOuter = useSpring(cursorY, springConfigOuter);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track standard hoverable elements for inversion/expansion
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('cursor-magnetic')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('cursor-magnetic')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide custom cursor on mobile touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className={styles.cursorInner}
        style={{
          x: smoothXInner,
          y: smoothYInner,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={styles.cursorOuter}
        style={{
          x: smoothXOuter,
          y: smoothYOuter,
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(250, 249, 246, 0.1)" : "rgba(179, 139, 89, 0.2)",
          borderColor: isHovering ? "rgba(250, 249, 246, 0.0)" : "rgba(179, 139, 89, 0.5)",
          backdropFilter: isHovering ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
