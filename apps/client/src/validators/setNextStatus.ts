export const setNextStatus = (prevStatus: string) => {
  const status = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;
  const currentIdx = status.indexOf(prevStatus as "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED");
  if (currentIdx === -1) {
    return status[0];
  }
  const nextStatus = status[(currentIdx + 1) % status.length];
  return nextStatus;
};
