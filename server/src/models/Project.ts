import mongoose from "mongoose";
import { Client } from "./Client";
import { User } from "./User";
import BaseSchema from "./BaseModel";

export interface Project {
  name: string;
  description: string;
  client: Client;
  progress: number;
  user: User;
}

const projectSchema = new mongoose.Schema<Project>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    progress: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: true }
);

projectSchema.add(BaseSchema);

const ProjectModel = mongoose.model<Project>("Project", projectSchema);

export default ProjectModel;
