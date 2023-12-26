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
  autoProgress: z.boolean(),
  progress: z
    .number()
    .refine((arg) => arg > 0 || arg < 100, {
      message: "Progress must be between 0 and 100",
      path: ["progress"],
    })
    .transform(Math.round),

  status: z.enum(statuses),
});

const query = base.partial().extend(queryPaginationParams);

const create = base.omit({ deletedAt: true, id: true }).partial({ description: true });

const update = base.partial({
  name: true,
  description: true,
  status: true,
  autoProgress: true,
  progress: true,
  deletedAt: true,
  client: true,
});

export default { base, query, create, update };
