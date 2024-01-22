import { createErrorMessage } from "@/utils/createErrorMessage";
import { z } from "zod";

export function checkRequiredFields<T>(
  input: Partial<T>,
  validator: z.ZodObject<any, any, any> | z.ZodEffects<z.ZodTypeAny>
): { type: string; message: string } | null {
  const result = validator.safeParse(input);
  if (!result.success) {
    const formatted = result.error.format();
    const errors = Object.keys(formatted)
      .filter((key) => key !== "_errors")
      .map((key) => JSON.stringify({ [key]: formatted[key]?._errors?.[0] }));
    console.log(errors);
    throw new Error(createErrorMessage({ type: "INPUT_ERROR", message: errors.join(", ") }));
  }
  return null;
}

export function TreatMongoUniqueFieldsError(e: any) {
  if (e.code === 11000) {
    const duplicatedFields = Object.keys(e.keyPattern);
    const message = duplicatedFields.map((field) => `${field} is already on the database!`).join(", ");
    const stringifiedErrorMessage = JSON.stringify({ [duplicatedFields[0]]: message });
    throw new Error(createErrorMessage({ type: "INPUT_ERROR", message: stringifiedErrorMessage }));
  }
}
export function pruneEmptyValues(rest: {
  name?: string | undefined;
  username?: string | undefined;
  projects?: string[] | undefined;
  clients?: string[] | undefined;
  role?: "USER" | "ADMIN" | undefined;
  email?: string | undefined;
  password?: string | undefined;
}) {
  Object.keys(rest).forEach((key) => rest[key] === undefined || rest[key] === null || (rest[key] === "" && delete rest[key]));
}
