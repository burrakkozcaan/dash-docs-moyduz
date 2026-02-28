"use client";

import * as React from "react";

export function useTabObserver({
  onActiveTabChange,
}: {
  onActiveTabChange?: (prevTab: HTMLElement | null, activeTab: HTMLElement | null) => void;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const prevActiveRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const getActiveTrigger = () =>
      list.querySelector<HTMLElement>("[role=tab][data-state=active]") ?? null;

    const update = () => {
      const active = getActiveTrigger();
      if (active && onActiveTabChange) {
        onActiveTabChange(prevActiveRef.current, active);
        prevActiveRef.current = active;
      }
      if (!mounted) setMounted(true);
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(list, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, [onActiveTabChange, mounted]);

  return { mounted, listRef };
}
