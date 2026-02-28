"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { SubscriptionStatusBadge } from "@/components/subscriptions/SubscriptionStatusBadge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import {
  MOCK_SUBSCRIPTIONS,
  type Subscription,
} from "@/lib/data/subscriptions";

const STATUS_OPTIONS = [
  { value: "all", label: "Tümü" },
  { value: "active", label: "Aktif" },
  { value: "canceled", label: "İptal" },
  { value: "trialing", label: "Deneme" },
  { value: "past_due", label: "Vadesi geçmiş" },
];

const PLAN_OPTIONS = [
  { value: "all", label: "Tüm planlar" },
  { value: "Starter", label: "Starter" },
  { value: "Commerce Suite", label: "Commerce Suite" },
  { value: "Business", label: "Business" },
  { value: "Maintenance", label: "Maintenance" },
];

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

function formatPrice(amount: number, currency = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function truncate(str: string | null | undefined, max: number): string {
  if (!str) return "—";
  return str.length <= max ? str : str.slice(0, max) + "…";
}

export default function SubscriptionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const filtered = useMemo(() => {
    return MOCK_SUBSCRIPTIONS.filter((sub) => {
      const statusMatch =
        statusFilter === "all" ||
        sub.status.toLowerCase() === statusFilter.toLowerCase();
      const planMatch =
        planFilter === "all" ||
        (sub.packageName && sub.packageName.includes(planFilter)) ||
        (sub.product && sub.product.includes(planFilter));
      return statusMatch && planMatch;
    });
  }, [statusFilter, planFilter]);

  return (
    <DashboardShell title="Abonelikler">
      <div className="flex h-full w-full flex-col gap-y-4 p-4 md:p-6">
        <div className="flex w-full flex-col gap-y-4 py-4 md:flex-row md:items-center md:justify-between md:py-6">
          <h4 className="whitespace-nowrap text-lg font-medium text-foreground md:text-xl">
            Abonelikler
          </h4>
        </div>

        <div className="flex w-full flex-col gap-6 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-4">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[160px] md:w-[180px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-[160px] md:w-[180px]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  {PLAN_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/50 hover:bg-transparent">
                    <TableHead className="h-12 w-[150px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Müşteri
                    </TableHead>
                    <TableHead className="h-12 w-[120px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Durum
                    </TableHead>
                    <TableHead className="h-12 w-[140px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Abonelik tarihi
                    </TableHead>
                    <TableHead className="h-12 w-[140px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Yenileme tarihi
                    </TableHead>
                    <TableHead className="h-12 w-[180px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Ürün
                    </TableHead>
                    <TableHead className="h-12 w-[100px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Tutar
                    </TableHead>
                    <TableHead className="h-12 w-[100px] px-4 text-left align-middle font-medium text-muted-foreground">
                      İşlemler
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="p-8 text-center text-muted-foreground"
                      >
                        Abonelik bulunamadı.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((sub) => (
                      <TableRow
                        key={sub.id}
                        className="cursor-pointer border-b transition-colors hover:bg-muted/50"
                        onClick={() =>
                          (window.location.href = `/dashboard/subscriptions/${sub.id}`)
                        }
                      >
                        <TableCell className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span
                              className="font-medium text-foreground"
                              title={sub.customer}
                            >
                              {truncate(sub.customer ?? "—", 20)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {truncate(sub.customerEmail, 12)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="p-4 align-middle">
                          <SubscriptionStatusBadge
                            status={sub.status}
                            cancelAtPeriodEnd={sub.cancelAtPeriodEnd}
                          />
                        </TableCell>
                        <TableCell className="p-4 align-middle text-muted-foreground">
                          {formatDate(sub.subscriptionDate)}
                        </TableCell>
                        <TableCell className="p-4 align-middle text-muted-foreground">
                          {sub.renewalDate
                            ? formatDate(sub.renewalDate)
                            : "—"}
                        </TableCell>
                        <TableCell className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {sub.packageName ?? sub.product ?? "—"}
                            </span>
                            {sub.productDescription && (
                              <span className="text-sm text-muted-foreground">
                                {sub.productDescription}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="p-4 align-middle tabular-nums text-foreground">
                          {sub.amount != null
                            ? formatPrice(sub.amount, sub.currency)
                            : "—"}
                          {sub.interval && (
                            <span className="text-muted-foreground">
                              /{sub.interval}
                            </span>
                          )}
                        </TableCell>
                        <TableCell
                          className="p-4 align-middle"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 rounded-lg text-xs md:gap-2 md:text-sm"
                            asChild
                          >
                            <Link href={`/dashboard/subscriptions/${sub.id}`}>
                              <span className="hidden md:inline">Detay</span>
                              <span className="md:hidden">Görüntüle</span>
                              <TrendingUp className="size-3 md:size-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
