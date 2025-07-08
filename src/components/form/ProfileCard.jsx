import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react"; // Added Globe for portfolio
import SpotlightCard from "../ui/SpotlightCard";
import AmanDubeyProfile from "../../assets/FormPreview_fillpage/Amanimage.jpeg";

// Updated with your actual links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} />,
    url: "https://www.linkedin.com/in/profile-amandubey/",
  },
  {
    name: "GitHub",
    icon: <Github size={20} />,
    url: "https://github.com/Amandubey211",
  },
  {
    name: "Twitter",
    icon: <Twitter size={20} />,
    url: "https://x.com/AmanDub97115331",
  },
  {
    name: "Portfolio",
    icon: <Globe size={20} />,
    url: "https://amandubey.onrender.com/",
  },
  {
    name: "Email",
    icon: <Mail size={20} />,
    url: "mailto:amandubey8833@gmail.com",
  },
];

const ProfileCard = () => {
  return (
    <SpotlightCard className="w-full max-w-sm p-8 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <img
              src={AmanDubeyProfile}
              alt="Aman Dubey"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            <motion.div
              className="absolute bottom-0 right-0 text-3xl"
              animate={{ rotate: [0, 15, -5, 10, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              👋
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Built by Aman Dubey
          </h2>
          <p className="mt-2 text-slate-500">
            A passionate Frontend Developer focused on creating beautiful,
            user-centric web applications.
          </p>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider text-center">
            Connect with me
          </h3>
          <div className="mt-4 flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          This form builder was created as part of a technical assignment,
          demonstrating skills in React, UI/UX design, and modern web
          architecture.
        </div>
      </motion.div>
    </SpotlightCard>
  );
};

export default ProfileCard;
