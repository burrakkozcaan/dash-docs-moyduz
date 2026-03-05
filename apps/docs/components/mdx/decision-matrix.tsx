import { cn } from '@/lib/cn';
import { Check, X } from 'lucide-react';

export interface DecisionMatrixProps {
    scenarios: {
        name: string;
        description?: string;
        pros: string[];
        cons: string[];
        winner?: boolean;
    }[];
}

export function DecisionMatrix({ scenarios }: DecisionMatrixProps) {
    return (
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario, i) => (
                <div
                    key={i}
                    className={cn(
                        "p-6 rounded-xl border flex flex-col gap-4 relative overflow-hidden",
                        scenario.winner ? "border-brand bg-brand/5 shadow-brand/10 shadow-lg" : "bg-fd-card"
                    )}
                >
                    {scenario.winner && (
                        <div className="absolute top-0 right-0 bg-brand text-brand-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                            ÖNERİLEN
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-semibold m-0">{scenario.name}</h3>
                        {scenario.description && <p className="text-sm text-fd-muted-foreground mt-1 mb-0">{scenario.description}</p>}
                    </div>

                    <div className="flex-1">
                        <div className="space-y-2 mb-4">
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">Avantajlar</span>
                            <ul className="space-y-1 m-0 p-0 list-none">
                                {scenario.pros.map((pro, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm m-0">
                                        <Check className="size-4 text-green-500 shrink-0 mt-0.5" />
                                        <span>{pro}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Dezavantajlar</span>
                            <ul className="space-y-1 m-0 p-0 list-none">
                                {scenario.cons.map((con, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm m-0">
                                        <X className="size-4 text-red-500 shrink-0 mt-0.5" />
                                        <span>{con}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
