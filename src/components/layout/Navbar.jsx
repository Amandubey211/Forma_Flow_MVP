import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { landingPageConfig } from "../../config/landingPage";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
// import ThemeToggle from "../ui/ThemeToggle";

export const Navbar = () => {
  const { navbar } = landingPageConfig;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
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
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold text-slate-900 transition-transform hover:scale-105"
        >
          {navbar.logo}
        </Link>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          {/* <ThemeToggle /> */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navbar.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link to="/dashboard">
            {" "}
            {/* Assuming login/dashboard path */}
            <Button variant="ghost">Login</Button>
          </Link>
          {/* {isHomePage && (
            <Link to="/dashboard">
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )} */}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* <ThemeToggle /> */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-md p-2"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="h-6 w-6 text-slate-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="h-6 w-6 text-slate-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 w-full border-b border-slate-200 bg-white/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center space-y-6 px-4 py-8">
              {navbar.links.map((link) => (
                <Link
                  key={`mobile-${link.path}`}
                  to={link.path}
                  className="text-lg font-medium text-slate-700"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-2/3 bg-slate-200" />
              <div className="flex flex-col items-center space-y-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="w-40">
                    Login
                  </Button>
                </Link>
                {isHomePage && (
                  <Link to="/dashboard">
                    <Button className="w-40">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
