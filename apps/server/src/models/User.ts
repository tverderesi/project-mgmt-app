import { Document, Schema, model } from "mongoose";
import { Project } from "./Project";
import { Client } from "./Client";
import bcrypt from "bcrypt";
import { Status, statuses, Role, roles } from "@/validators/shared";

export interface User extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  projects: Project[];
  clients: Client[];
  role: Role;
  countTasksByType: () => Promise<{ status: Status; count: number }[]>;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, maxlength: 100 },
    username: { type: String, required: true, unique: true, maxlength: 32 },
    email: { type: String, required: true, unique: true, maxlength: 64 },
    password: { type: String, required: true, maxlength: 64 },
    role: { type: String, enum: roles, default: "USER" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    autoIndex: true,
    methods: {
      countTasksByType() {
        type TaskCount = { status: Status; count: number }[];
        const initialTaskCount: TaskCount = [
          { status: "NOT_STARTED", count: 0 },
          { status: "IN_PROGRESS", count: 0 },
          { status: "COMPLETED", count: 0 },
        ];

        const taskCount = model("Task")
          .aggregate([{ $match: { user: this._id } }, { $group: { _id: "$status", count: { $sum: 1 } } }])
          .then((foundTaskCount) => {
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
          });
        return taskCount;
      },
    },
  }
);

userSchema.virtual("projectCount", {
  ref: "Project",
  localField: "_id",
  foreignField: "user",
  count: true,
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
  count: true,
});

userSchema.pre<User>("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

export const UserModel = model<User>("User", userSchema);
