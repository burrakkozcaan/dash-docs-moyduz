import { Badge } from "@repo/ui/components/ui/badge";

const STATUS_LABELS: Record<string, string> = {
  open: "Açık",
  pending: "Beklemede",
  in_progress: "İşlemde",
  resolved: "Çözüldü",
  closed: "Kapatıldı",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  open: "default",
  pending: "secondary",
  in_progress: "outline",
  resolved: "secondary",
  closed: "outline",
};

export function SupportTicketStatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status;
  const variant = STATUS_VARIANTS[status] ?? "secondary";
  return <Badge variant={variant}>{label}</Badge>;
}
