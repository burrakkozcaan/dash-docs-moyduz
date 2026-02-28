"use client";

import { useRef } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
    Folder,
    CalendarBlank,
    Flag,
    User,
    ListChecks,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectStatus =
    | "backlog"
    | "planned"
    | "active"
    | "cancelled"
    | "completed";

export type ProjectPriority = "urgent" | "high" | "medium" | "low";

export type Project = {
    id: string;
    name: string;
    taskCount: number;
    progress: number;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    priority: ProjectPriority;
    tags: string[];
    members: string[];
    client?: string;
    typeLabel?: string;
    durationLabel?: string;
    tasks: Array<{
        id: string;
        name: string;
        type: "bug" | "improvement" | "task";
        assignee: string;
        status: "todo" | "in-progress" | "done";
        startDate: Date;
        endDate: Date;
    }>;
};

// ─── Status config ─────────────────────────────────────────────────────────────

function statusConfig(status: ProjectStatus) {
    switch (status) {
        case "active":
            return {
                label: "Aktif",
                dot: "bg-teal-600",
                pill: "text-teal-700 border-teal-200 bg-teal-50",
            };
        case "planned":
            return {
                label: "Planlı",
                dot: "bg-zinc-900",
                pill: "text-zinc-900 border-zinc-200 bg-zinc-50",
            };
        case "backlog":
            return {
                label: "Beklemede",
                dot: "bg-orange-600",
                pill: "text-orange-700 border-orange-200 bg-orange-50",
            };
        case "completed":
            return {
                label: "Tamamlandı",
                dot: "bg-blue-600",
                pill: "text-blue-700 border-blue-200 bg-blue-50",
            };
        case "cancelled":
            return {
                label: "İptal",
                dot: "bg-rose-600",
                pill: "text-rose-700 border-rose-200 bg-rose-50",
            };
        default:
            return {
                label: status,
                dot: "bg-zinc-400",
                pill: "text-zinc-700 border-zinc-200 bg-zinc-50",
            };
    }
}

// ─── Priority badge ────────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<
    ProjectPriority,
    { label: string; color: string }
> = {
    urgent: { label: "Acil", color: "text-rose-600" },
    high: { label: "Yüksek", color: "text-orange-500" },
    medium: { label: "Orta", color: "text-amber-500" },
    low: { label: "Düşük", color: "text-zinc-400" },
};

function PriorityBadge({ level }: { level: ProjectPriority }) {
    const cfg = PRIORITY_CONFIG[level];
    return (
        <span className={cn("text-xs font-medium", cfg.color)}>{cfg.label}</span>
    );
}

// ─── Progress circle ────────────────────────────────────────────────────────────

function ProgressCircle({
    progress,
    size = 18,
    strokeWidth = 2,
}: {
    progress: number;
    size?: number;
    strokeWidth?: number;
}) {
    const s = Math.round(size);
    const r = Math.floor((s - strokeWidth) / 2);
    const cx = s / 2;
    const cy = s / 2;
    const circumference = 2 * Math.PI * r;
    const dashOffset = circumference * (1 - progress / 100);

    const color =
        progress >= 80
            ? "#16a34a"
            : progress >= 50
                ? "#ca8a04"
                : progress > 0
                    ? "#dc2626"
                    : "#a1a1aa";

    return (
        <div
            className="relative flex items-center justify-center"
            style={{ width: s, height: s }}
        >
            <svg
                width={s}
                height={s}
                viewBox={`0 0 ${s} ${s}`}
                aria-hidden
            >
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-zinc-200"
                />
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    transform={`rotate(-90 ${cx} ${cy})`}
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
            </svg>
        </div>
    );
}

// ─── ProjectCard ───────────────────────────────────────────────────────────────

export function ProjectCard({ project, onSelect }: { project: Project; onSelect?: (p: Project) => void }) {
    const s = statusConfig(project.status);
    const router = useRouter();
    const draggingRef = useRef(false);
    const startPosRef = useRef<{ x: number; y: number } | null>(null);

    const assignee = project.members?.[0] ?? null;
    const initials = assignee
        ? assignee
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : null;

    const secondaryLine = (() => {
        const parts = [project.client, project.typeLabel, project.durationLabel].filter(Boolean);
        if (parts.length > 0) return parts.join(" • ");
        if (project.tags?.length > 0) return project.tags.join(" • ");
        return "";
    })();

    const totalTasks = project.tasks?.length ?? project.taskCount ?? 0;
    const doneTasks = project.tasks
        ? project.tasks.filter((t) => t.status === "done").length
        : Math.round(((project.progress ?? 0) / 100) * totalTasks);
    const percent = Math.max(0, Math.min(100, project.progress));

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Proje: ${project.name}`}
            onMouseDown={(e) => {
                startPosRef.current = { x: e.clientX, y: e.clientY };
                draggingRef.current = false;
            }}
            onMouseMove={(e) => {
                if (!startPosRef.current) return;
                const dx = Math.abs(e.clientX - startPosRef.current.x);
                const dy = Math.abs(e.clientY - startPosRef.current.y);
                if (dx > 5 || dy > 5) draggingRef.current = true;
            }}
            onMouseUp={() => {
                startPosRef.current = null;
            }}
            onClick={() => {
                if (draggingRef.current) { draggingRef.current = false; return; }
                if (onSelect) { onSelect(project); } else { router.push(`/dashboard/addons/${project.id}`); }
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (onSelect) { onSelect(project); } else { router.push(`/dashboard/addons/${project.id}`); }
                }
            }}
            className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 hover:shadow-lg/5 transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base"
        >
            <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="text-text-soft-400">
                        <Folder className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={cn(
                                "flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                                s.pill,
                            )}
                        >
                            <span className={cn("inline-block size-1.5 rounded-full", s.dot)} />
                            {s.label}
                        </div>
                    </div>
                </div>

                {/* Name + subtitle */}
                <div className="mt-3">
                    <p className="text-[15px] font-semibold text-text-strong-950 leading-6">
                        {project.name}
                    </p>
                    {secondaryLine && (
                        <p className="mt-1 text-sm text-text-sub-600 truncate">
                            {secondaryLine}
                        </p>
                    )}
                </div>

                {/* Due date + priority */}
                <div className="mt-2 flex items-center justify-between text-sm text-text-sub-600">
                    <div className="flex items-center gap-2">
                        <CalendarBlank className="h-4 w-4" />
                        <span>{format(project.endDate, "d MMM yyyy")}</span>
                    </div>
                    <PriorityBadge level={project.priority} />
                </div>

                {/* Divider */}
                <div className="mt-4 border-t border-stroke-soft-200" />

                {/* Progress + assignee */}
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-text-sub-600">
                        <ProgressCircle progress={percent} size={18} />
                        <span>{percent}%</span>
                        {totalTasks > 0 && (
                            <span className="flex items-center gap-1">
                                <ListChecks className="h-4 w-4" />
                                {doneTasks} / {totalTasks}
                            </span>
                        )}
                    </div>
                    <div className="flex size-6 items-center justify-center rounded-full border border-stroke-soft-200 bg-bg-weak-50 text-xs font-semibold text-text-sub-600">
                        {initials ?? <User className="h-4 w-4 text-text-soft-400" />}
                    </div>
                </div>
            </div>
        </div>
    );
}
