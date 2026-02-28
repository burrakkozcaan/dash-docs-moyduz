import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "@repo/ui/lib/utils";

export function getSubscriptionStatusBadge(status: string): {
  text: string;
  className: string;
} {
  const s = status.toLowerCase();
  if (s === "active") {
    return {
      text: "Aktif",
      className:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    };
  }
  if (s === "canceled" || s === "cancelled") {
    return {
      text: "İptal",
      className: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    };
  }
  if (s === "trialing") {
    return {
      text: "Deneme",
      className: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    };
  }
  if (s === "past_due") {
    return {
      text: "Vadesi geçmiş",
      className:
        "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    };
  }
  if (s === "incomplete") {
    return {
      text: "Eksik",
      className:
        "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    };
  }
  if (s === "unpaid") {
    return {
      text: "Ödenmedi",
      className: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    };
  }
  return { text: status, className: "bg-muted text-muted-foreground" };
}

export function SubscriptionStatusBadge({
  status,
  cancelAtPeriodEnd,
}: {
  status: string;
  cancelAtPeriodEnd?: boolean;
}) {
  const { text, className } = getSubscriptionStatusBadge(status);
  return (
    <Badge
      variant="secondary"
      className={cn("font-medium capitalize", className)}
    >
      {text}
      {cancelAtPeriodEnd && " (İptal edilecek)"}
    </Badge>
  );
}
