import { z } from "zod";
import { queryPaginationParams, statuses } from "./shared";

export const base = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  project: z.string(),
  user: z.string(),
  status: z.enum(statuses),
  progress: z.number().max(100).min(0).transform(Math.round),
});

export const query = base.extend(queryPaginationParams);

export const update = base.partial({ name: true, description: true, status: true, progress: true, project: true, user: true });

export const create = base.omit({ id: true });

export default { base, query, update, create };
