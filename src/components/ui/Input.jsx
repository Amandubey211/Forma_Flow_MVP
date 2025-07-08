import { forwardRef } from 'react';

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-dark-border bg-transparent px-3 py-2 text-sm placeholder:text-medium-text focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

export { Input };