"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { IconBolt, IconCompass, IconCheck, IconChevronRight, IconX } from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

type SiteMode = "quick" | "guided";

interface NewSiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ModeCard({
  children,
  onClick,
  isSelected,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "basis-0 bg-background grow h-auto relative rounded-3xl shrink-0 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-black/5 border border-border/60 min-w-0",
        isSelected && "ring-2 ring-primary ring-offset-2",
      )}
    >
      <div className="overflow-clip size-full">
        <div className="content-stretch flex flex-col gap-10 items-start p-6 relative size-full">
          {children}
        </div>
      </div>
    </button>
  );
}

export function NewSiteModal({ open, onOpenChange }: NewSiteModalProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<SiteMode | undefined>(undefined);

  if (!open) return null;

  const handleContinue = () => {
    if (selected === "quick") {
      onOpenChange(false);
      router.push("/dashboard/sites/new");
      return;
    }
    if (selected === "guided") {
      onOpenChange(false);
      router.push("/dashboard/templates");
      return;
    }
  };

  const handleClose = () => {
    setSelected(undefined);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-[900px] overflow-hidden rounded-[24px] bg-muted shadow-2xl">
        <div className="content-stretch flex flex-col gap-4 items-start overflow-clip pb-4 pt-6 px-4 relative size-full w-full">
          {/* Header */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="flex items-center justify-center px-2 py-0 relative w-full">
                <p className="basis-0 font-normal grow leading-5 min-h-px min-w-px relative shrink-0 text-muted-foreground text-sm">
                  Projenizi nasıl oluşturmak istersiniz?
                </p>
              </div>
            </div>
          </div>

          {/* Two cards */}
          <div className="content-stretch flex gap-4 items-stretch px-0 py-2 relative shrink-0 w-full flex-1 min-h-0">
            <ModeCard onClick={() => setSelected("quick")} isSelected={selected === "quick"}>
              <div className="content-stretch flex items-center p-3 relative rounded-xl shrink-0">
                <div aria-hidden className="absolute border border-border border-solid inset-0 pointer-events-none rounded-xl" />
                <IconBolt className="size-6 text-muted-foreground" />
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center min-h-px min-w-px relative shrink-0">
                  <p className="font-semibold leading-6 relative shrink-0 text-foreground text-base text-nowrap">
                    Hızlı oluştur
                  </p>
                  <p className="font-normal h-5 leading-5 relative shrink-0 text-muted-foreground text-sm w-full">
                    Minimal ayarla proje oluştur
                  </p>
                </div>
              </div>
              {selected === "quick" ? (
                <div className="absolute bg-primary right-6 rounded-3xl size-6 top-6 flex items-center justify-center">
                  <IconCheck className="size-4 text-primary-foreground" />
                </div>
              ) : (
                <div className="absolute bg-background right-6 rounded-3xl size-6 top-6 border border-border" />
              )}
            </ModeCard>

            <ModeCard onClick={() => setSelected("guided")} isSelected={selected === "guided"}>
              <div className="content-stretch flex items-center p-3 relative rounded-[16px] shrink-0">
                <div aria-hidden className="absolute border border-border border-solid inset-0 pointer-events-none rounded-[16px]" />
                <IconCompass className="size-6 text-muted-foreground" />
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-center min-h-px min-w-px relative shrink-0">
                  <p className="font-semibold leading-6 relative shrink-0 text-foreground text-base text-nowrap">
                    Rehberli kurulum
                  </p>
                  <p className="font-normal h-5 leading-5 relative shrink-0 text-muted-foreground text-sm w-full">
                    Şablon seç, hedef ve yapıyı belirle
                  </p>
                </div>
              </div>
              {selected === "guided" ? (
                <div className="absolute bg-primary right-6 rounded-3xl size-6 top-6 flex items-center justify-center">
                  <IconCheck className="size-4 text-primary-foreground" />
                </div>
              ) : (
                <div className="absolute bg-background right-6 rounded-3xl size-6 top-6 border border-border" />
              )}
            </ModeCard>
          </div>

          {/* Footer */}
          <div className="content-stretch flex items-start justify-between relative shrink-0 w-full mt-auto">
            <Button type="button" variant="ghost" onClick={handleClose} className="h-10 px-4 rounded-xl">
              İptal
            </Button>
            <Button
              type="button"
              onClick={handleContinue}
              disabled={!selected}
              className="h-10 px-4 rounded-xl gap-2"
            >
              <span className="text-sm font-medium">Devam</span>
              <IconChevronRight className="size-4" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute right-4 top-3 opacity-70 hover:opacity-100 rounded-xl"
          >
            <IconX className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
