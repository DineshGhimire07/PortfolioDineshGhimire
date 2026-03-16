import React, { useRef, useEffect } from 'react';

export default function DataVoidCanvas({ text, active }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    let targetPoints = [];
    const particleCount = 1500; // Increased for richer wave feel
    
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      samplePoints();
    };

    const samplePoints = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = width;
      tempCanvas.height = height;
      
      const fontSize = Math.min(width * 0.12, 220); // Sync with CSS 12vw
      tempCtx.font = `900 ${fontSize}px Space Grotesk`;
      tempCtx.fillStyle = 'white';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(text, width / 2, height / 2); // Perfectly centered
      
      const imageData = tempCtx.getImageData(0, 0, width, height).data;
      targetPoints = [];
      
      for (let y = 0; y < height; y += 5) {
        for (let x = 0; x < width; x += 5) {
          const index = (y * width + x) * 4;
          if (imageData[index + 3] > 128) {
            targetPoints.push({ x, y });
          }
        }
      }
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
        this.size = Math.random() * 1.2 + 0.4;
        this.color = '#b38b59'; // Golden/Copper base
        this.alpha = 0;
        this.target = null;
      }

      update(resolve) {
        if (resolve && targetPoints.length > 0) {
          this.alpha = Math.min(this.alpha + 0.015, 0.4); // Slow fade in per particle
          if (!this.target) {
            this.target = targetPoints[Math.floor(Math.random() * targetPoints.length)];
          }
          
          const dx = this.target.x - this.x;
          const dy = this.target.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 1) {
            const force = Math.min(dist * 0.02, 4);
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
            this.vx *= 0.85; 
            this.vy *= 0.85;
          } else {
            this.x = this.target.x;
            this.y = this.target.y;
            this.alpha = 0.2;
          }
        } else {
          this.target = null;
          this.alpha = Math.max(this.alpha - 0.008, 0); // Slower, more natural fade out
          // Liquid "wave" wander
          this.vx += Math.sin(Date.now() * 0.001 + this.x) * 0.05;
          this.vy += Math.cos(Date.now() * 0.001 + this.y) * 0.05;
          this.vx *= 0.98;
          this.vy *= 0.98;
        }

        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update(active);
        p.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [text, active]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        opacity: active ? 0.6 : 0,
        transition: 'opacity 2.5s ease-in-out',
        zIndex: 10
      }} 
    />
  );
}
