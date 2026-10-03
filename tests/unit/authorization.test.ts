import { describe, expect, it } from "vitest";

import { TEAM_ROLE } from "@/constants/roles";

import {
  PERMISSION,
  roleHasPermission,
} from "@/lib/authorization/permissions";

describe("authorization permissions", () => {
  describe("MEMBER", () => {
    it("can view work items", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.MEMBER,
          PERMISSION.VIEW_WORK_ITEM,
        ),
      ).toBe(true);
    });

    it("can create work items", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.MEMBER,
          PERMISSION.CREATE_WORK_ITEM,
        ),
      ).toBe(true);
    });

    it("can assign work to themselves", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.MEMBER,
          PERMISSION.ASSIGN_SELF,
        ),
      ).toBe(true);
    });

    it("cannot assign work to another person", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.MEMBER,
          PERMISSION.ASSIGN_OTHERS,
        ),
      ).toBe(false);
    });

    it("cannot manage team members", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.MEMBER,
          PERMISSION.MANAGE_TEAM_MEMBERS,
        ),
      ).toBe(false);
    });
  });

  describe("LEAD", () => {
    it("can assign work to another team member", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.LEAD,
          PERMISSION.ASSIGN_OTHERS,
        ),
      ).toBe(true);
    });

    it("can manage team members", () => {
      expect(
        roleHasPermission(
          TEAM_ROLE.LEAD,
          PERMISSION.MANAGE_TEAM_MEMBERS,
        ),
      ).toBe(true);
    });
  });
});