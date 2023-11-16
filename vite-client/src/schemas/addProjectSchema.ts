import * as z from "zod";

export const addProjectSchema = z.object({
  name: z.string({
    required_error: "You must enter a client name.",
  }),
  status: z.enum(["active", "inactive", "archived", "completed", "cancelled"], {
    required_error: "You must select a status.",
  }),
  phone: z
    .string({
      required_error: "You must enter a client's phone.",
    })
    .min(10, "Phone number must be at least 10 digits."),
});

export type AddProject = z.infer<typeof addProjectSchema>;
