import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { landingPageConfig } from "../../config/landingPage";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Button } from "../ui/Button";

export const Navbar = () => {
  const { navbar } = landingPageConfig;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Magnetic button effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredLink(null);
  };

  const isActive = (path) => {
    // Handle exact matches and subpaths
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  const linkVariants = {
    rest: {
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const underlineVariants = {
    rest: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    hover: (i) => ({
      width: "100%",
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    active: {
      width: "100%",
      opacity: 1,
      backgroundColor: "#1e293b", // slate-900
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo with subtle hover effect */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="text-lg font-bold text-slate-900">
            {navbar.logo}
          </Link>
        </motion.div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {navbar.links.map((link, i) => (
              <motion.div
                key={link.path}
                className="relative"
                initial="rest"
                whileHover="hover"
                animate="rest"
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={link.path}
                  className={`relative z-10 block font-medium px-1 py-2 transition-colors ${
                    isActive(link.path)
                      ? "text-slate-900 font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <motion.span variants={linkVariants}>{link.name}</motion.span>
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-slate-900 rounded-full"
                  variants={underlineVariants}
                  custom={i}
                  animate={
                    isActive(link.path)
                      ? "active"
                      : hoveredLink === i
                        ? "hover"
                        : "rest"
                  }
                  style={{ originX: hoveredLink === i ? 0 : 1 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* Magnetic Login Button */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/play">
              <Button
                variant="ghost"
                className={`relative overflow-hidden group ${
                  isActive("/play") ? "bg-slate-100" : ""
                }`}
              >
                <span className="relative z-10">Play</span>
                <motion.span
                  className="absolute inset-0 bg-slate-100 rounded-md"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button with enhanced animation */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="relative rounded-md p-2"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <X className="h-6 w-6 text-slate-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <Menu className="h-6 w-6 text-slate-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 w-full border-b border-slate-200 bg-white/95 backdrop-blur-lg shadow-lg md:hidden"
          >
            <nav className="flex flex-col items-center space-y-6 px-4 py-8">
              {navbar.links.map((link, i) => (
                <motion.div
                  key={`mobile-${link.path}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.05 + 0.2 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`text-lg font-medium relative group ${
                      isActive(link.path)
                        ? "text-slate-900 font-semibold"
                        : "text-slate-700"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        isActive(link.path)
                          ? "w-full bg-slate-900"
                          : "w-0 bg-slate-900 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="h-px w-2/3 bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { delay: navbar.links.length * 0.05 + 0.2 },
                }}
              />
              <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: navbar.links.length * 0.05 + 0.3 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="w-full"
                >
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className={`w-full ${
                        isActive("/login") ? "bg-slate-100" : ""
                      }`}
                    >
                      Login
                    </Button>
                  </Link>
                </motion.div>
                {isHomePage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: navbar.links.length * 0.05 + 0.4 },
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="w-full"
                  >
                    <Link to="/dashboard">
                      <Button className="w-full flex items-center justify-center">
                        Get Started
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
