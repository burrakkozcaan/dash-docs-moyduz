"use client";

import { IconPlus } from "@tabler/icons-react";

interface QuickActionsCardProps {
  onOpen: () => void;
}

export function QuickActionsCard({ onOpen }: QuickActionsCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="rounded-2xl border border-border bg-background hover:shadow-lg hover:shadow-black/5 transition-shadow cursor-pointer focus:outline-none w-full text-left min-h-[180px] flex flex-col items-center justify-center gap-2 p-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50">
        <IconPlus className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Yeni Site</p>
    </button>
  );
}
