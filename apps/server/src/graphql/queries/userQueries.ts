import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId } from "graphql-relay";
import { UserModel, User } from "@/models/User";
import { checkAuthetication } from "@/utils/checkAuthetication";
import { userType } from "../schema/userType";

export const userQueries = {
  users: {
    type: new GraphQLList(userType),
    resolve: async (_, args) => {
      const users = await UserModel.find();
      return users;
    },
  },
  user: {
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    type: userType,
    resolve: async (_, args, context: any) => {
      const me = context.getUser() as User;
      checkAuthetication(me);
      const { id } = fromGlobalId(args.id);
      if (id) {
        const user = await UserModel.findById(id);
        return user;
      }
      const user = await UserModel.findById(me.id);
      return user;
    },
  },
  isLoggedIn: {
    type: GraphQLBoolean,
    resolve: async (_, args, context: any) => {
      const me = context.getUser() as User;
      return !!me;
    },
  },
};
