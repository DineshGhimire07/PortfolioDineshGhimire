import { ArrowUpRight } from 'lucide-react';
import styles from './ProjectTeaser.module.css';

const projects = [
  { id: 1, title: 'Lumina OS', category: 'Digital Product', year: '2025' },
  { id: 2, title: 'Aura Fintech', category: 'Web App', year: '2024' },
  { id: 3, title: 'Nexus Studios', category: 'Brand Identity', year: '2024' }
];

export default function ProjectTeaser() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Selected Work</h2>
        <a href="#projects" className={styles.viewAll}>View Archive</a>
      </div>
      
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <div className={styles.imagePlaceholder}>
              <div className={styles.overlay}>
                <ArrowUpRight size={48} className={styles.arrowIcon} />
              </div>
            </div>
            <div className={styles.meta}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.details}>
                <span>{project.category}</span>
                <span className={styles.dot}>•</span>
                <span>{project.year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
