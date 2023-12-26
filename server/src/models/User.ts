import mongoose from "mongoose";
import { Project } from "./Project";
import { Client } from "./Client";
import { Audit, auditSchema } from "./Audit";
import bcrypt from "bcrypt";
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
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
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
  const count = await this.model("User").countDocuments({ username: this.username });
  if (count > 0) {
    next(new Error("Username already exists!"));
  }
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

export const UserModel = mongoose.model<User>("User", userSchema);

async function countTasksByType() {
  type TaskCount = Array<{ status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"; count: number }>;
  const initialTaskCount: TaskCount = [
    { status: "NOT_STARTED", count: 0 },
    { status: "IN_PROGRESS", count: 0 },
    { status: "COMPLETED", count: 0 },
  ];
  const foundTaskCount = await mongoose
    .model("Task")
    .aggregate([{ $match: { user: this._id } }, { $group: { _id: "$status", count: { $sum: 1 } } }]);
  if (foundTaskCount.length === 0) {
    return initialTaskCount;
  }
  const taskCount = initialTaskCount.map((status) => {
    const foundStatus = foundTaskCount.find((found) => found._id === status.status);
    if (foundStatus) {
      return { status: foundStatus._id, count: foundStatus.count };
    }
    return status;
  });

  return taskCount;
}
