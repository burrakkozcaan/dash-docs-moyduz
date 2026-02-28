import { Card, CardContent } from "@repo/ui/components/ui/card";
import { type Site } from "@/lib/data/sites";

interface SiteUpdatesTabProps {
  site: Site;
}

export function SiteUpdatesTab({ site }: SiteUpdatesTabProps) {
  if (!site.updates || site.updates.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Henüz güncelleme yok.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {site.updates.map((update, i) => (
        <div key={update.id} className="flex gap-3">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
            {i < (site.updates?.length ?? 0) - 1 && (
              <div className="flex-1 w-px bg-border mt-1" />
            )}
          </div>
          <div className="pb-4 flex-1">
            <p className="text-sm">{update.text}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {update.author} · {update.date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
