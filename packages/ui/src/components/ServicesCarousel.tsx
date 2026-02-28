"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Service {
  title: string;
  badge: string;
  price: string;
  href: string;
  image: string;
  hoverImage: string;
}

interface ServicesCarouselProps {
  heading?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "Custom Web Development",
    badge: "Tailored Solutions",
    price: "$1,500",
    href: "/services/1",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
  },
  {
    title: "Mobile App Development",
    badge: "iOS & Android",
    price: "$2,000",
    href: "/services/2",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
  },
  {
    title: "Cloud Solutions",
    badge: "Scalable Infrastructure",
    price: "$3,000",
    href: "/services/3",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
  },
  {
    title: "UI/UX Design",
    badge: "User-Centric Design",
    price: "$1,200",
    href: "/services/4",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-xYFl3Q9am1E-unsplash.jpg",
  },
  {
    title: "E-Commerce Platforms",
    badge: "Seamless Shopping",
    price: "$2,500",
    href: "/services/5",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg",
  },
  {
    title: "AI & Machine Learning",
    badge: "Smart Automation",
    price: "$5,000",
    href: "/services/6",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg",
  },
  {
    title: "DevOps Services",
    badge: "Efficient Workflows",
    price: "$2,800",
    href: "/services/7",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg",
  },
  {
    title: "Cybersecurity Solutions",
    badge: "Secure Systems",
    price: "$4,000",
    href: "/services/8",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
    hoverImage:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-majMgWtrF48-unsplash.jpg",
  },
];

export function ServicesCarousel({
  heading = "Our Services",
  services = defaultServices,
}: ServicesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const TRACK_WIDTH = 240;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < maxScroll - 1);
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 334 + 16; // min-w + gap
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const thumbWidth = 30;
  const thumbOffset = scrollProgress * (TRACK_WIDTH - thumbWidth);

  return (
    <section className="py-32 w-full">
      <div className="px-4 lg:px-10">
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={!canScrollLeft}
              onClick={() => scroll("left")}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={!canScrollRight}
              onClick={() => scroll("right")}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div role="region" aria-roledescription="carousel" className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 pb-10 lg:px-10 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                role="group"
                aria-roledescription="slide"
                className="min-w-[334px] flex-1"
              >
                <a
                  href={service.href}
                  className="group relative flex h-full flex-col items-start justify-start gap-2"
                >
                  <div className="w-full">
                    <div className="group relative z-10 overflow-hidden rounded-2xl">
                      <img
                        alt={service.title}
                        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        src={service.image}
                        style={{ aspectRatio: "3 / 4" }}
                      />
                      <img
                        alt={service.title}
                        className="absolute top-0 left-0 z-10 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        src={service.hoverImage}
                        style={{ aspectRatio: "3 / 4" }}
                      />
                      <Badge
                        variant="outline"
                        className="absolute top-4 left-4 border bg-background px-4 py-2"
                      >
                        {service.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3>{service.title}</h3>
                    <span>
                      Starting at <span>{service.price}</span>
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-muted">
          <div
            className="h-[2px] rounded bg-primary transition-transform duration-300 ease-out"
            style={{
              width: `${thumbWidth}px`,
              transform: `translateX(${thumbOffset}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
