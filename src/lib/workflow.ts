import {
  WORK_ITEM_STATUS,
  type WorkItemStatus,
} from "../constants/workItemStatus";

const ALLOWED_TRANSITIONS: Record<
  WorkItemStatus,
  readonly WorkItemStatus[]
> = {
  [WORK_ITEM_STATUS.OPEN]: [
    WORK_ITEM_STATUS.IN_PROGRESS,
    WORK_ITEM_STATUS.CLOSED,
  ],

  [WORK_ITEM_STATUS.IN_PROGRESS]: [
    WORK_ITEM_STATUS.BLOCKED,
    WORK_ITEM_STATUS.RESOLVED,
  ],

  [WORK_ITEM_STATUS.BLOCKED]: [
    WORK_ITEM_STATUS.IN_PROGRESS,
  ],

  [WORK_ITEM_STATUS.RESOLVED]: [
    WORK_ITEM_STATUS.CLOSED,
    WORK_ITEM_STATUS.IN_PROGRESS,
  ],

  [WORK_ITEM_STATUS.CLOSED]: [],
};

export function canTransition(
  currentStatus: WorkItemStatus,
  nextStatus: WorkItemStatus,
): boolean {
  return ALLOWED_TRANSITIONS[currentStatus].includes(nextStatus);
}

export function getAllowedTransitions(
  currentStatus: WorkItemStatus,
): readonly WorkItemStatus[] {
  return ALLOWED_TRANSITIONS[currentStatus];
}