import { z } from "zod";

export const taskValidator = z.object({
  _id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  projectId: z.string(),
  userId: z.string(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  progress: z.number().max(100).min(0).transform(Math.round),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const createTaskValidator = taskValidator
  .omit({
    _id: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ name: true, projectId: true, userId: true, status: true });

export const updateTaskValidator = taskValidator
  .omit({
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ _id: true, projectId: true, userId: true });
