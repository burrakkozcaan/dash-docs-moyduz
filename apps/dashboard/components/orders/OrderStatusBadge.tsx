import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";

/** Ödeme/ödeme sonrası durum rozetleri (referans: paid, pending, processing, canceled, failed) */
export function getOrderStatusBadge(status: string): { text: string; className: string } {
  const s = status.toLowerCase();
  if (s === "paid" || s === "completed") {
    return { text: "Ödendi", className: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" };
  }
  if (s === "processing") {
    return { text: "İşlemde", className: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" };
  }
  if (s === "pending_payment" || s === "pending") {
    return { text: "Beklemede", className: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400" };
  }
  if (s === "canceled" || s === "cancelled") {
    return { text: "İptal", className: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" };
  }
  if (s === "failed") {
    return { text: "Başarısız", className: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" };
  }
  return { text: status, className: "bg-muted text-muted-foreground" };
}

export function OrderStatusBadge({ status }: { status: string }) {
  const { text, className } = getOrderStatusBadge(status);
  return (
    <Badge variant="secondary" className={cn("font-medium capitalize", className)}>
      {text}
    </Badge>
  );
}
