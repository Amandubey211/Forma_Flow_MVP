import { useState, useEffect } from "react";

/**
 * A custom hook to debounce a value. It delays updating a value until a certain amount of time has passed without that value changing.
 * @param value The value to debounce (e.g., a state object like 'template').
 * @param delay The debounce delay in milliseconds (e.g., 1500).
 * @returns The debounced value, which only updates after the delay.
 */
export function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function that React runs when the effect re-runs or the component unmounts.
    // It clears the previous timer, effectively resetting the debounce period.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // This effect will only re-run if the 'value' or 'delay' props change.

  return debouncedValue;
}
