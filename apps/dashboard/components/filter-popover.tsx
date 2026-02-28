"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { IconFilter } from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

export type FilterChip = { key: string; value: string };

type FilterTemp = {
  status: Set<string>;
  type: Set<string>;
};

interface FilterCounts {
  status?: Record<string, number>;
  type?: Record<string, number>;
}

interface FilterPopoverProps {
  initialChips?: FilterChip[];
  onApply: (chips: FilterChip[]) => void;
  onClear: () => void;
  counts?: FilterCounts;
}

const statusOptions = [
  { id: "active", label: "Aktif", color: "bg-emerald-500" },
  { id: "done", label: "Tamamlandı", color: "bg-blue-500" },
  { id: "in_progress", label: "İşlemde", color: "bg-amber-500" },
  { id: "cancelled", label: "İptal", color: "bg-rose-500" },
];

const typeOptions = [
  { id: "order", label: "Sipariş" },
  { id: "subscription", label: "Abonelik" },
  { id: "ticket", label: "Destek" },
  { id: "tool", label: "Araç" },
  { id: "template", label: "Şablon" },
];

function toggleSet(set: Set<string>, v: string) {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

export function FilterPopover({
  initialChips,
  onApply,
  onClear,
  counts,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<"status" | "type">("status");
  const [temp, setTemp] = useState<FilterTemp>(() => ({
    status: new Set<string>(),
    type: new Set<string>(),
  }));

  useEffect(() => {
    if (!open) return;
    const next: FilterTemp = {
      status: new Set<string>(),
      type: new Set<string>(),
    };
    for (const c of initialChips || []) {
      const k = c.key.toLowerCase();
      const v = c.value.toLowerCase();
      if (k === "status" || k === "durum") next.status.add(v);
      if (k === "type" || k === "tip") next.type.add(v);
    }
    setTemp(next);
  }, [open, initialChips]);

  const handleApply = () => {
    const chips: FilterChip[] = [];
    temp.status.forEach((v) =>
      chips.push({
        key: "Durum",
        value: statusOptions.find((o) => o.id === v)?.label ?? v,
      })
    );
    temp.type.forEach((v) =>
      chips.push({
        key: "Tip",
        value: typeOptions.find((o) => o.id === v)?.label ?? v,
      })
    );
    onApply(chips);
    setOpen(false);
  };

  const handleClear = () => {
    setTemp({ status: new Set(), type: new Set() });
    onClear();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-lg border border-border/60 bg-transparent px-3 shadow-xs has-[>svg]:px-2.5 hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
        >
          <IconFilter className="h-4 w-4" />
          Filtre
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[420px] rounded-xl p-0">
        <div className="grid grid-cols-[140px_minmax(0,1fr)]">
          <div className="border-r border-border/40 p-3">
            <button
              type="button"
              onClick={() => setActive("status")}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent",
                active === "status" && "bg-accent"
              )}
            >
              Durum
            </button>
            <button
              type="button"
              onClick={() => setActive("type")}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent",
                active === "type" && "bg-accent"
              )}
            >
              Tip
            </button>
          </div>
          <div className="p-3">
            {active === "status" && (
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border p-2 hover:bg-accent"
                  >
                    <input
                      type="checkbox"
                      checked={temp.status.has(opt.id)}
                      onChange={() =>
                        setTemp((t) => ({
                          ...t,
                          status: toggleSet(t.status, opt.id),
                        }))
                      }
                      className="h-4 w-4 rounded border-border"
                    />
                    <span
                      className={cn("h-2 w-2 rounded-full", opt.color)}
                    />
                    <span className="text-sm flex-1">{opt.label}</span>
                    {counts?.status?.[opt.id] != null && (
                      <span className="text-xs text-muted-foreground">
                        {counts.status[opt.id]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
            {active === "type" && (
              <div className="grid grid-cols-2 gap-2">
                {typeOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border p-2 hover:bg-accent"
                  >
                    <input
                      type="checkbox"
                      checked={temp.type.has(opt.id)}
                      onChange={() =>
                        setTemp((t) => ({
                          ...t,
                          type: toggleSet(t.type, opt.id),
                        }))
                      }
                      className="h-4 w-4 rounded border-border"
                    />
                    <span className="text-sm flex-1">{opt.label}</span>
                    {counts?.type?.[opt.id] != null && (
                      <span className="text-xs text-muted-foreground">
                        {counts.type[opt.id]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
            <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-3">
              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-primary hover:underline"
              >
                Temizle
              </button>
              <Button size="sm" className="h-8 rounded-lg" onClick={handleApply}>
                Uygula
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
