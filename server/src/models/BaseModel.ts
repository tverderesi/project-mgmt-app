import mongoose, { Document, Schema } from "mongoose";
import { User } from "./User";

export interface BaseModel {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IBaseDocument extends Document {
  deletedAt: string | null;
  createdBy: User;
  updatedBy: User | null;
  deletedBy: User | null;
  delete: () => Promise<void>;
  restore: () => Promise<void>;
  findDeleted: () => Promise<void>;
}

const BaseSchema = new Schema<IBaseDocument>(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: String, default: null },
  },
  { timestamps: true }
);

BaseSchema.methods.delete = function () {
  this.deletedAt = new Date().toISOString();
  return this.save();
};

BaseSchema.methods.restore = function () {
  this.deletedAt = null;
  return this.save();
};

BaseSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

BaseSchema.methods.findDeleted = function () {
  return this.where({ deletedAt: { $ne: null } });
};

BaseSchema.pre("find", function () {
  this.where({ deletedAt: null });
});

export default BaseSchema;
