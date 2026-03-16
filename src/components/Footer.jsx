import { motion } from 'framer-motion';
import SkillsStrip from './SkillsStrip';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <SkillsStrip />
      <div className={styles.copyrightContainer}>
        <div className={styles.footerBranding}>
          <p className={styles.copyrightText}>
            Copyright Dinesh Ghimire 2026
          </p>
          <div className={styles.internalLinks}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.footLink}>About Dinesh Ghimire</button>
            <span className={styles.sep}>•</span>
            <button onClick={() => window.location.hash = '#projects'} className={styles.footLink}>Explore Projects</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
