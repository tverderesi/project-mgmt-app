import { GraphQLScalarType, Kind } from "graphql";

export const Percentage = new GraphQLScalarType({
  name: "Percentage",
  description: "An integer between 0 and 100. Represents a percentage.",
  serialize(value: number) {
    if (typeof value !== "number" || value < 0 || value > 100) {
      throw new Error("Value must be an integer between 0 and 100");
    }
    return value;
  },
  parseValue(value: number) {
    if (typeof value !== "number" || value < 0 || value > 100) {
      throw new Error("Value must be an integer between 0 and 100");
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT || Number(ast.value) < 0 || Number(ast.value) > 100) {
      throw new Error("Value must be an integer between 0 and 100");
    }
    return Number(ast.value);
  },
});
