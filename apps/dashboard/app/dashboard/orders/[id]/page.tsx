"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { OrderStatusBadge, getOrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { Button } from "@repo/ui/components/ui/button";
import { MOCK_SITES } from "@/lib/data/sites";
import type { Site } from "@/lib/data/sites";
import { IconArrowLeft } from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

function toPaymentStatus(status: Site["status"]): string {
  switch (status) {
    case "payment":
      return "pending_payment";
    case "production":
      return "processing";
    case "delivered":
    case "maintenance":
      return "completed";
    default:
      return "pending";
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const site = MOCK_SITES.find((s) => s.id === id && s.orderId);

  if (!site) {
    return (
      <DashboardShell title="Sipariş">
        <div className="p-4 md:p-6">
          <p className="text-muted-foreground">Sipariş bulunamadı.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/orders">Siparişlere dön</Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const paymentStatus = toPaymentStatus(site.status);
  const statusBadge = getOrderStatusBadge(paymentStatus);
  const packagePrice = site.totalPrice ?? 0;
  const addOnsPrice = 0;
  const selectedAddons: string[] = [];
  const subtotal = packagePrice + addOnsPrice;

  return (
    <DashboardShell title={`Sipariş ${site.orderId}`}>
      <div className="flex h-full w-full flex-col gap-x-4 p-4 md:flex-row md:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-y-8">
          <div className="flex w-full flex-col gap-y-4 py-4 md:flex-row md:items-center md:justify-between md:py-6">
            <div className="flex flex-col gap-4">
              <Button variant="ghost" size="sm" className="w-fit gap-2 -ml-2" asChild>
                <Link href="/dashboard/orders">
                  <IconArrowLeft className="size-4" />
                  Siparişlere dön
                </Link>
              </Button>
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-normal text-foreground">Sipariş</h2>
                <span
                  className={cn(
                    "rounded-md px-2.5 py-1 text-sm font-medium",
                    statusBadge.className
                  )}
                >
                  {statusBadge.text}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-y-8 pb-8">
            {/* Sipariş detayları kartı */}
            <div className="flex w-full flex-col divide-y divide-border rounded-2xl border border-border bg-card">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div className="flex flex-col gap-4 md:gap-1">
                  <Row label="Fatura no" value={site.orderId?.slice(-8) ?? "—"} />
                  <Row label="Sipariş ID" value={site.id} mono />
                  <Row label="Sipariş tarihi" value={formatDate(site.createdAt)} />
                  <Row
                    label="Durum"
                    value={<OrderStatusBadge status={paymentStatus} />}
                  />
                  <Row label="Fatura nedeni" value="Satın alma" />
                  <div className="my-4 h-px bg-border" />

                  {/* Paket */}
                  <Row label={site.packageName} value={formatPrice(packagePrice)} />
                  {selectedAddons.length > 0 && (
                    <>
                      <Row label="Eklentiler" value={formatPrice(addOnsPrice)} />
                      <div className="ml-4 space-y-1">
                        {selectedAddons.map((addon, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {addon}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-4 md:gap-1">
                  <Row label="Ara toplam" value={formatPrice(subtotal)} />
                  <Row label="İndirim" value="—" />
                  <Row label="Net tutar" value={formatPrice(site.totalPrice ?? 0)} />
                  <Row label="Vergi" value="$0.00" />
                  <Row label="Toplam" value={formatPrice(site.totalPrice ?? 0)} />
                  <div className="my-4 h-px bg-border" />

                  <Row label="Müşteri adı" value={site.name || "—"} />
                  <Row label="E-posta" value="—" />
                </div>

                {/* Proje detayları */}
                {site.description && (
                  <>
                    <div className="my-4 h-px bg-border" />
                    <h3 className="text-lg font-medium text-foreground">Proje detayları</h3>
                    <div className="flex flex-col gap-2">
                      <Row label="Açıklama" value={site.description} />
                      {site.brief &&
                        Object.entries(site.brief).map(([k, v]) => (
                          <Row key={k} label={k} value={v} />
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Ödeme geçmişi */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-medium text-foreground">Ödeme geçmişi</h3>
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="w-full overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Tarih
                        </th>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Tutar
                        </th>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Durum
                        </th>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Fatura
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-4">{formatDate(site.createdAt)}</td>
                        <td className="p-4">{formatPrice(site.totalPrice ?? 0)}</td>
                        <td className="p-4">
                          <OrderStatusBadge status={paymentStatus} />
                        </td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-md"
                            onClick={() => window.open(`/dashboard/orders/${site.id}/invoice`, "_blank")}
                          >
                            İndir
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Ödeme denemeleri */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-medium text-foreground">Ödeme denemeleri</h3>
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="w-full overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-muted/50">
                      <tr>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Oluşturulma
                        </th>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Yöntem
                        </th>
                        <th className="h-12 w-[150px] px-4 text-left font-medium text-muted-foreground">
                          Durum
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-4">{formatDate(site.createdAt)}</td>
                        <td className="p-4 text-muted-foreground">•••• 4242</td>
                        <td className="p-4">
                          <OrderStatusBadge status={paymentStatus} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Müşteri sidebar */}
        <div className="mt-6 flex w-full max-w-[320px] shrink-0 flex-col gap-2 overflow-y-auto rounded-xl border border-border bg-card p-6 md:mt-0 xl:max-w-[360px]">
          <div className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-muted text-sm font-medium text-foreground">
              {(site.name || "M").charAt(0).toUpperCase()}
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="truncate font-medium text-foreground">{site.name || "Müşteri"}</p>
              <p className="text-sm text-muted-foreground">—</p>
            </div>
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <div className="flex flex-1 flex-col gap-1 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Toplam tutar</span>
              <span className="font-medium">{formatPrice(site.totalPrice ?? 0)}</span>
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Sipariş tarihi</span>
              <span>{new Date(site.createdAt).toLocaleDateString("tr-TR")}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 text-sm md:flex-row md:items-baseline md:justify-between md:gap-4">
      <h3 className="flex-1 text-muted-foreground">{label}</h3>
      <div className={cn("flex items-center justify-end", mono && "font-mono text-foreground")}>
        {value}
      </div>
    </div>
  );
}
