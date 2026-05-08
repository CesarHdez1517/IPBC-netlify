import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  once?: boolean;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  { threshold = 0.15, once = true, delay = 0 }: Options = {}
): [React.RefObject<T | null>, boolean] {
  const ref      = useRef<T>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const show = () => {
      if (delay > 0) {
        timerRef.current = setTimeout(() => setVisible(true), delay);
      } else {
        setVisible(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (once) observer.unobserve(el);
        } else if (!once) {
          if (timerRef.current) clearTimeout(timerRef.current);
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [threshold, once, delay]);

  return [ref, visible];
}
