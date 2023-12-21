import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

export const userValidator = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  photo: z.string().optional(),
  deletedAt: z.string().datetime().or(z.boolean()).optional(),
  projects: z.array(z.string()).optional(),
  clients: z.array(z.string()).optional(),
  limit: z.number().optional(),
  skip: z.number().optional(),
  sort: z.string().optional(),
});

export const createUserValidator = userValidator
  .omit({
    id: true,
    deletedAt: true,
    projects: true,
    clients: true,
    role: true,
  })
  .required({
    name: true,
    email: true,
    username: true,
  })
  .extend({
    name: z.string({ required_error: "Name is required!" }),
    username: z.string({ required_error: "Username is required!" }),
    email: z.string({ required_error: "E-mail is required!" }).email({
      message: "Invalid e-mail!",
    }),
    password: z
      .string({ required_error: "Password is required!" })
      .regex(
        passwordRegex,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      ),

    confirmPassword: z
      .string({ required_error: "Confirm Password is required!" })
      .regex(
        passwordRegex,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      ),
    confirmEmail: z.string({ required_error: "Confirm E-mail is required!" }).email({ message: "Invalid e-mail!" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "E-mails don't match!",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export const updateUserValidator = userValidator
  .required({ id: true })
  .extend({
    oldPassword: z.string({ required_error: "Password is required!" }),
    password: z.string({ required_error: "Password is required!" }).regex(passwordRegex, {
      message: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.",
    }),
  })
  .refine((data) => data.password !== data.oldPassword, {
    message: "New password must be different from old password!",
    path: ["password"],
  });
