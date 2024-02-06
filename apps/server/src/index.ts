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
import passport from "./passportStrategy";
import { UserModel } from "./models/User";
import { logger } from "./utils/logger";
import { rateLimit } from "express-rate-limit";
import { schema } from "./graphql/schema";

const envPath = path.resolve(process.cwd(), "..", process.env.NODE_ENV === "development" ? ".env.development" : ".env");

//Configuring environment variables
dotenv.config({ path: envPath });
const isDevelopment = process.env.NODE_ENV === "development";
logger.log("info", "intializing rate limiter");
const limiter = rateLimit({
  windowMs: 1000,
  max: 100,
});

logger.log("info", "intializing Apollo server");
const server = new ApolloServer({
  schema: schema,
  introspection: isDevelopment,
});

//Starting Express server
logger.log("info", "starting server");
await server.start();
//Initializing the express server
logger.log("info", "initializing express server");
const app = express();

logger.log("info", "setting up express server");
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
      const context = buildContext({ req, res, UserModel });
      return context;
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
