"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SettingsDialog } from "@/components/settings/SettingsDialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";
import { Input } from "@repo/ui/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { ProgressCircle } from "@/components/progress-circle";
import {
  IconChevronDown,
  IconCreditCard,
  IconDashboard,
  IconHelp,
  IconLanguage,
  IconListDetails,
  IconLogout,
  IconMessageCircle,
  IconMoon,
  IconSearch,
  IconSettings,
  IconShoppingBag,
  IconWorld,
} from "@tabler/icons-react";
import { MOCK_SITES } from "@/lib/data/sites";
import * as Dropdown from "@repo/ui/new-ui/dropdown";
import * as Switch from "@repo/ui/new-ui/switch";

const navItems: { id: string; label: string; href: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Genel Bakış", href: "/dashboard", icon: IconDashboard },
  { id: "sites", label: "Sitelerim", href: "/dashboard/sites", icon: IconWorld },
  { id: "marketplace", label: "Marketplace", href: "/dashboard/marketplace", icon: IconShoppingBag },
  { id: "orders", label: "Siparişler", href: "/dashboard/orders", icon: IconListDetails },
  { id: "billing", label: "Faturalandırma", href: "/dashboard/billing", icon: IconCreditCard },
  { id: "support", label: "Destek", href: "/dashboard/support", icon: IconMessageCircle },
];

const STATUS_COLORS: Record<string, string> = {
  scan: "var(--chart-3)",
  brief: "var(--chart-4)",
  payment: "var(--chart-5)",
  production: "var(--chart-1)",
  delivered: "var(--chart-2)",
  maintenance: "var(--chart-1)",
};

const user = {
  name: "Moyduz",
  email: "destek@moyduz.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r-0 border-none border-border/40 shadow-none"
      {...props}
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-primary text-primary-foreground">
              <Image src="/favicon.ico" alt="Logo" width={16} height={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-strong-950">Moyduz</span>
              <span className="text-xs text-sub-600">Dashboard</span>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md p-1 hover:bg-accent hover:text-strong-950"
            aria-label="Menü"
          >
            <IconChevronDown className="h-4 w-4 text-sub-600" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-0">
        <SidebarGroup>
          <div className="relative px-0 py-0">
            <IconSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soft-400" />
            <Input
              placeholder="Ara"
              className="h-9 rounded-lg border border-border bg-muted/50 pl-8 text-sm text-strong-950 shadow-none placeholder:text-soft-400 focus-visible:ring-1 focus-visible:ring-primary/20"
            />
            <kbd className="pointer-events-none absolute right-4 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="h-9 rounded-lg px-3 font-normal text-sub-600 data-[active=true]:text-strong-950"
                    >
                      <Link href={item.href}>
                        <Icon className="h-[18px] w-[18px]" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-soft-400">
            Aktif Siteler
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_SITES.map((site) => (
                <SidebarMenuItem key={site.id}>
                  <SidebarMenuButton className="group h-9 rounded-lg px-3" asChild>
                    <Link href={`/dashboard/sites/${site.id}`}>
                      <ProgressCircle
                        progress={site.progress}
                        color={STATUS_COLORS[site.status] ?? "var(--chart-1)"}
                        size={18}
                      />
                      <span className="flex-1 truncate text-sm">
                        {site.name}
                      </span>
                      <span className="rounded p-0.5 text-sub-600 opacity-0 hover:bg-accent group-hover:opacity-100">
                        ···
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-2">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <button
              type="button"
              className="group mt-2 flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors"
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs text-strong-950">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col min-w-0 text-left">
                <span className="truncate text-sm font-medium text-strong-950">{user.name}</span>
                <span className="truncate text-xs text-sub-600">{user.email}</span>
              </div>
              <IconChevronDown className="h-4 w-4 shrink-0 text-sub-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content side="right" align="end" sideOffset={8} className="w-[--radix-dropdown-menu-trigger-width] min-w-[220px]">
            {/* User header */}
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-sm text-strong-950">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-text-strong-950">{user.name}</span>
                <span className="text-xs text-text-soft-400">{user.email}</span>
              </div>
            </div>

            {/* Dark mode toggle */}
            <Dropdown.Item
              onSelect={(e) => {
                e.preventDefault();
                setIsDarkMode((p) => !p);
              }}
            >
              <Dropdown.ItemIcon as={IconMoon} />
              <span className="flex-1">Karanlık Mod</span>
              <Switch.Root checked={isDarkMode} onClick={(e) => e.stopPropagation()} />
            </Dropdown.Item>

            <Dropdown.Separator />

            <Dropdown.Group>
              <Dropdown.Item onSelect={() => setIsSettingsOpen(true)}>
                <Dropdown.ItemIcon as={IconSettings} />
                Ayarlar
              </Dropdown.Item>
              <Dropdown.Item asChild>
                <Link href="/dashboard/language">
                  <Dropdown.ItemIcon as={IconLanguage} />
                  Dil
                </Link>
              </Dropdown.Item>
              <Dropdown.Item asChild>
                <Link href="/dashboard/support">
                  <Dropdown.ItemIcon as={IconHelp} />
                  Yardım mı lazım?
                </Link>
              </Dropdown.Item>
            </Dropdown.Group>

            <Dropdown.Separator />

            <Dropdown.Group>
              <Dropdown.Item asChild>
                <Link href="/login">
                  <Dropdown.ItemIcon as={IconLogout} className="text-error-base" />
                  <span className="text-error-base">Çıkış Yap</span>
                </Link>
              </Dropdown.Item>
            </Dropdown.Group>

            <div className="p-2 text-xs text-text-soft-400">
              v1.0.0 · <Link href="/terms" className="hover:text-text-sub-600">Kullanım Koşulları</Link>
            </div>
          </Dropdown.Content>
        </Dropdown.Root>

        <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      </SidebarFooter>
    </Sidebar>
  );
}
