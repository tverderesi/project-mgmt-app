import { GraphQLEnumType } from "graphql";
export const userRole = new GraphQLEnumType({
  name: "UserRole",
  description: "User role enum type. This is used to define the user role. The user role can be either USER or ADMIN.",
  values: { ADMIN: { value: "ADMIN" }, USER: { value: "USER" } },
});
