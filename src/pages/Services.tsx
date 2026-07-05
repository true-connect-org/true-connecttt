import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Plans from "@/components/Plans";
import Faq from "@/components/Faq";

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <Plans />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
