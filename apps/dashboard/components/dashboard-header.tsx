"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { ViewOptionsPopover } from "@/components/view-options-popover";
import { FilterPopover } from "@/components/filter-popover";
import { ChipOverflow } from "@/components/chip-overflow";
import { IconLink, IconPlus, IconSparkles } from "@tabler/icons-react";
import type { FilterChip as FilterChipType, ViewOptions } from "@/lib/view-options";

interface FilterCounts {
  status?: Record<string, number>;
  type?: Record<string, number>;
}

interface DashboardHeaderProps {
  title: string;
  filters: FilterChipType[];
  onRemoveFilter: (key: string, value: string) => void;
  onFiltersChange: (chips: FilterChipType[]) => void;
  counts?: FilterCounts;
  viewOptions: ViewOptions;
  onViewOptionsChange: (options: ViewOptions) => void;
  addLabel?: string;
  addHref?: string;
  onAdd?: () => void;
}

export function DashboardHeader({
  title,
  filters,
  onRemoveFilter,
  onFiltersChange,
  counts,
  viewOptions,
  onViewOptionsChange,
  addLabel = "Yeni proje",
  addHref,
  onAdd,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background flex flex-col border-b border-border/40">
      {/* Üst satır: referans ile birebir (font-semibold, hover, icon boyutları) */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="size-7 h-8 w-8 rounded-lg text-sm font-semibold text-sub-600 hover:bg-accent hover:text-strong-950" />
          <p className="text-base font-medium text-foreground">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 h-8 w-8 rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground"
            aria-label="Bağlantı"
          >
            <IconLink className="h-4 w-4 shrink-0" stroke={2} />
          </Button>
          {onAdd ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 rounded-md py-2 px-3 font-semibold has-[>svg]:px-2.5 hover:bg-accent hover:text-accent-foreground"
              onClick={onAdd}
            >
              <IconPlus className="h-4 w-4 shrink-0" stroke={2.5} />
              {addLabel}
            </Button>
          ) : addHref ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 rounded-md py-2 px-3 font-semibold has-[>svg]:px-2.5 hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <Link href={addHref}>
                <IconPlus className="h-4 w-4 shrink-0" stroke={2.5} />
                {addLabel}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
      {/* Alt satır: Filtre + chip'ler | Görünüm + Ask AI */}
      <div className="flex items-center justify-between px-4 pb-3 pt-3">
        <div className="flex items-center gap-2">
          <FilterPopover
            initialChips={filters}
            onApply={onFiltersChange}
            onClear={() => onFiltersChange([])}
            counts={counts}
          />
          <ChipOverflow
            chips={filters}
            onRemove={onRemoveFilter}
            maxVisible={6}
          />
        </div>
        <div className="flex items-center gap-2">
          <ViewOptionsPopover
            options={viewOptions}
            onChange={onViewOptionsChange}
          />
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card/80 shadow-sm">
              <Button
                variant="default"
                size="default"
                className="relative z-10 h-8 gap-2 rounded-xl bg-primary px-3 text-primary-foreground hover:bg-primary/90"
              >
                <IconSparkles className="h-4 w-4" fill="currentColor" stroke={0} />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
