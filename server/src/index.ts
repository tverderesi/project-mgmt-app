import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { connectDB } from "../config/db";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import clientResolver from "./graphql/resolvers/query/client";
import bodyParser from "body-parser";
import { UserModel, User } from "./models/User";
import { userMutations } from "./graphql/resolvers/mutation/user";
import { userQuery } from "./graphql/resolvers/query/user";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { Percentage } from "./graphql/custom_scalars/percentage";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = readFileSync(path.join(__dirname, "graphql", "typeDefs.graphql"), "utf-8");
const envPath = path.resolve(
  __dirname,
  "..",
  process.env.NODE_ENV === "development" ? ".env.development" : ".env"
);
dotenv.config({ path: envPath });
passport.use(
  new GraphQLLocalStrategy(async (username: string, password: string, done) => {
    const isEmail = username?.includes("@");
    const foundUser = await UserModel.findOne({ [isEmail ? "email" : "username"]: username });
    if (username === null) {
      done(new Error("User not found"), null);
    }

    const decryptedPassword = await bcrypt.compare(password, foundUser?.password as string);
    if (!decryptedPassword) {
      done(new Error("Incorrect password"), null);
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

const port = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: {
    Query: { ...clientResolver, ...userQuery },
    Mutation: { ...userMutations },
    Percentage,
  },
  introspection: process.env.NODE_ENV === "development",
});
await server.start();

const app = express();
app.use(cookieParser());
app.use(
  session({
    genid: (req) => uuidv4(),
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      sameSite: "lax",
      httpOnly: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      autoRemove: "native",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors());
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return buildContext({ req, res, UserModel });
    },
  })
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`GraphQL server running on http://localhost:${port}/graphql`);
});

//Connecting to the DB
connectDB();