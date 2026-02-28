import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { type Site } from "@/lib/data/sites";
import { IconWorld, IconServer, IconFileText, IconPhoto } from "@tabler/icons-react";

const TYPE_ICONS = {
  domain: IconWorld,
  panel: IconServer,
  report: IconFileText,
  asset: IconPhoto,
};

const TYPE_LABELS = {
  domain: "Alan Adı",
  panel: "Kontrol Paneli",
  report: "Rapor",
  asset: "Dosya",
};

const DELIVERABLE_STATUS_LABELS = {
  pending: "Bekliyor",
  ready: "Hazır",
  delivered: "Teslim Edildi",
};

const DELIVERABLE_STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  pending: "outline",
  ready: "secondary",
  delivered: "default",
};

interface SiteDeliverablesTabProps {
  site: Site;
}

export function SiteDeliverablesTab({ site }: SiteDeliverablesTabProps) {
  if (!site.deliverables || site.deliverables.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Teslimat bilgisi bulunamadı.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {site.deliverables.map((item, i) => {
        const Icon = TYPE_ICONS[item.type];
        return (
          <Card key={i}>
            <CardContent className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{TYPE_LABELS[item.type]}</p>
                </div>
              </div>
              <Badge variant={DELIVERABLE_STATUS_VARIANTS[item.status]}>
                {DELIVERABLE_STATUS_LABELS[item.status]}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
