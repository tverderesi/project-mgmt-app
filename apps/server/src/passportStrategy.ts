import bcrypt from "bcrypt";
import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import { UserModel } from "./models/User";

passport.use(
  new GraphQLLocalStrategy(async (username: string, password: string, done) => {
    const isEmail = username?.includes("@");
    const foundUser = await UserModel.findOne({ [isEmail ? "email" : "username"]: username });

    if (!foundUser) {
      return done(null, false);
    }
    const decryptedPassword = await bcrypt.compare(password, foundUser?.password as string);

    if (!decryptedPassword) {
      return done(null, false);
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
  return done(null, { id: user.id, role: user.role });
});

export default passport;
