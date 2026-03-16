import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollToPlugin);

const PROJECTS = [
  {
    id: 1,
    title: "IRCTC Complaint Dashboard",
    description: "Analyzed 10 years of Indian Railways complaint data using Python, SQL, and Power BI.",
    category: "Data Analytics",
    image: "/projects/irctc.png"
  },
  {
    id: 2,
    title: "Hand-Tracking Chess",
    description: "Computer vision-based chess game playing using hand gestures detected via webcam.",
    category: "AI / Computer Vision",
    image: "/projects/chess.png"
  },
  {
    id: 3,
    title: "StockVision.in",
    description: "Full-stack Indian stock market intelligence platform with live Yahoo Finance data.",
    category: "Full Stack Dev",
    image: "/projects/stockvision.png"
  },
  {
    id: 4,
    title: "Life Manager Dashboard",
    description: "Personal productivity web app tracking habits, fitness, and expenses in one view.",
    category: "Product Design",
    image: "/projects/lifemanager.png"
  },
  {
    id: 5,
    title: "Election 2082 Dashboard",
    description: "Live results dashboard with interactive GeoJSON maps and candidate photo tracking.",
    category: "Data Viz",
    image: "/projects/nepal.png"
  },
  {
    id: 6,
    title: "Personal Portfolio",
    description: "Designed personal brand identity and developed the showcase with React and GSAP.",
    category: "Branding / Web",
    image: "/projects/portfolio.png"
  },
  {
    id: 7,
    title: "HR AI Implementation",
    description: "Research paper co-authored on AI agents transforming human resource management.",
    category: "AI Research",
    image: "/projects/hr_ai.png"
  },
  {
    id: 8,
    title: "RK Business Analytics",
    description: "Power BI dashboards and SQL-based data pipelines for large-scale operations.",
    category: "Business Intelligence",
    image: "/projects/rk.png"
  }
];

const LOOPED_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];

export default function Projects({ onNavigate }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(PROJECTS.length + 2); // 3rd project of middle set
  const [isReady, setIsReady] = useState(false);
  
  const scrollToIndex = useCallback((index) => {
    if (!sliderRef.current) return;
    
    const slider = sliderRef.current;
    const cards = slider.querySelectorAll(`.${styles.card}`);
    const card = cards[index];
    
    if (card) {
      const scrollPos = card.offsetLeft - (slider.offsetWidth / 2) + (card.offsetWidth / 2);
      gsap.to(slider, {
        scrollTo: { x: scrollPos },
        duration: 0.6,
        ease: "power2.out",
        overwrite: 'auto'
      });
    }
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current || !isReady) return;
    const slider = sliderRef.current;
    const scrollLeft = slider.scrollLeft;
    const singleSetWidth = slider.scrollWidth / 3;

    if (scrollLeft <= 5) {
      slider.scrollLeft = Math.floor(singleSetWidth + 5);
    } else if (scrollLeft >= singleSetWidth * 2 - 5) {
      slider.scrollLeft = Math.floor(singleSetWidth - 5);
    }

    const cards = slider.querySelectorAll(`.${styles.card}`);
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const viewportCenter = slider.scrollLeft + slider.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const initSlider = () => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const cards = slider.querySelectorAll(`.${styles.card}`);
        const targetIndex = PROJECTS.length + 2; // Index for the 3rd card in the middle set
        const targetCard = cards[targetIndex];
        
        if (targetCard) {
          const scrollPos = targetCard.offsetLeft - (slider.offsetWidth / 2) + (targetCard.offsetWidth / 2);
          slider.scrollLeft = scrollPos;
        }
        setIsReady(true);
      }
    };
    const timer = setTimeout(initSlider, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className={styles.pageContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SEO 
        title="Selected Projects" 
        description="Explore the digital portfolio of Dinesh Ghimire. Business intelligence, data analytics, and digital brand projects."
        canonical="https://ghimire-dinesh.com.np/projects"
      />
      <Navbar onNavigate={onNavigate} />
      
      <main className={styles.main}>
        <div className={styles.titleHeader}>
          <h1 className={styles.mainTitle}>Selected Works</h1>
          <p className={styles.subtitle}>
            Explore the intersection of business strategy and digital execution through projects by Dinesh Ghimire.
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.navBtn} ${styles.prevBtn}`} 
            onClick={() => scrollToIndex(activeIndex - 1)}
          >
            ←
          </button>
          
          <div 
            className={styles.sliderWrapper} 
            ref={sliderRef}
            onScroll={handleScroll}
          >
            {LOOPED_PROJECTS.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className={`${styles.card} ${index === activeIndex ? styles.activeCard : ''}`}
                onClick={() => scrollToIndex(index)}
              >
                <div className={styles.imageOverlay} />
                <img src={project.image} alt={project.title} className={styles.cardImage} />
                
                <div className={styles.cardContent}>
                  <div className={styles.cardText}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                      <span className={styles.tag}>{project.category}</span>
                    </div>
                    <div className={styles.iconArrow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.navBtn} ${styles.nextBtn}`} 
            onClick={() => scrollToIndex(activeIndex + 1)}
          >
            →
          </button>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
