import { Document, model, Schema } from "mongoose";
import { Client } from "./Client";
import { User } from "./User";
import { Task } from "./Task";

import { Status, statuses } from "@/validators/shared";

export interface Project extends Document {
  name: string;
  description?: string;
  deadline: Date;
  client: Client;
  status: Status;
  tasks: Task[];
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    description: { type: String },
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    status: {
      type: String,
      enum: statuses,
      default: "NOT_STARTED",
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true, autoIndex: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.post("findOneAndDelete", async function (next) {
  const filters = this.getFilter();
  await model("Task").deleteMany({ project: filters._id });
  next();
});

projectSchema.post("deleteMany", async function (next) {
  const filters = this.getFilter();
  await model("Task").deleteMany({ project: filters._id });
  next();
});

projectSchema.post("deleteOne", async function (next) {
  const filters = this.getFilter();
  await model("Task").deleteMany({ project: filters._id });
  next();
});

export const ProjectModel = model<Project>("Project", projectSchema);
