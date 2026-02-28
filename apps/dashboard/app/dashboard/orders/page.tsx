"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, TrendingUp } from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { OrderDetailsDrawer } from "@/components/orders/OrderDetailsDrawer";
import { OrderStatusBadge, getOrderStatusBadge } from "@/components/orders/OrderStatusBadge";
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
import { MOCK_SITES } from "@/lib/data/sites";
import type { Site } from "@/lib/data/sites";

/** Site workflow status -> ödeme durumu (filtre ve KPI için) */
function toPaymentStatus(status: Site["status"]): string {
  switch (status) {
    case "payment":
      return "pending_payment";
    case "production":
      return "processing";
    case "delivered":
    case "maintenance":
      return "completed";
    case "scan":
    case "brief":
    default:
      return "pending";
  }
}

const orders = MOCK_SITES.filter((s): s is Site & { orderId: string } => Boolean(s.orderId));

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Tüm Siparişler" },
  { value: "pending_payment", label: "Ödeme Bekleniyor" },
  { value: "paid", label: "Ödenen" },
  { value: "processing", label: "İşlemde" },
  { value: "completed", label: "Tamamlandı" },
  { value: "canceled", label: "İptal" },
  { value: "failed", label: "Başarısız" },
];

function formatPrice(amount: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("tr-TR");
}

function truncate(str: string | null | undefined, max: number): string {
  if (!str) return "—";
  return str.length <= max ? str : str.slice(0, max) + "…";
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [quickViewOrderId, setQuickViewOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter === "all") return true;
      const paymentStatus = toPaymentStatus(o.status);
      if (statusFilter === "paid") {
        return paymentStatus === "completed" || paymentStatus === "paid";
      }
      return paymentStatus === statusFilter;
    });
  }, [statusFilter]);

  const totalOrders = filteredOrders.length;
  const today = new Date().toDateString();
  const todayRevenue = useMemo(
    () =>
      filteredOrders
        .filter((o) => {
          const d = new Date(o.createdAt).toDateString();
          const ps = toPaymentStatus(o.status);
          return d === today && (ps === "completed" || ps === "paid");
        })
        .reduce((sum, o) => sum + (o.totalPrice ?? 0), 0),
    [filteredOrders, today]
  );
  const totalRevenue = useMemo(
    () =>
      filteredOrders
        .filter((o) => {
          const ps = toPaymentStatus(o.status);
          return ps === "completed" || ps === "paid";
        })
        .reduce((sum, o) => sum + (o.totalPrice ?? 0), 0),
    [filteredOrders]
  );

  return (
    <DashboardShell title="Siparişler">
      <div className="flex h-full w-full flex-col gap-y-4 p-4 md:p-6">
        <div className="flex w-full flex-col gap-y-4 py-4 md:flex-row md:items-center md:justify-between md:py-6">
          <h4 className="whitespace-nowrap text-lg font-medium text-foreground md:text-xl">
            Siparişler
          </h4>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] md:w-[180px]">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* KPI kartları */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-4 text-foreground md:p-6">
              <div className="space-y-1.5 pb-2">
                <span className="text-sm text-muted-foreground md:text-base">Toplam Sipariş</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold">{totalOrders}</h3>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4 text-foreground md:p-6">
              <div className="space-y-1.5 pb-2">
                <span className="text-sm text-muted-foreground md:text-base">Bugünkü Gelir</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold">{formatPrice(todayRevenue)}</h3>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4 text-foreground md:p-6">
              <div className="space-y-1.5 pb-2">
                <span className="text-sm text-muted-foreground md:text-base">Toplam Gelir</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold">{formatPrice(totalRevenue)}</h3>
            </div>
          </div>

          {/* Tablo */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/50 hover:bg-transparent">
                    <TableHead className="h-12 w-[150px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Müşteri
                    </TableHead>
                    <TableHead className="h-12 w-[120px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Tutar
                    </TableHead>
                    <TableHead className="h-12 w-[160px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Ürün
                    </TableHead>
                    <TableHead className="h-12 w-[120px] px-4 text-left align-middle font-medium text-muted-foreground">
                      Durum
                    </TableHead>
                    <TableHead className="hidden h-12 w-[120px] px-4 text-left align-middle font-medium text-muted-foreground md:table-cell">
                      Fatura no
                    </TableHead>
                    <TableHead className="hidden h-12 w-[130px] px-4 text-left align-middle font-medium text-muted-foreground md:table-cell">
                      <div className="flex items-center gap-1">
                        Tarih
                        <ChevronDown className="size-4 opacity-50" />
                      </div>
                    </TableHead>
                    <TableHead className="h-12 w-[100px] px-4 text-left align-middle font-medium text-muted-foreground">
                      İşlemler
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="p-8 text-center text-muted-foreground"
                      >
                        Sipariş bulunamadı.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => {
                      const paymentStatus = toPaymentStatus(order.status);
                      const badge = getOrderStatusBadge(paymentStatus);
                      return (
                        <TableRow
                          key={order.id}
                          className="cursor-pointer border-b transition-colors hover:bg-muted/50"
                          onClick={() => setQuickViewOrderId(order.id)}
                        >
                          <TableCell className="p-2 align-middle md:p-4">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-border bg-muted text-xs md:h-8 md:w-8 md:text-sm">
                                <span className="text-foreground">
                                  {(order.name || "M").charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex min-w-0 flex-col">
                                <span
                                  className="truncate text-xs font-medium text-foreground md:text-sm"
                                  title={order.name}
                                >
                                  {truncate(order.name, 12)}
                                </span>
                                <span className="hidden text-xs text-muted-foreground md:block">
                                  {truncate(undefined, 8)}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="p-2 align-middle text-xs md:p-4 md:text-sm tabular-nums">
                            {order.totalPrice != null
                              ? formatPrice(order.totalPrice)
                              : "—"}
                          </TableCell>
                          <TableCell className="p-2 align-middle md:p-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-foreground md:text-sm">
                                {order.packageName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                +0 eklenti
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="p-2 align-middle md:p-4">
                            <OrderStatusBadge status={paymentStatus} />
                          </TableCell>
                          <TableCell className="hidden p-2 align-middle text-xs md:table-cell md:p-4 md:text-sm font-mono">
                            {order.orderId?.slice(-8) ?? "—"}
                          </TableCell>
                          <TableCell className="hidden p-2 align-middle text-xs md:table-cell md:p-4 md:text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </TableCell>
                          <TableCell className="p-2 align-middle md:p-4" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 rounded-lg text-xs md:gap-2 md:text-sm"
                              asChild
                            >
                              <Link href={`/dashboard/orders/${order.id}`}>
                                <span className="hidden md:inline">Detay</span>
                                <span className="md:hidden">Görüntüle</span>
                                <TrendingUp className="size-3 md:size-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {quickViewOrderId != null && (
          <OrderDetailsDrawer
            orderId={quickViewOrderId}
            onClose={() => setQuickViewOrderId(null)}
          />
        )}
      </div>
    </DashboardShell>
  );
}
