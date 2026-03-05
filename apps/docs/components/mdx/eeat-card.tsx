import { Clock, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface EEATCardProps {
    lastUpdated: string;
    author: string;
    reviewedBy?: string;
    role?: string;
}

export function EEATCard({ lastUpdated, author, reviewedBy = "Moyduz E-Ticaret Uzman Ekibi", role = "Teknik İçerik Üreticisi" }: EEATCardProps) {
    return (
        <div className="my-6 rounded-lg bg-fd-secondary/30 border border-fd-secondary px-4 py-3 flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center text-sm text-fd-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-brand" />
                <span className="font-medium">Son Güncelleme:</span> {lastUpdated}
            </div>
            <div className="hidden sm:block text-fd-muted-foreground/30">•</div>
            <div className="flex items-center gap-1.5">
                <User className="size-4 text-brand" />
                <span className="font-medium">Yazar:</span> {author} ({role})
            </div>
            <div className="hidden sm:block text-fd-muted-foreground/30">•</div>
            <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-green-500" />
                <span className="font-medium text-fd-foreground">Onaylayan:</span> {reviewedBy}
            </div>
        </div>
    );
}
