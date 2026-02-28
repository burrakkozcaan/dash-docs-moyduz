"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { cn } from "@repo/ui/lib/utils";
import {
  IconCheck,
  IconX,
  IconReceipt,
  IconExternalLink,
  IconFileInvoice,
} from "@tabler/icons-react";

const MOCK_INVOICES = [
  {
    id: "INV-2024-003",
    date: "01 Aralık 2024",
    description: "Business — Aralık 2024",
    amount: "3.490 ₺",
    status: "Ödendi",
  },
  {
    id: "INV-2024-002",
    date: "01 Kasım 2024",
    description: "Business — Kasım 2024",
    amount: "3.490 ₺",
    status: "Ödendi",
  },
  {
    id: "INV-2024-001",
    date: "01 Ekim 2024",
    description: "Starter — Ekim 2024",
    amount: "990 ₺",
    status: "Ödendi",
  },
];

interface PlanCard {
  key: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  isCurrentPlan: boolean;
  isHighlighted: boolean;
  ctaLabel: string;
  features: string[];
  featureHeader: string;
}

const PLANS: PlanCard[] = [
  {
    key: "starter",
    name: "Starter",
    description: "Kurumsal tanıtım sitesi ve dijital varlık oluşturmak isteyen işletmeler için.",
    monthlyPrice: 990,
    yearlyPrice: 799,
    isCurrentPlan: false,
    isHighlighted: false,
    ctaLabel: "Planı Seç",
    featureHeader: "Starter paketine dahil:",
    features: [
      "1 aktif site",
      "Mobil uyumlu tasarım",
      "SEO temel optimizasyonu",
      "SSL sertifikası",
      "E-posta desteği",
      "Aylık performans raporu",
    ],
  },
  {
    key: "business",
    name: "Business",
    description: "Büyüyen işletmeler için gelişmiş özellikler ve öncelikli destek.",
    monthlyPrice: 1490,
    yearlyPrice: 1199,
    isCurrentPlan: true,
    isHighlighted: true,
    ctaLabel: "Aktif Plan",
    featureHeader: "Starter'a ek olarak:",
    features: [
      "3 aktif site",
      "Google Analytics entegrasyonu",
      "Reklam pikseli kurulumu",
      "Kapsamlı SEO optimizasyonu",
      "Öncelikli destek",
      "2 aylık güncelleme dahil",
      "Aylık SEO raporu",
    ],
  },
  {
    key: "enterprise",
    name: "Kurumsal",
    description: "Büyük kurumlar ve özel geliştirme ihtiyacı olan projeler için.",
    monthlyPrice: null,
    yearlyPrice: null,
    isCurrentPlan: false,
    isHighlighted: false,
    ctaLabel: "Demo Talep Et",
    featureHeader: "Business'a ek olarak:",
    features: [
      "Sınırsız site",
      "Özel tasarım & geliştirme",
      "E-ticaret / rezervasyon sistemi",
      "Özel entegrasyonlar",
      "Hesap yöneticisi",
      "SLA garantisi",
      "7/24 öncelikli destek",
      "Özel raporlama",
    ],
  },
];

function AnnualSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          checked ? "bg-primary" : "bg-input"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      <span className="text-sm text-muted-foreground">
        Yıllık{" "}
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          %20 indirim
        </span>
      </span>
    </div>
  );
}

export function BillingContent() {
  const [annualToggles, setAnnualToggles] = useState<Record<string, boolean>>({
    starter: false,
    business: false,
    enterprise: false,
  });

  const toggleAnnual = (key: string) =>
    setAnnualToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  // mock: 2 of 3 sites used
  const sitesUsed = 2;
  const sitesTotal = 3;
  const sitesPercent = Math.round((sitesUsed / sitesTotal) * 100);

  return (
    <DashboardShell title="Faturalama">
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden px-4 pb-6 md:px-8 md:pt-6">
        {/* Header */}
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-medium text-text-strong-950">Planlar &amp; Faturalama</h4>
            <p className="text-sm font-medium text-text-soft-400">
              Abonelik planınızı ve fatura geçmişinizi yönetin.
            </p>
          </div>
          <a
            href="https://moyduz.com/destek"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-text-soft-400 transition-colors hover:text-text-strong-950"
          >
            <IconExternalLink className="size-4 shrink-0" />
            Destek
          </a>
        </div>

        {/* Current plan + stats row */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {/* Current plan card */}
          <div className="flex flex-col gap-4 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-none">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex items-start gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-alpha-10 text-xl">
                  🌐
                </div>
                <div className="flex flex-col leading-snug">
                  <span className="text-lg font-medium text-text-strong-950">
                    Business Plan
                  </span>
                  <span className="text-sm text-text-sub-600">
                    Aktif abonelik
                  </span>
                </div>
              </div>
              <div className="flex justify-start">
                <Button variant="outline" size="sm" className="h-7 gap-1.5 px-3 text-xs">
                  Yönet
                </Button>
              </div>
            </div>
          </div>

          {/* Sites & subscription stats (col-span-2) */}
          <div className="col-span-2 flex flex-col gap-4 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-none">
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-text-strong-950">Aktif Siteler</p>
                <p className="text-sm font-normal text-text-sub-600">
                  {sitesUsed} / {sitesTotal}
                </p>
              </div>

              {/* Progress bar */}
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1 overflow-hidden rounded-full bg-bg-soft-200" style={{ height: 11 }}>
                  <div
                    className="absolute h-full rounded-full bg-primary-base transition-all"
                    style={{ width: `${sitesPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="ml-1 mr-0.5 h-2 w-2 rounded-full bg-primary-base" />
                <p className="text-sm text-text-sub-600">
                  {sitesTotal - sitesUsed} site kullanım hakkı kaldı
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-1.5">
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-success-base" />
                  <p className="text-sm text-text-sub-600">
                    Sonraki fatura:{" "}
                    <span className="font-medium text-text-strong-950">01 Ocak 2025</span>
                  </p>
                </div>
                <div className="flex items-start gap-1.5">
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-success-base" />
                  <p className="text-sm text-text-sub-600">Otomatik yenileme aktif</p>
                </div>
                <div className="flex items-start gap-1.5">
                  <IconX className="mt-0.5 size-4 shrink-0 text-text-sub-600" />
                  <p className="text-sm text-text-sub-600">
                    Aylık ücret: 1.490 ₺
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing plan cards */}
        <div className="flex w-full flex-col justify-center gap-6">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 pb-2 lg:grid-cols-3 lg:gap-6">
            {PLANS.map((plan) => {
              const isAnnual = annualToggles[plan.key] ?? false;
              const displayPrice = plan.monthlyPrice
                ? isAnnual
                  ? plan.yearlyPrice
                  : plan.monthlyPrice
                : null;

              return (
                <div
                  key={plan.key}
                  className={cn(
                    "flex h-full w-full flex-col gap-4 rounded-2xl border p-4 pb-6",
                    plan.isHighlighted
                      ? "border-primary-base bg-primary-alpha-10"
                      : "border-stroke-soft-200 bg-bg-white-0"
                  )}
                >
                  {/* Plan name + description */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-medium text-text-strong-950">{plan.name}</p>
                      {plan.isCurrentPlan && (
                        <Badge variant="default" className="text-xs">
                          Aktif
                        </Badge>
                      )}
                    </div>
                    <p className="min-h-11 text-sm text-text-sub-600 lg:min-h-16">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1">
                    <div className="flex min-h-11 items-center gap-2">
                      {displayPrice !== null ? (
                        <>
                          <p className="text-3xl font-medium tabular-nums text-text-strong-950">
                            {displayPrice?.toLocaleString("tr-TR")} ₺
                          </p>
                          <p className="text-base text-text-sub-600">/ ay</p>
                        </>
                      ) : (
                        <p className="py-3 text-xl text-text-sub-600">Özel fiyat</p>
                      )}
                    </div>
                    {displayPrice !== null && (
                      <p className="text-sm text-text-sub-600">
                        {isAnnual ? "yıllık fatura" : "aylık fatura"}
                      </p>
                    )}
                  </div>

                  {/* Annual toggle */}
                  {plan.monthlyPrice !== null && (
                    <div className="-mx-4 flex h-14 items-center border-y border-stroke-soft-200 px-4 py-2">
                      <AnnualSwitch
                        checked={isAnnual}
                        onChange={() => toggleAnnual(plan.key)}
                      />
                    </div>
                  )}
                  {plan.monthlyPrice === null && (
                    <div className="-mx-4 flex h-14 items-center border-y border-stroke-soft-200 px-4 py-2">
                      <p className="flex-1 text-sm text-text-sub-600">Esnek fiyatlandırma</p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex min-h-[44px] flex-col justify-start">
                    <Button
                      variant={plan.isCurrentPlan ? "outline" : plan.isHighlighted ? "default" : "outline"}
                      disabled={plan.isCurrentPlan}
                      className="h-9 w-full"
                    >
                      {plan.ctaLabel}
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-text-strong-950">{plan.featureHeader}</p>
                    <ul className="flex flex-col gap-3 text-sm">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <IconCheck className="relative top-[2px] size-4 shrink-0 text-primary-base" />
                          <span className="text-text-sub-600">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Invoice history */}
        <section className="flex flex-col gap-4 pb-8">
          <div className="flex items-center gap-2">
            <IconFileInvoice className="size-5 text-text-sub-600" />
            <h2 className="text-base font-medium text-text-strong-950">Fatura Geçmişi</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stroke-soft-200 bg-bg-white-0">
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b bg-bg-weak-50 hover:bg-bg-weak-50/80">
                    <TableHead className="h-11 px-4 align-middle font-medium text-text-sub-600">
                      Fatura No
                    </TableHead>
                    <TableHead className="h-11 px-4 align-middle font-medium text-text-sub-600">
                      Tarih
                    </TableHead>
                    <TableHead className="hidden h-11 px-4 align-middle font-medium text-text-sub-600 sm:table-cell">
                      Açıklama
                    </TableHead>
                    <TableHead className="h-11 px-4 text-right align-middle font-medium text-text-sub-600">
                      Tutar
                    </TableHead>
                    <TableHead className="h-11 px-4 text-right align-middle font-medium text-text-sub-600">
                      Durum
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_tr:last-child]:border-0">
                  {MOCK_INVOICES.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="p-8 text-center text-text-sub-600"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <IconReceipt className="size-8 text-text-soft-400" />
                          Henüz fatura yok.
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    MOCK_INVOICES.map((inv) => (
                      <TableRow
                        key={inv.id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell className="p-4 font-mono text-xs text-muted-foreground align-middle">
                          {inv.id}
                        </TableCell>
                        <TableCell className="p-4 align-middle text-text-strong-950 text-sm">
                          {inv.date}
                        </TableCell>
                        <TableCell className="hidden p-4 align-middle text-text-sub-600 text-sm sm:table-cell">
                          {inv.description}
                        </TableCell>
                        <TableCell className="p-4 text-right align-middle font-medium text-text-strong-950">
                          {inv.amount}
                        </TableCell>
                        <TableCell className="p-4 text-right align-middle">
                          <Badge variant="secondary" className="text-xs">
                            {inv.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
