import mongoose from "mongoose";
import { z } from "zod";

export function getUniqueFields(Model: mongoose.Model<any, any>) {
  return Object.keys(Model.schema.paths).filter((path) => Model.schema.paths[path].options.unique);
}

export async function checkUniqueFields(input: any, uniqueFields: string[]) {
  const errors: string[] = [];
  uniqueFields.forEach((key) => {
    if (!input[key]) {
      errors.push(`${key} is required!`);
    }
  });

  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
}
export function requiredFieldsCheck<T>(
  input: Partial<T>,
  validator: z.ZodObject<any, any, any> | z.ZodEffects<z.ZodTypeAny>
) {
  const result = validator.safeParse(input);

  if (!result.success) {
    const formatted = result.error.format();
    const errors = Object.keys(formatted)
      .filter((key) => key !== "_errors")
      .map((key) => JSON.stringify({ [key]: formatted[key]?._errors?.[0] }));
    throw new Error(errors.join(", "));
  }
}
