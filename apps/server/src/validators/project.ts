import { z } from "zod";
import { queryPaginationParams } from "./shared";
import { statuses } from "./shared";

const base = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string(),
  deletedAt: z.string().datetime(),
  user: z.string(),
  client: z.string(),
  status: z.enum(statuses),
});

const query = base.partial().extend(queryPaginationParams);

const create = base.omit({ deletedAt: true, id: true }).partial({ description: true });

const update = base.partial({
  name: true,
  description: true,
  status: true,
  deletedAt: true,
  client: true,
});

export default { base, query, create, update };
