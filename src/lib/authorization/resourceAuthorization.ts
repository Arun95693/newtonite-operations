import type { TeamMembership } from "@/types/user";
import type { WorkItem } from "@/types/workItem";

import {
  PERMISSION,
  roleHasPermission,
} from "@/lib/authorization/permissions";

export function isTeamMember(
  membership: TeamMembership,
  teamId: string,
): boolean {
  return membership.teamId === teamId;
}

export function canViewWorkItem(
  membership: TeamMembership,
  workItem: WorkItem,
): boolean {
  return (
    isTeamMember(membership, workItem.teamId) &&
    roleHasPermission(
      membership.role,
      PERMISSION.VIEW_WORK_ITEM,
    )
  );
}

export function canEditWorkItem(
  membership: TeamMembership,
  workItem: WorkItem,
): boolean {
  return (
    isTeamMember(membership, workItem.teamId) &&
    roleHasPermission(
      membership.role,
      PERMISSION.EDIT_WORK_ITEM,
    )
  );
}

export function canChangePriority(
  membership: TeamMembership,
  workItem: WorkItem,
): boolean {
  return (
    isTeamMember(membership, workItem.teamId) &&
    roleHasPermission(
      membership.role,
      PERMISSION.CHANGE_PRIORITY,
    )
  );
}

export function canTransitionWorkItem(
  membership: TeamMembership,
  workItem: WorkItem,
): boolean {
  if (!isTeamMember(membership, workItem.teamId)) {
    return false;
  }

  if (
    !roleHasPermission(
      membership.role,
      PERMISSION.TRANSITION_WORK_ITEM,
    )
  ) {
    return false;
  }

  // Leads can transition any work item in their team.
  if (membership.role === "LEAD") {
    return true;
  }

  // Members can transition work items they created
  // or currently own.
  return (
    workItem.createdBy === membership.userId ||
    workItem.assignedTo === membership.userId
  );
}

export function canAssignToSelf(
  membership: TeamMembership,
  workItem: WorkItem,
): boolean {
  return (
    isTeamMember(membership, workItem.teamId) &&
    roleHasPermission(
      membership.role,
      PERMISSION.ASSIGN_SELF,
    )
  );
}

export function canAssignToAnotherUser(
  membership: TeamMembership,
  workItem: WorkItem,
): boolean {
  return (
    isTeamMember(membership, workItem.teamId) &&
    roleHasPermission(
      membership.role,
      PERMISSION.ASSIGN_OTHERS,
    )
  );
}

export function canManageTeamMembers(
  membership: TeamMembership,
): boolean {
  return roleHasPermission(
    membership.role,
    PERMISSION.MANAGE_TEAM_MEMBERS,
  );
}