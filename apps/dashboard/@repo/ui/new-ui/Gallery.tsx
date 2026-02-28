'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface GalleryProps {
  images?: string[];
  className?: string;
}

const defaultImages = Array.from(
  { length: 5 },
  (_, i) =>
    `https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw${(i % 5) + 1}.jpeg`,
);

export function Gallery({
  images = defaultImages,
  className = '',
}: GalleryProps) {
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const columnHeightsRef = useRef<number[]>([]);

  useEffect(() => {
    const columns = columnsRef.current;
    if (columns.length === 0) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const speeds = [0.05, 0.075, 0.06, 0.09, 0.065]; // Different speeds for each column (much slower)

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      columns.forEach((column, index) => {
        if (!column) return;

        // Cache column height once it's rendered
        if (
          columnHeightsRef.current[index] === undefined ||
          columnHeightsRef.current[index] === 0
        ) {
          const height = column.scrollHeight;
          if (height > 0) {
            columnHeightsRef.current[index] = height;
          } else {
            return; // Skip if not rendered yet
          }
        }

        const totalHeight = columnHeightsRef.current[index];
        if (totalHeight === 0) return;

        const speed = speeds[index % speeds.length] ?? 0.05;

        // Since we have 4 copies, divide by 4 to get one set's height
        const oneSetHeight = totalHeight / 4;

        // Use modulo to create seamless loop
        // Round to full pixel to prevent sub-pixel jitter
        const translateY = -Math.round((elapsed * speed) % oneSetHeight);

        // Only use transform, remove unnecessary CSS properties
        column.style.transform = `translateY(${translateY}px)`;
        column.style.willChange = 'transform';
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Small delay to ensure columns are rendered
    const timeoutId = setTimeout(() => {
      // Cache heights before starting animation
      columns.forEach((column, index) => {
        if (column && column.scrollHeight > 0) {
          columnHeightsRef.current[index] = column.scrollHeight;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images.length]);

  // Duplicate images to create seamless loop (more copies for smoother animation)
  const duplicatedImages = [...images, ...images, ...images, ...images];

  // Create columns with different widths (larger on desktop)
  const columnConfigs = [
    { width: 160, widthMd: 200, height: 220, heightMd: 280 },
    { width: 200, widthMd: 240, height: 280, heightMd: 340 },
    { width: 160, widthMd: 200, height: 220, heightMd: 280 },
  ];

  return (
    <section
      className={`relative min-h-[600px] w-full overflow-hidden bg-[#f7f7f7] antialiased md:min-h-screen ${className}`}
      style={{
        isolation: 'isolate',
        contain: 'paint',
      }}
    >
      {/* Gallery columns */}
      <div className='absolute inset-0 flex justify-center gap-6 overflow-hidden md:gap-8'>
        {columnConfigs.map((config, colIndex) => {
          const widthMd = config.widthMd || config.width;
          const heightMd = config.heightMd || config.height;

          return (
            <div
              key={colIndex}
              ref={(el) => {
                if (el) columnsRef.current[colIndex] = el;
              }}
              data-col-index={colIndex}
              className='flex flex-col will-change-transform'
              style={{
                width: `${config.width}px`,
                outline: 'none',
                border: 'none',
                gap: '24px',
              }}
            >
              {duplicatedImages.map((image, imgIndex) => (
                <div
                  key={`${colIndex}-${imgIndex}`}
                  data-col-index={colIndex}
                  className='relative flex-shrink-0 overflow-hidden rounded-xl'
                  style={{
                    width: `${config.width}px`,
                    height: `${config.height}px`,
                    outline: 'none',
                    border: 'none',
                    marginBottom: 0,
                  }}
                >
                  <Image
                    alt={`Gallery image ${imgIndex + 1}`}
                    src={image}
                    width={config.width}
                    height={config.height}
                    className='h-full w-full select-none rounded-xl object-cover'
                    draggable={false}
                    style={{
                      outline: 'none',
                      border: 'none',
                      userSelect: 'none',
                      imageRendering: 'auto',
                      display: 'block',
                    }}
                  />
                  <div className='from-background pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent' />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Responsive styles for desktop */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 768px) {
            ${columnConfigs
              .map((config, i) => {
                const widthMd = config.widthMd || config.width;
                const heightMd = config.heightMd || config.height;
                return `
                [data-col-index="${i}"] { width: ${widthMd}px !important; gap: 32px !important; }
                [data-col-index="${i}"] > div { width: ${widthMd}px !important; height: ${heightMd}px !important; }
              `;
              })
              .join('')}
          }
        `,
        }}
      />

      {/* Micro noise overlay - Netflix/Apple TV trick to hide seams */}
      <div
        className='pointer-events-none absolute inset-0 z-[1]'
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          isolation: 'isolate',
        }}
      />

      {/* Gradient overlays — üst, alt, sol, sağ #f7f7f7 gölgeleme */}
      {/* Top gradient - Mobile */}
      <div
        className='absolute left-0 top-0 z-50 h-[200px] w-full bg-gradient-to-b from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:hidden'
        style={{
          top: '-2px',
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom gradient - Mobile */}
      <div
        className='absolute bottom-0 left-0 z-50 h-[200px] w-full bg-gradient-to-t from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:hidden'
        style={{
          bottom: '-2px',
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'none',
        }}
      />
      {/* Top gradient - Desktop */}
      <div
        className='absolute left-0 top-0 z-50 hidden h-[300px] w-full bg-gradient-to-b from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:block'
        style={{
          top: '-2px',
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'none',
        }}
      />
      {/* Bottom gradient - Desktop */}
      <div
        className='absolute bottom-0 left-0 z-50 hidden h-[300px] w-full bg-gradient-to-t from-[#f7f7f7] via-[#f7f7f7]/80 to-transparent md:block'
        style={{
          bottom: '-2px',
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'none',
        }}
      />
      {/* Left gradient */}
      <div
        className='absolute left-0 top-0 z-50 h-full w-[80px] bg-gradient-to-r from-[#f7f7f7] to-transparent md:w-[120px]'
        style={{
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'none',
        }}
      />
      {/* Right gradient */}
      <div
        className='absolute right-0 top-0 z-50 h-full w-[80px] bg-gradient-to-l from-[#f7f7f7] to-transparent md:w-[120px]'
        style={{
          transform: 'translateZ(0)',
          isolation: 'isolate',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
