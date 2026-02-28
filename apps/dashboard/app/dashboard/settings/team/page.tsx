"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

export default function SettingsTeamPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ekip üyeleri</CardTitle>
          <CardDescription>
            Hesabınıza erişebilen ekip üyelerini ve rollerini yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Çok kullanıcılı ekip ve rol yetkileri burada yapılandırılacak.
          </p>
          <Button variant="outline" size="sm">Üye davet et</Button>
        </CardContent>
      </Card>
    </div>
  );
}
