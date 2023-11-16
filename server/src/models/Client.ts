import mongoose from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import BaseSchema from "./BaseModel";
export interface Client {
  name: string;
  email: string;
  phone: string;
  projects: Project[];
  userId: User;
}

const clientSchema = new mongoose.Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: process.env.NODE_ENV === "development" ? true : false }
);

clientSchema.add(BaseSchema);

const ClientModel = mongoose.model<Client>("Client", clientSchema);

export default ClientModel;
