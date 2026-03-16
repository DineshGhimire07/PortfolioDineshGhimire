import { motion } from "framer-motion";
import HeroStatement from "./HeroStatement";
import styles from "./EditorialLayout.module.css";

export default function EditorialLayout({ onGreetingResolve, onNavigate }) {
  return (
    <div className={styles.editorialGrid}>
      {/* Centered Editorial Content */}
      <div className={styles.mainContent}>
        <HeroStatement onResolve={onGreetingResolve} onNavigate={onNavigate} />
      </div>

      {/* Edge Decoration Vertical Text */}
      <div className={styles.edgeTextLeft}>Dinesh Ghimire</div>
      <div className={styles.edgeTextRight}>EST. 2024</div>
    </div>
  );
}
