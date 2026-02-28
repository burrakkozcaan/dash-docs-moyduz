import { cn } from "@repo/ui/lib/utils";
import { STATUS_STEPS, type SiteStatus } from "@/lib/data/sites";
import { IconCheck } from "@tabler/icons-react";

interface SiteStatusTimelineProps {
  status: SiteStatus;
}

export function SiteStatusTimeline({ status }: SiteStatusTimelineProps) {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-0">
      {STATUS_STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.key} className="flex items-center flex-1 min-w-0">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1 px-1">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold shrink-0 transition-colors",
                  isDone && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-background text-primary",
                  !isDone && !isActive && "border-muted-foreground/30 bg-muted text-muted-foreground/50",
                )}
              >
                {isDone ? <IconCheck className="h-3 w-3" /> : <span className="text-[10px]">{i + 1}</span>}
              </div>
              <span
                className={cn(
                  "text-[10px] text-center whitespace-nowrap leading-tight",
                  isActive && "text-primary font-semibold",
                  isDone && "text-primary/70",
                  !isDone && !isActive && "text-muted-foreground/50",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < STATUS_STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mb-4",
                  i < currentIndex ? "bg-primary" : "bg-muted-foreground/20",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
