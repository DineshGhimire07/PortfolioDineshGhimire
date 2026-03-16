import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/founder/AboutSection';
import ProjectTeaser from '../components/ProjectTeaser';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function Home({ onNavigate }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ width: '100%', overflowX: 'hidden' }}
    >
      <SEO 
        title="Creative Founder & Business Student"
        description="Official portfolio of Dinesh Ghimire. High-end personal brand hub focusing on business strategy, digital building, and data analytics."
        canonical="https://ghimire-dinesh.com.np"
      />
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <AboutSection />
      <Footer onNavigate={onNavigate} />
    </motion.main>
  );
}
