import { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ className, id, checked, onCheckedChange, ...props }, ref) => {
    // Simple styling for a checkbox to match the dark theme
    // Tailwind UI plugins add custom properties like `data-[state=checked]` which are not default
    // We will use a simple approach here.
    return (
      <input
        type="checkbox"
        id={id}
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className={`peer h-4 w-4 shrink-0 rounded-sm border border-indigo-500 focus:ring-indigo-500 text-indigo-600 bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);

export { Checkbox };
