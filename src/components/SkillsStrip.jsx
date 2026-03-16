import { motion } from 'framer-motion';
import styles from './SkillsStrip.module.css';

const SKILLS = [
  "Python", "Power BI", "SQL", "React", "GSAP", "Node.js", 
  "Express", "n8n / Make", "Figma", "Next.js", "Tailwind CSS", 
  "Supabase", "OpenCV", "MediaPipe", "Power Query",
  // Duplicate for seamless scroll
  "Python", "Power BI", "SQL", "React", "GSAP", "Node.js", 
  "Express", "n8n / Make", "Figma", "Next.js", "Tailwind CSS", 
  "Supabase", "OpenCV", "MediaPipe", "Power Query"
];

export default function SkillsStrip() {
  return (
    <div className={styles.section}>
      <div className={styles.marqueeContainer}>
        <motion.div 
          className={styles.marquee}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {SKILLS.map((skill, index) => (
            <div key={index} className={styles.skillItem}>
              <span className={styles.skillName}>{skill}</span>
              <span className={styles.star}>✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
