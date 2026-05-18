import { useEffect, useRef } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Adds `data-revealed` attribute to observed elements when they enter viewport.
 * Pair with CSS classes: .reveal-up, .reveal-fade, .reveal-left, .reveal-right
 */
export function useReveal(
  selector: string = '[data-reveal]',
  options: UseRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px', once = true } = options;

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.removeAttribute('data-revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, once]);
}
