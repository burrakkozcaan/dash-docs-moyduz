"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@repo/ui/components/ui/button";
import { MOCK_TEMPLATES } from "@/lib/data/templates";
import { IconArrowLeft, IconExternalLink, IconSparkles } from "@tabler/icons-react";

export default function TemplateDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const template = MOCK_TEMPLATES.find((t) => t.id === id);

  if (!template) {
    return (
      <DashboardShell title="Şablon">
        <div className="p-4 lg:p-6">
          <p className="text-muted-foreground">Şablon bulunamadı.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/templates">Şablonlara Dön</Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title={template.title}>
      <div className="p-4 lg:p-6 space-y-6">
        <Button variant="ghost" size="sm" className="gap-2 -ml-2" asChild>
          <Link href="/dashboard/templates">
            <IconArrowLeft className="h-4 w-4" />
            Şablonlara dön
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sol: önizleme alanı */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className={`rounded-2xl border border-border overflow-hidden h-48 sm:h-64 bg-gradient-to-br ${template.gradient} flex items-end p-4`}
            >
              <span className="text-white/90 text-sm font-medium">{template.category}</span>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Açıklama</h3>
              <p className="text-sm text-foreground">{template.description}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Dahil sayfalar</h3>
              <ul className="flex flex-wrap gap-2">
                {template.pages.map((page) => (
                  <li
                    key={page}
                    className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                  >
                    {page}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sağ: CTA + meta */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card p-4 space-y-3 sticky top-4">
              <h3 className="text-sm font-medium">Bu şablonla başla</h3>
              <p className="text-xs text-muted-foreground">
                Yeni site oluşturma akışına bu şablon seçili olarak gideceksiniz.
              </p>
              <div className="flex flex-col gap-2">
                <Button className="w-full gap-2" asChild>
                  <Link href={`/dashboard/sites/new?template=${template.slug}`}>
                    <IconSparkles className="h-4 w-4" />
                    Bu şablonla başla
                  </Link>
                </Button>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                    <IconExternalLink className="h-4 w-4" />
                    Canlı demo
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Etiketler</h3>
              <div className="flex flex-wrap gap-1.5">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-muted/80 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
