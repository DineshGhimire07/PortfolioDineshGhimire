import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ButtonWithIconDemo } from './ui/ButtonWithIconDemo';
import styles from './Navbar.module.css';

export default function Navbar({ onNavigate }) {
  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.navContainer}>
        <div 
          className={styles.logo}
          onClick={() => onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          Dinesh Ghimire<span className={styles.dot}>.</span>
        </div>
        <nav className={styles.nav}>
          <a 
            href="#home" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            Home
          </a>
          <a 
            href="#work" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('projects');
            }}
          >
            Work
          </a>
          <a 
            href="#connect" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('connect');
            }}
          >
            Connect
          </a>
        </nav>
        <div className={styles.cta}>
          <ButtonWithIconDemo 
            text="Connect"
            onClick={() => onNavigate('connect')} 
          />
        </div>
      </div>
    </motion.header>
  );
}
