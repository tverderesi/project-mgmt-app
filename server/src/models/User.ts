import mongoose from "mongoose";
import { Project } from "./Project";
import { Client } from "./Client";
import BaseSchema from "./BaseModel";

const roles = ["ADMIN", "USER"] as const;

export interface User {
  name: string;
  username: string;
  password: string;
  photo?: Buffer;
  projects: Project[];
  clients: Client[];
  role: string;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true, maxlength: 100 },
  username: { type: String, required: true, unique: true, maxlength: 32 },
  password: { type: String, required: true, maxlength: 64 },
  photo: { type: Buffer },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
  role: { type: String, enum: roles, default: "USER" },
});

userSchema.add(BaseSchema);

export const UserModel = mongoose.model<User>("User", userSchema);
