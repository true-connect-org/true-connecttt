import { Toaster as Sonner } from "sonner";

/** Toast messages (e.g. "Could not send your enquiry"), styled to match the site. */
const Toaster = () => (
  <Sonner
    position="top-center"
    toastOptions={{
      classNames: {
        toast: "rounded-xl border border-gray-200 bg-white text-[#0b1f3f] shadow-lg",
        description: "text-gray-500",
      },
    }}
  />
);

export default Toaster;
