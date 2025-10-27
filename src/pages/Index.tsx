import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Plans from "@/components/Plans";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

const Index = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Prevent scroll during splash screen
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Main Website */}
      <div
        className={`${
          showSplash ? "opacity-0" : "opacity-100"
        } transition-opacity duration-1000`}
      >
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Contact />
          <Plans />
          <Faq />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
