import { checkAuthetication } from "@/utils/checkAuthetication";
import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { User } from "@/models/User";
import { fromGlobalId } from "graphql-relay";
import { ProjectModel } from "@/models/Project";
import { projectType } from "../schema/projectType";

export const projectQueries = {
  projects: {
    name: "Projects",
    description: "This query returns all the projects in the system. It is not yet paginated or filtered.",
    type: new GraphQLList(projectType),
    resolve: async (_, args) => {
      const projects = await ProjectModel.find();
      return projects;
    },
  },
  project: {
    name: "Project",
    description: "This query returns a project by its ID.",
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    type: projectType,
    resolve: async (_, args, context: any) => {
      const me = context.getUser() as User;
      checkAuthetication(me);
      const { id } = fromGlobalId(args.id);
      const project = await ProjectModel.findById(id);
      return project;
    },
  },
};
