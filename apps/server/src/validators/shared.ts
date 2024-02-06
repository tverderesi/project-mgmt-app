type Enum<T extends readonly any[]> = T[number];

export const statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
export const roles = ["ADMIN", "USER"] as const;

export type Role = Enum<typeof roles>;
export type Status = Enum<typeof statuses>;
