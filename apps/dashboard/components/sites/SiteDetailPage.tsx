"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { Button } from "@repo/ui/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { SiteStatusBadge } from "@/components/sites/SiteStatusBadge";
import { SiteStatusTimeline } from "@/components/sites/SiteStatusTimeline";
import { SiteMetaPanel } from "@/components/sites/SiteMetaPanel";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteOverviewTab } from "@/components/sites/tabs/SiteOverviewTab";
import { SiteBriefTab } from "@/components/sites/tabs/SiteBriefTab";
import { SiteDeliverablesTab } from "@/components/sites/tabs/SiteDeliverablesTab";
import { SiteUpdatesTab } from "@/components/sites/tabs/SiteUpdatesTab";
import { SiteRequestsTab } from "@/components/sites/tabs/SiteRequestsTab";
import { SiteNotesTab } from "@/components/sites/tabs/SiteNotesTab";
import { SiteAddonsTab } from "@/components/sites/tabs/SiteAddonsTab";
import { SiteToolsTab } from "@/components/sites/tabs/SiteToolsTab";
import { SiteWorkstreamTab } from "@/components/sites/tabs/SiteWorkstreamTab";
import { MOCK_SITES } from "@/lib/data/sites";
import {
  IconChevronRight,
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarRightExpand,
  IconLink,
} from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

interface SiteDetailPageProps {
  siteId: string;
}

export function SiteDetailPage({ siteId }: SiteDetailPageProps) {
  const site = MOCK_SITES.find((s) => s.id === siteId);
  const [metaPanelOpen, setMetaPanelOpen] = useState(true);

  const copyLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* noop */
    }
  }, []);

  if (!site) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <p className="text-muted-foreground">Site bulunamadı.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/sites">Sitelere Dön</Link>
        </Button>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Siteler", href: "/dashboard/sites" },
    { label: site.name },
  ];

  return (
    <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden">
      {/* Top bar - referans: border yok */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground" />
          <div className="hidden sm:block">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Linki kopyala"
            onClick={copyLink}
          >
            <IconLink className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(metaPanelOpen && "bg-muted")}
            aria-pressed={!metaPanelOpen}
            aria-label={metaPanelOpen ? "Paneli kapat" : "Paneli aç"}
            onClick={() => setMetaPanelOpen((v) => !v)}
          >
            {metaPanelOpen ? (
              <IconLayoutSidebarRightCollapse className="h-4 w-4" />
            ) : (
              <IconLayoutSidebarRightExpand className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-background px-2 my-0 rounded-b-lg min-w-0 border-t overflow-auto">
        <div className="px-4">
          <div className="mx-auto w-full max-w-7xl">
            <div
              className={cn(
                "mt-0 grid grid-cols-1 gap-6 pt-4",
                metaPanelOpen ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,320px)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0px)]",
              )}
            >
              <div className="space-y-6 pt-4">
                {/* Site header: referans ProjectHeader benzeri */}
                <section className="space-y-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl font-semibold text-foreground leading-tight">
                        {site.name}
                      </h1>
                      <SiteStatusBadge status={site.status} />
                      {site.template && (
                        <span className="text-sm text-muted-foreground">
                          {site.template.name} · {site.template.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                    {site.orderId && (
                      <span className="rounded-md bg-muted px-2 py-0.5 font-medium">#{site.orderId}</span>
                    )}
                    {site.packageName && (
                      <span className="rounded-md bg-muted px-2 py-0.5 font-medium">
                        {site.packageName}
                      </span>
                    )}
                  </div>
                </section>

                {/* Tabs: referans gibi */}
                <Tabs defaultValue="overview">
                  <TabsList variant="line" className="w-full gap-6 border-b border-border">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="workstream">Workstream</TabsTrigger>
                    <TabsTrigger value="tasks">Talepler</TabsTrigger>
                    <TabsTrigger value="notes">Notlar</TabsTrigger>
                    <TabsTrigger value="assets">Teslimatlar</TabsTrigger>
                    <TabsTrigger value="updates">Güncellemeler</TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                    <TabsContent value="overview">
                      <SiteOverviewTab site={site} />
                    </TabsContent>
                    <TabsContent value="workstream">
                      <SiteWorkstreamTab site={site} />
                    </TabsContent>
                    <TabsContent value="tasks">
                      <SiteRequestsTab siteId={site.id} />
                    </TabsContent>
                    <TabsContent value="notes">
                      <SiteNotesTab />
                    </TabsContent>
                    <TabsContent value="assets">
                      <SiteDeliverablesTab site={site} />
                    </TabsContent>
                    <TabsContent value="updates">
                      <SiteUpdatesTab site={site} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              <AnimatePresence initial={false}>
                {metaPanelOpen && (
                  <motion.div
                    key="meta-panel"
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    className="lg:border-l lg:border-border lg:pl-6"
                  >
                    <SiteMetaPanel site={site} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
