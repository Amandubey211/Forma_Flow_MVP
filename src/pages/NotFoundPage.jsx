import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Button } from "../components/ui/Button";
import { ArrowLeft, Home, Mail, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  const numberRefs = useRef([]);
  const containerRef = useRef(null);

  // GSAP animation for the 404 numbers
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, {
      opacity: 0,
      duration: 0.6,
    })
      .from(
        numberRefs.current,
        {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
        },
        "-=0.3"
      )
      .from(
        ".not-found-content",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      );

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-12"
    >
      <div className="max-w-md w-full text-center">
        {/* 404 Animated Numbers */}
        <div className="relative flex justify-center mb-8">
          {["4", "0", "4"].map((num, i) => (
            <motion.span
              key={i}
              ref={(el) => (numberRefs.current[i] = el)}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {num}
            </motion.span>
          ))}
          <motion.div
            className="absolute -right-4 -top-4"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4"
            whileInView={{
              x: [-10, 0],
              opacity: [0.8, 1],
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-muted-foreground mb-8"
            whileInView={{
              y: [5, 0],
              opacity: [0.8, 1],
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Oops! The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="gap-2">
                <Link to="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" asChild className="gap-2">
                <Link to="/contact">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-10 bottom-10 opacity-10 dark:opacity-5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              d="M20,50 Q35,20 50,50 Q65,80 80,50 Q95,20 50,50 Q5,80 20,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
