import {
  IconSearch,
  IconZoomIn,
  IconSparkles,
  IconShieldCheck,
} from "@tabler/icons-react";
import * as Card from "@repo/ui/new-ui/card";
import * as Button from "@repo/ui/new-ui/button";

const UPSELL_ITEMS = [
  {
    icon: IconSearch,
    title: "SEO Paketi",
    description: "Anahtar kelime analizi, içerik önerileri, aylık rapor",
    tag: "Popüler",
  },
  {
    icon: IconZoomIn,
    title: "Hız Optimizasyonu",
    description: "Görseller, önbellekleme, Core Web Vitals iyileştirmesi",
    tag: null,
  },
  {
    icon: IconSparkles,
    title: "İçerik Paketi",
    description: "Profesyonel metin yazarlığı, 5 sayfa yeniden yazım",
    tag: null,
  },
  {
    icon: IconShieldCheck,
    title: "Bakım + İzleme",
    description: "7/24 uptime izleme, güvenlik taramaları, otomatik yedek",
    tag: "Dahil",
  },
];

export function UpsellSection() {
  return (
    <div>
      <h2 className="text-paragraph-xs font-medium text-text-soft-400 uppercase tracking-wider mb-3">
        Sitenizi Geliştirin
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {UPSELL_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Card.Root
              key={item.title}
              variant="outlined"
              size="small"
              className="flex flex-col gap-0 p-0"
            >
              <Card.Content className="p-3 flex flex-col gap-2">
                {/* Icon + tag row */}
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-alpha-10">
                    <Icon className="h-4 w-4 text-primary-base" />
                  </div>
                  {item.tag && (
                    <span className="rounded-full bg-primary-alpha-10 px-2 py-0.5 text-[10px] font-semibold text-primary-base">
                      {item.tag}
                    </span>
                  )}
                </div>
                {/* Text */}
                <div>
                  <p className="text-paragraph-sm font-semibold text-text-strong-950 leading-tight">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-paragraph-xs text-text-sub-600 leading-snug">
                    {item.description}
                  </p>
                </div>
                {/* CTA */}
                <Button.Root
                  variant="neutral"
                  mode="stroke"
                  size="xsmall"
                  className="w-full mt-auto"
                  type="button"
                >
                  Bilgi Al
                </Button.Root>
              </Card.Content>
            </Card.Root>
          );
        })}
      </div>
    </div>
  );
}
