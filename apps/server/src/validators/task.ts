import { z } from "zod";
import { statuses } from "./shared";

export const base = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  project: z.string(),
  user: z.string(),
  status: z.enum(statuses),
});

export const update = base.partial().required({ id: true });
export const create = base.omit({ id: true });

export default { base, update, create };