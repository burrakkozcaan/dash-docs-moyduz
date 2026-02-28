"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import {
  IconLayoutList,
  IconLayoutGrid,
  IconTimeline,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";
import type { ViewOptions, ViewType, Ordering } from "@/lib/view-options";

interface ViewOptionsPopoverProps {
  options: ViewOptions;
  onChange: (options: ViewOptions) => void;
}

const viewTypes: { id: ViewType; label: string; icon: typeof IconLayoutList }[] = [
  { id: "list", label: "Liste", icon: IconLayoutList },
  { id: "board", label: "Kart", icon: IconLayoutGrid },
  { id: "timeline", label: "Zaman çizelgesi", icon: IconTimeline },
];

const orderingOptions: { id: Ordering; label: string }[] = [
  { id: "manual", label: "Manuel" },
  { id: "alphabetical", label: "Alfabetik" },
  { id: "date", label: "Tarih" },
];

export function ViewOptionsPopover({ options, onChange }: ViewOptionsPopoverProps) {
  const [orderingOpen, setOrderingOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-lg border border-border/60 bg-transparent px-3 shadow-xs has-[>svg]:px-2.5 hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
        >
          <IconAdjustmentsHorizontal className="h-4 w-4" />
          Görünüm
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl p-0" align="end">
        <div className="p-4">
          <div className="flex rounded-xl bg-muted p-1">
            {viewTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() =>
                  onChange({ ...options, viewType: type.id })
                }
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-medium transition-colors shadow-none",
                  options.viewType === type.id
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <type.icon className="h-5 w-5" />
                {type.label}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Sıralama</span>
              <Popover open={orderingOpen} onOpenChange={setOrderingOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-2 rounded-lg border-border/60 bg-transparent px-3"
                  >
                    {orderingOptions.find((o) => o.id === options.ordering)?.label}
                    <IconChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-36 rounded-xl p-1" align="end">
                  {orderingOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        onChange({ ...options, ordering: option.id });
                        setOrderingOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                        options.ordering === option.id && "bg-accent"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Kapalı öğeleri göster</span>
              <input
                type="checkbox"
                checked={options.showClosed}
                onChange={(e) =>
                  onChange({ ...options, showClosed: e.target.checked })
                }
                className="h-4 w-4 rounded border-border"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
