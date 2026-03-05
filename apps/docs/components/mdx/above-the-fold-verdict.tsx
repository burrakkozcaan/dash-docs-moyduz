import { CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface VerdictProps {
    scenario1: { profile: string; recommendation: string; reason: string };
    scenario2: { profile: string; recommendation: string; reason: string };
    ctaText?: string;
    ctaLink?: string;
}

export function AboveTheFoldVerdict({ scenario1, scenario2, ctaText = "Hesaplamalara Geç", ctaLink = "#detay" }: VerdictProps) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 p-6 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-brand text-brand-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Hızlı Karar Özeti
            </div>

            <h3 className="m-0 mb-4 text-lg font-bold text-fd-foreground flex items-center gap-2">
                <CheckCircle2 className="size-5 text-brand" />
                Kısaca Hangi Sistem Size Uygun?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-fd-background/60 p-4 rounded-xl border border-fd-secondary">
                    <div className="text-xs uppercase font-semibdold text-fd-muted-foreground tracking-wider mb-2">Eğer</div>
                    <div className="font-bold text-base mb-2">{scenario1.profile}</div>
                    <div className="text-sm">👉 <span className="font-semibold text-brand">{scenario1.recommendation}</span></div>
                    <div className="text-xs text-fd-muted-foreground mt-2 italic">Sebep: {scenario1.reason}</div>
                </div>

                <div className="bg-fd-background/60 p-4 rounded-xl border border-fd-secondary">
                    <div className="text-xs uppercase font-semibdold text-fd-muted-foreground tracking-wider mb-2">Eğer</div>
                    <div className="font-bold text-base mb-2">{scenario2.profile}</div>
                    <div className="text-sm">👉 <span className="font-semibold text-brand">{scenario2.recommendation}</span></div>
                    <div className="text-xs text-fd-muted-foreground mt-2 italic">Sebep: {scenario2.reason}</div>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <Link href={ctaLink} className="text-sm font-medium text-brand hover:underline flex items-center gap-1">
                    {ctaText} <ChevronRight className="size-4" />
                </Link>
            </div>
        </div>
    );
}
