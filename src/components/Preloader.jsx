import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoaderTwo from './ui/LoaderTwo';
import LoaderThree from './ui/LoaderThree';

export default function Preloader({ onComplete, forcedIndex = null }) {
  // Use forcedIndex if provided (e.g., 1 for LoaderTwo, 2 for LoaderThree), else random
  const activeLoaderIndex = useMemo(() => {
    if (forcedIndex !== null) return forcedIndex;
    return Math.floor(Math.random() * 2);
  }, [forcedIndex]);

  useEffect(() => {
    let localProgress = 0;
    
    // Fast forward if it's a page transition (forcedIndex !== null)
    const incrementBase = forcedIndex !== null ? 4 : 1;
    const durationMultiplier = forcedIndex !== null ? 400 : 800;

    const interval = setInterval(() => {
      localProgress += Math.random() * 2 + incrementBase; 
      
      if (localProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, durationMultiplier);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete, forcedIndex]);

  // Map index to component
  const Loaders = [LoaderTwo, LoaderThree];
  const ActiveLoader = Loaders[activeLoaderIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm">
        <div className="flex items-center justify-center min-h-[300px]">
          <ActiveLoader />
        </div>
      </div>
    </motion.div>
  );
}

