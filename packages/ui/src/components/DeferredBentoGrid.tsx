"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@repo/ui/components/DeferredMount";

const loadBentoGrid = () => import("@repo/ui/components/BentoGrid");
const BentoGrid = dynamic(() => Promise.resolve(import("@repo/ui/components/BentoGrid")), {
  ssr: false,
});

export default function DeferredBentoGrid() {
  return (
    <DeferredMount
      className="cv-auto"
      fallback={<div className="h-[520px] w-full" />}
      prefetch={loadBentoGrid}
    >
      <BentoGrid />
    </DeferredMount>
  );
}

