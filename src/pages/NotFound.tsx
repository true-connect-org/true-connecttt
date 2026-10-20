import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";

const NotFound = () => {
  useSeo({
    title: "Page not found | True Connect",
    description: "This page does not exist. Go back to the True Connect home page.",
    path: "/404",
    noindex: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-28">
      <div className="text-center max-w-md">
        <p className="text-sm font-bold tracking-[0.25em] text-gray-400">404</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-[#0b1f3f]">This page doesn't exist.</h1>
        <p className="mt-4 text-gray-600">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-[#0b1f3f] text-white font-bold px-6 py-3 rounded-full">Home</Link>
          <Link to="/services" className="border border-[#0b1f3f]/30 text-[#0b1f3f] font-bold px-6 py-3 rounded-full">Services</Link>
          <Link to="/contact" className="border border-[#0b1f3f]/30 text-[#0b1f3f] font-bold px-6 py-3 rounded-full">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
