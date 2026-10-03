import { describe, expect, it } from "vitest";

import { WORK_ITEM_STATUS } from "@/constants/workItemStatus";

import {
  canTransition,
  getAllowedTransitions,
} from "@/lib/workflow";

describe("work item workflow", () => {
  it("allows OPEN → IN_PROGRESS", () => {
    expect(
      canTransition(
        WORK_ITEM_STATUS.OPEN,
        WORK_ITEM_STATUS.IN_PROGRESS,
      ),
    ).toBe(true);
  });

  it("allows IN_PROGRESS → BLOCKED", () => {
    expect(
      canTransition(
        WORK_ITEM_STATUS.IN_PROGRESS,
        WORK_ITEM_STATUS.BLOCKED,
      ),
    ).toBe(true);
  });

  it("allows BLOCKED → IN_PROGRESS", () => {
    expect(
      canTransition(
        WORK_ITEM_STATUS.BLOCKED,
        WORK_ITEM_STATUS.IN_PROGRESS,
      ),
    ).toBe(true);
  });

  it("rejects OPEN → RESOLVED", () => {
    expect(
      canTransition(
        WORK_ITEM_STATUS.OPEN,
        WORK_ITEM_STATUS.RESOLVED,
      ),
    ).toBe(false);
  });

  it("rejects CLOSED → OPEN", () => {
    expect(
      canTransition(
        WORK_ITEM_STATUS.CLOSED,
        WORK_ITEM_STATUS.OPEN,
      ),
    ).toBe(false);
  });

  it("returns the correct transitions for OPEN", () => {
    expect(
      getAllowedTransitions(WORK_ITEM_STATUS.OPEN),
    ).toEqual([
      WORK_ITEM_STATUS.IN_PROGRESS,
      WORK_ITEM_STATUS.CLOSED,
    ]);
  });
});