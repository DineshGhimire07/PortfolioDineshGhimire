import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Connect from "./pages/Connect";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [transitionState, setTransitionState] = useState({ isLoading: false, targetPage: null, loaderIndex: null });
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    if (page === currentPage) return;
    
    if (page === 'projects') {
      // Randomly pick LoaderTwo (1) or LoaderThree (2) for the Work page transition
      const workLoaderIndex = Math.random() > 0.5 ? 1 : 2;
      setTransitionState({ isLoading: true, targetPage: page, loaderIndex: workLoaderIndex });
    } else {
      // Direct navigation for other pages without loader
      setCurrentPage(page);
    }
  };

  const handleTransitionComplete = () => {
    setCurrentPage(transitionState.targetPage);
    setTransitionState({ isLoading: false, targetPage: null, loaderIndex: null });
  };

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {isInitialLoad ? (
          <Preloader key="initial-preloader" onComplete={() => setIsInitialLoad(false)} />
        ) : transitionState.isLoading ? (
          <Preloader 
            key="transition-preloader" 
            forcedIndex={transitionState.loaderIndex} 
            onComplete={handleTransitionComplete} 
          />
        ) : (
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <Home key="home" onNavigate={handleNavigate} />
            )}
            {currentPage === 'projects' && (
              <Projects key="projects" onNavigate={handleNavigate} />
            )}
            {currentPage === 'connect' && (
              <Connect key="connect" onNavigate={handleNavigate} />
            )}
          </AnimatePresence>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
