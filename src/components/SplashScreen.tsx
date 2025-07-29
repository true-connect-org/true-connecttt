import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import logo from '@/assets/true-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    

    const timeout = setTimeout(() => {
             // GSAP splash animation
    const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 500);
        }
      });
  
      tl.from('.splash-logo', {
        scale: 0,
        // rotation: 180,
        duration: 1,
        ease: 'back.out(1.7)'
      })
      .from('.splash-text', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.splash-tagline', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .to('.splash-content', {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.in'
      }, '+=0.5')
      .to('.splash-screen', {
        opacity: 0,
        // scale: 0.8,
        y:-100,
        duration: 0.6,
        ease: 'power2.in'
      });
    },2)
   
     return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div className="splash-screen fixed inset-0 bg-background z-50 flex items-center justify-center bg-gradient-mesh">
      <div className="splash-content text-center">
        <div className="splash-logo mb-8">
          <img 
            src={logo} 
            alt="True Connect" 
            className="w-32 h-32 mx-auto mb-6 speed-indicator object-contain"
          />
        </div>
        
        <h1 className="splash-text text-6xl font-bold gradient-text mb-4">
          True Connect
        </h1>
        
        <p className="splash-tagline text-xl text-muted-foreground font-medium">
          Boost Your Speed
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-primary animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;