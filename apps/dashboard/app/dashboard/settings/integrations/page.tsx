"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export default function SettingsIntegrationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Entegrasyonlar</CardTitle>
          <CardDescription>
            Domain, analytics ve pakete bağlı entegrasyon ayarları.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Domain yönetimi, Google Analytics, ödeme sağlayıcıları vb. burada listelenecek.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
