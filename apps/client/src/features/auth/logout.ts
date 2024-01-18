import { graphql } from "react-relay";
export const LOGOUT = graphql`
  mutation logoutMutation {
    logout
  }
`;
