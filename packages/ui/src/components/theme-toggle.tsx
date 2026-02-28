"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                disabled
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        >
            <div className="relative">
                <Sun
                    className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark
                            ? "rotate-90 scale-0 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                        }`}
                />
                <Moon
                    className={`absolute top-0 left-0 h-[1.2rem] w-[1.2rem] transition-all ${isDark
                            ? "rotate-0 scale-100 opacity-100"
                            : "rotate-90 scale-0 opacity-0"
                        }`}
                />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
