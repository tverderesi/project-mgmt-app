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
import mergeSchemas from "./graphql/schema";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import WebSocket, { WebSocketServer as WSWebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const envPath = path.resolve(__dirname, "..", process.env.NODE_ENV === "development" ? ".env.development" : ".env");

const app = express();
const httpServer = createServer(app);
//Initializing the express server

//Configuring environment variables
dotenv.config({ path: envPath });
const WebSocketServer = WebSocket.Server || WSWebSocketServer;
const isDevelopment = process.env.NODE_ENV === "development";

//Creating Apollo Server
const typeDefs = mergeSchemas();
const schema = makeExecutableSchema({
  typeDefs,
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
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  introspection: isDevelopment,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

//Starting Express server
await server.start();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: isDevelopment
      ? ["http://localhost:5173", "https://sandbox.embed.apollographql.com"]
      : [
          "https://project-mgmt-app-drab.vercel.app",
          "https://project-mgmt-server-vnup.onrender.com",
          "https://apollo-server-landing-page.cdn.apollographql.com",
          "https://sandbox.embed.apollographql.com",
        ],
  })
);

// app.use(limiter);

//Initializing the express server-side session storage
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: !isDevelopment,
      sameSite: isDevelopment ? "strict" : "none",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

//Initializing passport
app.use(passport.initialize());
app.use(passport.session());

//Initializing the express server body parser
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.cookies["connect.sid"] && !req.user) {
    res.clearCookie("connect.sid");
  }
  next();
});
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
httpServer.listen(port, () => {
  logger.verbose(`Server running on http://localhost:${port}`, { date: new Date(), env: process.env.NODE_ENV });
  logger.verbose(`GraphQL server running on http://localhost:${port}/graphql`);
  logger.verbose(`🚀 Subscriptions ready at ws://localhost:${port}/graphql`);
});

//Connecting to the DB
connectDB();
