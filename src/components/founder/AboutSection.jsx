import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className={styles.header}>
          <span className={styles.label}>Identity</span>
          <h2 className={styles.title}>About Dinesh Ghimire</h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div variants={itemVariants} className={styles.bioContent}>
            <p className={styles.lead}>
              I’m <span className={styles.highlight}>Dinesh Ghimire</span> — a BBA Entrepreneurship student driven by business thinking, digital building, branding, and data analytics.
            </p>
            <p className={styles.body}>
              As an entrepreneurship student and digital builder, I’m interested in how ideas are shaped, presented, and turned into something valuable. My work reflects a mix of business strategy, creative design, and technical execution, with a focus on building things that are clear, modern, and meaningful.
            </p>
            <p className={styles.body}>
              Right now, I’m exploring the space between entrepreneurship, digital identity, data analytics, and smart systems — learning through real-world projects and building with intention as a personal brand.
            </p>
          </motion.div>


        </div>
      </motion.div>
    </section>
  );
}
