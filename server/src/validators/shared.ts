import { z } from "zod";
export const queryPaginationParams = {
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
};
export const statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED", "CANCELLED", "OVERDUE", "ON_HOLD"] as const;
export type Status = (typeof statuses)[number];
export const roles = ["ADMIN", "USER"] as const;
