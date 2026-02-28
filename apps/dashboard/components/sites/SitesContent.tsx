"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  RiSearchLine,
  RiLayoutGridLine,
  RiListCheck,
  RiArrowDownSLine,
  RiEqualizerLine,
  RiAddLine,
  RiGlobalLine,
} from "@remixicon/react";
import { MOCK_SITES } from "@/lib/data/sites";
import * as Button from "@repo/ui/new-ui/button";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { cn } from "@/utils/cn";

type ViewMode = "grid" | "list";

const STATUS_LABELS: Record<string, string> = {
  scan: "Taranıyor",
  brief: "Brifing",
  payment: "Ödeme Bekleniyor",
  production: "Üretimde",
  delivered: "Teslim Edildi",
  maintenance: "Bakımda",
};

export function SitesContent() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");

  const filtered = MOCK_SITES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* Sticky header with sidebar trigger */}
      <header className="sticky top-0 z-10 bg-background flex h-12 shrink-0 items-center gap-2 border-b border-border/60 px-4">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <div className="mx-2 h-4 w-px bg-border" />
        <p className="text-base font-medium">Sitelerim</p>
      </header>

      <div className="px-4 pb-6 lg:px-8">
        {/* Search + filter toolbar */}
        <div className="flex flex-col gap-3 py-6 md:flex-row">
          {/* Search input */}
          <div className="group relative flex flex-1 overflow-hidden rounded-10 bg-bg-white-0 text-text-strong-950 shadow-regular-xs transition duration-200 ease-out before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-inset before:ring-stroke-soft-200 before:transition before:duration-200 before:ease-out hover:shadow-none has-[input:focus]:shadow-button-important-focus has-[input:focus]:before:ring-stroke-strong-950">
            <label className="flex w-full cursor-text items-center gap-2 px-2.5">
              <RiSearchLine className="size-5 shrink-0 text-text-sub-600 group-has-[:placeholder-shown]:text-text-soft-400" />
              <input
                type="text"
                placeholder="Site ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full bg-transparent text-paragraph-sm text-text-strong-950 outline-none placeholder:text-text-soft-400 focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 sm:flex-nowrap">
            {/* Grid / List toggle */}
            <div className="flex h-9 items-center rounded-10 bg-bg-white-0 px-0.5 ring-1 ring-inset ring-stroke-soft-200">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex h-7 items-center px-2 text-text-sub-600 transition duration-200 ease-out",
                  viewMode === "grid" && "text-primary-base",
                )}
              >
                <RiLayoutGridLine className="size-5" />
              </button>
              <div className="relative h-4 w-0 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-stroke-soft-200" />
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex h-7 items-center px-2 text-text-sub-600 transition duration-200 ease-out",
                  viewMode === "list" && "text-primary-base",
                )}
              >
                <RiListCheck className="size-5" />
              </button>
            </div>

            {/* Date filter */}
            <button
              type="button"
              className="group relative inline-flex h-9 items-center justify-center gap-3 whitespace-nowrap rounded-10 bg-bg-white-0 px-3 text-label-sm text-text-sub-600 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus:outline-none focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950"
            >
              Son 30 gün
              <RiArrowDownSLine className="-mx-1 size-5" />
            </button>

            {/* Sort */}
            <button
              type="button"
              className="group relative inline-flex h-9 items-center justify-center gap-3 whitespace-nowrap rounded-10 bg-bg-white-0 px-3 text-label-sm text-text-sub-600 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus:outline-none focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950"
            >
              En Yeni
              <RiArrowDownSLine className="-mx-1 size-5" />
            </button>

            {/* Filter */}
            <button
              type="button"
              className="group relative inline-flex h-9 items-center justify-center gap-3 whitespace-nowrap rounded-10 bg-bg-white-0 px-3 text-label-sm text-text-sub-600 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus:outline-none focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950"
            >
              <RiEqualizerLine className="-mx-1 size-5" />
              Filtrele
            </button>

            {/* Add new site */}
            <Button.Root
              variant="primary"
              mode="filled"
              size="small"
              className="h-9 text-white"
              onClick={() => router.push("/dashboard/sites/new")}
            >
              <Button.Icon as={RiAddLine} />
              Yeni Site
            </Button.Root>
          </div>
        </div>

        {/* Cards — responsive grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <p className="text-paragraph-sm text-text-sub-600">
              {search ? "Arama sonucu bulunamadı." : "Henüz bir siteniz yok."}
            </p>
            {!search && (
              <Button.Root
                variant="primary"
                mode="filled"
                size="small"
                className="text-white"
                onClick={() => router.push("/dashboard/sites/new")}
              >
                <Button.Icon as={RiAddLine} />
                İlk Sitenizi Oluşturun
              </Button.Root>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((site) => {
              const statusLabel = STATUS_LABELS[site.status] ?? site.status;
              const percent = Math.max(0, Math.min(100, site.progress));
              const subtitle =
                site.domain ?? site.template?.name ?? site.template?.category ?? site.packageName;

              return (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => router.push(`/dashboard/sites/${site.id}`)}
                  className="flex h-full flex-col rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4 text-left shadow-none outline-none transition duration-200 ease-out hover:shadow-lg/5 focus-visible:ring-2 focus-visible:ring-primary-base"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-text-soft-400">
                      <div className="flex size-8 items-center justify-center rounded-full bg-bg-weak-50">
                        <RiGlobalLine className="size-4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-stroke-soft-200 bg-bg-weak-50 px-2 py-0.5 text-[11px] font-medium text-text-sub-600">
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Title + subtitle */}
                  <div className="mt-3 space-y-1">
                    <p className="truncate text-[15px] font-semibold leading-6 text-text-strong-950">
                      {site.name}
                    </p>
                    {subtitle && (
                      <p className="truncate text-[11px] text-text-sub-600">
                        {subtitle}
                      </p>
                    )}
                  </div>

                  {/* Progress */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-bg-soft-200">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-primary-base"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-text-soft-400">
                      {percent}%
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="mt-4 flex items-center justify-between text-[11px] text-text-soft-400">
                    <span className="truncate">
                      Paket:{" "}
                      <span className="font-medium text-text-sub-600">
                        {site.packageName}
                      </span>
                    </span>
                    {site.domain && (
                      <span className="ml-2 truncate text-right">
                        {site.domain}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
