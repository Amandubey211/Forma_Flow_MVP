import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Home, Mail } from "lucide-react";
import FuzzyText from "../components/ui/FuzzyText";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-12 overflow-hidden">
      <div className="max-w-xl w-full text-center">
        <FuzzyText
          fontSize="clamp(5rem, 20vw, 15rem)"
          color="#fff"
          baseIntensity={0.05}
          hoverIntensity={0.2}
        >
          404
        </FuzzyText>

        <motion.h2
          className="text-2xl md:text-3xl font-bold mt-4 mb-4 text-slate-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-slate-400 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            className="gap-2"
          >
            Go Back
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              {/* <Home className="h-4 w-4" /> */}
              Go Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
