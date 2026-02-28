"use client";

import Link from "next/link";
import { Badge } from "@repo/ui/components/ui/badge";
import { type Site } from "@/lib/data/sites";
import { STATUS_LABELS, STATUS_VARIANTS } from "@/components/sites/SiteStatusBadge";
import { ProgressCircle } from "@/components/progress-circle";
import { IconWorld } from "@tabler/icons-react";

interface ActiveSiteCardProps {
  site: Site;
}

export function ActiveSiteCard({ site }: ActiveSiteCardProps) {
  return (
    <Link
      href={`/dashboard/sites/${site.id}`}
      className="rounded-2xl border border-border bg-background hover:shadow-lg hover:shadow-black/5 transition-shadow cursor-pointer focus:outline-none block"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <IconWorld className="h-5 w-5" />
          </div>
          <Badge
            variant={STATUS_VARIANTS[site.status] as "default" | "secondary" | "destructive" | "outline"}
            className="text-[10px] h-5 px-1.5"
          >
            {STATUS_LABELS[site.status]}
          </Badge>
        </div>
        <div className="mt-3">
          <p className="text-[15px] font-semibold text-foreground leading-6 line-clamp-1">
            {site.name}
          </p>
          {site.template && (
            <p className="mt-1 text-sm text-muted-foreground truncate">{site.template.category}</p>
          )}
        </div>
        <div className="mt-4 border-t border-border/60" />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">{site.progress}%</span>
          <ProgressCircle progress={site.progress} size={18} color="var(--primary)" />
        </div>
      </div>
    </Link>
  );
}
