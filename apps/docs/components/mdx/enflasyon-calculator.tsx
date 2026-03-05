'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export function EnflasyonCalculator() {
    const [baslangicUcreti, setBaslangicUcreti] = useState(25000);
    const [enflasyon, setEnflasyon] = useState(60);

    const yil1 = baslangicUcreti;
    const yil2 = yil1 * (1 + (enflasyon / 100));
    const yil3 = yil2 * (1 + (enflasyon / 100));
    const toplam = yil1 + yil2 + yil3;

    return (
        <div className="my-8 rounded-xl border bg-fd-card shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 px-4 py-3 border-b border-red-100 dark:border-red-900/50">
                <TrendingUp className="size-5 text-red-500" />
                <h3 className="font-semibold m-0 text-red-700 dark:text-red-400">Lisans Yenileme Enflasyon Tuzağı</h3>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">İlk Yıl Kiralama Ücreti</label>
                            <span className="font-bold">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(baslangicUcreti)}</span>
                        </div>
                        <input
                            type="range" min="5000" max="150000" step="5000"
                            value={baslangicUcreti} onChange={(e) => setBaslangicUcreti(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium">Yıllık Ortalama Zam (%)</label>
                            <span className="font-bold">%{enflasyon}</span>
                        </div>
                        <input
                            type="range" min="20" max="150" step="5"
                            value={enflasyon} onChange={(e) => setEnflasyon(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="bg-fd-secondary/30 rounded-lg p-4 border flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm">
                        <span>Yıl 1:</span>
                        <span className="font-mono text-fd-muted-foreground">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(yil1)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span>Yıl 2 (%{enflasyon} Zam):</span>
                        <span className="font-mono text-orange-500">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(yil2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span>Yıl 3 (%{enflasyon} Zam):</span>
                        <span className="font-mono text-red-500">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(yil3)}</span>
                    </div>
                    <div className="border-t my-2 pt-2">
                        <span className="block text-xs uppercase tracking-wider text-fd-muted-foreground mb-1">3 Yıllık Toplam "Kira" Maliyeti</span>
                        <span className="text-2xl font-bold text-red-600 block font-mono">
                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(toplam)}
                        </span>
                        <span className="block text-[10px] text-fd-muted-foreground mt-1">3. yılın sonunda hala platformun sahibi değilsiniz.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
