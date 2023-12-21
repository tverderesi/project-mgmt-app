import { useNavigate } from "react-router-dom";
import { useMutation, useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { LOGOUT } from "@/graphql/mutations/auth";

export const LogoutButton = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = client.onResetStore(() => new Promise(() => navigate("../login")));
    return () => {
      unsubscribe();
    };
  }, [client]);
  const [logout] = useMutation(LOGOUT);

  const handleLogout = async () => {
    await logout();
    client.resetStore();
  };

  return (
    <span className="h-full w-full cursor-pointer" onClick={handleLogout}>
      Logout
    </span>
  );
};
