"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site-header";

type DashboardShellProps = {
  title?: string;
  children: React.ReactNode;
};

/** Alt sayfalar için: başlık çubuğu + içerik. Sidebar dashboard layout’tan gelir. */
export function DashboardShell({ title, children }: DashboardShellProps) {
  return (
    <>
      <SiteHeader title={title} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          {children}
        </div>
      </div>
    </>
  );
}
