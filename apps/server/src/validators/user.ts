import { z } from "zod";
import { queryPaginationParams } from "./shared";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

const base = z.object({
  id: z.string(),
  name: z.string({ required_error: "Name is required!" }),
  email: z.string({ required_error: "E-mail is required!" }).email({ message: "Invalid e-mail!" }),
  username: z.string({ required_error: "Username is required!" }),
  projects: z.array(z.string()).optional(),
  clients: z.array(z.string()).optional(),
  role: z.enum(["USER", "ADMIN"], { required_error: "Role is required!" }),
});

const query = base.partial().extend(queryPaginationParams);

const create = base
  .omit({
    id: true,
  })
  .extend({
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

const update = base
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

export default { base, create, update, query };
