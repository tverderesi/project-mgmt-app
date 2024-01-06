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

    return { type: "INPUT_ERROR", message: errors.join(", ") };
  }
  return null;
}
