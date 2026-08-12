import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import InternetServices from "./pages/InternetServices";
import EnterpriseServices from "./pages/EnterpriseServices";
import CaseStudies from "./pages/CaseStudies";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import Services from "./pages/Services";
import PartnerProgram from "./pages/PartnerProgram";
import ApplyPartner from "./pages/ApplyPartner";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { registerGsapPlugins, ScrollTrigger } from "./animations/gsap.config";

// Register all GSAP plugins once at the app root
registerGsapPlugins();

const queryClient = new QueryClient();

/**
 * ScrollRestorer — refreshes ScrollTrigger after each route change
 * so trigger positions are recalculated for the new page layout.
 */
function ScrollRestorer() {
  const location = useLocation();

  useEffect(() => {
    // Small timeout allows the new page DOM to fully render before refresh
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => window.clearTimeout(id);
  }, [location.pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollRestorer />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/internet-services" element={<InternetServices />} />
              <Route path="/enterprise-services" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route path="/partner-program" element={<PartnerProgram />} />
              <Route path="/apply-partner" element={<ApplyPartner />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/careers" element={<Careers />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
