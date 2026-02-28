"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiSparklingLine,
    RiExternalLinkLine,
    RiPagesLine,
    RiPriceTag3Line,
} from "@remixicon/react";
import { cn } from "@/utils/cn";
import * as Button from "@repo/ui/new-ui/button";
import * as Drawer from "@repo/ui/new-ui/drawer";
import type { Template } from "@/lib/data/templates";

// ─── Image Carousel ────────────────────────────────────────────────────────────

function ImageCarousel({ template }: { template: Template }) {
    const [current, setCurrent] = useState(0);

    // 3 gradient slides per template
    const slides = [
        { label: "Ana Sayfa", skeleton: [4, 2, 3] },
        { label: "Ürün / İçerik", skeleton: [3, 4, 2] },
        { label: "İletişim", skeleton: [2, 3, 4] },
    ];

    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);

    return (
        <div className="relative overflow-hidden rounded-2xl bg-bg-weak-50">
            <div className="relative" style={{ aspectRatio: "16/9" }}>
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                            template.gradient,
                            i === current ? "opacity-100" : "opacity-0 pointer-events-none",
                        )}
                    >
                        {/* Faux browser chrome */}
                        <div className="absolute inset-0 flex flex-col">
                            <div className="flex items-center gap-1 bg-white/10 px-4 py-2 backdrop-blur-sm">
                                <span className="size-2 rounded-full bg-white/40" />
                                <span className="size-2 rounded-full bg-white/40" />
                                <span className="size-2 rounded-full bg-white/40" />
                                <div className="ml-2 flex-1 rounded-full bg-white/20 py-0.5 text-[10px] text-white/60">
                                    {template.demoUrl}
                                </div>
                            </div>
                            {/* Skeleton content */}
                            <div className="flex flex-1 flex-col gap-2 p-6 opacity-20">
                                <div className="h-6 w-1/2 rounded-full bg-white" />
                                <div className="h-3 w-1/3 rounded-full bg-white" />
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {[...Array(slide.skeleton[0] ?? 3)].map((_, j) => (
                                        <div key={j} className="h-16 rounded-xl bg-white/30" />
                                    ))}
                                </div>
                                <div className="h-3 w-2/3 rounded-full bg-white" />
                                <div className="h-3 w-1/2 rounded-full bg-white" />
                            </div>
                        </div>

                        {/* Slide label */}
                        <div className="absolute bottom-4 left-4 rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {slide.label}
                        </div>

                        {/* Category pill */}
                        <div className="absolute right-4 top-[42px] rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                            {template.category}
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrows */}
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
                            i === current ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/40",
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Feature bar ───────────────────────────────────────────────────────────────

function FeatureBar({ template }: { template: Template }) {
    const features = [
        {
            icon: RiPagesLine,
            title: `${template.pages.length} Sayfa`,
            sub: "Hazır sayfa şablonu",
            color: "text-primary-base",
        },
        {
            icon: RiPriceTag3Line,
            title: `${template.tags.length} Özellik`,
            sub: "Dahil bileşenler",
            color: "text-violet-600",
        },
        {
            icon: RiSparklingLine,
            title: template.category,
            sub: "Şablon kategorisi",
            color: "text-amber-500",
        },
    ];

    return (
        <div className="grid grid-cols-3 divide-x divide-stroke-soft-200 rounded-2xl border border-stroke-soft-200 bg-bg-white-0">
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

// ─── TemplateDetailDrawer ─────────────────────────────────────────────────────

interface TemplateDetailDrawerProps {
    template: Template | null;
    onClose: () => void;
}

export function TemplateDetailDrawer({ template, onClose }: TemplateDetailDrawerProps) {
    const router = useRouter();
    const isOpen = !!template;

    if (!template) return null;

    const handleStart = () => {
        router.push(`/dashboard/sites/new?template=${template.slug}`);
    };

    return (
        <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Drawer.Content
                className="absolute inset-y-0 mr-2 my-2 max-h-[calc(100%-16px)] w-[min(1080px,calc(100%-8px))] max-w-none rounded-20 shadow-custom-md"
            >
                <Drawer.Header className="justify-between border-b">
                    <Drawer.Title className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-bg-weak-50 px-2.5 py-0.5 text-xs font-medium text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200">
                            {template.category}
                        </span>
                    </Drawer.Title>
                </Drawer.Header>

                <Drawer.Body className="flex flex-1 flex-col overflow-y-auto lg:flex-row">
                    {/* Main column */}
                    <div className="flex-1 space-y-6 p-6 lg:max-w-[560px]">
                        {/* Title + description */}
                        <div>
                            <h1 className="text-[28px] font-semibold leading-tight text-text-strong-950">
                                {template.title}
                            </h1>
                            <p className="mt-3 text-paragraph-sm text-text-sub-600 leading-relaxed">
                                {template.description}
                            </p>
                        </div>

                        {/* Carousel */}
                        <ImageCarousel template={template} />

                        {/* Feature bar */}
                        <FeatureBar template={template} />

                        {/* What's included */}
                        <div>
                            <h2 className="text-[22px] font-semibold text-text-strong-950">
                                Neler Dahil?
                            </h2>
                            <div className="mt-4 flex flex-col gap-5 text-paragraph-sm text-text-sub-600">
                                <p>
                                    <strong className="text-text-strong-950">{template.title}</strong>, <strong className="text-text-strong-950">{template.category}</strong> sektörüne
                                    özel hazırlanmış, {template.pages.length} sayfa içeren tam kapsamlı bir web sitesi şablonudur.
                                </p>
                                <DashedSep />
                                <p>
                                    <strong className="text-text-strong-950">Dahil Sayfalar</strong> — {template.pages.join(", ")} sayfaları hazır olarak
                                    gelir. Her sayfa modern tasarım anlayışıyla oluşturulmuş bileşenler içermektedir.
                                </p>
                                <DashedSep />
                                <p>
                                    <strong className="text-text-strong-950">Özellikler</strong> — {template.tags.join(", ")} gibi temel işlevler
                                    şablonda hazır olarak sunulmaktadır.
                                </p>
                                <DashedSep />
                                <p>
                                    <strong className="text-text-strong-950">Canlı Demo</strong> — Şablonu satın almadan önce{" "}
                                    <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-base underline-offset-2 hover:underline">
                                        demo bağlantısından
                                    </a>{" "}
                                    inceleyebilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="flex shrink-0 flex-col gap-5 border-t border-stroke-soft-200 bg-bg-white-0 p-6 lg:w-[300px] lg:border-l lg:border-t-0">

                        {/* Pages list */}
                        <div>
                            <div className="mb-3 text-label-xs text-text-sub-600">
                                Dahil Sayfalar ({template.pages.length})
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {template.pages.map((page) => (
                                    <span
                                        key={page}
                                        className="inline-flex items-center rounded-lg bg-bg-weak-50 px-2.5 py-1 text-label-xs text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200"
                                    >
                                        {page}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <DashedSep />

                        {/* Tags */}
                        <div>
                            <div className="mb-3 text-label-xs text-text-sub-600">Özellikler</div>
                            <div className="flex flex-wrap gap-2">
                                {template.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full bg-bg-weak-50 px-2.5 py-0.5 text-[11px] text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <DashedSep />

                        {/* Gradient preview swatch */}
                        <div>
                            <div className="mb-3 text-label-xs text-text-sub-600">Renk Teması</div>
                            <div className={cn("h-12 w-full rounded-xl bg-gradient-to-r", template.gradient)} />
                        </div>

                        <DashedSep />

                        {/* Action buttons */}
                        <div className="flex flex-col gap-3">
                            <Button.Root
                                variant="neutral"
                                mode="stroke"
                                size="small"
                                className="w-full justify-center"
                                onClick={() => window.open(template.demoUrl, "_blank")}
                            >
                                <Button.Icon as={RiExternalLinkLine} />
                                Canlı Demo
                            </Button.Root>
                            <Button.Root
                                variant="primary"
                                mode="filled"
                                size="small"
                                className="w-full justify-center text-white"
                                onClick={handleStart}
                            >
                                <Button.Icon as={RiSparklingLine} />
                                Bu Şablonla Başla
                            </Button.Root>
                        </div>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    );
}
