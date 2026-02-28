import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { type Site } from "@/lib/data/sites";

interface SiteOverviewTabProps {
  site: Site;
}

export function SiteOverviewTab({ site }: SiteOverviewTabProps) {
  return (
    <div className="space-y-4">
      {site.description && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Proje Açıklaması</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{site.description}</p>
          </CardContent>
        </Card>
      )}

      {site.brief && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Brifing Özeti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {Object.entries(site.brief).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-muted/50 px-3 py-2">
                  <p className="text-xs text-muted-foreground mb-0.5">{key}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
