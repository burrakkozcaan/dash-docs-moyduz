'use client';

import { ArrowRight } from 'lucide-react';
import { useState, Suspense, lazy, useEffect } from 'react';
import { useTheme } from 'next-themes';

import dynamic from 'next/dynamic';

const Warp = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Warp),
  { ssr: false },
);

export function CTASectionNew() {
  const [isHovered, setIsHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const warpColors =
    resolvedTheme === 'dark'
      ? ['#1c1c1c', '#eb4e00ff', '#1c1c1c']
      : ['#ffffff', '#eb4e00ff', '#ffffff'];

  return (
    <section className='flex w-full items-center justify-center py-12 md:px-6'>
      <div
        className='relative w-full max-w-7xl'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden rounded-[48px] duration-500 md:min-h-[600px]'>
          <div className='pointer-events-none absolute inset-0 z-0 opacity-80'>
            {mounted && (
              <Warp
                width={1280}
                height={720}
                colors={warpColors}
                proportion={0.24}
                softness={1}
                distortion={0.21}
                swirl={0.57}
                swirlIterations={10}
                shape='edge'
                shapeScale={0.75}
                speed={4.2}
                scale={2}
              />
            )}
          </div>

          <div className='relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center'>
            <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-label-sm font-medium text-white backdrop-blur-sm dark:text-white'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-base opacity-75'></span>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-white'></span>
              </span>
              AI-Powered Writing
            </div>

            {/* Headline */}
            <h2 className='text-5xl md:text-7xl lg:text-8xl mb-8 font-sans font-medium leading-[1.05] tracking-tight text-text-strong-950 dark:text-white'>
              Your words, <br />
              <span className='text-text-sub-600 dark:text-ln-gray-400'>
                delivered perfectly.
              </span>
            </h2>

            {/* Description */}
            <p className='mb-12 max-w-2xl text-paragraph-lg leading-relaxed text-text-sub-600 dark:text-ln-gray-300 md:text-paragraph-xl'>
              Join 2,847 founders using the only AI that understands the nuance
              of your voice. Clean, precise, and uniquely yours.
            </p>

            {/* Button */}
            <button className='hover:ring-primary-base/20 group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-12 text-paragraph-md font-medium text-white shadow-button-primary-focus transition-all duration-300 hover:scale-105 hover:bg-primary-darker hover:ring-4 active:scale-95'>
              <span className='relative z-10'>Start Typing</span>
              <ArrowRight className='relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
