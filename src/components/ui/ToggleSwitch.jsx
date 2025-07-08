import { motion } from "framer-motion";

/**
 * A custom, accessible toggle switch component built with Tailwind CSS and Framer Motion.
 * It is keyboard accessible (space/enter to toggle) and screen-reader friendly.
 */
export function ToggleSwitch({ enabled, setEnabled }) {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      // Make it keyboard accessible
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault(); // Prevent page scroll on space
          setEnabled(!enabled);
        }
      }}
      className={`flex h-6 w-11 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${enabled ? "justify-end bg-slate-900" : "justify-start bg-gray-200"}`}
    >
      <span className="sr-only">Toggle</span>
      <motion.div
        className="h-5 w-5 rounded-full bg-white shadow-md"
        layout
        transition={spring}
      />
    </div>
  );
}
