'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

export function SanalPosKomisyonCalculator() {
    const [ciro, setCiro] = useState(100000);
    const [islemSayisi, setIslemSayisi] = useState(250);

    // Örnek Oranlar (Temsili/Eğitim Amaçlı - Sayfada gerçek varsayımlar belirtilmeli)
    // SaaS Komisyonsuz ama 35 gün vadeli (Aylık %5 fırsat maliyeti)
    const vadeFarkiMaliyeti = ciro * (35 / 30) * 0.05;

    // Moyduz / Direkt Pos Anlaşması (%1.5 Komisyon, Ertesi Gün, + İşlem Başına 0.5 TL)
    const moyduzKomisyon = (ciro * 0.015) + (islemSayisi * 0.5);

    const netCiroSaaS = ciro - vadeFarkiMaliyeti;
    const netCiroMoyduz = ciro - moyduzKomisyon;
    const kazanc = netCiroMoyduz - netCiroSaaS;

    return (
        <div className="my-8 rounded-xl border bg-fd-card shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 bg-fd-secondary/50 px-4 py-3 border-b">
                <CreditCard className="size-5 text-brand" />
                <h3 className="font-semibold m-0">Sanal POS Komisyon & Nakit Akışı Hesaplayıcı</h3>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Aylık Cironuz</label>
                            <span className="text-brand font-bold">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(ciro)}</span>
                        </div>
                        <input
                            type="range" min="10000" max="1000000" step="10000"
                            value={ciro} onChange={(e) => setCiro(Number(e.target.value))}
                            className="w-full accent-brand"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Aylık İşlem Sayısı</label>
                            <span className="text-brand font-bold">{islemSayisi} Adet</span>
                        </div>
                        <input
                            type="range" min="10" max="5000" step="10"
                            value={islemSayisi} onChange={(e) => setIslemSayisi(Number(e.target.value))}
                            className="w-full accent-brand"
                        />
                    </div>
                </div>

                <div className="bg-fd-secondary/30 rounded-lg p-4 flex flex-col justify-center border">
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                            <span>"Sıfır Komisyon" SaaS Kesintisi:</span>
                            <span className="text-red-500 font-mono">-{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(vadeFarkiMaliyeti)}</span>
                        </div>
                        <p className="text-[10px] text-fd-muted-foreground mt-0 leading-tight">
                            (%0 Komisyon, 35 gün vade. Aylık %5 sermaye kaybı varsayımı)
                        </p>
                        <div className="border-t my-2"></div>
                        <div className="flex justify-between text-sm">
                            <span>Moyduz (Açık İyzico/PayTR) Kesintisi:</span>
                            <span className="text-orange-500 font-mono">-{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(moyduzKomisyon)}</span>
                        </div>
                        <p className="text-[10px] text-fd-muted-foreground mt-0 leading-tight">
                            (%1.5 Komisyon, Ertesi gün. İşlem başı 0.5 TL ücret varsayımı)
                        </p>
                    </div>

                    <div className="pt-2 border-t border-brand/20">
                        <span className="block text-xs uppercase tracking-wider text-fd-foreground mb-1">Açık Anlaşma ile Net Aylık Kârınız</span>
                        <span className="text-2xl font-bold text-green-500 block font-mono">
                            +{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(kazanc > 0 ? kazanc : 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
