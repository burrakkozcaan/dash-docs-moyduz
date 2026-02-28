"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import * as Drawer from "@repo/ui/new-ui/drawer";
import { MOCK_SITES } from "@/lib/data/sites";
import { SiteStatusTimeline } from "@/components/sites/SiteStatusTimeline";
import { IconExternalLink } from "@tabler/icons-react";

const STATUS_LABELS: Record<string, string> = {
  scan: "Taranıyor",
  brief: "Brifing",
  payment: "Ödeme Bekleniyor",
  production: "Üretimde",
  delivered: "Teslim Edildi",
  maintenance: "Bakımda",
};

const DELIVERABLE_TYPE_LABELS: Record<string, string> = {
  domain: "Domain",
  panel: "Panel Erişimi",
  report: "Rapor",
  asset: "Dosya / Varlık",
};

const DELIVERABLE_STATUS_LABELS: Record<string, string> = {
  pending: "Bekliyor",
  ready: "Hazır",
  delivered: "Teslim Edildi",
};

interface OrderDetailsDrawerProps {
  orderId: string | null;
  onClose: () => void;
}

export function OrderDetailsDrawer({ orderId, onClose }: OrderDetailsDrawerProps) {
  const site = orderId
    ? MOCK_SITES.find((s) => s.id === orderId && s.orderId)
    : null;

  return (
    <Drawer.Root open={!!orderId} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Content
        className="absolute inset-y-0 mx-2 my-2 max-h-[calc(100%-16px)] w-[min(600px,calc(100%-16px))] rounded-20 shadow-custom-md"
      >
        <Drawer.Header className="flex items-start gap-2 border-b">
          <Drawer.Title className="flex flex-col gap-1">
            <div className="text-label-lg text-text-strong-950">
              {site ? site.name : "Sipariş"}
            </div>
            <div className="text-paragraph-sm text-text-sub-600 font-mono">
              {site?.orderId ?? orderId}
            </div>
          </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body className="overflow-y-auto">
          <div className="space-y-6 p-6">
            {!site ? (
              <p className="text-paragraph-sm text-text-sub-600">Sipariş bulunamadı.</p>
            ) : (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Sipariş özeti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Site</span>
                      <Link
                        href={`/dashboard/sites/${site.id}`}
                        className="font-medium text-primary hover:underline truncate ml-2"
                      >
                        {site.name}
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paket</span>
                      <span>{site.packageName}</span>
                    </div>
                    {site.template && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Şablon</span>
                        <span>{site.template.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Durum</span>
                      <Badge variant="outline" className="text-xs">
                        {STATUS_LABELS[site.status]}
                      </Badge>
                    </div>
                    {site.totalPrice != null && (
                      <div className="flex justify-between pt-2 border-t border-border/60">
                        <span className="text-muted-foreground">Toplam</span>
                        <span className="font-semibold">
                          {site.totalPrice.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Aşamalar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SiteStatusTimeline status={site.status} />
                  </CardContent>
                </Card>

                {site.deliverables && site.deliverables.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Teslim kalemleri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {site.deliverables.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between py-2 border-b border-border/60 last:border-0"
                          >
                            <div>
                              <p className="text-sm font-medium">{d.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {DELIVERABLE_TYPE_LABELS[d.type] ?? d.type}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {DELIVERABLE_STATUS_LABELS[d.status] ?? d.status}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <div className="pt-2">
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link href={`/dashboard/orders/${site.id}`}>
                      <IconExternalLink className="h-4 w-4" />
                      Tam sayfa görüntüle
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
