import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroStatement.module.css";

const GREETINGS = [
  "HELLO", "BONJOUR", "HOLA", "NAMASTE", "CIAO", "SALAAM", "OLÁ"
];

const FINAL_NAME = "DINESH";

export default function HeroStatement({ onResolve, onNavigate }) {
  const [displayText, setDisplayText] = useState(GREETINGS[0]);
  const [isResolved, setIsResolved] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    let cycleCount = 0;
    const maxCycles = GREETINGS.length;

    const interval = setInterval(() => {
      cycleCount++;

      if (cycleCount >= maxCycles) {
        clearInterval(interval);
        setDisplayText(FINAL_NAME);
        setIsResolved(true);

        // Slower background trigger to let name settle
        setTimeout(() => {
          if (onResolve) onResolve();
        }, 1000);

        setTimeout(() => setShowSubtext(true), 1200);
      } else {
        setDisplayText(GREETINGS[cycleCount]);
      }
    }, 300); // Balanced rhythm for readability and energy

    return () => clearInterval(interval);
  }, [onResolve]);

  const charVariants = {
    initial: {
      opacity: 0,
      y: 15,
      filter: "blur(8px)"
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(8px)",
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className={styles.statementWrapper}>
      <div className={styles.heroTextContainer}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={displayText}
            className={isResolved ? styles.heroTextResolved : styles.heroText}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {displayText.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={charVariants}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>
      </div>

      <motion.div
        className={styles.contentWrapper}
        animate={showSubtext ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.subtextWrapper}>
          <div className="relative flex items-center justify-center">
            <span className={styles.separator} />
            <h3 className={styles.subheading}>
              Business, Branding, Data & Digital.
            </h3>
          </div>
        </div>

        <p className={styles.description}>
          Building modern ideas through business thinking, data analytics, and digital execution.
        </p>

        <div className={styles.buttonGroup}>
          <button 
            className={styles.primaryButton}
            onClick={() => onNavigate('projects')}
          >
            View Work
          </button>
          <button 
            className={styles.secondaryButton}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About Me
          </button>
        </div>
      </motion.div>
    </div>
  );
}
