import { Button } from "../ui";
import { ArrowRight } from "react-feather";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Build Beautiful Forms Effortlessly
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Create stunning, responsive form templates with our intuitive
            builder. Perfect for surveys, applications, and data collection.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg">
              Live Demo
            </Button>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          <div className="p-6">
            {/* Placeholder for form builder preview */}
            <div className="h-64 flex items-center justify-center text-gray-400">
              Form Builder Preview Coming Soon
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-300 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
