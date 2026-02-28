"use client";

import { type Site } from "@/lib/data/sites";
import { SiteStatusTimeline } from "@/components/sites/SiteStatusTimeline";
import { STATUS_STEPS } from "@/lib/data/sites";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

interface SiteWorkstreamTabProps {
  site: Site;
}

export function SiteWorkstreamTab({ site }: SiteWorkstreamTabProps) {
  const defaultOpen = STATUS_STEPS[0]?.key ?? "scan";

  return (
    <section className="rounded-2xl border border-border bg-muted/50 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <h2 className="flex-1 min-w-0 truncate text-sm font-semibold tracking-normal text-foreground uppercase">
          İş akışı aşamaları
        </h2>
      </div>

      <div className="px-1">
        <Accordion type="single" defaultValue={defaultOpen} collapsible>
          {STATUS_STEPS.map((step) => {
            const isActive = site.status === step.key;
            const stepIndex = STATUS_STEPS.findIndex((s) => s.key === step.key);
            const isPast = stepIndex < STATUS_STEPS.findIndex((s) => s.key === site.status);

            return (
              <AccordionItem
                key={step.key}
                value={step.key}
                className="mb-2 overflow-hidden rounded-xl border border-border bg-background last:mb-0"
              >
                <AccordionTrigger className="bg-background hover:no-underline px-4">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-xs font-medium ${
                          isActive ? "text-primary" : isPast ? "text-muted-foreground" : "text-muted-foreground/70"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t border-border bg-background/60 px-4 py-3">
                  {step.key === site.status ? (
                    <div className="py-2">
                      <p className="text-sm text-muted-foreground mb-3">Mevcut aşama</p>
                      <SiteStatusTimeline status={site.status} />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground py-2">
                      {isPast ? "Tamamlandı" : "Henüz başlamadı"}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
