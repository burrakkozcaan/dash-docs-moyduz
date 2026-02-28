"use client";

import { IconAlertTriangle } from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

export type PriorityLevel = "urgent" | "high" | "medium" | "low";

function PriorityBarsIcon({
  level,
  className,
}: {
  level: "high" | "medium" | "low";
  className?: string;
}) {
  const bars: { x: number; y1: number; y2: number; active: boolean }[] =
    level === "high"
      ? [
          { x: 4, y1: 2.667, y2: 13.333, active: true },
          { x: 8, y1: 6.667, y2: 13.333, active: true },
          { x: 12, y1: 2.667, y2: 13.333, active: true },
        ]
      : level === "medium"
        ? [
            { x: 4, y1: 13.333, y2: 13.333, active: false },
            { x: 8, y1: 6.667, y2: 13.333, active: true },
            { x: 12, y1: 6.667, y2: 13.333, active: true },
          ]
        : [
            { x: 4, y1: 13.333, y2: 13.333, active: false },
            { x: 8, y1: 13.333, y2: 13.333, active: false },
            { x: 12, y1: 6.667, y2: 13.333, active: true },
          ];

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-4 w-4 text-muted-foreground", className)}
      aria-hidden
    >
      {bars.map((bar, i) => (
        <path
          key={i}
          d={`M${bar.x} ${bar.y2}V${bar.y1}`}
          stroke={bar.active ? "currentColor" : "rgb(228, 228, 231)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function PriorityBadge({
  level,
  className,
}: {
  level: PriorityLevel;
  className?: string;
}) {
  const label =
    level === "urgent"
      ? "Urgent"
      : level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-foreground",
        className
      )}
    >
      {level === "urgent" ? (
        <IconAlertTriangle className="h-4 w-4 text-muted-foreground" />
      ) : (
        <PriorityBarsIcon
          level={level as "high" | "medium" | "low"}
          className="text-muted-foreground"
        />
      )}
      <span className="text-foreground/80">{label}</span>
    </span>
  );
}
