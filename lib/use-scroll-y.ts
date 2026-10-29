"use client";

import { useEffect, useRef } from "react";

/** Calls `onScroll(y, previousY)` at most once per animation frame (passive listener). */
export function useScrollY(onScroll: (y: number, prev: number) => void) {
  const cb = useRef(onScroll);
  useEffect(() => {
    cb.current = onScroll;
  });
  useEffect(() => {
    let prev = window.scrollY;
    let frame = 0;
    const run = () => {
      frame = 0;
      const y = window.scrollY;
      cb.current(y, prev);
      prev = y;
    };
    const onEvent = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onEvent, { passive: true });
    return () => {
      window.removeEventListener("scroll", onEvent);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
