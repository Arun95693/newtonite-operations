import { describe, expect, it } from "vitest";

import { TEAM_ROLE } from "@/constants/roles";

import { WORK_ITEM_PRIORITY } from "@/constants/workItemPriority";
import { WORK_ITEM_STATUS } from "@/constants/workItemStatus";

import {
  canAssignToAnotherUser,
  canAssignToSelf,
  canEditWorkItem,
  canManageTeamMembers,
  canTransitionWorkItem,
  canViewWorkItem,
} from "@/lib/authorization/resourceAuthorization";

import type { TeamMembership } from "@/types/user";
import type { WorkItem } from "@/types/workItem";

const engineeringMember: TeamMembership = {
  userId: "user-1",
  teamId: "team-engineering",
  role: TEAM_ROLE.MEMBER,
};

const engineeringLead: TeamMembership = {
  userId: "user-2",
  teamId: "team-engineering",
  role: TEAM_ROLE.LEAD,
};

const financeMember: TeamMembership = {
  userId: "user-3",
  teamId: "team-finance",
  role: TEAM_ROLE.MEMBER,
};

const unassignedWorkItem: WorkItem = {
  id: "work-1",
  teamId: "team-engineering",
  title: "Fix login issue",
  description: "Investigate authentication failure.",
  status: WORK_ITEM_STATUS.OPEN,
  priority: WORK_ITEM_PRIORITY.HIGH,
  createdBy: "user-4",
  assignedTo: null,
  version: 1,
  createdAt: "2026-10-03T00:00:00.000Z",
  updatedAt: "2026-10-03T00:00:00.000Z",
};

const memberOwnedWorkItem: WorkItem = {
  ...unassignedWorkItem,
  id: "work-2",
  createdBy: "user-1",
  assignedTo: "user-1",
};

describe("resource-level authorization", () => {
  it("allows a team member to view a team work item", () => {
    expect(
      canViewWorkItem(
        engineeringMember,
        unassignedWorkItem,
      ),
    ).toBe(true);
  });

  it("denies access to a work item belonging to another team", () => {
    expect(
      canViewWorkItem(
        financeMember,
        unassignedWorkItem,
      ),
    ).toBe(false);
  });

  it("allows same-team members to edit work items", () => {
    expect(
      canEditWorkItem(
        engineeringMember,
        unassignedWorkItem,
      ),
    ).toBe(true);
  });

  it("allows a member to transition their own work item", () => {
    expect(
      canTransitionWorkItem(
        engineeringMember,
        memberOwnedWorkItem,
      ),
    ).toBe(true);
  });

  it("denies a member from transitioning another person's work item", () => {
    expect(
      canTransitionWorkItem(
        engineeringMember,
        unassignedWorkItem,
      ),
    ).toBe(false);
  });

  it("allows a lead to transition any work item in their team", () => {
    expect(
      canTransitionWorkItem(
        engineeringLead,
        unassignedWorkItem,
      ),
    ).toBe(true);
  });

  it("allows a member to take ownership of a team work item", () => {
    expect(
      canAssignToSelf(
        engineeringMember,
        unassignedWorkItem,
      ),
    ).toBe(true);
  });

  it("allows a lead to assign work to another team member", () => {
    expect(
      canAssignToAnotherUser(
        engineeringLead,
        unassignedWorkItem,
      ),
    ).toBe(true);
  });

  it("denies a member from assigning work to another user", () => {
    expect(
      canAssignToAnotherUser(
        engineeringMember,
        unassignedWorkItem,
      ),
    ).toBe(false);
  });

  it("allows a lead to manage team members", () => {
    expect(
      canManageTeamMembers(
        engineeringLead,
      ),
    ).toBe(true);
  });

  it("denies a member from managing team members", () => {
    expect(
      canManageTeamMembers(
        engineeringMember,
      ),
    ).toBe(false);
  });
});