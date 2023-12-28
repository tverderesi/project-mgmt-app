import { z } from "zod";

export const clientValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  deletedAt: z.string().optional(),
  phone: z.string().optional(),
  photo: z.any().optional(),
  user: z.string().optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const createClientValidator = clientValidator
  .omit({
    _id: true,
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({
    name: true,
    email: true,
    phone: true,
    user: true,
  })
  .extend({
    phone: z.string(),
    countryCode: z.string(),
  });

export const updateClientValidator = clientValidator
  .omit({
    deletedAt: true,
    limit: true,
    skip: true,
    sort: true,
  })
  .required({ id: true, user: true });
