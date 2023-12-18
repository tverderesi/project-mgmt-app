import { z } from "zod";

export const projectValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  deletedAt: z.string().optional(),
  user: z.string().optional(),
  client: z.string().optional(),
  autoProgress: z.boolean().optional(),
  progress: z
    .number()
    .refine((arg) => arg > 0 || arg < 100, {
      message: "Progress must be between 0 and 100",
      path: ["progress"],
    })
    .transform((arg) => Math.round(arg))
    .optional(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]).optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const createProjectValidator = projectValidator
  .omit({
    id: true,
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ name: true, user: true, client: true, status: true });

export const updateProjectValidator = projectValidator
  .omit({
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ id: true, user: true });
