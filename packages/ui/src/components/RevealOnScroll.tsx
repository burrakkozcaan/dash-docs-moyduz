"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export default function RevealOnScroll() {
  useEffect(() => {
    document.documentElement.setAttribute("data-js", "true");

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.setAttribute("data-reveal", "in");
            if (element.dataset.revealOnce !== "false") {
              observer.unobserve(element);
            }
          } else if (element.dataset.revealOnce === "false") {
            element.setAttribute("data-reveal", "out");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    targets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
