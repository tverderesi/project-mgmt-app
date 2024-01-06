import { z } from "zod";
import { queryPaginationParams } from "./shared";

const base = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email().min(2).max(70),
  user: z.string(),
  phone: z.string().max(15),
});

const query = base.partial().extend(queryPaginationParams);

const create = base.omit({ id: true }).required();

const update = base.required({ id: true });

export default { base, query, create, update };
