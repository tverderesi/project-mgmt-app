import mongoose from "mongoose";

export interface Audit extends mongoose.Document {
  deletedAt: Date;
  deletedBy: string;
  createdBy: string;
  updatedBy: string;
}

export const auditSchema = new mongoose.Schema(
  {
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true, autoIndex: true }
);
