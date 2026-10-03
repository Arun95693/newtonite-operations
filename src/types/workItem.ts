import type { WorkItemPriority } from "@/constants/workItemPriority";
import type { WorkItemStatus } from "@/constants/workItemStatus";

export interface WorkItem {
  id: string;

  teamId: string;

  title: string;
  description: string;

  status: WorkItemStatus;
  priority: WorkItemPriority;

  createdBy: string;
  assignedTo: string | null;

  version: number;

  createdAt: string;
  updatedAt: string;
}