// FILE: SocialProof.jsx (Final Production Version for JavaScript)

import { motion, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Chrome,
  Square,
  Apple,
  ShoppingBag,
  Facebook,
  Tv,
  Slack,
  Github,
} from "lucide-react";
import { landingPageConfig } from "../../../config/landingPage";

// Define the Icon components map (no type annotations needed in JS)
const iconComponents = {
  Chrome,
  Square,
  Apple,
  ShoppingBag,
  Facebook,
  Tv,
  Slack,
  Github,
};

// Define the colors map (no type annotations needed in JS)
const companyColors = {
  Google: "#4285F4",
  Microsoft: "#0078D4",
  Apple: "#000000",
  Amazon: "#FF9900",
  Facebook: "#1877F2",
  Netflix: "#E50914",
  Slack: "#4A154B",
  GitHub: "#181717",
};

// *** THE FIX: A dedicated component to render the icon safely ***
// This creates a clear boundary for React's reconciler.
// We remove the TypeScript prop types: `({ name, iconKey }: { name: string; iconKey: string })` becomes `({ name, iconKey })`
const CompanyIcon = ({ name, iconKey }) => {
  const IconComponent = iconComponents[iconKey];
  const color = companyColors[name];

  if (!IconComponent) {
    // Return a fallback or null if the icon name is invalid
    return <div className="h-6 w-6 md:h-8 md:h-8 bg-gray-200 rounded-full" />;
  }

  return <IconComponent color={color} className="h-6 w-6 md:h-8 md:h-8" />;
};

export const SocialProof = () => {
  const { socialProof } = landingPageConfig;
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  // Remove the generic type: `useRef<HTMLDivElement>(null)` becomes `useRef(null)`
  const containerRef = useRef(null);

  const companies = useMemo(
    () => [...socialProof.companies, ...socialProof.companies],
    [socialProof.companies]
  );

  useEffect(() => {
    const animation = {
      x: "-50%",
      transition: { ease: "linear", duration: 25, repeat: Infinity },
    };
    if (isPaused) {
      controls.stop();
    } else {
      controls.start(animation);
    }
  }, [isPaused, controls]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <section className="py-16 overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {socialProof.title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Trusted by teams at the world's best companies
          </p>
        </div>
        <div
          ref={containerRef}
          className="relative h-40"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-muted/20 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-muted/20 to-transparent z-10" />
          <motion.div
            className="flex absolute top-0 left-0"
            animate={controls}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handlePause}
            onDragEnd={handleResume}
          >
            {companies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 px-3 md:px-5"
              >
                <div className="flex flex-col items-center justify-center p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-shadow w-28 h-28 md:w-32 md:h-32">
                  <div className="p-3 rounded-full bg-muted mb-2">
                    {/* Use the new, safe component wrapper */}
                    <CompanyIcon name={company.name} iconKey={company.icon} />
                  </div>
                  <span className="text-sm font-medium text-center text-foreground">
                    {company.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
