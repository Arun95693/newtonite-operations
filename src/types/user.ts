import type { TeamRole } from "@/constants/roles";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TeamMembership {
  userId: string;
  teamId: string;
  role: TeamRole;
}