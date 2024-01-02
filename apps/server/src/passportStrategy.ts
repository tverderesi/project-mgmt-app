import bcrypt from "bcrypt";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import { User, UserModel } from "./models/User";
export class CustomError extends Error {
  type: string;
  constructor(message: string, type: string) {
    super(message);
    this.name = "CustomError";
    this.type = type;
  }
}
passport.use(
  new GraphQLLocalStrategy(async (username: string, password: string, done) => {
    const isEmail = username?.includes("@");
    const foundUser = await UserModel.findOne({ [isEmail ? "email" : "username"]: username });

    if (foundUser === null) {
      const error = {
        type: "AUTHENTICATION_ERROR",
        message: "User not found!",
      };
      done(new Error(JSON.stringify(error)), null);
    }

    const decryptedPassword = await bcrypt.compare(password, foundUser?.password as string);
    if (!decryptedPassword) {
      const error = {
        type: "AUTHENTICATION_ERROR",
        message: "User not found!",
      };
      done(new Error(JSON.stringify(error)), null);
    }

    return done(null, foundUser);
  })
);
passport.serializeUser(({ user }: { user: User }, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

export default passport;
