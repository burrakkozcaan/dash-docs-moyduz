"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/use-auth";
import {
  buildVerifyEmailRedirect,
  getPostAuthDestination,
  hasCompletedOnboarding,
  hasVerifiedEmail,
} from "@/lib/auth-redirects";
import { routes } from "@/lib/routes";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    const params = searchParams.toString();
    const currentPath = `${pathname}${params ? `?${params}` : ""}`;

    if (!user) {
      router.replace(routes.loginWithRedirect(currentPath));

      return;
    }

    if (!hasVerifiedEmail(user)) {
      router.replace(
        buildVerifyEmailRedirect(getPostAuthDestination(user, currentPath))
      );

      return;
    }

    if (!hasCompletedOnboarding(user)) {
      router.replace(routes.onboarding.scan());
    }
  }, [loading, pathname, router, searchParams, user]);

  if (loading || !user || !hasVerifiedEmail(user) || !hasCompletedOnboarding(user)) {
    return null;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset className="mx-2 my-2 min-w-0 rounded-lg border border-border bg-background !shadow-none">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
