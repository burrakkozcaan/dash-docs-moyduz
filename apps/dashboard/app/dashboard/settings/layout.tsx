"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { cn } from "@repo/ui/lib/utils";
import { IconUser, IconUsers, IconPlug } from "@tabler/icons-react";

const TABS = [
  { href: "/dashboard/settings/profile", label: "Profil", icon: IconUser },
  { href: "/dashboard/settings/team", label: "Ekip", icon: IconUsers },
  { href: "/dashboard/settings/integrations", label: "Entegrasyonlar", icon: IconPlug },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <DashboardShell title="Ayarlar">
      <div className="flex flex-col gap-4 p-4 lg:p-6">
        <nav className="flex gap-1 border-b border-border pb-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </DashboardShell>
  );
}
