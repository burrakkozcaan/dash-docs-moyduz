"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateDetailDrawer } from "@/components/templates/TemplateDetailDrawer";
import { MOCK_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/data/templates";
import type { Template } from "@/lib/data/templates";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { cn } from "@/utils/cn";
import { RiSearchLine } from "@remixicon/react";

// ── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  index,
  onSelect,
}: {
  template: Template;
  index: number;
  onSelect: (t: Template) => void;
}) {
  return (
    <div
      className="w-full max-w-md animate-rapid-b-item"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div className="group relative flex flex-col">
        {/* Preview image area */}
        <div className="relative mb-2 aspect-video">
          <button
            type="button"
            onClick={() => onSelect(template)}
            className="relative flex aspect-video w-full overflow-hidden rounded-xl bg-muted"
          >
            {/* Gradient preview */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br transition-opacity duration-150 ease-in-out group-hover:opacity-90",
                template.gradient,
              )}
            />
            {/* Mini website chrome overlay */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex items-center gap-1.5 px-3 pt-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <div className="ml-2 h-2 flex-1 max-w-20 rounded-full bg-white/20" />
              </div>
              <div className="flex flex-1 flex-col items-start justify-end p-4">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                  {template.category}
                </span>
                <span className="mt-0.5 text-sm font-semibold text-white drop-shadow">
                  {template.title}
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Info row */}
        <div className="flex justify-between">
          <button
            type="button"
            className="flex min-w-0 max-w-full flex-1"
            onClick={() => onSelect(template)}
          >
            <div className="flex min-w-0 max-w-full flex-1 flex-col overflow-hidden text-left">
              <span className="truncate font-normal text-foreground">
                {template.title}
              </span>
              <span className="truncate text-sm text-muted-foreground">
                {template.description.split(".")[0]}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function TemplatesContent() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filtered = MOCK_TEMPLATES.filter((t) => {
    const matchesCategory =
      activeCategory === "Tümü" || t.category === activeCategory;
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-1 flex-col min-w-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-background flex h-12 shrink-0 items-center gap-2 border-b border-border/60 px-4">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <div className="mx-2 h-4 w-px bg-border" />
        <p className="text-base font-medium">Şablonlar</p>
      </header>

      <div className="px-4 pb-10 lg:px-8">
        {/* Page intro */}
        <div className="mb-8 mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xl font-normal tracking-tight text-muted-foreground">
            Bir sonraki projenizi bir şablonla başlatın
          </p>
          {/* Search */}
          <div className="group relative flex w-full max-w-xs overflow-hidden rounded-lg bg-background text-foreground shadow-sm ring-1 ring-inset ring-border transition hover:ring-border/80 has-[input:focus]:ring-foreground/30">
            <label className="flex w-full cursor-text items-center gap-2 px-2.5 py-1.5">
              <RiSearchLine className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Şablon ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "inline-flex h-7 items-center rounded-full px-3 text-xs font-medium transition-colors duration-150",
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <p className="text-sm text-muted-foreground">
              {search
                ? `"${search}" için şablon bulunamadı.`
                : "Bu kategoride şablon bulunamadı."}
            </p>
          </div>
        ) : (
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] justify-items-center gap-5">
            {filtered.map((template, i) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={i}
                onSelect={setSelectedTemplate}
              />
            ))}
          </div>
        )}
      </div>

      <TemplateDetailDrawer
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </div>
  );
}
