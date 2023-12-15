import bcrypt from "bcrypt";
import { CreateUserInput, UpdateUserInput, User } from "@/models/User";

export function transformToUser(dto: CreateUserInput | Partial<UpdateUserInput>): Partial<User> {
  if (!dto) throw new Error("User data not provided!");

  if ("confirmEmail" in dto && "confirmPassword" in dto) {
    const { confirmEmail, confirmPassword, ...user } = dto;
    const password = user.password as string;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return { ...user, password: hashedPassword };
  }
  if ("oldPassword" in dto) {
    const { oldPassword, ...user } = dto;
    return user;
  }
  if ("oldPassword" in dto && "password" in dto) {
    const { oldPassword, password, ...user } = dto;
    if (!password) throw new Error("Password not provided!");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return { ...user, password: hashedPassword };
  }
  throw new Error("User data is incompatible with the User model!");
}
