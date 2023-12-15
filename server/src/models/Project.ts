import mongoose from "mongoose";
import { Client } from "./Client";
import { User } from "./User";
import { Task } from "./Task";
import { Audit, auditSchema } from "./Audit";
//TODO: Add Deadlines
export interface Project extends Audit, mongoose.Document {
  _id?: string;
  name: string;
  description: string;
  client: Client;
  autoProgress: boolean;
  progress: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  tasks: Task[];
  user: User;
}

const projectSchema = new mongoose.Schema<Project>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    autoProgress: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
      default: "NOT_STARTED",
    },
    progress: { type: Number, default: 0, max: 100, min: 0, transform: Math.round },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true, autoIndex: true }
);

projectSchema.pre("save", async function (next) {
  if (!this.autoProgress) {
    return next();
  }
  const tasks = await mongoose.model("Task").find({ project: this._id, status: "COMPLETED" });
  const progress = Math.round((tasks.length / this.tasks.length) * 100);
  this.progress = progress;
  next();
});

projectSchema.post("findOneAndDelete", async function (next) {
  const filters = this.getFilter();
  await mongoose.model("Task").deleteMany({ project: filters._id });
  next();
});

projectSchema.add(auditSchema);

export const ProjectModel = mongoose.model<Project>("Project", projectSchema);
