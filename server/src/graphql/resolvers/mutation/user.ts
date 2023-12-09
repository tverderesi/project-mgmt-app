import { UserModel, UserInput } from "@/models/User";
import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
const userInputValidator = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  confirmEmail: z.string().email(),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
  confirmPassword: z
    .string()
    .regex(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
});
export const userResolver = {};
