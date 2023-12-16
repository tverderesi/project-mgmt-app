import { z } from "zod";
export const loginSchema = z.object({
  user: z.string().or(z.string().email()),
  password: z.string(),
});
