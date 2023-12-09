import { UserModel, UserInput } from "@/models/User";
import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
const userInputValidator = z.object({
  name: z.string({ required_error: "Name is required!" }),
  username: z.string({ required_error: "Username is required!" }),
  email: z.string({ required_error: "E-mail is required!" }).email({ message: "Invalid e-mail!" }),
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
});
export const userMutations = {
  createUser: async (_parent: any, { input }: { input: UserInput }) => {
    const errors = [] as string[];
    try {
      const result = userInputValidator.safeParse(input);
      if (!result.success) {
        const formatted = result.error.format();
        Object.keys(formatted)
          .filter((key) => key !== "_errors")
          .map((key) => {
            errors.push(JSON.stringify({ [key]: formatted[key]?._errors?.[0] }));
          });
        if (errors.length > 0) throw new Error(errors.join(", "));
      }

      const { name, username, email, confirmEmail, password, confirmPassword } = input;

      if (email !== confirmEmail) throw new Error("E-mails don't match!");
      if (password !== confirmPassword) throw new Error("Passwords don't match!");

      return { id: "1", ...input };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
