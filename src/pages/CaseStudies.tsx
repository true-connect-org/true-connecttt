import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FolderOpen } from "lucide-react";

const CaseStudies = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FolderOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Case Studies
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore how we've helped businesses across various industries transform their connectivity and achieve their digital goals.
          </p>
          
          {/* Placeholder for future case studies */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center h-64">
                <span className="text-gray-400 font-medium">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
