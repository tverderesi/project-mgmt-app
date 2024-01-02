import { z } from "zod";
export const loginSchema = z.object({
  user: z.string(),
  password: z.string(),
});
