export const WORK_ITEM_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type WorkItemPriority =
  (typeof WORK_ITEM_PRIORITY)[keyof typeof WORK_ITEM_PRIORITY];