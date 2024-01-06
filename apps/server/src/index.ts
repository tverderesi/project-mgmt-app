import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { buildContext } from "graphql-passport";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "./config/db";
import { clientResolvers } from "./graphql/resolvers/client";
import { projectResolvers } from "./graphql/resolvers/project";
import { userResolvers } from "./graphql/resolvers/user";
import { taskResolvers } from "./graphql/resolvers/task";
import passport from "./passportStrategy";
import { UserModel } from "./models/User";
import { logger } from "./utils/logger";
import { fileURLToPath } from "url";
import { rateLimit } from "express-rate-limit";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { writeFileSync } from "fs";
import { print } from "graphql";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const envPath = path.resolve(__dirname, "..", process.env.NODE_ENV === "development" ? ".env.development" : ".env");

//Configuring environment variables
dotenv.config({ path: envPath });

//Initializing rate limiter
const limiter = rateLimit({
  windowMs: 1000,
  max: 100,
});

//Creating Apollo Server
const loadedSchemaFiles = loadFilesSync(`${__dirname}/graphql/schema/**/*.graphql`);
const typeDefs = mergeTypeDefs(loadedSchemaFiles);
const printedTypeDefs = print(typeDefs);
writeFileSync(`${__dirname}/graphql/mergedSchema.graphql`, printedTypeDefs);
const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: {
    Query: {
      ...userResolvers.query,
      ...projectResolvers.query,
      ...clientResolvers.query,
      ...taskResolvers.query,
    },
    Mutation: {
      ...userResolvers.mutation,
      ...projectResolvers.mutation,
      ...clientResolvers.mutation,
      ...taskResolvers.mutation,
    },
  },
  introspection: process.env.NODE_ENV === "development",
});

//Starting Express server
await server.start();

//Initializing the express server
const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5173", "https://sandbox.embed.apollographql.com"]
        : "https://project-mgmt-app-drab.vercel.app/",
  })
);

app.use(limiter);

//Initializing the express server-side session storage
app.use(
  session({
    genid: () => uuidv4(),
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

//Initializing passport
app.use(passport.initialize());
app.use(passport.session());

//Initializing the express server body parser
app.use(bodyParser.json());

//Initializing the GraphQL endpoint
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return buildContext({ req, res, UserModel });
    },
  })
);

//Initializaing the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.verbose(`Server running on http://localhost:${port}`, { date: new Date(), env: process.env.NODE_ENV });
  logger.verbose(`GraphQL server running on http://localhost:${port}/graphql`);
});

//Connecting to the DB
connectDB();
