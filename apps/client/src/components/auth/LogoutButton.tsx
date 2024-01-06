import { useNavigate } from "react-router-dom";
import { useMutation, graphql } from "react-relay";
import { LogoutButtonLogoutMutation } from "./__generated__/LogoutButtonLogoutMutation.graphql";
export const LogoutButton = () => {
  const navigate = useNavigate();
  const [logout] = useMutation<LogoutButtonLogoutMutation>(graphql`
    mutation LogoutButtonLogoutMutation {
      logout
    }
  `);

  const handleLogout = async () => {
    logout({
      variables: {}, // Add the required variables property here
      onCompleted: () => {
        navigate("/login");
      },
    });
  };

  return (
    <span className="h-full w-full cursor-pointer" onClick={handleLogout}>
      Logout
    </span>
  );
};
