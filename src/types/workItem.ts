import type { WorkItemStatus } from "../constants/workItemStatus";

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  status: WorkItemStatus;
}