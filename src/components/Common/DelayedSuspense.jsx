import { useState, useEffect, Suspense } from "react";

/**
 * A wrapper for React.Suspense that artificially delays rendering for a set time.
 * ONLY for use in development to test loading states.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The component to lazy load.
 * @param {React.ReactNode} props.fallback - The loader to show during the delay.
 * @param {number} [props.delay=1500] - The delay in milliseconds.
 */
const DelayedSuspense = ({ children, fallback, delay = 1500 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  // Render nothing until the delay is over, then let Suspense take over.
  // This ensures the fallback is shown for at least the 'delay' duration.
  return show ? <Suspense fallback={fallback}>{children}</Suspense> : fallback;
};

export default DelayedSuspense;
