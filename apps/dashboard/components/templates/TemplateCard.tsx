"use client";

import { useRouter } from "next/navigation";
import { type Template } from "@/lib/data/templates";
import {
  RiExternalLinkLine,
  RiSparklingLine,
  RiPagesLine,
} from "@remixicon/react";
import * as Button from "@repo/ui/new-ui/button";
import { cn } from "@/utils/cn";

interface TemplateCardProps {
  template: Template;
  onSelect?: (t: Template) => void;
}

// Browser chrome mockup wrapping the gradient preview
function TemplatePreview({ template }: { template: Template }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-bg-weak-50">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 bg-bg-soft-200 px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/70" />
        <span className="size-2 rounded-full bg-amber-400/70" />
        <span className="size-2 rounded-full bg-green-400/70" />
        <div className="ml-2 flex-1 rounded-full bg-bg-weak-50 px-2 py-0.5 text-[10px] text-text-soft-400 truncate">
          demo.moyduz.com/{template.slug}
        </div>
      </div>

      {/* Gradient preview area */}
      <div
        className={cn(
          "relative h-[160px] w-full bg-gradient-to-br",
          template.gradient,
        )}
      >
        {/* Faux page skeleton overlay */}
        <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-30">
          <div className="h-4 w-3/4 rounded-full bg-white/50" />
          <div className="h-3 w-1/2 rounded-full bg-white/40" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-white/20" />
            ))}
          </div>
          <div className="h-3 w-2/3 rounded-full bg-white/30" />
        </div>

        {/* Category pill */}
        <div className="absolute left-3 top-3 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {template.category}
        </div>

        {/* Page count */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm">
          <RiPagesLine className="size-3" />
          {template.pages.length} sayfa
        </div>
      </div>
    </div>
  );
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const router = useRouter();

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/dashboard/sites/new?template=${template.slug}`);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(template.demoUrl, "_blank");
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(template);
    } else {
      router.push(`/dashboard/templates/${template.id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Şablon: ${template.title}`}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="overflow-hidden rounded-2xl border border-stroke-soft-200 bg-bg-white-0 transition-shadow duration-200 hover:shadow-lg/5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base"
    >
      {/* Preview area */}
      <TemplatePreview template={template} />

      {/* Info */}
      <div className="p-4">
        <p className="text-label-sm font-semibold text-text-strong-950 line-clamp-1">
          {template.title}
        </p>
        <p className="mt-1 text-paragraph-xs text-text-sub-600 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Tags */}
        {template.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-bg-weak-50 px-2 py-0.5 text-[11px] text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-stroke-soft-200" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button.Root
            variant="primary"
            mode="filled"
            size="xsmall"
            className="flex-1"
            onClick={handleStart}
          >
            <Button.Icon as={RiSparklingLine} />
            Bu şablonla başla
          </Button.Root>
          <Button.Root
            variant="neutral"
            mode="stroke"
            size="xsmall"
            onClick={handlePreview}
          >
            <Button.Icon as={RiExternalLinkLine} />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
