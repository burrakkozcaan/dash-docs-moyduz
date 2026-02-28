"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type DeferredMountProps = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  prefetch?: () => void | Promise<unknown>;
  prefetchMargin?: string;
  className?: string;
};

export default function DeferredMount({
  children,
  fallback = null,
  rootMargin = "200px 0px",
  prefetch,
  prefetchMargin = "300px 0px",
  className,
}: DeferredMountProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasPrefetchedRef = useRef(false);

  useEffect(() => {
    if (isVisible) return;

    const node = containerRef.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  useEffect(() => {
    if (!prefetch || hasPrefetchedRef.current) return;

    const node = containerRef.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      hasPrefetchedRef.current = true;
      void prefetch();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          hasPrefetchedRef.current = true;
          void prefetch();
          observer.disconnect();
        }
      },
      { rootMargin: prefetchMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefetch, prefetchMargin]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}

