'use client'
import React, { useEffect, useRef } from "react";
import { Building2, CalendarClock, CreditCardIcon, Receipt, FileSpreadsheet, GraduationCap, ServerCog, ShieldCheck, Users, Zap, FileText, ClipboardCheck, User, RefreshCw, CodeXml, Undo, Redo } from "lucide-react";
import { Logo } from "./Logo";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Image from "next/image";


const activityEvents = [
  {
    icon: CalendarClock,
    title: "Appointment confirmed",
    meta: "Today • 14:30",
  },
  {
    icon: FileText,
    title: "Document uploaded",
    meta: "Today • 15:05",
  },
  {
    icon: ClipboardCheck,
    title: "Record approved",
    meta: "Today • 15:20",
  },
  {
    icon: Users,
    title: "Staff assignment updated",
    meta: "Today • 16:10",
  },
  {
    icon: ShieldCheck,
    title: "IP allowlist applied",
    meta: "Today • 16:00",
  },
];

/**
 * Outcomes (ops outputs) — what the system produces
 */
const outcomeEvents = [
  { icon: Receipt, label: "Invoice generated" },
  { icon: CreditCardIcon, label: "Payment captured" },
  { icon: FileSpreadsheet, label: "Weekly report exported" },
  { icon: ServerCog, label: "Audit log recorded" },
];



function ColorContrastCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isVisible = useRef(false);

  const cards = [
    { name: "Primary", ratio: "17.18", status: "check", textColor: "text-green-600", bgColor: "bg-primary", fgColor: "text-primary-foreground", bgOklch: "oklch(0.20 0 0)", fgOklch: "oklch(0.99 0 0)" },
    { name: "Secondary", ratio: "16.44", status: "check", textColor: "text-green-600", bgColor: "bg-secondary", fgColor: "text-secondary-foreground", bgOklch: "oklch(0.97 0 0)", fgOklch: "oklch(0.20 0 0)" },
    { name: "Destructive", ratio: "4.77", status: "triangle", textColor: "text-red-500", bgColor: "bg-destructive", fgColor: "text-destructive-foreground", bgOklch: "oklch(0.58 0.24 28.48)", fgOklch: "oklch(1.00 0 0)" },
  ];

  // Stacking positions: front (0), middle (1), back (2)
  const getCardStyle = (position: number): React.CSSProperties => {
    switch (position) {
      case 0: // Front card
        return { transform: "scale(1)", bottom: "0px", zIndex: 3, opacity: 1 };
      case 1: // Middle card
        return { transform: "scale(0.92)", bottom: "14px", zIndex: 2, opacity: 1 };
      case 2: // Back card
        return { transform: "scale(0.84)", bottom: "28px", zIndex: 1, opacity: 0.7 };
      default:
        return { transform: "scale(0.84)", bottom: "28px", zIndex: 1, opacity: 0.7 };
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = !!entries[0]?.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible.current) {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div
      ref={containerRef}
      className="flex-1 md:max-lg:w-1/2"
    >
      <div className=" bg-white border border-white/5 text-card-foreground flex flex-col rounded-xl py-6 h-full justify-between gap-12 overflow-hidden pb-0 shadow-none md:gap-8">
        <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
          <div className="text-xl font-semibold">Color contrast validation</div>
          <div className="text-muted-foreground text-base">
            Instantly check your theme&apos;s color contrast for WCAG compliance and ensure accessibility with real-time feedback.
          </div>
        </div>
        <div className="relative mx-auto flex h-64 w-full max-w-lg items-end border border-white/10">
          {cards.map((card, i) => {
            // Calculate position: how far this card is from the active one
            const position = (i - activeIndex + cards.length) % cards.length;
            const style = getCardStyle(position);

            return (
              <div
                key={card.name}
                className="absolute inset-x-3 h-60 bg-white flex flex-col rounded-xl gap-0 border-0 p-0 shadow-none"
                style={{
                  transformOrigin: "center top",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s",
                  ...style,
                }}
              >
                <div className="overflow-hidden rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between bg-gray-50 border-b border-white/10 px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-900">{card.name}</h3>
                    <div className={`flex items-center gap-1 ${card.textColor}`}>
                      <span className="text-sm font-medium">{card.ratio}</span>
                      <span className={card.textColor}>{card.status === "check" ? "✓" : "△"}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border border-[#111] rounded-lg">
                    <div className={`flex grow items-center justify-center ${card.bgColor}`}>
                      <div className="flex flex-col items-center justify-center">
                        <div className={`text-3xl font-semibold ${card.name === "Destructive" ? "text-white" : card.fgColor}`}>Aa</div>
                        <div className={`mt-1 text-xs ${card.name === "Destructive" ? "text-white" : card.fgColor}`}>Sample Text</div>
                      </div>
                    </div>
                    <div className="col-span-2 border-l">
                      <div className="border-b p-3">
                        <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">Background</div>
                        <div className="mb-2 flex items-center gap-2">
                          <div className={`size-6 rounded border ${card.bgColor}`} />
                          <div className="grow truncate text-xs font-medium">Color</div>
                        </div>
                        <div className="bg-muted/30 overflow-visible rounded p-1 font-mono text-xs whitespace-nowrap">{card.bgOklch}</div>
                      </div>
                      <div className="p-3">
                        <div className="text-muted-foreground mb-2 text-xs font-medium uppercase">Foreground</div>
                        <div className="mb-2 flex items-center gap-2">
                          <div className={`size-6 rounded border bg-current ${card.name === "Destructive" ? "text-white" : card.fgColor}`} />
                          <div className="grow truncate text-xs font-medium">Color</div>
                        </div>
                        <div className="bg-muted/30 overflow-visible rounded p-1 font-mono text-xs whitespace-nowrap">{card.fgOklch}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="from-white pointer-events-none absolute inset-x-0 -bottom-px z-10 h-6 bg-gradient-to-t to-transparent" />
        </div>
      </div>
    </div>
  );
}


export function BentoGrid() {
  return (
    <div className="h-full w-full">
      <section className="bg-background py-8 sm:py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-2 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Card 1: Secure access */}

          <div
            className="border border-border flex flex-col gap-6 overflow-hidden rounded-xl py-6"
            style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
          >
            <div className="relative h-61.5">
              <div className="relative h-full w-full overflow-hidden">
                <canvas
                  className="block h-full w-full"
                  width="377"
                  height="246"
                  style={{ width: "377.5px", height: "246px" }}
                />
              </div>
              <div className="absolute top-1/2 left-1/2 grid size-42 -translate-x-1/2 -translate-y-1/2 place-content-center bg-[radial-gradient(white_40%,transparent_90%)]">
                <svg
                  width="119"
                  height="148"
                  viewBox="0 0 119 148"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <foreignObject x="-14.04" y="-14.04" width="146.717" height="175.946">
                    <div
                      style={{
                        backdropFilter: "blur(7.02px)",
                        clipPath: "url(#bgblur_0_25616_9469_clip_path)",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </foreignObject>
                  <path
                    opacity="0.8"
                    data-figma-bg-blur-radius="14.04"
                    d="M117.725 81.2252C117.725 117.729 92.1721 135.981 61.8008 146.567C60.2104 147.106 58.4828 147.08 56.9092 146.494C26.4649 135.981 0.912109 117.729 0.912109 81.2252V30.1196C0.912109 28.1833 1.6813 26.3263 3.05047 24.9571C4.41963 23.588 6.27662 22.8188 8.21291 22.8188C22.8145 22.8188 41.0665 14.0578 53.7699 2.96059C55.3166 1.63914 57.2842 0.913086 59.3185 0.913086C61.3528 0.913086 63.3204 1.63914 64.8671 2.96059C77.6435 14.1308 95.8225 22.8188 110.424 22.8188C112.36 22.8188 114.217 23.588 115.587 24.9571C116.956 26.3263 117.725 28.1833 117.725 30.1196V81.2252Z"
                    fill="var(--primary)"
                    fillOpacity="0.1"
                    stroke="url(#paint0_linear_25616_9469)"
                    strokeWidth="1.8252"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <foreignObject x="-4.15328" y="-1.71773" width="126.945" height="151.302">
                    <div
                      style={{
                        backdropFilter: "blur(7.02px)",
                        clipPath: "url(#bgblur_1_25616_9469_clip_path)",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </foreignObject>
                  <path
                    opacity="0.8"
                    data-figma-bg-blur-radius="14.04"
                    d="M107.99 80.0097C107.99 110.43 86.6965 125.64 61.387 134.462C60.0617 134.911 58.6221 134.889 57.3108 134.401C31.9405 125.64 10.6465 110.43 10.6465 80.0097V37.4217C10.6465 35.8082 11.2875 34.2607 12.4284 33.1197C13.5694 31.9787 15.1169 31.3377 16.7305 31.3377C28.8985 31.3377 44.1085 24.0369 54.6946 14.7893C55.9836 13.6881 57.6232 13.083 59.3185 13.083C61.0138 13.083 62.6534 13.6881 63.9423 14.7893C74.5893 24.0978 89.7385 31.3377 101.906 31.3377C103.52 31.3377 105.068 31.9787 106.209 33.1197C107.349 34.2607 107.99 35.8082 107.99 37.4217V80.0097Z"
                    fill="var(--primary)"
                    fillOpacity="0.1"
                    stroke="url(#paint1_linear_25616_9469)"
                    strokeWidth="1.521"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <foreignObject x="7.25297" y="12.501" width="104.131" height="122.866">
                    <div
                      style={{
                        backdropFilter: "blur(7.02px)",
                        clipPath: "url(#bgblur_2_25616_9469_clip_path)",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </foreignObject>
                  <path
                    opacity="0.6"
                    data-figma-bg-blur-radius="14.04"
                    d="M96.7589 78.6081C96.7589 102.008 80.3789 113.708 60.9101 120.494C59.8906 120.84 58.7832 120.823 57.7745 120.447C38.2589 113.708 21.8789 102.008 21.8789 78.6081V45.8481C21.8789 44.6069 22.372 43.4165 23.2496 42.5388C24.1273 41.6612 25.3177 41.1681 26.5589 41.1681C35.9189 41.1681 47.6189 35.5521 55.7621 28.4385C56.7536 27.5914 58.0148 27.126 59.3189 27.126C60.623 27.126 61.8842 27.5914 62.8757 28.4385C71.0657 35.5989 82.7189 41.1681 92.0789 41.1681C93.3201 41.1681 94.5105 41.6612 95.3882 42.5388C96.2658 43.4165 96.7589 44.6069 96.7589 45.8481V78.6081Z"
                    fill="var(--primary)"
                    fillOpacity="0.1"
                    stroke="url(#paint2_linear_25616_9469)"
                    strokeWidth="1.17"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M84.2774 77.0499C84.2774 92.6499 73.3574 100.45 60.3782 104.974C59.6986 105.204 58.9603 105.193 58.2878 104.943C45.2774 100.45 34.3574 92.6499 34.3574 77.0499V55.2099C34.3574 54.3824 34.6861 53.5889 35.2712 53.0037C35.8564 52.4186 36.6499 52.0899 37.4774 52.0899C43.7174 52.0899 51.5174 48.3459 56.9462 43.6035C57.6072 43.0388 58.448 42.7285 59.3174 42.7285C60.1868 42.7285 61.0276 43.0388 61.6886 43.6035C67.1486 48.3771 74.9174 52.0899 81.1574 52.0899C81.9849 52.0899 82.7785 52.4186 83.3636 53.0037C83.9487 53.5889 84.2774 54.3824 84.2774 55.2099V77.0499Z"
                    fill="var(--primary)"
                  />
                  <defs>
                    <clipPath
                      id="bgblur_0_25616_9469_clip_path"
                      transform="translate(14.04 14.04)"
                    >
                      <path d="M117.725 81.2252C117.725 117.729 92.1721 135.981 61.8008 146.567C60.2104 147.106 58.4828 147.08 56.9092 146.494C26.4649 135.981 0.912109 117.729 0.912109 81.2252V30.1196C0.912109 28.1833 1.6813 26.3263 3.05047 24.9571C4.41963 23.588 6.27662 22.8188 8.21291 22.8188C22.8145 22.8188 41.0665 14.0578 53.7699 2.96059C55.3166 1.63914 57.2842 0.913086 59.3185 0.913086C61.3528 0.913086 63.3204 1.63914 64.8671 2.96059C77.6435 14.1308 95.8225 22.8188 110.424 22.8188C112.36 22.8188 114.217 23.588 115.587 24.9571C116.956 26.3263 117.725 28.1833 117.725 30.1196V81.2252Z" />
                    </clipPath>
                    <clipPath
                      id="bgblur_1_25616_9469_clip_path"
                      transform="translate(4.15328 1.71773)"
                    >
                      <path d="M107.99 80.0097C107.99 110.43 86.6965 125.64 61.387 134.462C60.0617 134.911 58.6221 134.889 57.3108 134.401C31.9405 125.64 10.6465 110.43 10.6465 80.0097V37.4217C10.6465 35.8082 11.2875 34.2607 12.4284 33.1197C13.5694 31.9787 15.1169 31.3377 16.7305 31.3377C28.8985 31.3377 44.1085 24.0369 54.6946 14.7893C55.9836 13.6881 57.6232 13.083 59.3185 13.083C61.0138 13.083 62.6534 13.6881 63.9423 14.7893C74.5893 24.0978 89.7385 31.3377 101.906 31.3377C103.52 31.3377 105.068 31.9787 106.209 33.1197C107.349 34.2607 107.99 35.8082 107.99 37.4217V80.0097Z" />
                    </clipPath>
                    <clipPath
                      id="bgblur_2_25616_9469_clip_path"
                      transform="translate(-7.25297 -12.501)"
                    >
                      <path d="M96.7589 78.6081C96.7589 102.008 80.3789 113.708 60.9101 120.494C59.8906 120.84 58.7832 120.823 57.7745 120.447C38.2589 113.708 21.8789 102.008 21.8789 78.6081V45.8481C21.8789 44.6069 22.372 43.4165 23.2496 42.5388C24.1273 41.6612 25.3177 41.1681 26.5589 41.1681C35.9189 41.1681 47.6189 35.5521 55.7621 28.4385C56.7536 27.5914 58.0148 27.126 59.3189 27.126C60.623 27.126 61.8842 27.5914 62.8757 28.4385C71.0657 35.5989 82.7189 41.1681 92.0789 41.1681C93.3201 41.1681 94.5105 41.6612 95.3882 42.5388C96.2658 43.4165 96.7589 44.6069 96.7589 45.8481V78.6081Z" />
                    </clipPath>
                    <linearGradient
                      id="paint0_linear_25616_9469"
                      x1="59.3185"
                      y1="0.913086"
                      x2="59.3185"
                      y2="146.954"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--primary)" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_25616_9469"
                      x1="59.3185"
                      y1="13.083"
                      x2="59.3185"
                      y2="134.783"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--primary)" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_25616_9469"
                      x1="59.3189"
                      y1="27.126"
                      x2="59.3189"
                      y2="120.742"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--primary)" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_20%,white_70%)]" />
            </div>
            <div className="space-y-4 px-6">
              <h3 className="text-2xl font-semibold">Secure access</h3>
              <p className="text-muted-foreground text-lg">
                Your information stays encrypted and private, ensuring complete
                safety while using our AI platform.
              </p>
            </div>
          </div>

          {/* Card 2: One-flow process */}
          <div
            className="bg-white border border-border flex flex-col gap-6 overflow-hidden rounded-xl py-6 text-card-foreground"
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            <div className="relative flex h-64 items-center justify-center px-6">
              {/* Concentric rings */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="size-44 rounded-full border border-white/25" />
                  <div className="absolute inset-0 size-36 rounded-full border border-white/40" />
                  <div className="absolute inset-0 size-26 rounded-full border border-white/60" />
                </div>
              </div>

              {/* Center logo */}
              <div className="relative">
                <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg backdrop-blur">
                  <span className="flex size-full items-center justify-center">
                    <span className="flex size-12 items-center justify-center rounded-full border border-black/50 bg-white/15 text-base font-semibold text-white">
                      {/* <Image
                      src="/un.svg"
                      alt="PanelManage"
                      width={20}
                      height={20}
                    /> */}
                      <Logo className="text-center p-1" />
                    </span>
                  </span>
                </span>
              </div>

              {/* Badges (use-cases that match your SEO pages) */}
              <div className="absolute top-6 left-10 -rotate-6">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                  <Building2 className="size-3.5 text-foreground" />
                  Clinic
                </span>
              </div>
              <div className="absolute bottom-8 left-10 rotate-4">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                  <CalendarClock className="size-3.5 text-foreground" />
                  Appointment
                </span>
              </div>
              <div className="absolute top-6 right-8 -rotate-8">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                  <Users className="size-3.5 text-foreground" />
                  Employee
                </span>
              </div>
              <div className="absolute right-10 bottom-8 rotate-8">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                  <GraduationCap className="size-3.5 text-foreground" />
                  Scholarship
                </span>
              </div>
            </div>

            <div className="px-6 flex flex-col gap-2">
              <h5 className="text-2xl font-semibold">
                Modules built to match your workflow
              </h5>
              <p className="text-muted-foreground text-lg">
                Tables, forms, approvals, document uploads, exports, permissions,
                audit logs, and reporting—assembled module by module to fit your
                process.
              </p>
            </div>
          </div>

          {/* Card 3: Pick your tool (This was labeled Group 3 in HTML but is visually Bento map) */}
          <div
            className="bg-white border border-border flex flex-col gap-6 overflow-hidden rounded-xl pb-6 text-card-foreground"
            data-reveal
            style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
          >
            <div className="relative isolate flex min-h-97 flex-1 items-end">
              {/* Top activity marquee */}
              <div
                className="group absolute top-0 left-1/2 z-0 flex h-1/2 w-full max-w-72 -translate-x-1/2 flex-col gap-[var(--marquee-gap)] overflow-hidden"
                style={
                  {
                    "--marquee-duration": "22s",
                    "--marquee-delay": "0s",
                    "--marquee-gap": "1rem",
                  } as React.CSSProperties
                }
              >
                {Array.from({ length: 3 }).map((_, groupIdx) => (
                  <div
                    key={`activity-group-${groupIdx}`}
                    className="z-0 flex shrink-0 flex-col justify-around gap-[var(--marquee-gap)] animate-marquee-vertical [animation-direction:reverse]"
                    style={
                      {
                        animationDelay: "var(--marquee-delay)",
                      } as React.CSSProperties
                    }
                  >
                    {activityEvents.map((event) => {
                      const Icon = event.icon;
                      return (
                        <div
                          key={`${groupIdx}-${event.title}-${event.meta}`}
                          className="bg-white flex items-start gap-3 rounded-md border px-4 py-1.5"
                        >
                          <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-500/10">
                            <span className="flex size-full items-center justify-center text-emerald-400">
                              <Icon className="size-4.5" aria-hidden="true" />
                            </span>
                          </span>
                          <div className="flex flex-col text-card-foreground">
                            <span className="font-medium">{event.title}</span>
                            <span className="text-muted-foreground text-sm">
                              {event.meta}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom outcomes marquee */}
              <div
                className="group absolute bottom-0 left-1/2 z-0 flex h-1/2 w-full max-w-72 -translate-x-1/2 flex-col gap-[var(--marquee-gap)] overflow-hidden p-3"
                style={
                  {
                    "--marquee-duration": "22s",
                    "--marquee-delay": "0s",
                    "--marquee-gap": "1rem",
                  } as React.CSSProperties
                }
              >
                {Array.from({ length: 3 }).map((_, groupIdx) => (
                  <div
                    key={`outcome-group-${groupIdx}`}
                    className="z-0 flex shrink-0 flex-col justify-around gap-[var(--marquee-gap)] animate-marquee-vertical [animation-direction:reverse]"
                    style={
                      {
                        animationDelay: "var(--marquee-delay)",
                      } as React.CSSProperties
                    }
                  >
                    {outcomeEvents.map((event) => {
                      const Icon = event.icon;
                      return (
                        <div
                          key={`${groupIdx}-${event.label}`}
                          className="bg-white flex items-start gap-3 rounded-md border px-4 py-1.5"
                        >
                          <span className="relative flex size-7 shrink-0 overflow-hidden rounded-lg">
                            <span className="flex size-full items-center justify-center rounded-lg bg-green-600/10 text-xs dark:bg-green-400/10">
                              <Icon className="size-4 text-green-600 dark:text-green-400" />
                            </span>
                          </span>
                          <div className="flex flex-col text-card-foreground">
                            <span className="font-medium">{event.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Blur bands */}
              <div className="from-foreground/[0.07] absolute inset-x-0 bottom-1/2 z-10 h-15 w-full -translate-y-10.5 bg-gradient-to-t to-transparent to-60% backdrop-blur-[1.5px]" />
              <div className="from-foreground/[0.07] absolute inset-x-0 top-1/2 z-10 h-15 w-full translate-y-10.5 bg-gradient-to-b to-transparent to-60% backdrop-blur-[1.5px]" />

              {/* Side shapes */}
              <svg
                width={55}
                height={144}
                viewBox="0 0 55 144"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 left-0 -translate-y-1/2"
              >
                <path
                  d="M22.4993 19.52C33.2382 26.5336 54.7912 28.9577 54.7912 28.9577V114.495C54.7912 114.495 33.2382 116.92 22.4993 123.933C10.4369 131.811 0 143.453 0 143.453V0C0 0 10.4369 11.642 22.4993 19.52Z"
                  fill="white"
                />
              </svg>
              <svg
                width={55}
                height={144}
                viewBox="0 0 55 144"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 right-0 -translate-y-1/2"
                style={{ transform: "translateY(-50%) rotateY(180deg)" }}
              >
                <path
                  d="M22.4993 19.52C33.2382 26.5336 54.7912 28.9577 54.7912 28.9577V114.495C54.7912 114.495 33.2382 116.92 22.4993 123.933C10.4369 131.811 0 143.453 0 143.453V0C0 0 10.4369 11.642 22.4993 19.52Z"
                  fill="white"
                />
              </svg>

              {/* Center band */}
              <div className="bg-white absolute inset-x-0 top-1/2 z-20 flex h-21.5 w-full -translate-y-1/2 items-center justify-center">
                <div className="text-card-foreground flex items-center gap-3.5">
                  {/* <Image src="/un.svg" alt="PanelManage" width={20} height={20} /> */}
                  <Logo className="text-center p-1 text-black" />
                  <span className="text-xl font-semibold text-black">PanelManage</span>
                </div>
              </div>

              <div className="from-white pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b to-transparent" />
              <div className="from-white pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
              <div className="from-white pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t to-transparent" />
              <div className="from-white pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent" />
            </div>

            <div className="space-y-2 px-6 text-card-foreground">
              <div className="flex items-center gap-2 text-emerald-400">
                <Zap className="size-5" />
                <h3 className="text-2xl font-semibold text-foreground">
                  From workflow to real-time outcomes
                </h3>
              </div>

              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <ServerCog className="size-4.5 mt-0.5 text-emerald-400" />
                <p>
                  Connect bookings, approvals, documents, and staff operations to
                  invoicing, payments, exports, audit logs, and reporting—so your
                  management system runs end-to-end operations in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Build things (Span 2) */}
          <div
            className="border flex flex-col overflow-hidden rounded-xl pb-6 sm:col-span-2"
            style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
          >
            <div className="group relative flex min-h-75 items-center justify-center overflow-hidden p-6">

              <div className="group/prompt relative w-full max-w-121 flex-col gap-8 rounded-xl border shadow-md">
                <textarea
                  data-slot="textarea"
                  className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full bg-transparent text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-background! field-sizing-content max-h-30 min-h-31.5 resize-none rounded-xl border-0 p-4 text-lg! shadow-none focus-visible:ring-0"
                  id="text-prompt"
                  placeholder="What can i do for you?"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      data-slot="dropdown-menu-trigger"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5"
                      type="button"
                    >
                      <img
                        src="https://cdn.shadcnstudio.com/ss-assets/blocks/bento-grid/image-96.png"
                        alt="GPT-5-mini"
                        className="size-4.5"
                      />
                      <span>GPT-5-mini</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <span className="bg-border h-5 w-px" />
                    <button
                      data-slot="button"
                      className="focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 size-9 bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 size-7!"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-paperclip"
                        aria-hidden="true"
                      >
                        <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                      </svg>
                      <span className="sr-only">Attach a file</span>
                    </button>
                  </div>
                  <button
                    data-slot="button"
                    className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 size-9 size-7!"
                    disabled={true}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-up-right"
                      aria-hidden="true"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                    <span className="sr-only">Open in new tab</span>
                  </button>
                </div>
              </div>

            </div>
            <div className="space-y-4 px-6">
              <h3 className="text-2xl font-semibold">
                Build things with simple prompt
              </h3>
              <p className="text-muted-foreground text-lg">
                Turn simple text prompts into powerful outputs, from design to
                analysis, without extra effort.
              </p>
            </div>
          </div>

          {/* Card 5: Voice assistant */}
          <div
            className="border flex flex-col gap-6 overflow-hidden rounded-xl py-6 max-lg:order-1"
            style={{ filter: "blur(0px)", opacity: 1, transform: "none" }}
          >
            <div className="flex h-61.5 flex-1 items-center justify-center">
              <div className="relative flex w-full max-w-50 flex-col items-center gap-3">
                <button
                  className="group hover:bg-accent flex size-14 cursor-pointer items-center justify-center rounded-xl transition-colors"
                  type="button"
                >
                  <div
                    className="bg-primary pointer-events-none size-5 animate-spin rounded-sm"
                    style={{ animationDuration: "3s" }}
                  />
                </button>
                <span className="text-muted-foreground font-mono text-sm font-light transition-opacity duration-300">
                  00:02
                </span>
                <div className="flex h-4 w-49.5 items-center justify-center gap-0.5 px-1 py-0.5">
                  {[
                    68.9542, 65.3242, 35.8866, 74.4444, 75.7278, 23.3242,
                    72.0728, 74.1788, 39.6615, 98.2984, 62.2201, 24.5086,
                    50.9462, 94.8494, 79.1355, 32.2662, 96.1986, 83.7741,
                    78.9929, 42.9254, 83.0019, 97.5258, 82.0836, 20.9773,
                    63.1139, 25.8244, 28.6296, 63.6851, 59.2364, 97.7987,
                    80.9486, 82.7882, 32.9344, 44.864, 39.9077, 60.4024,
                    59.6817, 85.4212, 90.1071, 77.771, 66.5313, 23.0588,
                    45.7203, 67.4002, 90.9429, 87.8782, 36.7938, 88.253,
                  ].map((height, i) => (
                    <div
                      key={i}
                      className="w-0.5 rounded-full transition-all duration-300 bg-primary/80 animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-card-foreground">Listening...</p>
              </div>
            </div>
            <div className="space-y-4 px-6">
              <h3 className="text-2xl font-semibold">Voice assistant</h3>
              <p className="text-muted-foreground text-lg">
                Ask, command, and get instant responses.
              </p>
            </div>
          </div>



          {/* Card 8: Color contrast validation */}
          <ColorContrastCard />


        </div>
      </section>
    </div>
  );
}
