"use client";

import { useRouter } from "next/navigation";
import { AddSiteFlow } from "@/components/sites/AddSiteFlow";

export default function NewSitePage() {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm"
      onClick={() => router.push("/dashboard/sites")}
      role="presentation"
    >
      <div
        className="absolute inset-2 overflow-hidden rounded-2xl bg-bg-white-0 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AddSiteFlow />
      </div>
    </div>
  );
}
