import { motion, useMotionValue, useSpring } from 'framer-motion';
import clsx from 'clsx';
import { useRef } from 'react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', className, onClick, ...props }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (magnetic strength)
    x.set((e.clientX - centerX) * 0.2); 
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={clsx(styles.button, styles[variant], className)}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      <span className={styles.textWrapper}>
        <span className={styles.text}>{children}</span>
      </span>
    </motion.button>
  );
}
