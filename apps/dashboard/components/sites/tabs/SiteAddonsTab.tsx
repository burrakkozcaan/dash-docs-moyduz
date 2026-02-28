import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { type Site } from "@/lib/data/sites";

interface SiteAddonsTabProps {
  site: Site;
}

export function SiteAddonsTab({ site }: SiteAddonsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Bu siteye eklenen eklentiler</CardTitle>
          <CardDescription>
            Blog paket, SEO pack, hız optimizasyonu, bakım, içerik, çok dil vb.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Henüz eklenmiş addon yok. Addon mağazasından bu siteye eklenti satın alabilirsiniz.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/addons">Addon satın al</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
