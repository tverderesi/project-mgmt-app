import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
export const userInputValidator = z
  .object({
    name: z.string({ required_error: "Name is required!" }),
    username: z.string({ required_error: "Username is required!" }),
    email: z
      .string({ required_error: "E-mail is required!" })
      .email({ message: "Invalid e-mail!" }),
    confirmEmail: z
      .string({ required_error: "Confirm E-mail is required!" })
      .email({ message: "Invalid e-mail!" }),
    password: z
      .string({ required_error: "Password is required!" })
      .regex(
        passwordRegex,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required!" })
      .regex(
        passwordRegex,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "E-mails don't match!",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });
