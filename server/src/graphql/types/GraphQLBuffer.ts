import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export const GraphQLBuffer = new GraphQLScalarType({
  name: "Buffer",
  description: "Buffer custom scalar type",
  parseValue(value) {
    return Buffer.from(value);
  },
  serialize(value) {
    return value.toString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return Buffer.from(ast.value); // ast value is always in string format
    }
    return null;
  },
});
