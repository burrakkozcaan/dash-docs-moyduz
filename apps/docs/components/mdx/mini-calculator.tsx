'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { cn } from '@/lib/cn';

export function TahsilatVadesiCalculator() {
    const [aylikCiro, setAylikCiro] = useState(500000);
    const enflasyon = 0.05; // Yüzde 5 aylık

    // İkas (35 gün)
    const ikasBlokeDolar = aylikCiro * (35 / 30);
    const ikasAylikKayip = ikasBlokeDolar * enflasyon;

    // Moyduz (1 gün)
    const moyduzBlokeDolar = aylikCiro * (1 / 30);
    const moyduzAylikKayip = moyduzBlokeDolar * enflasyon;

    const fark = ikasAylikKayip - moyduzAylikKayip;
    const yillikFark = fark * 12;

    return (
        <div className="my-8 rounded-xl border bg-fd-card shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 bg-fd-secondary/50 px-4 py-3 border-b">
                <Calculator className="size-5 text-brand" />
                <h3 className="font-semibold m-0">Tahsilat Vadesi & Nakit Akışı Hesaplayıcı</h3>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Aylık Cironuz (TL)</label>
                        <input
                            type="range"
                            min="50000"
                            max="2000000"
                            step="50000"
                            value={aylikCiro}
                            onChange={(e) => setAylikCiro(Number(e.target.value))}
                            className="w-full accent-brand"
                        />
                        <div className="mt-2 text-xl font-bold font-mono">
                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(aylikCiro)}
                        </div>
                        <p className="text-xs text-fd-muted-foreground mt-1">Aylık %5 oranında enflasyon/fırsat maliyeti baz alınmıştır.</p>
                    </div>
                </div>

                <div className="bg-fd-secondary/30 rounded-lg p-4 space-y-4 border">
                    <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm">Rakiplerde (35 Gün) Yıllık Kayıp:</span>
                        <span className="font-mono text-red-500 font-semibold">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(ikasAylikKayip * 12)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm">Moyduz'da (1 Gün) Yıllık Kayıp:</span>
                        <span className="font-mono text-green-500 font-semibold">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(moyduzAylikKayip * 12)}</span>
                    </div>

                    <div className="pt-2">
                        <span className="block text-xs uppercase tracking-wider text-fd-muted-foreground mb-1">Moyduz İle Net Yıllık Kazancınız</span>
                        <span className="text-2xl font-bold text-brand block font-mono">
                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(yillikFark)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
