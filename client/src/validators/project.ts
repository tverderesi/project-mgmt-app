import { z } from "zod";

export const projectValidator = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  deletedAt: z.string().optional(),
  user: z.string().optional(),
  client: z.string().optional(),
  autoProgress: z.boolean().optional(),
  progress: z
    .number()
    .refine(
      (arg) => {
        console.log(arg);
        return arg > 0 || arg < 100;
      },
      {
        message: "Progress must be between 0 and 100",
        path: ["progress"],
      }
    )
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
  .required({ name: true, description: true, user: true, status: true, progress: true, client: true, autoProgress: true });

export const updateProjectValidator = projectValidator
  .omit({
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ _id: true, userId: true });
