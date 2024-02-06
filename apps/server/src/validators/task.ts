import { z } from "zod";
import { statuses } from "./shared";

const base = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  project: z.string(),
  user: z.string(),
  status: z.enum(statuses),
});
const filter = base.partial();
const update = base.partial().required({ id: true });
const create = base.omit({ id: true });

export default { base, filter, update, create };
