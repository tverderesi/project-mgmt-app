import bcrypt from "bcrypt";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import { User, UserModel } from "./models/User";

passport.use(
  new GraphQLLocalStrategy(async (username: string, password: string, done) => {
    const isEmail = username?.includes("@");
    const foundUser = await UserModel.findOne({ [isEmail ? "email" : "username"]: username });
    if (username === null) {
      done(new Error("User not found!"), null);
    }

    const decryptedPassword = await bcrypt.compare(password, foundUser?.password as string);
    if (!decryptedPassword) {
      done(new Error("Incorrect password!"), null);
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
