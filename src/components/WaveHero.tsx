import React, { useEffect, useRef } from 'react';
import paper from 'paper';
import { useNavigate } from 'react-router-dom';

const WaveHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    paper.setup(canvasRef.current);

    let h = window.innerHeight;
    let w = window.innerWidth;
    let horizon = h / 2;
    const pathCounts = 13;
    const pathPoints = 15;
    const strokeWidth = 2;
    const strokeColor = '#7aa4c3';
    const speed = 1.6;
    const offset = 7;
    const frequency = [0, -30, 50, -50, -35, 35, 0, -30, 50, -50, -35, 35, -30, 50, -50, -35, 35];
    const delay = 0.9;
    let paths: paper.Path[] = [];

    const initializePath = () => {
      h = window.innerHeight;
      w = window.innerWidth;
      horizon = h / 2 + 50; // slightly lower than center

      paper.project.activeLayer.removeChildren();
      paths = [];

      for (let i = 0; i < pathCounts; i++) {
        const path = new paper.Path();

        // Start at bottom-left
        path.add(new paper.Point(-10, h + 10));
        // Go UP to horizon on the left
        path.add(new paper.Point(-10, horizon));

        // Draw the wave across
        for (let p = 0; p < pathPoints; p++) {
          path.add(new paper.Point((w / (pathPoints - 1)) * p, horizon + frequency[p]));
        }

        // Go to bottom-right
        path.add(new paper.Point(w + 10, horizon));
        path.add(new paper.Point(w + 10, h + 10));

        path.strokeWidth = strokeWidth;
        path.strokeColor = new paper.Color(strokeColor);
        
        if (i === 0) {
          // Fill the top area with the gradient
          path.fillColor = {
            gradient: {
              stops: ['#042d5b', '#9bc4d8']
            },
            origin: new paper.Point(0, 0),
            destination: new paper.Point(w, h)
          } as any;
        }

        path.smooth();
        paths.push(path);
      }
    };

    initializePath();

    paper.view.onFrame = (event: any) => {
      for (let p = 0; p < pathCounts; p++) {
        for (let s = 0; s < pathPoints; s++) {
          // skip first two points because they are the base of the path
          const value = (s % 2) ? -1 : 1;
          const segment = paths[p].segments[2 + s];
          if (segment) {
            segment.point.y = horizon + (Math.sin((event.time + s * delay) * speed)) * (frequency[s] * value + (p * offset * value));
          }
        }
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);
      }
      initializePath();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      paper.project.clear();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#042d5b]">
      {/* The background image that will show through the top part */}
      <div className="absolute inset-0 w-full h-full z-0 flex flex-col justify-start">
        <img 
          src="/images/vr-hero.jpg" 
          alt="Hero Background" 
          className="w-full object-cover object-center" 
          style={{ height: '60vh' }}
        />
        {/* Subtle overlay for blending */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#042d5b]/40 via-transparent to-transparent z-10" />
      </div>

      <canvas 
        ref={canvasRef} 
        id="bend" 
        className="absolute inset-0 w-full h-full z-20 pointer-events-none" 
      />
      
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-12 md:pb-24 pointer-events-none text-center">
        <h1 
          className="font-black text-white leading-none tracking-tighter mix-blend-overlay drop-shadow-2xl text-6xl sm:text-7xl md:text-[10vw]"
          style={{ opacity: 0.95 }}
        >
          TRUE CONNECT
        </h1>
        <div className="mt-8 pointer-events-auto">
           <button onClick={() => navigate('/internet-services')} className="bg-tc-yellow text-tc-navy hover:bg-white font-bold px-8 py-4 md:px-10 md:py-5 rounded-full transition-all shadow-xl hover:scale-105 uppercase tracking-widest text-xs md:text-sm">
             Explore Services
           </button>
        </div>
      </div>
    </section>
  );
};

export default WaveHero;
