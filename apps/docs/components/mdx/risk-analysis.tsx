import { AlertTriangle } from 'lucide-react';

export function RiskAnalysis({ title = "Gizli Risk Analizi", children }: { title?: string; children: React.ReactNode }) {
    return (
        <div className="my-8 rounded-xl border border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20 overflow-hidden">
            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-4 py-3 border-b border-red-200 dark:border-red-900/50">
                <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
                <h3 className="text-red-800 dark:text-red-300 font-semibold m-0">{title}</h3>
            </div>
            <div className="p-4 prose-sm dark:prose-invert prose-p:text-red-900 dark:prose-p:text-red-200 prose-li:text-red-900 dark:prose-li:text-red-200">
                {children}
            </div>
        </div>
    );
}
