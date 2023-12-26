import mongoose from "mongoose";

export async function countTasksByType() {
  type TaskCount = Array<{ status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"; count: number }>;
  const initialTaskCount: TaskCount = [
    { status: "NOT_STARTED", count: 0 },
    { status: "IN_PROGRESS", count: 0 },
    { status: "COMPLETED", count: 0 },
  ];
  const foundTaskCount = await mongoose
    .model("Task")
    .aggregate([{ $match: { user: this._id } }, { $group: { _id: "$status", count: { $sum: 1 } } }]);
  if (foundTaskCount.length === 0) {
    return initialTaskCount;
  }
  const taskCount = initialTaskCount.map((status) => {
    const foundStatus = foundTaskCount.find((found) => found._id === status.status);
    if (foundStatus) {
      return { status: foundStatus._id, count: foundStatus.count };
    }
    return status;
  });

  return taskCount;
}
