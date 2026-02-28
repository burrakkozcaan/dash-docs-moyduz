"use client";

import { useState } from "react";
import { format } from "date-fns";
import * as Drawer from "@repo/ui/new-ui/drawer";
import {
    RiSpeedLine,
    RiCheckboxCircleLine,
    RiTimeLine,
    RiExternalLinkLine,
    RiUserLine,
    RiArrowRightLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
} from "@remixicon/react";
import { cn } from "@/utils/cn";
import * as Button from "@repo/ui/new-ui/button";
import type { Project } from "@/components/addons/ProjectCard";

// ─── Gradient slides per project (3 slides each) ────────────────────────────

function getSlides(project: Project) {
    const gradients = [
        ["from-violet-500 to-indigo-600", "from-indigo-400 to-blue-600", "from-blue-400 to-cyan-500"],
        ["from-orange-500 to-rose-600", "from-rose-500 to-pink-600", "from-pink-400 to-red-500"],
        ["from-emerald-500 to-teal-600", "from-teal-400 to-cyan-600", "from-cyan-500 to-blue-500"],
        ["from-amber-500 to-orange-600", "from-orange-400 to-red-500", "from-yellow-400 to-amber-600"],
        ["from-blue-500 to-indigo-600", "from-indigo-500 to-violet-600", "from-violet-400 to-purple-600"],
        ["from-slate-600 to-zinc-700", "from-zinc-500 to-gray-700", "from-gray-500 to-slate-700"],
    ];

    const idx = parseInt(project.id, 10) - 1;
    const set = (gradients[idx % gradients.length] ?? gradients[0])!;
    const g = [
        set[0] ?? "from-violet-500 to-indigo-600",
        set[1] ?? "from-indigo-400 to-blue-600",
        set[2] ?? "from-blue-400 to-cyan-500",
    ];

    return [
        { gradient: g[0], label: "Genel Bakış" },
        { gradient: g[1], label: "İlerleme" },
        { gradient: g[2], label: "Detay" },
    ];
}

// ─── Status config ─────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: Project["status"] }) {
    const config = {
        active: { label: "Aktif", cls: "bg-teal-50 text-teal-700", dot: "bg-teal-600" },
        planned: { label: "Planlı", cls: "bg-zinc-50 text-zinc-700", dot: "bg-zinc-600" },
        backlog: { label: "Beklemede", cls: "bg-orange-50 text-orange-700", dot: "bg-orange-600" },
        completed: { label: "Tamamlandı", cls: "bg-blue-50 text-blue-700", dot: "bg-blue-600" },
        cancelled: { label: "İptal", cls: "bg-rose-50 text-rose-700", dot: "bg-rose-600" },
    }[status] ?? { label: status, cls: "bg-zinc-50 text-zinc-600", dot: "bg-zinc-400" };

    return (
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", config.cls)}>
            <span className={cn("size-1.5 rounded-full", config.dot)} />
            {config.label}
        </span>
    );
}

// ─── Image Carousel ────────────────────────────────────────────────────────────

function ImageCarousel({ project }: { project: Project }) {
    const slides = getSlides(project);
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);

    return (
        <div className="relative overflow-hidden rounded-2xl bg-bg-weak-50">
            {/* Slide */}
            <div className="relative" style={{ aspectRatio: "16/9" }}>
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                            slide.gradient,
                            i === current ? "opacity-100" : "opacity-0 pointer-events-none",
                        )}
                    >
                        {/* Faux page skeleton */}
                        <div className="absolute inset-0 flex flex-col gap-3 p-8 opacity-25">
                            <div className="h-5 w-1/2 rounded-full bg-white" />
                            <div className="h-3 w-1/3 rounded-full bg-white" />
                            <div className="mt-4 grid grid-cols-3 gap-3">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="h-24 rounded-2xl bg-white/30" />
                                ))}
                            </div>
                            <div className="h-3 w-2/3 rounded-full bg-white" />
                            <div className="h-3 w-1/2 rounded-full bg-white" />
                        </div>

                        {/* Slide label */}
                        <div className="absolute bottom-4 left-4 rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {slide.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                <button
                    type="button"
                    onClick={prev}
                    className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-bg-white-0/80 shadow-regular-xs backdrop-blur-sm transition hover:bg-bg-white-0"
                >
                    <RiArrowLeftSLine className="size-4 text-text-strong-950" />
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="pointer-events-auto flex size-8 items-center justify-center rounded-full bg-bg-white-0/80 shadow-regular-xs backdrop-blur-sm transition hover:bg-bg-white-0"
                >
                    <RiArrowRightSLine className="size-4 text-text-strong-950" />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i)}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-200",
                            i === current
                                ? "w-6 bg-white shadow-sm"
                                : "w-1.5 bg-white/40",
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Feature item ──────────────────────────────────────────────────────────────

function FeatureBar({ project }: { project: Project }) {
    const done = project.tasks.filter((t) => t.status === "done").length;
    const overdue = project.tasks.filter(
        (t) => t.status !== "done" && new Date(t.endDate) < new Date(),
    ).length;

    const features = [
        {
            icon: RiCheckboxCircleLine,
            title: `${done}/${project.tasks.length} Görev Tamamlandı`,
            sub: "Tamamlanan görevler",
            color: "text-teal-600",
        },
        {
            icon: RiSpeedLine,
            title: `%${project.progress} İlerleme`,
            sub: "Genel proje ilerlemesi",
            color: "text-primary-base",
        },
        {
            icon: RiTimeLine,
            title: overdue > 0 ? `${overdue} Geciken Görev` : "Geciken Yok",
            sub: "Takvim durumu",
            color: overdue > 0 ? "text-rose-500" : "text-teal-600",
        },
    ];

    return (
        <div className="relative grid grid-cols-3 divide-x divide-stroke-soft-200 rounded-2xl border border-stroke-soft-200 bg-bg-white-0">
            {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4">
                    <f.icon className={cn("mt-0.5 size-5 shrink-0", f.color)} />
                    <div>
                        <div className="text-label-sm font-semibold text-text-strong-950">{f.title}</div>
                        <div className="mt-0.5 text-paragraph-xs text-text-sub-600">{f.sub}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── DashedSep ─────────────────────────────────────────────────────────────────

function DashedSep() {
    return (
        <div
            className="h-px w-full opacity-70"
            style={{
                background:
                    "linear-gradient(90deg, var(--color-stroke-soft-200) 4px, transparent 4px) 50% 50% / 10px 1px repeat",
            }}
        />
    );
}

// ─── Task Status Badge ─────────────────────────────────────────────────────────

function TaskStatusBadge({ status }: { status: "todo" | "in-progress" | "done" }) {
    const cfg = {
        done: { label: "Tamamlandı", cls: "bg-teal-50 text-teal-700" },
        "in-progress": { label: "Devam Ediyor", cls: "bg-amber-50 text-amber-700" },
        todo: { label: "Yapılacak", cls: "bg-zinc-100 text-zinc-600" },
    }[status];

    return (
        <span className={cn("rounded-md px-1.5 py-0.5 text-[11px] font-medium", cfg.cls)}>
            {cfg.label}
        </span>
    );
}

// ─── ProjectDetailDrawer ───────────────────────────────────────────────────────

interface ProjectDetailDrawerProps {
    project: Project | null;
    onClose: () => void;
}

export function ProjectDetailDrawer({ project, onClose }: ProjectDetailDrawerProps) {
    const isOpen = !!project;

    const totalTasks = project?.tasks.length ?? 0;
    const doneTasks = project?.tasks.filter((t) => t.status === "done").length ?? 0;

    return (
        <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Drawer.Content
                className="absolute inset-y-0 mr-2 my-2 max-h-[calc(100%-16px)] w-[min(1080px,calc(100%-8px))] max-w-none rounded-20 shadow-custom-md"
            >
                <Drawer.Header className="flex items-start gap-2 border-b">
                    <Drawer.Title className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            {project && <StatusPill status={project.status} />}
                            {project?.client && (
                                <span className="text-label-sm text-text-sub-600">{project.client}</span>
                            )}
                        </div>
                        {project && (
                            <div className="text-paragraph-sm text-text-sub-600">{project.name}</div>
                        )}
                    </Drawer.Title>
                </Drawer.Header>

                <Drawer.Body className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
                    {/* Main column */}
                    {project && (
                        <div className="flex-1 space-y-6 p-6 lg:max-w-[680px]">
                            {/* Title + meta */}
                            <div>
                                <h1 className="text-[28px] font-semibold leading-tight text-text-strong-950">
                                    {project.name}
                                </h1>
                                <div className="mt-2 flex flex-wrap items-center gap-3 text-label-sm text-text-sub-600">
                                    {project.typeLabel && (
                                        <span className="inline-flex items-center gap-1">
                                            <RiSpeedLine className="size-4 text-text-soft-400" />
                                            {project.typeLabel}
                                        </span>
                                    )}
                                    {project.durationLabel && project.durationLabel !== "—" && (
                                        <>
                                            <span className="text-text-soft-400">·</span>
                                            <span>{project.durationLabel}</span>
                                        </>
                                    )}
                                    {project.members[0] && (
                                        <>
                                            <span className="text-text-soft-400">·</span>
                                            <span className="inline-flex items-center gap-1">
                                                <RiUserLine className="size-4 text-text-soft-400" />
                                                {project.members[0]}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Image carousel */}
                            <ImageCarousel project={project} />

                            {/* Feature bar */}
                            <FeatureBar project={project} />

                            {/* What's included */}
                            <div>
                                <h2 className="text-[22px] font-semibold text-text-strong-950">
                                    Neler Dahil?
                                </h2>

                                <div className="mt-4 flex flex-col gap-5 text-paragraph-sm text-text-sub-600">
                                    <p>
                                        Bu proje, <strong className="text-text-strong-950">{project.name}</strong> kapsamında
                                        planlanmış ve {totalTasks} görev içermektedir. {doneTasks} görev tamamlanmış olup
                                        proje ilerlemesi %{project.progress} seviyesindedir.
                                    </p>

                                    <DashedSep />

                                    {project.tags.length > 0 && (
                                        <>
                                            <p>
                                                <strong className="text-text-strong-950">Etiketler</strong> — Bu proje{" "}
                                                {project.tags.join(", ")} konularını kapsamaktadır.
                                            </p>
                                            <DashedSep />
                                        </>
                                    )}

                                    <p>
                                        <strong className="text-text-strong-950">Proje Yönetimi</strong> — Görevler,
                                        atamalar ve süreç takibi detaylarıyla aşağıda listelenmektedir.
                                    </p>

                                    <DashedSep />

                                    <p>
                                        <strong className="text-text-strong-950">Öncelik</strong> — Proje önceliği{" "}
                                        <span className="font-medium text-text-strong-950">
                                            {({ urgent: "Acil", high: "Yüksek", medium: "Orta", low: "Düşük" } as const)[project.priority]}
                                        </span>{" "}
                                        olarak belirlenmiştir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Right sidebar */}
                    {project && (
                        <div className="flex shrink-0 flex-col gap-5 border-t border-stroke-soft-200 bg-bg-white-0 p-6 lg:w-[320px] lg:border-l lg:border-t-0">

                            {/* Dates */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-label-xs text-text-sub-600">Başlangıç</span>
                                    <span className="text-label-sm text-text-strong-950">{format(project.startDate, "d MMM yyyy")}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-label-xs text-text-sub-600">Bitiş</span>
                                    <span className="text-label-sm text-text-strong-950">{format(project.endDate, "d MMM yyyy")}</span>
                                </div>
                            </div>

                            <DashedSep />

                            {/* Progress bar */}
                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="text-label-xs text-text-sub-600">İlerleme</span>
                                    <span className="text-label-sm font-semibold text-text-strong-950">%{project.progress}</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-soft-200">
                                    <div
                                        className="h-full rounded-full bg-primary-base transition-all duration-500"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                            </div>

                            <DashedSep />

                            {/* Tasks list */}
                            <div>
                                <div className="mb-3 text-label-xs text-text-sub-600">
                                    Görevler ({doneTasks}/{totalTasks})
                                </div>
                                <div className="flex flex-col gap-2">
                                    {project.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-start justify-between gap-2 rounded-xl border border-stroke-soft-200 bg-bg-weak-50 p-3"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className={cn(
                                                    "text-label-xs font-medium truncate",
                                                    task.status === "done" ? "text-text-sub-600 line-through" : "text-text-strong-950",
                                                )}>
                                                    {task.name}
                                                </p>
                                                <p className="mt-0.5 text-[11px] text-text-soft-400">{task.assignee}</p>
                                            </div>
                                            <TaskStatusBadge status={task.status} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <DashedSep />

                            {/* Members */}
                            {project.members.length > 0 && (
                                <>
                                    <div>
                                        <div className="mb-2 text-label-xs text-text-sub-600">Ekip</div>
                                        <div className="flex flex-col gap-2">
                                            {project.members.map((member) => (
                                                <div key={member} className="flex items-center gap-2">
                                                    <div className="flex size-7 items-center justify-center rounded-full bg-primary-base/10 text-[11px] font-semibold text-primary-base">
                                                        {member.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <span className="text-label-xs text-text-strong-950">{member}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <DashedSep />
                                </>
                            )}

                            {/* Action buttons */}
                            <div className="flex flex-col gap-3">
                                <Button.Root
                                    variant="neutral"
                                    mode="stroke"
                                    size="small"
                                    className="w-full justify-center"
                                >
                                    <Button.Icon as={RiExternalLinkLine} />
                                    Detayları Gör
                                </Button.Root>
                                <Button.Root
                                    variant="primary"
                                    mode="filled"
                                    size="small"
                                    className="w-full justify-center text-white"
                                >
                                    <Button.Icon as={RiArrowRightLine} />
                                    Projeye Git
                                </Button.Root>
                            </div>
                        </div>
                    )}
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    );
}
