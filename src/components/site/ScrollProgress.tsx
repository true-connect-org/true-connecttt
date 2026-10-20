import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-colour line at the top of the page that fills as you scroll. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#E6E84A] via-[#E6E84A] to-white/80 pointer-events-none"
    />
  );
};

export default ScrollProgress;
