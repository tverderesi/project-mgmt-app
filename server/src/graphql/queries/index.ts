import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import ProjectModel from "@/models/Project";
import { ProjectType } from "@/graphql/types/project";
import clientQueries from "@/graphql/queries/client";
export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...clientQueries,
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent: any, args: any) {
        return ProjectModel.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: { id: any }) {
        return ProjectModel.findById(args.id);
      },
    },
  },
});
