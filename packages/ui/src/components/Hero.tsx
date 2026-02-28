"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { AnimatedBadge } from "./ui/Animated-Badge";
import Image from "next/image";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});
const scheduleIdle = (callback: () => void) => {
  if (typeof window === "undefined") return 0;
  const idleWindow = window as Window & {
    requestIdleCallback?: (cb: () => void) => number;
  };
  if (idleWindow.requestIdleCallback) {
    return idleWindow.requestIdleCallback(callback);
  }
  return window.setTimeout(callback, 1);
};

const cancelIdle = (handle: number) => {
  if (typeof window === "undefined") return;
  const idleWindow = window as Window & {
    cancelIdleCallback?: (id: number) => void;
  };
  if (idleWindow.cancelIdleCallback) {
    idleWindow.cancelIdleCallback(handle);
    return;
  }
  window.clearTimeout(handle);
};

interface HeroProps {
  title: string;
  description: string;
  badgeText?: string;
  badgeLabel?: string;
  ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
  microDetails?: Array<string>;
}

const SyntheticHero = ({
  title = "An experiment in light, motion, and the quiet chaos between.",
  description = "Experience a new dimension of interaction — fluid, tactile, and alive. Designed for creators who see beauty in motion.",
  badgeText = "React Three Fiber",
  badgeLabel = "Experience",
  ctaButtons = [
    { text: "Explore the Canvas", href: "#explore", primary: true },
    { text: "Learn More", href: "#learn-more" },
  ],
  microDetails = [
    "Immersive shader landscapes",
    "Hand-tuned motion easing",
    "Responsive, tactile feedback",
  ],
  className,
}: HeroProps & { className?: string }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const microRef = useRef<HTMLUListElement | null>(null);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handle = scheduleIdle(() => setShowBackground(true));
    return () => cancelIdle(handle);
  }, []);

  useEffect(() => {
    let isActive = true;
    let split: { revert: () => void; lines?: Element[] } | null = null;
    let timeline: { kill: () => void; to: (...args: any[]) => any } | null = null;

    const runAnimation = async () => {
      if (!headingRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      await (document.fonts?.ready ?? Promise.resolve());

      const [{ default: gsap }, splitTextModule] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
      ]);

      if (!isActive || !headingRef.current) return;

      const SplitText = splitTextModule.SplitText ?? splitTextModule.default;
      if (!SplitText) return;
      gsap.registerPlugin(SplitText);

      split = new SplitText(headingRef.current, {
        type: "lines",
        wordsClass: "hero-lines",
      }) as unknown as { revert: () => void; lines?: Element[] };

      if (split.lines) {
        gsap.set(split.lines, {
          filter: "blur(16px)",
          yPercent: 24,
          autoAlpha: 0,
          scale: 1.04,
          transformOrigin: "50% 100%",
        });
      }

      if (badgeWrapperRef.current) {
        gsap.set(badgeWrapperRef.current, { autoAlpha: 0, y: -8 });
      }
      if (paragraphRef.current) {
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 8 });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { autoAlpha: 0, y: 8 });
      }
      if (imageRef.current) {
        gsap.set(imageRef.current, { autoAlpha: 0, y: 20 });
      }

      const microItems = microRef.current
        ? Array.from(microRef.current.querySelectorAll("li"))
        : [];
      if (microItems.length > 0) {
        gsap.set(microItems, { autoAlpha: 0, y: 6 });
      }

      timeline = gsap.timeline({ defaults: { ease: "power3.out" } }) as { kill: () => void; to: (...args: any[]) => any };

      if (badgeWrapperRef.current) {
        timeline.to(
          badgeWrapperRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0
        );
      }

      if (split.lines) {
        timeline.to(
          split.lines,
          {
            filter: "blur(0px)",
            yPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
          },
          0.1
        );
      }

      if (paragraphRef.current) {
        timeline.to(
          paragraphRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.55"
        );
      }

      if (ctaRef.current) {
        timeline.to(
          ctaRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.35"
        );
      }

      if (imageRef.current) {
        timeline.to(
          imageRef.current,
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.25"
        );
      }

      if (microItems.length > 0) {
        timeline.to(
          microItems,
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.25"
        );
      }
    };

    const handle = scheduleIdle(() => {
      void runAnimation();
    });

    return () => {
      isActive = false;
      cancelIdle(handle);
      timeline?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center py-40 md:py-52 min-h-screen overflow-hidden bg-background ${className}`}
    >
      <div className="absolute inset-0 z-0 bg-background">
        {showBackground ? <HeroBackground /> : null}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div ref={badgeWrapperRef} className="relative z-[1]">
          <AnimatedBadge text={badgeText} color="#b95310ff" href="#" />
        </div>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl max-w-4xl font-light tracking-tight text-foreground mb-4"
        >
          {title}
        </h1>

        <p
          ref={paragraphRef}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 font-light"
        >
          {description}
        </p>

        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {ctaButtons.map((button, index) => {
            const isPrimary = button.primary ?? index === 0;

            if (button.href) {
              return (
                <Button
                  key={index}
                  variant={isPrimary ? "default" : "outline"}
                  className="rounded-xl"
                  asChild
                >
                  <a href={button.href}>{button.text}</a>
                </Button>
              );
            }

            return (
              <Button
                key={index}
                variant={isPrimary ? "default" : "outline"}
                className="rounded-xl"
              >
                {button.text}
              </Button>
            );
          })}
        </div>

        {/* Image container */}
      

        {microDetails.length > 0 && (
          <ul
            ref={microRef}
            className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-light tracking-tight text-white"
          >
            {microDetails.map((detail, index) => (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom gradient fade to Intro */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-48 sm:h-64 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none"
      />
    </section>
  );
};

export default SyntheticHero;
