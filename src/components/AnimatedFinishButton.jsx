// AnimatedFinishButton.js
import React from "react";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

const AnimatedFinishButton = ({ handleFinishQuiz, data }) => {
  // Measure the container's width
  const [ref, bounds] = useMeasure();

  return (
    // 1) Flex container pinned to the right
    <div ref={ref} style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <motion.button
        className="bounce-btn"
        onClick={handleFinishQuiz}
        // 2) Start as a small circle
        initial={{ 
          width: 45,
          height: 45,
          borderRadius: "50%",
          opacity: 0,
          transformOrigin: "100% 50%",  // Anchor the transform on the right center
        }}
        // 3) Expand to a pill shape
        animate={{
          width: bounds.width ? bounds.width : 200,             // Final width in px (adjust as needed)
          borderRadius: "30px",   // Pill shape
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.3,
        }}
      >
        {data}
      </motion.button>
    </div>
  );
};

export default AnimatedFinishButton;
