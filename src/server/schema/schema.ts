const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

//Mongoose Models
const Client = require('../models/Client');
const Project = require('../models/Project');

//Defining a Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Defining a Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent: { clientId: any; }, args: any) {
        return Client.findById(parent.clientId)
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent: any, args: any) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: { id: any; }) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent: any, args: any) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: { id: any; }) {
        return Project.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent: any, args: { name: any; email: any; phone: any; }) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    // Remove a Client
    removeClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } }, resolve(parent: any, args: any) { return Client.findByIdAndRemove(args.id) }
    },
    // Add a project
    // addProject:
    // {
    //   type: ProjectType,
    //   args: {
    //     name: { type: GraphQLNonNull(GraphQLString) },
    //     description: { type: GraphQLNonNull(GraphQLString) },
    //     status: {
    //       type: new GraphQLEnumType({
    //         name: 'ProjectStatus',
    //         values: {
    //           new: { value: 'Not Started' },
    //           progress: { value: 'In Progress' },
    //           completed: { value: 'Completed' },
    //         },
    //       }),
    //       defaultValue: 'Not Started',
    //     },
    //     clientId: {type: GraphQLNonNull(GraphQLID)},
    //   }, resolve(parent: any, args: any) {
    //     const project = new Project({
    //       name: args.name,
    //       description: args.description,
    //       status: args.status,
    //       clientId: args.clientId
    //     });
    //     return project.save();
            
    //   }

    // }

    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent: any, args: any) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
