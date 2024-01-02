import mongoose from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import { Audit, auditSchema } from "./Audit";
import { Status, statuses } from "@/validators/shared";

export interface Task extends Audit, mongoose.Document {
  name: string;
  description: string;
  deadline: Date | false;
  project: Project;
  user: User;
  status: Status;
  progress: number;
}

const taskSchema = new mongoose.Schema<Task>({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: statuses, default: "NOT_STARTED" },
});

taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createdBy = this.user.id;
  }

  if (this.isModified()) {
    this.updatedBy = this.user.id;
  }
  if (this.deadline) {
    this.deadline = new Date(this.deadline);
  }
  next();
});

taskSchema.add(auditSchema);

export const TaskModel = mongoose.model<Task>("Task", taskSchema);
