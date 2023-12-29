export type Enum<T extends readonly any[]> = T[number];

export const statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED", "CANCELLED", "OVERDUE", "ON_HOLD"] as const;
