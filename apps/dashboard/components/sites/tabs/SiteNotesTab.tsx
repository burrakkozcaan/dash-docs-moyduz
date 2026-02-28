"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { IconPlus } from "@tabler/icons-react";

export function SiteNotesTab() {
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button size="sm" className="gap-1.5" variant="outline">
          <IconPlus className="h-4 w-4" />
          Not Ekle
        </Button>
      </div>
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Bu site için henüz not eklenmemiş.
        </CardContent>
      </Card>
    </div>
  );
}
