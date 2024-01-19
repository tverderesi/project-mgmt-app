import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

export const MainLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-background">
      <Outlet />
      <Toaster />
    </div>
  );
};
