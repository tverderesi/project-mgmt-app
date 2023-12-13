import { UserModel } from "@/models/User";
import mongoose from "mongoose";

export function getUniqueKeys(Model: mongoose.Model<any, any>) {
  const uniqueKeys: string[] = [];

  for (let path in Model.schema.paths) {
    if (Model.schema.paths[path].options.unique) {
      uniqueKeys.push(path);
    }
  }

  return uniqueKeys;
}

async function isUniqueKey(key: string, value: string, Model: mongoose.Model<any, any>) {
  const existingUser = await Model.findOne({ [key]: value });
  return !existingUser;
}
export async function checkUniqueKeys(input: any, uniqueKeys: string[]) {
  const errors: string[] = [];

  for (const key of uniqueKeys) {
    if (!isUniqueKey(key, input[key], UserModel)) {
      errors.push(`${key} already registered!`);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
}
