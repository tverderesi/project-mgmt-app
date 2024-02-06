import bcrypt from "bcrypt";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import { UserModel } from "./models/User";
import { createErrorMessage } from "./utils/createErrorMessage";

passport.use(
  new GraphQLLocalStrategy(async (username: string, password: string, done) => {
    const isEmail = username?.includes("@");
    const foundUser = await UserModel.findOne({ [isEmail ? "email" : "username"]: username });
    if (!foundUser) {
      const error = createErrorMessage({ type: "NO_USER_ERROR", message: "No User Found!" });

      return done(error, false);
    }
    const arePasswordsEqual = await bcrypt.compare(password, foundUser?.password as string);

    if (!arePasswordsEqual) {
      const error = createErrorMessage({ type: "AUTHENTICATION_ERROR", message: "Wrong Credentials!" });
      return done(error, false);
    }
    return done(null, foundUser);
  })
);

passport.serializeUser(({ user }: { user }, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);

  if (!user) {
    return done(null, false);
  }
  return done(null, { id: user.id, role: user.role, name: user.name });
});

export default passport;
