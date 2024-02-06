import { Document, Schema, model } from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import { Status, statuses } from "@/validators/shared";
export interface Task extends Document {
  title: string;
  description: string;
  project: Project;
  user: User;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: statuses, default: "NOT_STARTED" },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

export const TaskModel = model<Task>("Task", taskSchema);
