import mongoose from "mongoose";
import { Project } from "./Project";
import { Client } from "./Client";
import { Audit, auditSchema } from "./Audit";

const roles = ["ADMIN", "USER"] as const;

export interface User extends Audit, mongoose.Document {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  photo?: string;
  projects: Project[];
  clients: Client[];
  role: "ADMIN" | "USER";
}
const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true, maxlength: 100 },
    username: { type: String, required: true, unique: true, maxlength: 32 },
    email: { type: String, required: true, unique: true, maxlength: 64 },
    password: { type: String, required: true, maxlength: 64 },
    photo: { type: String, required: false },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
    role: { type: String, enum: roles, default: "USER" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    autoIndex: true,
  }
);

userSchema.add(auditSchema);

userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

userSchema.virtual("projectCount", {
  ref: "Project",
  localField: "_id",
  foreignField: "user",
  count: true,
});
export const UserModel = mongoose.model<User>("User", userSchema);
