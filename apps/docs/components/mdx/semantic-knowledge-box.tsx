import { Info } from 'lucide-react';

export interface Concept {
    term: string;
    definition: string;
}

export function SemanticKnowledgeBox({ title = "Kritik E-Ticaret Terimleri", concepts }: { title?: string; concepts: Concept[] }) {
    return (
        <div className="my-8 rounded-xl border border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20 overflow-hidden">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-3 border-b border-blue-200 dark:border-blue-900/50">
                <Info className="size-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-blue-800 dark:text-blue-300 font-semibold m-0">{title}</h3>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {concepts.map((concept, i) => (
                    <div key={i} className="flex flex-col gap-1 p-3 rounded-lg bg-fd-background/50 border border-blue-100/50 dark:border-blue-800/20">
                        <span className="font-semibold text-sm text-blue-900 dark:text-blue-200">{concept.term}</span>
                        <span className="text-xs text-fd-muted-foreground leading-relaxed">{concept.definition}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
