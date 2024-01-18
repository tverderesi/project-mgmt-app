import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";

export const MainLayout = () => {
  return (
    <div className="h-screen w-screen bg-background">
      <Outlet />
      <Toaster />
    </div>
  );
};
