export const WORK_ITEM_STATUS = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  BLOCKED: "BLOCKED",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;

export type WorkItemStatus =
  (typeof WORK_ITEM_STATUS)[keyof typeof WORK_ITEM_STATUS];

export const WORK_ITEM_STATUSES = Object.values(WORK_ITEM_STATUS);