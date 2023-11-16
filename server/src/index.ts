import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "@/graphql/schema";
import { connectDB } from "../config/db";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import path from "path";

const envPath = path.resolve(
  __dirname,
  "..",
  process.env.NODE_ENV === "development" ? ".env.development" : ".env"
);
dotenv.config({ path: envPath });

const port = process.env.PORT || 5000;

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//   const users = User.getUsers();
//   const matchingUser = users.find((user) => user.id === id);
//   done(null, matchingUser);
// });

const app = express();

app.use(
  session({
    genid: (req) => uuidv4(),
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
  })
);

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    context: ({ req, res }) => buildContext({ req, res }),
  })
);

app.listen(port, () => console.log(`Server running on port ${port}`));

//Connecting to the DB
connectDB();
