import mongoose from "mongoose";
import { Project } from "./Project";
import { UserDocument } from "./User";

export interface Client {
  name: string;
  email: string;
  phone: string;
  projects: Project[];
  user: UserDocument;
}

const clientSchema = new mongoose.Schema<Client>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: process.env.NODE_ENV === "development" ? true : false }
);

const ClientModel = mongoose.model<Client>("Client", clientSchema);

export default ClientModel;
