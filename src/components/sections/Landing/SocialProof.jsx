import { motion } from "framer-motion";
import { useState } from "react";
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

export const SocialProof = () => {
  const { socialProof } = landingPageConfig;
  const [companies] = useState([
    ...socialProof.companies,
    ...socialProof.companies,
    ...socialProof.companies,
  ]);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {socialProof.title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join thousands of satisfied customers worldwide
          </p>
        </div>

        <div className="relative">
          {/* Gradient fade effects */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Infinite scrolling container */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex"
              animate={{
                x: ["0%", "-50%"],
                transition: {
                  ease: "linear",
                  duration: 30,
                  repeat: Infinity,
                },
              }}
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {companies.map((company, index) => {
                const Icon = iconComponents[company.icon];
                return (
                  <div key={`company-${index}`} className="flex-shrink-0 mx-8">
                    <div className="flex flex-col items-center justify-center p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all w-32 h-32">
                      <div className="p-3 rounded-full bg-muted mb-3">
                        <Icon
                          className="h-8 w-8"
                          color={companyColors[company.name]}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {company.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
