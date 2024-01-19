import { graphql, useLazyLoadQuery } from "react-relay";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoggedInRedirectQuery } from "./__generated__/useLoggedInRedirectQuery.graphql";

export function useLoggedInRedirect() {
  const navigate = useNavigate();
  const { isLoggedIn } = useLazyLoadQuery<useLoggedInRedirectQuery>(
    graphql`
      query useLoggedInRedirectQuery {
        isLoggedIn
      }
    `,
    {}
  );
  useEffect(() => {
    if (isLoggedIn) {
      navigate("../app");
    }
  }, [isLoggedIn]);
}
