import { z } from "zod";
export const queryPaginationParams = {
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
};
export type Enum<T extends readonly any[]> = T[number];

export const statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED", "CANCELLED", "OVERDUE", "ON_HOLD"] as const;
export const roles = ["ADMIN", "USER"] as const;

export type Role = Enum<typeof roles>;
export type Status = Enum<typeof statuses>;
