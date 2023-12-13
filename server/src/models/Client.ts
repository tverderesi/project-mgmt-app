import mongoose from "mongoose";
import { Project } from "./Project";
import { User } from "./User";

export interface Client {
  name: string;
  email: string;
  phone: string;
  projects: Project[];
  user: User;
}

const clientSchema = new mongoose.Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: true }
);

const ClientModel = mongoose.model<Client>("Client", clientSchema);

export default ClientModel;
