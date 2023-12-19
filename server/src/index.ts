import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { readFileSync } from "fs";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../config/db";
import { Percentage } from "./graphql/custom_scalars/percentage";
import { clientResolvers } from "./graphql/resolvers/client";
import { projectResolvers } from "./graphql/resolvers/project";
import { userResolvers } from "./graphql/resolvers/user";
import { User, UserModel } from "./models/User";
import { taskResolvers } from "./graphql/resolvers/task";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//TODO: Implement logging

const typeDefs = readFileSync(path.join(__dirname, "graphql", "typeDefs.graphql"), "utf-8");
const envPath = path.resolve(__dirname, "..", process.env.NODE_ENV === "development" ? ".env.development" : ".env");

dotenv.config({ path: envPath });
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

const port = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: {
    Query: { ...userResolvers.query, ...clientResolvers.query, ...projectResolvers.query, ...taskResolvers.query },
    Mutation: { ...userResolvers.mutation, ...clientResolvers.mutation, ...projectResolvers.mutation, ...taskResolvers.mutation },
    Percentage,
  },
  introspection: process.env.NODE_ENV === "development",
});
await server.start();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5173", "https://sandbox.embed.apollographql.com"]
        : "https://www.example.com",
  })
);

app.use(
  session({
    genid: (req) => uuidv4(),
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      sameSite: process.env.NODE_ENV === "development" ? "none" : true,
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

app.use(
  "/graphql",

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
