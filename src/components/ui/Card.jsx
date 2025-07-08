import { forwardRef } from "react";
import { motion } from "framer-motion";

// The main card container, now with a white background and subtle shadow.
const Card = forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}
    {...props}
  />
));

// The header section of the card.
const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
));

// The main title within the card header.
const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight text-slate-900 ${className}`}
    {...props}
  />
));

// The description text, now using a lighter slate color for secondary information.
const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-slate-500 ${className}`} {...props} />
));

// The main content area of the card.
const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));

// The footer section, typically for actions.
const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className}`}
    {...props}
  />
));

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
