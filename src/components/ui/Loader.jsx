// components/ImageLoader.js

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// --- CHANGE 1: Import icons from lucide-react ---
import { Lightbulb, Zap, Server, Package } from "lucide-react";

// Helper function to shuffle an array (Fisher-Yates shuffle algorithm)
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

// --- HINTS CONFIGURATION ---
// --- CHANGE 2: Use the lucide-react components ---
// Note: lucide-react components have default props for size/strokeWidth, so they are clean to use.
const hintsData = [
  {
    icon: <Lightbulb />,
    text: "Did you know? You can customize workflows directly from the dashboard.",
  },
  {
    icon: <Zap />,
    text: "Pro Tip: Use keyboard shortcuts (Ctrl+K) to open the command palette.",
  },
  { icon: <Server />, text: "Connecting to secure FormaFlow servers..." },
  {
    icon: <Package />,
    text: "FormaFlow integrates with over 50+ of your favorite tools.",
  },
];

const LOGO_SRC = "/formaflowlogo.png"; // Place in /public folder

// --- ANIMATION VARIANTS (No changes here) ---

const logoVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
  },
};

const iconVariants = {
  animate: {
    y: [0, -4, 0],
    transition: { duration: 2, ease: "easeInOut", repeat: Infinity },
  },
};

const textContainerVariants = {
  animate: (hintLength) => ({
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.3,
    },
  }),
};

const characterVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// --- THE COMPONENT ---

const ImageLoader = () => {
  const [shuffledHints, setShuffledHints] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    setShuffledHints(shuffleArray([...hintsData]));
  }, []);

  useEffect(() => {
    if (shuffledHints.length === 0) return;
    const hintInterval = 5000;
    const intervalId = setInterval(() => {
      setHintIndex((prevIndex) => (prevIndex + 1) % shuffledHints.length);
    }, hintInterval);
    return () => clearInterval(intervalId);
  }, [shuffledHints]);

  if (shuffledHints.length === 0) {
    return null;
  }

  const currentHint = shuffledHints[hintIndex];
  const textCharacters = Array.from(currentHint.text);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full absolute inset-0 bg-white/80 backdrop-blur-md">
      <div className="text-center flex flex-col items-center">
        <motion.div variants={logoVariants} animate="animate">
          <img src={LOGO_SRC} alt="FormaFlow Logo" className="h-80 w-auto" />
        </motion.div>

        <div className="mt-8 relative w-80 sm:w-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={hintIndex}
              className="flex items-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* --- CHANGE 3: Apply styling directly via className --- */}
              <motion.div
                variants={iconVariants}
                animate="animate"
                className="text-purple-600 mt-0.5 shrink-0 w-6 h-6" // Set explicit size for layout stability
              >
                {currentHint.icon}
              </motion.div>

              <motion.p
                className="text-slate-600 font-medium text-left"
                variants={textContainerVariants}
                initial="initial"
                animate="animate"
                custom={textCharacters.length}
              >
                {textCharacters.map((char, index) => (
                  <motion.span
                    key={`${hintIndex}-${index}`}
                    variants={characterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-6 left-0 w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              key={hintIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-purple-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLoader;
