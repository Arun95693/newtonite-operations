import type { TeamRole } from "@/constants/roles";
import {
  roleHasPermission,
  type Permission,
} from "@/lib/authorization/permissions";

export interface AuthorizationContext {
  userId: string;
  teamId: string;
  role: TeamRole;
}

export function authorize(
  context: AuthorizationContext,
  permission: Permission,
): void {
  if (!roleHasPermission(context.role, permission)) {
    throw new Error("FORBIDDEN");
  }
}