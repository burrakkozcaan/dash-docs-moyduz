"use client";

import { useState } from "react";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { cn } from "@/utils/cn";
import { AddonsContent } from "@/app/dashboard/addons/page";
import { ToolsContent } from "@/app/dashboard/tools/page";

type Tab = "addons" | "tools";

const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: "addons", label: "Addons", sub: "For your sites" },
  { id: "tools", label: "Tools", sub: "Digital products" },
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<Tab>("addons");

  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border/60">
        <div className="flex h-12 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <div className="mx-2 h-4 w-px bg-border" />
          <p className="text-base font-medium">Marketplace</p>
        </div>

        {/* Tab bar */}
        <div className="flex items-end gap-1 px-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex flex-col items-start px-3 py-2 transition-colors duration-150 focus:outline-none",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="text-sm font-medium">{tab.label}</span>
              <span className="text-[11px]">{tab.sub}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Tab content */}
      {activeTab === "addons" ? <AddonsContent /> : <ToolsContent />}
    </div>
  );
}
