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
import { readFileSync } from "fs";
import clientResolver from "./graphql/resolvers/query/client";
import bodyParser from "body-parser";
import { UserModel, User } from "./models/User";
import { userMutations } from "./graphql/resolvers/mutation/user";
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
  new GraphQLLocalStrategy(async (email, password, done) => {
    const user = await UserModel.findOne({ email });
    if (user === null) {
      done(new Error("User not found"), null);
    }
    if (user.password !== password) {
      done(new Error("Incorrect password"), null);
    }
    return done(null, user);
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user);
});
passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

const port = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs,
  resolvers: { Query: { ...clientResolver }, Mutation: { ...userMutations } },
  introspection: process.env.NODE_ENV === "development",
});
await server.start();

const app = express();

app.use(
  session({
    genid: (req) => uuidv4(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
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
    context: async ({ req, res }) => ({ authScope: buildContext({ req, res, UserModel }) }),
  })
);

app.listen(port, () => console.log(`Server running on http://localhost:${port} `));

//Connecting to the DB
connectDB();
