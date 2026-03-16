import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DataVoidCanvas from "./DataVoidCanvas";
import styles from "./FounderMasthead.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FounderMasthead({ triggerSweep }) {
  const [isActivating, setIsActivating] = useState(false);
  const [internalTrigger, setInternalTrigger] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (triggerSweep) {
      triggerEffect();
    }
  }, [triggerSweep]);

  const triggerEffect = () => {
    setIsActivating(true);
    setInternalTrigger(true);
    
    // Wave duration sync
    setTimeout(() => {
      setIsActivating(false);
      setInternalTrigger(false);
    }, 6500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        onEnterBack: () => triggerEffect(),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.mastheadContainer}>
      {/* Liquid Wave Canvas */}
      <DataVoidCanvas text="GHIMIRE" active={isActivating} />

      <div className={styles.watermarkContainer}>
        <div className={styles.watermarkBase}>GHIMIRE</div>
        
        {internalTrigger && (
          <div key={Date.now()} className={styles.watermarkTriggerSweep}>
            GHIMIRE
          </div>
        )}
      </div>

      <div className={styles.backgroundLayer} />
      
      <motion.div 
        className={styles.glowOverlay}
        animate={triggerSweep ? {
          opacity: [0.05, 0.15, 0.05],
        } : { opacity: 0.05 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
