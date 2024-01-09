import { z } from "zod";

const base = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  user: z.string(),
  client: z.string(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
});

const create = base.omit({ id: true });

const update = base.partial().required({ id: true });

export default { base, create, update };
