import { useState, useEffect, Suspense } from "react";

const DelayedSuspense = ({ children, fallback, delay = 1500 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return show ? <Suspense fallback={fallback}>{children}</Suspense> : fallback;
};

export default DelayedSuspense;
