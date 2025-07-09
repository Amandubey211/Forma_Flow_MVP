import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  Star,
  Code,
  Link as LinkIcon,
  Download,
} from "lucide-react";
import CurvedLoop from "../components/ui/CurvedLoop";
import { Button } from "../components/ui/Button";
import AmanProfileImage from "../assets/FormPreview_fillpage/Amanimage.jpeg";
import { Footer } from "../components/layout/Footer";
import LenisWrapper from "../Wrappers/LenisWrapper";

const experience = [
  {
    role: "Full Stack Developer",
    company: "Student Diwan LMS",
    duration: "1.5 years",
    description:
      "Led frontend development for a large-scale SaaS LMS with multi-role RBAC. Built over 30 modules including academic management, school operations, and real-time analytics dashboards. Optimized performance by 30% and enhanced security with JWT encryption.",
    link: "https://app.studentdiwan.com/",
  },
  {
    role: "Full-Stack Developer",
    company: "Xpert, OptaCloud",
    duration: "6 Months",
    description:
      "Built a scalable expert marketplace. Implemented multi-tier verification with LinkedIn API, cutting fake profiles by 70%. Integrated Razorpay for payments and developed an AI-powered matching algorithm, boosting connections by 40%.",
    link: "https://xpert.works/",
  },
];

const projects = [
  {
    name: "Pro-Dash",
    description:
      "MERN-stack dashboard with JWT security, multi-theme UI, and real-time stats. Halved load times with lazy loading and optimization.",
    link: "https://pro-dash.onrender.com/",
  },
  {
    name: "Netflix-GPT",
    description:
      "AI-integrated streaming app using OpenAI. Achieved 40% faster searches with debouncing and client-side caching.",
    link: "https://netflixgpt-2510.onrender.com/",
  },
  {
    name: "Brain-Games",
    description:
      "Animated quiz app with 24+ categories, live scoreboards, and detailed performance reports.",
    link: "https://brain-games-0qj6.onrender.com/",
  },
];

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "Redux",
  "Angular",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Firebase",
  "SQL",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Framer Motion",
  "System Design (LLD/HLD)",
  "Web Performance",
  "REST APIs",
  "Git & GitHub",
  "CI/CD (GitHub Actions)",
  "Testing (Jest)",
  "AWS",
];

const Section = ({ icon, title, children }) => (
  <motion.div
    className="mb-16"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="pl-4 border-l-4 border-indigo-200">{children}</div>
  </motion.div>
);

const AboutPage = () => {
  const resumeLink =
    "https://docs.google.com/document/d/1CdB-RPXp6hxngGIV4Nks6Iy_agbW5fvdkNghAYQKSXk/edit?usp=sharing"; // Use a shareable link

  return (
    <LenisWrapper>
      <div className="bg-slate-50 text-slate-800">
        {/* Hero Section - Padding adjusted */}
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <motion.img
            src={AmanProfileImage}
            alt="Aman Dubey"
            className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-2xl mx-auto -mb-20 relative z-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <div className="bg-white rounded-2xl shadow-xl pt-28 pb-12 px-6">
            <h1 className="text-5xl font-extrabold text-slate-900">
              Aman Dubey
            </h1>
            <p className="mt-4 text-xl text-slate-600">
              Full-Stack Developer | Frontend Specialist | Tech Enthusiast
            </p>
            <div className="mt-8">
              <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  View My Resume
                </Button>
              </a>
            </div>
          </div>
        </div>

        <CurvedLoop
          marqueeText="React.js • Node.js • System Design • UI/UX • Web Performance •"
          speed={1.5}
        />

        <div className="container mx-auto px-4 py-16">
          <Section icon={<Briefcase />} title="Professional Experience">
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="pl-6 relative">
                  <div className="absolute -left-1.5 top-1 w-3 h-3 bg-indigo-500 rounded-full border-4 border-white"></div>
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                    <span className="text-slate-400 font-normal">
                      | {exp.duration}
                    </span>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      <LinkIcon size={16} />
                    </a>
                  </div>
                  <p className="mt-2 text-slate-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<Star />} title="Signature Projects">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <a
                  key={i}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{proj.name}</h3>
                    <LinkIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {proj.description}
                  </p>
                </a>
              ))}
            </div>
          </Section>

          <Section icon={<Code />} title="Technical Skills">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {skill}
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<GraduationCap />} title="Education">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold">
                  Master of Computer Applications (MCA)
                </h3>
                <p className="text-slate-600">
                  Jain University, Bangalore | 2023–2025
                </p>
                <p className="text-sm font-medium text-green-600">GPA: 9.1</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Bachelor of Science in Information Technology (BSC-IT)
                </h3>
                <p className="text-slate-600">
                  Mumbai University, Mumbai | 2020–2023
                </p>
                <p className="text-sm font-medium text-green-600">GPA: 8.6</p>
              </div>
            </div>
          </Section>
        </div>
        <Footer />
      </div>
    </LenisWrapper>
  );
};

export default AboutPage;
