import { motion } from "framer-motion";

// Container variants to orchestrate the animation of the children
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.15, // Stagger the animation of each dot
    },
  },
  end: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Variants for each individual dot
const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

// Animation transition settings
const loadingCircleTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full absolute inset-0">
      <motion.div
        className="flex justify-around items-end h-8 w-20"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block w-4 h-4 bg-indigo-600 rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-indigo-600 rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-indigo-600 rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
      {text && (
        <p className="mt-4 text-sm font-medium text-slate-500">{text}</p>
      )}
    </div>
  );
};

export default Loader;
