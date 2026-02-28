export type ViewType = "list" | "board" | "timeline";

export type Ordering = "manual" | "alphabetical" | "date";

export type GroupBy = "none" | "status" | "type";

export type ViewOptions = {
  viewType: ViewType;
  ordering: Ordering;
  groupBy: GroupBy;
  showClosed: boolean;
};

export type FilterChip = {
  key: string;
  value: string;
};

export const DEFAULT_VIEW_OPTIONS: ViewOptions = {
  viewType: "list",
  ordering: "manual",
  groupBy: "none",
  showClosed: true,
};
