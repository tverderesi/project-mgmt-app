import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";

export const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <main className="h-full w-full">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};
