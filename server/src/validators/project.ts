import { z } from "zod";

export const projectValidator = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  deletedAt: z.string().optional(),
  userId: z.string().optional(),
  clientId: z.string().optional(),
  progress: z
    .number()
    .refine((arg) => arg < 0 || arg > 100, {
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
    _id: true,
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ name: true, description: true, userId: true, status: true, progress: true });

export const updateProjectValidator = projectValidator
  .omit({
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ _id: true, userId: true });
