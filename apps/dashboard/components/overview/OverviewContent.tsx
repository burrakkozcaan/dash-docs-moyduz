"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { ActiveSiteCard } from "@/components/overview/ActiveSiteCard";
import { QuickActionsCard } from "@/components/overview/QuickActionsCard";
import { MOCK_SITES } from "@/lib/data/sites";
import { DEFAULT_VIEW_OPTIONS, type FilterChip, type ViewOptions } from "@/lib/view-options";
import { Button } from "@repo/ui/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

export function OverviewContent() {
  const router = useRouter();
  const [viewOptions, setViewOptions] = useState<ViewOptions>(DEFAULT_VIEW_OPTIONS);
  const [filters, setFilters] = useState<FilterChip[]>([]);

  const allSites = MOCK_SITES;

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <DashboardHeader
        title="Genel Bakış"
        filters={filters}
        onRemoveFilter={(key, value) =>
          setFilters((prev) => prev.filter((f) => !(f.key === key && f.value === value)))
        }
        onFiltersChange={setFilters}
        viewOptions={viewOptions}
        onViewOptionsChange={setViewOptions}
        addLabel="Yeni Site"
        onAdd={() => router.push("/dashboard/sites/new")}
      />

      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">Siteler</h2>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground" asChild>
              <Link href="/dashboard/sites">
                Tümünü gör <IconArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {allSites.map((site) => (
              <ActiveSiteCard key={site.id} site={site} />
            ))}
            <QuickActionsCard onOpen={() => router.push("/dashboard/sites/new")} />
          </div>
        </div>
      </div>
    </div>
  );
}
