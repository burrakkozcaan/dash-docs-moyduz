"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { IconArrowLeft } from "@tabler/icons-react";

export default function SupportNewPage() {
  return (
    <DashboardShell title="Yeni destek talebi">
      <div className="p-4 lg:p-6 space-y-6">
        <Button variant="ghost" size="sm" className="gap-2 -ml-2" asChild>
          <Link href="/dashboard/support">
            <IconArrowLeft className="h-4 w-4" />
            Destek taleplerine dön
          </Link>
        </Button>

        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Talep aç</CardTitle>
            <CardDescription>
              Konu ve mesajınızı yazın; en kısa sürede dönüş yapacağız.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Konu</Label>
              <Input id="subject" placeholder="Örn: Ödeme ile ilgili soru" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mesaj</Label>
              <Textarea
                id="message"
                placeholder="Talebinizi detaylı yazın..."
                rows={5}
                className="resize-none"
              />
            </div>
            <Button>Gönder</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
