import mongoose from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import { auditSchema } from "./Audit";

export interface Client extends mongoose.Document {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  projects: Project[];
  user: User;
}

export interface CreateClientInput extends Omit<Client, "projects"> {
  userId: string;
}

export interface UpdateClientInput extends Partial<Omit<Client, "projects">> {
  id: string;
}

const clientSchema = new mongoose.Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, match: /^\+\d{1,15}$/ },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: true }
);

clientSchema.add(auditSchema);

export const ClientModel = mongoose.model<Client>("Client", clientSchema);
