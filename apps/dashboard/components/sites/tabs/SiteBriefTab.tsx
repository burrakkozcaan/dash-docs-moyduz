import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { type Site } from "@/lib/data/sites";

interface SiteBriefTabProps {
  site: Site;
}

export function SiteBriefTab({ site }: SiteBriefTabProps) {
  if (!site.brief || Object.keys(site.brief).length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Brifing bilgisi henüz girilmemiş.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Onboarding Cevapları</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(site.brief).map(([key, value]) => (
              <tr key={key} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 pr-4 text-muted-foreground font-medium w-1/3">{key}</td>
                <td className="py-2.5 text-foreground">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
