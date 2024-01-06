import { Document, Schema, model } from "mongoose";
import { Project } from "./Project";
import { Client } from "./Client";
import bcrypt from "bcrypt";
import { countTasksByType } from "../utils/countTasksByType";
import { roles } from "@/validators/shared";

export interface User extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  projects: Project[];
  clients: Client[];
  role: (typeof roles)[number];
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, maxlength: 100 },
    username: { type: String, required: true, unique: true, maxlength: 32 },
    email: { type: String, required: true, unique: true, maxlength: 64 },
    password: { type: String, required: true, maxlength: 64 },
    clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    role: { type: String, enum: roles, default: "USER" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    autoIndex: true,
  }
);

userSchema.virtual("projectCount", {
  ref: "Project",
  localField: "_id",
  foreignField: "user",
  get: async function () {
    const count = await this.model("Project").countDocuments({ user: this._id });
    return count || 0;
  },
});

userSchema.virtual("clientCount", {
  ref: "Client",
  localField: "_id",
  foreignField: "user",
  count: true,
});

userSchema.virtual("totalTaskCount", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
  get: async function () {
    const count = await this.model("Task").countDocuments({ user: this._id });
    return count || 0;
  },
});

userSchema.virtual("taskCount", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
  justOne: false,
  get: countTasksByType,
});

userSchema.pre<User>("save", async function (next) {
  console.log(this.isModified("password"));
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

userSchema.pre<User>("findOneAndUpdate", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

export const UserModel = model<User>("User", userSchema);
