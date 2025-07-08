import { Link } from "react-router-dom";
import { landingPageConfig } from "../../config/landingPage";
import { Github, Linkedin, Twitter, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

// A map to associate social names with icons
const socialIcons = {
  Twitter: <Twitter className="h-5 w-5" />,
  GitHub: <Github className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
};

export const Footer = () => {
  const { footer } = landingPageConfig;
  const { links } = footer; // Destructure links for cleaner access

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto max-w-screen-2xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Side: Logo, Tagline, Socials */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link to="/" className="font-extrabold text-3xl text-slate-900">
              {footer.logo}
            </Link>
            <p className="mt-4 text-slate-500 max-w-xs">{footer.tagline}</p>
            <div className="mt-6 flex space-x-4">
              {footer.socials?.map(
                (
                  social // Use optional chaining for safety
                ) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
                    whileHover={{ y: -2 }}
                    title={social.name}
                  >
                    {socialIcons[social.name]}
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Right Side: Links and Newsletter */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {/* --- FIX: Added checks for each link category --- */}
            {links?.product && (
              <div className="text-sm">
                <h4 className="font-semibold mb-4 text-slate-800">Product</h4>
                <ul className="space-y-3 text-slate-500">
                  {links.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {links?.company && (
              <div className="text-sm">
                <h4 className="font-semibold mb-4 text-slate-800">Company</h4>
                <ul className="space-y-3 text-slate-500">
                  {links.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* These sections will now render safely if you add 'resources' or 'legal' to your config */}
            {links?.resources && (
              <div className="text-sm">
                <h4 className="font-semibold mb-4 text-slate-800">Resources</h4>
                <ul className="space-y-3 text-slate-500">
                  {links.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Newsletter Section - Moved to be part of the grid for better alignment */}
            <div className="text-sm col-span-2 sm:col-span-1 md:col-span-2">
              <h4 className="font-semibold mb-4 text-slate-800">
                Stay Updated
              </h4>
              <p className="text-slate-500 mb-4">
                Join our newsletter to get the latest updates and features.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-50"
                />
                <Button type="submit" size="icon" className="flex-shrink-0">
                  <MoveRight className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-500 flex flex-col sm:flex-row justify-between items-center">
          <p>{footer.copyright}</p>
          {links?.legal && (
            <div className="flex space-x-4 mt-4 sm:mt-0">
              {links.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
