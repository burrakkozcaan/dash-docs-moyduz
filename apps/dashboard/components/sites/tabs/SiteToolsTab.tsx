import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { type Site } from "@/lib/data/sites";

interface SiteToolsTabProps {
  site: Site;
}

export function SiteToolsTab({ site }: SiteToolsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Araçlar</CardTitle>
          <CardDescription>
            SEO, analytics, hız kontrolü gibi bu siteye bağlı araçlar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Bu site için kullanılabilir araçlar (keyword checker, speed checker, meta tag helper vb.) araçlar sayfasından yönetilir.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/tools">Araçlara git</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
