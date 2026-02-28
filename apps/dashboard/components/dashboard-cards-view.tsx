"use client";

import Link from "next/link";
import { IconPlus, IconFolderOpen } from "@tabler/icons-react";
import { DashboardItemCard, type DashboardItem } from "@/components/dashboard-item-card";

interface DashboardCardsViewProps {
  items: DashboardItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  addLabel?: string;
  addHref?: string;
}

export function DashboardCardsView({
  items,
  emptyTitle = "Henüz öğe yok",
  emptyDescription = "İlk öğenizi oluşturarak başlayın",
  addLabel = "Yeni ekle",
  addHref,
}: DashboardCardsViewProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="p-4">
      {isEmpty ? (
        <div className="flex h-60 flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-md bg-muted p-3">
            <IconFolderOpen className="h-6 w-6 text-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {emptyTitle}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {emptyDescription}
          </p>
          {addHref && (
            <Link
              href={addHref}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              <IconPlus className="h-4 w-4" />
              {addLabel}
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <DashboardItemCard key={item.id} item={item} />
          ))}
          {addHref && (
            <Link
              href={addHref}
              className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-background p-6 text-center text-sm text-muted-foreground transition-colors hover:border-solid hover:border-border/80 hover:text-foreground"
            >
              <IconPlus className="mb-2 h-5 w-5" />
              {addLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
