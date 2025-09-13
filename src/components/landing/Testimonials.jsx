import { motion } from "framer-motion";
import { landingPageConfig } from "../../config/landingPage";

export const Testimonials = () => {
  const { testimonials } = landingPageConfig;

  return (
    <section className="bg-muted py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex gap-8 overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 w-4/5 md:w-1/2 lg:w-1/3 px-4 snap-center ${
                index === 1 ? "scale-105" : "opacity-70 scale-95"
              } transition-all duration-300`}
              whileHover={{ scale: 1.03 }}
            >
              <div
                className={`bg-card p-8 rounded-xl h-full ${
                  index === 1
                    ? "border-2 border-primary"
                    : "border border-border"
                }`}
              >
                <blockquote className="text-lg font-medium">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full"
                    // onError={(e) => {
                    //   const target = e.target as HTMLImageElement;
                    //   target.onerror = null;
                    //   target.src = `https://ui-avatars.com/api/?name=${testimonial.author.replace(' ', '+')}`;
                    // }}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
