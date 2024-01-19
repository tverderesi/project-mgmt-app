import { useNavigate } from "react-router-dom";
import { useMutation } from "react-relay";
import { logoutMutation } from "./__generated__/logoutMutation.graphql";
import { LOGOUT } from "./auth";
export function LogoutButton() {
  const navigate = useNavigate();
  const [logout] = useMutation<logoutMutation>(LOGOUT);

  const handleLogout = async () => {
    logout({
      variables: {},
      onCompleted: () => {
        navigate("/login");
      },
      updater: (store) => {
        store.invalidateStore();
      },
    });
  };

  return (
    <span className="h-full w-full cursor-pointer" onClick={handleLogout}>
      Logout
    </span>
  );
}
