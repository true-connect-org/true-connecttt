import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Plans from "@/components/Plans";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";

const Index = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Plans />
        <Faq />
        <Contact />
        <About />
      </main>

      <Footer />
    </>
  );
};

export default Index;
