import { motion, useScroll } from "motion/react";
import { useEffect } from "react";

const Scroll = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Set scroll position to 0 on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      id="scroll-indicator"
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        originX: 0,
      }}
      className="z-50 bg-gradient-to-r from-[#3C9BF9] to-[#9100BD]"
    />
  );
};

export default Scroll;
