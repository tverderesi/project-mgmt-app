import * as z from "zod";

export type addClient = {
  name: string;
  email: string;
  phone: string;
};

export const addClientSchema = z.object({
  name: z.string({
    required_error: "You must enter a client's name.",
  }),
  email: z
    .string({
      required_error: "You must enter a client's email.",
    })
    .email(),
  phone: z
    .string({
      required_error: "You must enter a client's phone.",
    })
    .min(10, "Phone number must be at least 10 digits."),
});
