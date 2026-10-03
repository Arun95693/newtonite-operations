export const TEAM_ROLE = {
  MEMBER: "MEMBER",
  LEAD: "LEAD",
} as const;

export type TeamRole =
  (typeof TEAM_ROLE)[keyof typeof TEAM_ROLE];

export const TEAM_ROLES = Object.values(TEAM_ROLE);