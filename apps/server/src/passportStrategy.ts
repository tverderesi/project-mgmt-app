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
    console.log(decryptedPassword);
    if (!decryptedPassword) {
      return done(null, false);
    }
    return done(null, { id: foundUser.id, role: foundUser.role });
  })
);

passport.serializeUser(({ user: { id } }: { user: { id: string } }, done) => {
  console.log(id);
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  if (!user) {
    return done(null, false);
  }
  return done(null, { id: user.id, role: user.role });
});

export default passport;
