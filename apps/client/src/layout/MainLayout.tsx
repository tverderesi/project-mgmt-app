import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { ME } from "@/graphql/queries/user";
import { userMeQuery } from "@/graphql/queries/__generated__/userMeQuery.graphql";
import { useEffect } from "react";

export const MainLayout = () => {
  return (
    <div className="h-screen w-screen bg-background">
      <Outlet />
      <Toaster />
    </div>
  );
};
