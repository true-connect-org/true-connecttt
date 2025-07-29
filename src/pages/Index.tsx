import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Plans from '@/components/Plans';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Prevent scroll during splash screen
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* Main Website */}
      <div className={`${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Plans />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
