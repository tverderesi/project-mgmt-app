import { graphql } from "react-relay";
export const LOGOUT = graphql`
  mutation authLogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`;
