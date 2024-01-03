import { Document, Schema, model } from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import { Status, statuses } from "@/validators/shared";

export interface Task extends Document {
  name: string;
  description: string;
  deadline: Date | false;
  project: Project;
  user: User;
  status: Status;
  progress: number;
}

const taskSchema = new Schema<Task>({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: statuses, default: "NOT_STARTED" },
});

taskSchema.pre("save", async function (next) {
  if (this.deadline) {
    this.deadline = new Date(this.deadline);
  }
  next();
});

export const TaskModel = model<Task>("Task", taskSchema);
