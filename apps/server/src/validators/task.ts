import { z } from "zod";
import { statuses } from "./shared";

const base = z.object({
  id: z.string(),
  title: z.string({ required_error: "Title is required!" }),
  description: z.string().optional(),
  project: z.string({ required_error: "Task can't be created outside a project!" }),
  user: z.string({ required_error: "Task can't be created without an user!" }),
  status: z.enum(statuses, { required_error: "Status is required!", invalid_type_error: "Invalid status!" }),
});
const filter = base.partial();
const update = base.partial().required({ id: true });
const create = base.omit({ id: true });

export default { base, filter, update, create };
