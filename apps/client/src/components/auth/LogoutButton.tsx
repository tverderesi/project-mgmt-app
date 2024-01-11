import { useNavigate } from "react-router-dom";
import { useMutation } from "react-relay";
import { authLogoutMutation } from "@/graphql/mutations/__generated__/authLogoutMutation.graphql";
import { LOGOUT } from "@/graphql/mutations/auth";
export const LogoutButton = () => {
  const navigate = useNavigate();
  const [logout] = useMutation<authLogoutMutation>(LOGOUT);

  const handleLogout = async () => {
    logout({
      variables: {},
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
