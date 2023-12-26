import { z } from "zod";
import { queryPaginationParams } from "./shared";

const base = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email().min(2).max(70),
  deletedAt: z.string().datetime(),
  user: z.string(),
  phone: z.string().max(15),
});

const query = base.partial().extend(queryPaginationParams);

const create = base.omit({ deletedAt: true, id: true }).required({
  name: true,
  email: true,
  phone: true,
  user: true,
});

const update = base.partial({
  name: true,
  email: true,
  phone: true,
  deletedAt: true,
});

export default { base, query, create, update };
