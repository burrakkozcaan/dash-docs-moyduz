'use client'

import { ArrowRight } from "lucide-react"
import { useState, Suspense, lazy, useEffect } from "react"
import { useTheme } from "next-themes";

import dynamic from "next/dynamic";

const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Warp),
  { ssr: false }
);

export function CTASectionNew() {
  const [isHovered, setIsHovered] = useState(false)
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorFront = resolvedTheme === "dark" ? "#ffffffff" : "#000000";
  const colorBack = resolvedTheme === "dark" ? "#000000" : "#ffffff";

  return (
    <section className="py-12 w-full flex justify-center items-center px-4 md:px-6">
      <div
        className="w-full max-w-7xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[48px]  min-h-[600px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
            {mounted && <Warp
              width={1280}
              height={720}
              colors={["#ffffff", "#eb4e00ff", "#ffffff"]}
              proportion={0.24}
              softness={1}
              distortion={0.21}
              swirl={0.57}
              swirlIterations={10}
              shape="edge"
              shapeScale={0.75}
              speed={4.2}
              scale={2}
            />}
          </div>

          <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Writing
            </div>

            {/* Headline */}
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-8 leading-[1.05]">
              Your words, <br />
              <span className="text-white/80">delivered perfectly.</span>
            </h2>

            {/* Description */}
            <p className="text-white text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Join 2,847 founders using the only AI that understands the nuance of your voice.
              Clean, precise, and uniquely yours.
            </p>

            {/* Button */}
            <button className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-primary/20">
              <span className="relative z-10">Start Typing</span>
              <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}