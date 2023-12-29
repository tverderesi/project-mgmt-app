import { useNavigate } from "react-router-dom";
import { useMutation } from "react-relay";
import { authLogoutMutation } from "@/graphql/mutations/auth";
export const LogoutButton = () => {
  const navigate = useNavigate();

  const [logout] = useMutation<{
    variables: Record<string, never>;
    response: {
      logout: {
        success: boolean;
      };
    };
  }>(authLogoutMutation);

  const handleLogout = async () => {
    logout({
      updater: (store) => {
        store.invalidateStore();
      },
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
