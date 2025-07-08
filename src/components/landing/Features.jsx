import { motion } from "framer-motion";
import { Card } from "../ui";
import { Zap, Code, Sliders, Share2, Lock, Database } from "react-feather";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Drag & Drop Builder",
    description:
      "Intuitive interface to create forms by simply dragging fields",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Multiple Field Types",
    description: "Text, number, dropdown, date, file upload and more",
  },
  {
    icon: <Sliders className="w-6 h-6" />,
    title: "Custom Validation",
    description: "Set required fields, patterns, and custom validation rules",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Real-time Preview",
    description: "See exactly how your form will look as you build it",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure Submissions",
    description: "All data is encrypted and stored securely",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Response Management",
    description: "View and export all form submissions easily",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="features">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to create beautiful, functional forms
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    {feature.description}
                  </p>
                  <a
                    href="#"
                    className="mt-4 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
