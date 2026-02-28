"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiMoreLine,
  RiArrowDownSLine,
  RiArrowRightUpLine,
  RiGlobalLine,
  RiStackLine,
} from "@remixicon/react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { type Site } from "@/lib/data/sites";
import { cn } from "@/utils/cn";
import * as Button from "@repo/ui/new-ui/button";

interface SiteCardProps {
  site: Site;
}

const STATUS_LABELS: Record<string, string> = {
  scan: "Taranıyor",
  brief: "Brifing",
  payment: "Ödeme Bekleniyor",
  production: "Üretimde",
  delivered: "Teslim Edildi",
  maintenance: "Bakımda",
};

// Mini dashed divider
function DividerLine() {
  return (
    <div className="relative h-0 w-full">
      <div
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat-x",
          color: "var(--stroke-soft-200)",
        }}
      />
    </div>
  );
}

const SITE_SLIDE_COUNT = 3;
const SITE_IMAGE_MAP: Record<string, string> = {
  "1": "/window.svg",
  "2": "/globe.svg",
  "3": "/file-text.svg",
};

function SiteImage({
  site,
  variant,
}: {
  site: Site;
  variant: number;
}) {
  if (variant === 0) {
    return (
      <Image
        src={SITE_IMAGE_MAP[site.id] ?? "/window.svg"}
        alt=""
        height={146}
        width={146}
        className="mx-auto h-[146px] w-auto min-w-0 object-contain"
      />
    );
  }

  if (variant === 1) {
    return (
      <div className="mx-auto flex h-[146px] w-[146px] flex-col items-center justify-center gap-2 rounded-2xl bg-bg-soft-200 text-text-sub-600">
        <RiGlobalLine className="size-8" />
        <span className="text-label-sm">{site.progress}%</span>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[146px] w-[146px] flex-col items-center justify-center gap-2 rounded-2xl bg-bg-soft-200 text-text-sub-600">
      <RiStackLine className="size-8" />
      <span className="text-label-sm">{site.packageName}</span>
    </div>
  );
}

// Stable mock chart data per site + metric
function getMockChartData(seed: string) {
  const base = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: 14 }, (_, i) => ({
    v: 10 + ((base * (i + 1) * 13) % 70),
  }));
}

type MetricKey = "Durum" | "İlerleme" | "Paket";

const METRIC_LABELS: MetricKey[] = ["Durum", "İlerleme", "Paket"];

const METRIC_BUTTON_LABELS: Record<MetricKey, string> = {
  Durum: "Durumu Gör",
  "İlerleme": "Süreci Gör",
  Paket: "Paketi Gör",
};

export function SiteCard({ site }: SiteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [metric, setMetric] = useState<MetricKey>("Durum");
  const [currentSlide, setCurrentSlide] = useState(0);

  const chartData = getMockChartData(site.id + metric);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl bg-bg-weak-50 pt-8 transition-all duration-500",
        expanded ? "h-auto" : "h-[258px]",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.6, 0.6, 0, 1)" }}
    >
      {/* ••• menu button */}
      <Link
        href={`/dashboard/sites/${site.id}`}
        className="absolute right-3 top-3 flex size-6 shrink-0 items-center justify-center rounded-md bg-transparent text-text-sub-600 outline-none transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 focus:outline-none focus-visible:bg-bg-strong-950 focus-visible:text-text-white-0"
      >
        <RiMoreLine className="size-5" />
      </Link>

      {/* Slider */}
      <section className="embla relative">
        <div className="embla__viewport overflow-hidden">
          <div
            className="embla__container flex transition-transform duration-500"
            style={{
              transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
            }}
          >
            {Array.from({ length: SITE_SLIDE_COUNT }).map((_, slideIndex) => (
              <div
                key={`${site.id}-slide-${slideIndex}`}
                className="embla__slide w-full shrink-0"
              >
                <SiteImage site={site} variant={slideIndex} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-4 top-4 flex gap-1.5">
          {Array.from({ length: SITE_SLIDE_COUNT }).map((_, slideIndex) => (
            <button
              key={`${site.id}-dot-${slideIndex}`}
              type="button"
              aria-label={`${slideIndex + 1}. görsel`}
              onClick={() => setCurrentSlide(slideIndex)}
              className={cn(
                "size-1 shrink-0 rounded-full transition-all duration-200 ease-out",
                currentSlide === slideIndex
                  ? "w-4 bg-text-soft-400"
                  : "bg-text-disabled-300",
              )}
            />
          ))}
        </div>
      </section>

      {/* Bottom panel */}
      <div className="mt-auto pt-0 transition-all duration-200">
        <div className="w-full overflow-hidden rounded-xl p-4 transition-all duration-200">

          {/* Collapsed header (clickable) */}
          <button
            type="button"
            className="w-full text-left"
            onClick={() => setExpanded((v) => !v)}
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 truncate text-label-sm text-text-strong-950">
                {site.name}
              </div>
              <RiArrowDownSLine
                className={cn(
                  "size-[18px] shrink-0 text-text-soft-400 transition-all duration-200",
                  expanded && "-rotate-180",
                )}
              />
            </div>
            <p className="mt-1 text-paragraph-xs text-text-sub-600">
              {site.template?.category ?? site.packageName}
            </p>
          </button>

          {/* Expanded section */}
          <div
            className={cn(
              "flex flex-col transition duration-200",
              expanded ? "opacity-100" : "opacity-0",
            )}
          >
            {/* Divider */}
            <div className="my-4">
              <DividerLine />
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              <div>
                <div className="text-label-xs text-text-soft-400">Durum</div>
                <div className="mt-1 text-label-sm text-text-sub-600">
                  {STATUS_LABELS[site.status] ?? site.status}
                </div>
              </div>
              <div>
                <div className="text-label-xs text-text-soft-400">İlerleme</div>
                <div className="mt-1 flex items-center gap-0.5 text-label-sm text-text-sub-600">
                  {site.progress}%
                  <RiArrowRightUpLine className="size-4 shrink-0 text-success-base" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4">
              <DividerLine />
            </div>

            {/* Metric toggle — matches reference data-[state=on] pattern */}
            <div
              role="group"
              className="grid grid-cols-3 gap-2"
            >
              {METRIC_LABELS.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={metric === m}
                  data-state={metric === m ? "on" : "off"}
                  onClick={() => setMetric(m)}
                  className="flex h-6 items-center justify-center rounded-md text-center text-label-xs text-text-sub-600 transition duration-200 ease-out data-[state=on]:bg-primary-alpha-10 data-[state=on]:text-primary-base"
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Mini chart */}
            <div className="my-4 h-[84px]">
              <ResponsiveContainer width="100%" height={84}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    className="stroke-stroke-soft-200"
                    vertical={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    className="stroke-primary-base"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Action button — neutral stroke xsmall from new-ui */}
            <Button.Root
              asChild
              variant="neutral"
              mode="stroke"
              size="xsmall"
            >
              <Link href={`/dashboard/sites/${site.id}`}>
                {METRIC_BUTTON_LABELS[metric]}
              </Link>
            </Button.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
