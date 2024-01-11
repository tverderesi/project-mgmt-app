import { Document, Schema, model } from "mongoose";
import { Project } from "./Project";
import { User } from "./User";

export interface Client extends Document {
  name: string;
  email: string;
  phone: string;
  projects: Project[];
  user: User;
}

const clientSchema = new Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: true }
);

export const ClientModel = model<Client>("Client", clientSchema);
