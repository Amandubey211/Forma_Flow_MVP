import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Layers,
  BarChart,
  Users,
  Palette,
  GitBranch,
  MoveRight,
} from "lucide-react";

import { Footer } from "../components/layout/Footer";
import FormBuilderShowcase from "../assets/Landingpage/form-builder-showcase.png";
import { SocialProof } from "../components/sections/Landing/SocialProof";
import { Testimonials } from "../components/sections/Landing/Testimonials";
import { landingPageConfig } from "../config/landingPage";
import { Button } from "../components/ui/Button";
import BlurText from "../components/ui/BlurText";
import SplitText from "../components/ui/SplitText";
import { Link } from "react-router-dom";
import LenisWrapper from "../Wrappers/LenisWrapper";

const LandingPage = () => {
  const { hero, benefits, cta } = landingPageConfig;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconComponents = {
    Layers: <Layers className="h-8 w-8 text-primary" />,
    GitBranch: <GitBranch className="h-8 w-8 text-primary" />,
    Code: <Code className="h-8 w-8 text-primary" />,
    BarChart: <BarChart className="h-8 w-8 text-primary" />,
    Users: <Users className="h-8 w-8 text-primary" />,
    Palette: <Palette className="h-8 w-8 text-primary" />,
  };

  return (
    <LenisWrapper>
      <div className="bg-background text-foreground">
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="container mx-auto max-w-screen-lg text-center py-20 md:py-32 px-4">
            <SplitText
              text={hero.title}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground"
              delay={50}
              duration={0.6}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
            />
            <BlurText
              text={hero.description}
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
              delay={20}
              duration={0.5}
              animateBy="words"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 flex justify-center"
            >
              <Link to={hero.cta.path}>
                <Button size="lg" className="group cursor-pointer">
                  {hero.cta.text}{" "}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </section>

          <SocialProof />

          {/* Feature Showcase */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="container mx-auto max-w-screen-xl py-24 px-4"
          >
            <div className="relative rounded-xl border border-border shadow-2xl shadow-primary/10 overflow-hidden bg-gray-100 aspect-video">
              <img
                src={FormBuilderShowcase}
                alt="Form Builder UI"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="container mx-auto max-w-screen-xl py-24 px-4"
          >
            <div className="text-center mb-16">
              <SplitText
                text="Everything you need. Nothing you don't."
                className="text-4xl md:text-5xl font-bold tracking-tight"
                delay={30}
                duration={0.5}
              />
              <BlurText
                text="From simple surveys to complex application forms, we've got you covered."
                className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
                delay={15}
                animateBy="words"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border text-left flex flex-col items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary/10 p-3 rounded-md mb-4">
                    {iconComponents[benefit.icon]}
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <Testimonials />

          {/* Final CTA */}
          <section className="container mx-auto max-w-screen-lg text-center py-24 md:py-32 px-4">
            <SplitText
              text={cta.title}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
              delay={40}
              duration={0.6}
            />
            <BlurText
              text={cta.description}
              className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground"
              delay={15}
              animateBy="words"
            />
            <div className="mt-8">
              <Link to={cta.button.path}>
                <Button size="lg" className="group">
                  {cta.button.text}{" "}
                  <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LenisWrapper>
  );
};

export default LandingPage;
