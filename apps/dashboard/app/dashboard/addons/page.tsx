"use client";

import { useState } from "react";
import {
  RiSearchLine,
  RiAddLine,
  RiLayoutGridLine,
  RiArrowDownSLine,
} from "@remixicon/react";
import { ProjectCard } from "@/components/addons/ProjectCard";
import { ProjectDetailDrawer } from "@/components/addons/ProjectDetailDrawer";
import { MOCK_PROJECTS } from "@/lib/data/addons-projects";
import * as Button from "@repo/ui/new-ui/button";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { cn } from "@/utils/cn";
import type { Project, ProjectStatus } from "@/components/addons/ProjectCard";

const STATUS_FILTERS: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "Tümü", value: "all" },
  { label: "Aktif", value: "active" },
  { label: "Planlı", value: "planned" },
  { label: "Beklemede", value: "backlog" },
  { label: "Tamamlandı", value: "completed" },
  { label: "İptal", value: "cancelled" },
];

export function AddonsContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="px-4 pb-6 lg:px-8">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 py-6 md:flex-row">
          {/* Search */}
          <div className="group relative flex flex-1 overflow-hidden rounded-10 bg-bg-white-0 text-text-strong-950 shadow-regular-xs transition duration-200 ease-out before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-inset before:ring-stroke-soft-200 before:transition before:duration-200 before:ease-out hover:shadow-none has-[input:focus]:shadow-button-important-focus has-[input:focus]:before:ring-stroke-strong-950">
            <label className="flex w-full cursor-text items-center gap-2 px-2.5">
              <RiSearchLine className="size-5 shrink-0 text-text-sub-600 group-has-[:placeholder-shown]:text-text-soft-400" />
              <input
                type="text"
                placeholder="Proje ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full bg-transparent text-paragraph-sm text-text-strong-950 outline-none placeholder:text-text-soft-400 focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 sm:flex-nowrap">
            <button
              type="button"
              className="group relative inline-flex h-9 items-center justify-center gap-3 whitespace-nowrap rounded-10 bg-bg-white-0 px-3 text-label-sm text-text-sub-600 shadow-regular-xs outline-none ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus:outline-none focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950"
            >
              <RiLayoutGridLine className="-mx-0.5 size-5" />
              Grid
              <RiArrowDownSLine className="-mx-1 size-5" />
            </button>

            <Button.Root variant="primary" mode="filled" size="small" className="h-9 text-white">
              <Button.Icon as={RiAddLine} />
              Yeni Proje
            </Button.Root>
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={cn(
                "inline-flex h-7 items-center rounded-full px-3 text-label-xs transition duration-200 ease-out",
                statusFilter === f.value
                  ? "bg-bg-strong-950 text-text-white-0"
                  : "bg-bg-weak-50 text-text-sub-600 hover:bg-bg-soft-200 hover:text-text-strong-950",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <p className="text-paragraph-sm text-text-sub-600">
              {search ? "Arama sonucu bulunamadı." : "Henüz bir proje yok."}
            </p>
            {!search && (
              <Button.Root variant="primary" mode="filled" size="small" className="text-white">
                <Button.Icon as={RiAddLine} />
                İlk Projenizi Oluşturun
              </Button.Root>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectDetailDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default function AddonsPage() {
  return (
    <div className="flex flex-1 flex-col min-w-0">
      <header className="sticky top-0 z-10 bg-background flex h-12 shrink-0 items-center gap-2 border-b border-border/60 px-4">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <div className="mx-2 h-4 w-px bg-border" />
        <p className="text-base font-medium">Addons</p>
      </header>
      <AddonsContent />
    </div>
  );
}
