import { z } from "zod";
import { statuses } from "./shared";

const base = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  user: z.string(),
  client: z.string(),
  status: z.enum(statuses),
});

const create = base.omit({ id: true });

const update = base.partial().required({ id: true });

export default { base, create, update };
