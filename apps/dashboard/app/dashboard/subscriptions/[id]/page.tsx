"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { SubscriptionStatusBadge } from "@/components/subscriptions/SubscriptionStatusBadge";
import { Button } from "@repo/ui/components/ui/button";
import {
  getSubscriptionById,
  type Subscription,
} from "@/lib/data/subscriptions";
import { IconArrowLeft } from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

function getStatusBadgeClass(status: string): string {
  const s = status.toLowerCase();
  if (s === "active") return "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400";
  if (s === "canceled" || s === "cancelled") return "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400";
  if (s === "trialing") return "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400";
  if (s === "past_due") return "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400";
  if (s === "incomplete") return "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400";
  if (s === "unpaid") return "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400";
  return "bg-muted text-muted-foreground";
}

function getStatusText(status: string): string {
  const s = status.toLowerCase();
  if (s === "active") return "Aktif";
  if (s === "canceled" || s === "cancelled") return "İptal";
  if (s === "trialing") return "Deneme";
  if (s === "past_due") return "Vadesi geçmiş";
  if (s === "incomplete") return "Eksik";
  if (s === "unpaid") return "Ödenmedi";
  return status;
}

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(amount: number, currency = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
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

export default function SubscriptionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const subscription = getSubscriptionById(id);

  if (!subscription) {
    return (
      <DashboardShell title="Abonelik">
        <div className="p-4 md:p-6">
          <p className="text-muted-foreground">Abonelik bulunamadı.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/subscriptions">Aboneliklere dön</Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const statusClass = getStatusBadgeClass(subscription.status);
  const statusText = getStatusText(subscription.status);

  return (
    <DashboardShell title={`Abonelik ${subscription.id}`}>
      <div className="flex h-full w-full flex-col gap-x-4 p-4 md:flex-row md:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-y-8">
          <div className="flex w-full flex-col gap-y-4 py-4 md:flex-row md:items-center md:justify-between md:py-6">
            <div className="flex flex-col gap-4">
              <Button variant="ghost" size="sm" className="w-fit gap-2 -ml-2" asChild>
                <Link href="/dashboard/subscriptions">
                  <IconArrowLeft className="size-4" />
                  Aboneliklere dön
                </Link>
              </Button>
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-xl font-normal text-foreground">Abonelik</h2>
                <span
                  className={cn(
                    "rounded-md px-2.5 py-1 text-sm font-medium",
                    statusClass
                  )}
                >
                  {statusText}
                  {subscription.cancelAtPeriodEnd && " (İptal edilecek)"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col divide-y divide-border rounded-2xl border border-border bg-card">
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <Row
                label="Abonelik ID"
                value={subscription.stripeSubscriptionId?.slice(-8) ?? "—"}
              />
              <Row label="Dahili ID" value={subscription.id} mono />
              <Row
                label="Abonelik tarihi"
                value={formatDate(subscription.subscriptionDate)}
              />
              <Row
                label="Durum"
                value={
                  <SubscriptionStatusBadge
                    status={subscription.status}
                    cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
                  />
                }
              />
              <Row label="Fatura nedeni" value="Abonelik" />
              <div className="my-4 h-px bg-border" />

              <Row
                label={subscription.packageName ?? subscription.product ?? "Ürün"}
                value={`${formatPrice(subscription.amount, subscription.currency)}/${subscription.interval}`}
              />
              {subscription.productDescription && (
                <Row label="Açıklama" value={subscription.productDescription} />
              )}
              <Row
                label="Sonraki fatura tarihi"
                value={
                  subscription.renewalDate
                    ? formatDate(subscription.renewalDate)
                    : "— (Tek seferlik)"
                }
              />
              <Row label="İndirim" value="—" />
              <Row
                label="Net tutar"
                value={formatPrice(subscription.amount, subscription.currency)}
              />
              <Row label="Vergi" value="$0.00" />
              <Row
                label="Toplam"
                value={formatPrice(subscription.amount, subscription.currency)}
              />
              <div className="my-4 h-px bg-border" />

              <Row label="Müşteri adı" value={subscription.customer ?? "—"} />
              <Row label="E-posta" value={subscription.customerEmail ?? "—"} />
              {subscription.businessField && subscription.businessField.length > 0 && (
                <Row
                  label="İş alanı"
                  value={subscription.businessField.join(", ")}
                />
              )}
              {subscription.domainName && (
                <Row label="Domain" value={subscription.domainName} />
              )}
            </div>

            {subscription.trialStart && subscription.trialEnd && (
              <div className="flex flex-col gap-6 p-8">
                <h3 className="text-lg font-medium text-foreground">Deneme bilgisi</h3>
                <Row label="Deneme başlangıcı" value={formatDate(subscription.trialStart)} />
                <Row label="Deneme bitişi" value={formatDate(subscription.trialEnd)} />
              </div>
            )}

            {subscription.canceledAt && (
              <div className="flex flex-col gap-6 p-8">
                <h3 className="text-lg font-medium text-foreground">İptal bilgisi</h3>
                <Row label="İptal tarihi" value={formatDate(subscription.canceledAt)} />
                <Row
                  label="Dönem sonunda iptal"
                  value={subscription.cancelAtPeriodEnd ? "Evet" : "Hayır"}
                />
              </div>
            )}
          </div>

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
                      <td className="p-4">
                        {formatDate(subscription.subscriptionDate)}
                      </td>
                      <td className="p-4">
                        {formatPrice(subscription.amount, subscription.currency)}
                      </td>
                      <td className="p-4">
                        <SubscriptionStatusBadge status={subscription.status} />
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-md"
                          onClick={() =>
                            window.open(
                              `/dashboard/subscriptions/${subscription.id}/invoice`,
                              "_blank"
                            )
                          }
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
                      <td className="p-4">
                        {formatDate(subscription.subscriptionDate)}
                      </td>
                      <td className="p-4 text-muted-foreground">•••• 4242</td>
                      <td className="p-4">
                        <SubscriptionStatusBadge status={subscription.status} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full max-w-[320px] shrink-0 flex-col gap-2 overflow-y-auto rounded-xl border border-border bg-card p-6 md:mt-0 xl:max-w-[360px]">
          <div className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-muted text-sm font-medium text-foreground">
              {(subscription.customer ?? "M").charAt(0).toUpperCase()}
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="truncate font-medium text-foreground">
                {subscription.customer ?? "Müşteri"}
              </p>
              <p className="text-sm text-muted-foreground">
                {subscription.customerEmail ?? "—"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <div className="flex flex-1 flex-col gap-1 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Aylık tutar</span>
              <span className="font-medium">
                {formatPrice(subscription.amount, subscription.currency)}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">
              <span className="text-muted-foreground">Sonraki fatura</span>
              <span>
                {subscription.renewalDate
                  ? new Date(subscription.renewalDate).toLocaleDateString("tr-TR")
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
