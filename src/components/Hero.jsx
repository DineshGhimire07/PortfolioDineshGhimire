import { useState, useCallback } from 'react';
import EditorialLayout from './founder/EditorialLayout';
import FounderMasthead from './founder/FounderMasthead';
import styles from './Hero.module.css';

export default function Hero({ onNavigate }) {
  const [backgroundTrigger, setBackgroundTrigger] = useState(false);

  const handleGreetingResolve = useCallback(() => {
    setBackgroundTrigger(true);
  }, []);

  return (
    <section className={styles.editorialHeroSection}>
      {/* 1. Deepest Layer: Watermark with Wave Animation */}
      <FounderMasthead triggerSweep={backgroundTrigger} />

      {/* 2. Content Layer: Editorial Grid + Portrait */}
      <EditorialLayout onGreetingResolve={handleGreetingResolve} onNavigate={onNavigate} />
    </section>
  );
}
