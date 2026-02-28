"use client";

import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardCardsView } from "@/components/dashboard-cards-view";
import type { DashboardItem } from "@/components/dashboard-item-card";
import {
  DEFAULT_VIEW_OPTIONS,
  type FilterChip,
  type ViewOptions,
} from "@/lib/view-options";

function computeFilterCounts(
  items: DashboardItem[]
): { status?: Record<string, number>; type?: Record<string, number> } {
  const status: Record<string, number> = {};
  const type: Record<string, number> = {};
  for (const item of items) {
    status[item.status] = (status[item.status] ?? 0) + 1;
    if (item.type) type[item.type] = (type[item.type] ?? 0) + 1;
  }
  return { status, type };
}

interface DashboardContentProps {
  title?: string;
  addLabel?: string;
  addHref?: string;
  /** Initial items (e.g. from API later) */
  initialItems?: DashboardItem[];
}

export function DashboardContent({
  title = "Gösterge Paneli",
  addLabel = "Yeni proje",
  addHref = "/onboarding/scan",
  initialItems = [],
}: DashboardContentProps) {
  const [viewOptions, setViewOptions] = useState<ViewOptions>(DEFAULT_VIEW_OPTIONS);
  const [filters, setFilters] = useState<FilterChip[]>([]);

  const filteredItems = useMemo(() => {
    let list = initialItems.slice();
    if (!viewOptions.showClosed) {
      list = list.filter((i) => i.status !== "done" && i.status !== "cancelled");
    }
    const statusSet = new Set(
      filters
        .filter((f) => f.key.toLowerCase() === "durum")
        .map((f) => f.value.toLowerCase())
    );
    const typeSet = new Set(
      filters
        .filter((f) => f.key.toLowerCase() === "tip")
        .map((f) => f.value.toLowerCase())
    );
    if (statusSet.size) {
      const labelToStatus: Record<string, DashboardItem["status"]> = {
        aktif: "active",
        tamamlandı: "done",
        işlemde: "in_progress",
        iptal: "cancelled",
      };
      const wanted = new Set(
        [...statusSet].map((s) => labelToStatus[s] ?? s)
      );
      list = list.filter((i) => wanted.has(i.status));
    }
    if (typeSet.size) {
      const labelToType: Record<string, string> = {
        sipariş: "order",
        abonelik: "subscription",
        destek: "ticket",
        araç: "tool",
        şablon: "template",
      };
      const wanted = new Set(
        [...typeSet].map((s) => labelToType[s.toLowerCase()] ?? s.toLowerCase())
      );
      list = list.filter((i) => i.type && wanted.has(i.type.toLowerCase()));
    }
    if (viewOptions.ordering === "alphabetical")
      list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [initialItems, filters, viewOptions]);

  const counts = useMemo(
    () => computeFilterCounts(initialItems),
    [initialItems]
  );

  const removeFilter = (key: string, value: string) => {
    setFilters((prev) =>
      prev.filter((f) => !(f.key === key && f.value === value))
    );
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <DashboardHeader
        title={title}
        filters={filters}
        onRemoveFilter={removeFilter}
        onFiltersChange={setFilters}
        counts={counts}
        viewOptions={viewOptions}
        onViewOptionsChange={setViewOptions}
        addLabel={addLabel}
        addHref={addHref}
      />
      {viewOptions.viewType === "list" && (
        <DashboardCardsView
          items={filteredItems}
          emptyTitle="Henüz proje yok"
          emptyDescription="İlk projenizi oluşturarak başlayın"
          addLabel={addLabel}
          addHref={addHref}
        />
      )}
      {viewOptions.viewType === "board" && (
        <DashboardCardsView
          items={filteredItems}
          emptyTitle="Henüz proje yok"
          emptyDescription="İlk projenizi oluşturarak başlayın"
          addLabel={addLabel}
          addHref={addHref}
        />
      )}
      {viewOptions.viewType === "timeline" && (
        <div className="p-4 text-muted-foreground text-sm">
          Zaman çizelgesi görünümü yakında eklenecek.
        </div>
      )}
    </div>
  );
}
