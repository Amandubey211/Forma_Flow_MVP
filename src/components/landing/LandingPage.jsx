// import Hero from "./Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import CTA from "./CTA";
import Hero from "./Hero"
const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Hero />
      {/* <Hero /> */}
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
};

export default LandingPage;
