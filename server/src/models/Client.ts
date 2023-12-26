import mongoose from "mongoose";
import { Project } from "./Project";
import { User } from "./User";
import { Audit, auditSchema } from "./Audit";

export interface Client extends Audit, mongoose.Document {
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
    phone: { type: String, required: true, match: /^\+\d{1,15}$/ },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, autoIndex: true }
);

clientSchema.add(auditSchema);

clientSchema.pre<Client>("save", function (next) {
  if (this.isNew) {
    this.createdBy = this.user.id;
  }

  if (this.isModified()) {
    this.updatedBy = this.user.id;
  }
  next();
});

export const ClientModel = mongoose.model<Client>("Client", clientSchema);
