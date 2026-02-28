import { type Site } from "@/lib/data/sites";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  IconSearch,
  IconZoomIn,
  IconChartBar,
  IconFileText,
  IconRefresh,
} from "@tabler/icons-react";

const MINI_UPSELLS = [
  { title: "SEO optimizasyonu", icon: IconSearch },
  { title: "Hız artırımı", icon: IconZoomIn },
  { title: "İçerik paketi", icon: IconFileText },
  { title: "Analitik kurulum", icon: IconChartBar },
  { title: "Bakım paketi", icon: IconRefresh },
] as const;

interface SiteMetaPanelProps {
  site: Site;
}

export function SiteMetaPanel({ site }: SiteMetaPanelProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proje Detayları</h3>
      <Separator />
      <div className="space-y-3">
        <MetaRow label="Paket" value={site.packageName} />
        {site.template && <MetaRow label="Şablon" value={site.template.name} />}
        {site.domain && <MetaRow label="Alan Adı" value={site.domain} />}
        {site.orderId && <MetaRow label="Sipariş No" value={site.orderId} />}
        {site.totalPrice && (
          <MetaRow
            label="Toplam Fiyat"
            value={`${site.totalPrice.toLocaleString("tr-TR")} ₺`}
          />
        )}
        {site.estimatedDelivery && (
          <MetaRow
            label="Tahmini Teslim"
            value={site.estimatedDelivery.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        )}
        <MetaRow
          label="Oluşturuldu"
          value={site.createdAt.toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Geliştirin</h3>
        {MINI_UPSELLS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 py-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="flex-1 text-xs font-medium leading-tight">{item.title}</p>
              <button
                type="button"
                className="shrink-0 rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-foreground hover:bg-accent transition-colors"
              >
                Ekle
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
