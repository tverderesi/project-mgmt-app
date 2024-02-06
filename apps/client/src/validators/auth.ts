import { z } from "zod";
export const loginSchema = z.object({
  user: z.string().min(3),
  password: z.string().min(8),
});
