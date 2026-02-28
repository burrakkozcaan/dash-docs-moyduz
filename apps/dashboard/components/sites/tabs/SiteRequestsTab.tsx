"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { IconPlus, IconX, IconUser, IconCalendar, IconCircleCheck } from "@tabler/icons-react";

interface SiteRequestsTabProps {
  siteId?: string;
}

export function SiteRequestsTab({ siteId }: SiteRequestsTabProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    setTitle("");
    setDescription("");
    setShowCreate(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {showCreate ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-9 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
              onClick={() => setShowCreate(false)}
              aria-label="Kapat"
            >
              <IconX className="h-4 w-4 text-muted-foreground" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-7 rounded-lg border border-border bg-background hover:border-primary/50"
              onClick={() => setShowCreate(true)}
            >
              <IconPlus className="h-4 w-4" />
              Yeni Talep
            </Button>
          )}
        </div>
      </div>

      {showCreate && (
        <div className="flex flex-col p-4 gap-3.5 rounded-xl border border-border bg-muted/10">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-1 h-10 items-center w-full">
              <Input
                id="request-title"
                placeholder="Talep başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full font-normal text-xl border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="relative w-full rounded-lg border border-border/60 bg-background overflow-hidden min-h-[100px]">
            <Textarea
              placeholder="Talebinizi kısaca açıklayın..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="min-h-[100px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2.5 items-start w-full">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-lg border border-border bg-muted hover:border-primary/50"
            >
              <span className="size-4 rounded-full bg-background flex items-center justify-center text-[10px] font-medium">M</span>
              <span className="font-medium text-sm">Atanacak</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-lg border border-border bg-muted hover:border-primary/50"
            >
              <IconCalendar className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Tarih</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-lg border border-border bg-background hover:bg-black/5"
            >
              <IconCircleCheck className="size-4 text-muted-foreground" />
              <span className="font-medium text-sm">Beklemede</span>
            </Button>
          </div>
          <div className="flex items-center justify-between w-full pt-4">
            <div className="flex items-center gap-1" />
            <Button onClick={handleCreate} className="h-10 px-4 rounded-xl gap-2">
              Talep Oluştur
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Henüz değişiklik talebiniz yok. Yeni bir talep oluşturabilirsiniz.
        </CardContent>
      </Card>
    </div>
  );
}
