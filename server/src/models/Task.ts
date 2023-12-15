import mongoose from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import { Audit, auditSchema } from "./Audit";
// TODO: Add Deadlines
export interface Task extends Audit, mongoose.Document {
  _id?: string;
  name: string;
  description: string;
  project: Project;
  user: User;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  progress: number;
}

const taskSchema = new mongoose.Schema<Task>({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
    default: "NOT_STARTED",
  },
  progress: { type: Number, default: 0, max: 100, min: 0, transform: Math.round },
});

taskSchema.pre("save", async function (next) {
  if (this.status === "COMPLETED") {
    this.progress = 100;
  }
  if (this.status == "NOT_STARTED") {
    this.progress = 0;
  }
  next();
});

taskSchema.add(auditSchema);

export const TaskModel = mongoose.model<Task>("Task", taskSchema);
