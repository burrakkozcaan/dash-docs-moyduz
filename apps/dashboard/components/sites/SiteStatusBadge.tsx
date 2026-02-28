import { Badge } from "@repo/ui/components/ui/badge";
import { type SiteStatus } from "@/lib/data/sites";

export const STATUS_LABELS: Record<SiteStatus, string> = {
  scan: "Taranıyor",
  brief: "Brifing",
  payment: "Ödeme Bekleniyor",
  production: "Üretimde",
  delivered: "Teslim Edildi",
  maintenance: "Bakımda",
};

export const STATUS_VARIANTS: Record<SiteStatus, string> = {
  scan: "secondary",
  brief: "outline",
  payment: "outline",
  production: "default",
  delivered: "secondary",
  maintenance: "secondary",
};

export function SiteStatusBadge({ status }: { status: SiteStatus }) {
  return (
    <Badge variant={STATUS_VARIANTS[status] as "default" | "secondary" | "destructive" | "outline"}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
