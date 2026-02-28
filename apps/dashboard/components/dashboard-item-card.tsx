"use client";

import Link from "next/link";
import { IconCalendar, IconFolder, IconListCheck } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { ProgressCircle } from "@/components/progress-circle";
import { PriorityBadge, type PriorityLevel } from "@/components/priority-badge";
import { cn } from "@repo/ui/lib/utils";

export type DashboardItem = {
  id: string;
  title: string;
  subtitle?: string;
  status: "active" | "done" | "in_progress" | "cancelled";
  type?: string;
  href?: string;
  /** Tarih metni (örn. "Feb 12, 2024") */
  date?: string;
  priority?: PriorityLevel;
  /** 0-100 */
  progress?: number;
  taskCount?: number;
  completedTasks?: number;
  assigneeName?: string;
  assigneeImage?: string | null;
};

const statusConfig: Record<
  DashboardItem["status"],
  { label: string; dot: string; pill: string }
> = {
  active: {
    label: "Aktif",
    dot: "bg-teal-600",
    pill: "text-teal-700 border-teal-200 bg-teal-50 dark:bg-teal-950/30 dark:border-teal-800 dark:text-teal-400",
  },
  done: {
    label: "Tamamlandı",
    dot: "bg-blue-600",
    pill: "text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-400",
  },
  in_progress: {
    label: "İşlemde",
    dot: "bg-amber-500",
    pill: "text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400",
  },
  cancelled: {
    label: "İptal",
    dot: "bg-rose-500",
    pill: "text-rose-700 border-rose-200 bg-rose-50 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-400",
  },
};

function getProgressColor(percent: number): string {
  if (percent >= 80) return "var(--chart-3)";
  if (percent >= 50) return "var(--chart-4)";
  if (percent > 0) return "var(--chart-5)";
  return "var(--chart-2)";
}

interface DashboardItemCardProps {
  item: DashboardItem;
}

export function DashboardItemCard({ item }: DashboardItemCardProps) {
  const s = statusConfig[item.status];
  const Wrapper = item.href ? Link : "div";
  const wrapperProps = item.href ? { href: item.href } : {};
  const progress = item.progress ?? 0;
  const taskCount = item.taskCount ?? 0;
  const completedTasks = item.completedTasks ?? 0;
  const showMetaRow = item.date != null || item.priority != null;

  return (
    <Wrapper
      {...wrapperProps}
      role="button"
      tabIndex={0}
      aria-label={`Open project ${item.title}`}
      className={cn(
        "rounded-2xl border border-border bg-background transition-shadow cursor-pointer focus:outline-none block text-left hover:shadow-lg/5",
        !item.href && "cursor-default"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">
            <IconFolder className="h-5 w-5" />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
              s.pill
            )}
          >
            <span className={cn("inline-block size-1.5 rounded-full", s.dot)} />
            {s.label}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[15px] font-semibold leading-6 text-foreground">
            {item.title}
          </p>
          {item.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground truncate">
              {item.subtitle}
            </p>
          )}
        </div>

        {showMetaRow && (
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <IconCalendar className="h-4 w-4" />
              <span>{item.date ?? "—"}</span>
            </div>
            {item.priority && <PriorityBadge level={item.priority} />}
          </div>
        )}

        <div className="mt-4 border-t border-border/60" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ProgressCircle
              progress={progress}
              color={getProgressColor(progress)}
              size={18}
            />
            <div className="flex items-center gap-4">
              <span>{progress}%</span>
              {taskCount > 0 ? (
                <span className="flex items-center gap-1 text-sm">
                  <IconListCheck className="h-4 w-4" />
                  {completedTasks} / {taskCount} Görev
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm">
                  <IconListCheck className="h-4 w-4" />
                  0 / 0 Görev
                </span>
              )}
            </div>
          </div>
          <Avatar
            size="sm"
            className="shrink-0 overflow-hidden rounded-full border border-border size-6"
          >
            {item.assigneeImage ? (
              <AvatarImage
                src={item.assigneeImage}
                alt={item.assigneeName ?? ""}
              />
            ) : (
              <AvatarFallback className="text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                </svg>
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </Wrapper>
  );
}
