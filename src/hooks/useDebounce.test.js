import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { vi } from "vitest";

describe("useDebounce Hook", () => {
  vi.useFakeTimers(); // Use fake timers to control setTimeout

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should not update the value before the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      }
    );

    expect(result.current).toBe("first");

    rerender({ value: "second", delay: 500 });

    // The value should still be the old one
    expect(result.current).toBe("first");

    // Fast-forward time by less than the delay
    act(() => {
      vi.advanceTimersByTime(499);
    });

    // The value should still not have updated
    expect(result.current).toBe("first");
  });

  it("should update the value after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      }
    );

    rerender({ value: "second", delay: 500 });

    // Fast-forward time to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe("second");
  });
});
