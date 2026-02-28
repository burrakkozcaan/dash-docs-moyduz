import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
}

export function StatCard({ label, value, trend, trendLabel }: StatCardProps) {
  return (
    <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
      <CardContent className="pt-6 pb-4 px-5">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
        {trendLabel && (
          <div className={cn(
            "flex items-center gap-1 mt-2 text-xs font-medium",
            trend === "up" && "text-emerald-600",
            trend === "down" && "text-rose-500",
            trend === "neutral" && "text-muted-foreground",
          )}>
            {trend === "up" && <IconTrendingUp className="h-3.5 w-3.5" />}
            {trend === "down" && <IconTrendingDown className="h-3.5 w-3.5" />}
            {trendLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
