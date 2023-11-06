import { Outlet } from "react-router-dom";
import { TypographyH2 } from "./components/ui/typography";
import { Toaster } from "./components/ui/toaster";
import { FolderCheck, UserPlus, PlusCircle } from "lucide-react";
import { Sidebar, SidebarAvatar, SidebarLink, SidebarThemeToggle } from "./components/ui/sidebar";

export const MainLayout: React.FC = () => {
  return (
    <div className="h-[calc(100vh-1rem)] m-2">
      <TypographyH2 className="gap-4 inline-flex items-center text-blue-500 dark:text-pink-500 border-0 h-12 my-2">
        <FolderCheck className="h-9 w-9 dark:stroke-pink-500 stroke-blue-500" />
        Project Management App
      </TypographyH2>
      <div className="h-[calc(100vh-4.5rem)] flex flex-row">
        <Sidebar>
          <SidebarLink to="/clients/new" label="New Client" icon={<UserPlus />} />
          {/* TODO: Design New Icon */}
          <SidebarLink to="/projects/new" label="New Project" icon={<PlusCircle />} />
          <div className="basis-10 flex-grow" />
          <SidebarThemeToggle />
          <SidebarAvatar label="John Doe" />
        </Sidebar>
        <div className="overflow-y-scroll border-border border rounded-xl relative p-4 flex flex-col flex-grow h-full bg-background">
          <main className="flex-grow basis-1">
            <Outlet />
          </main>
          <Toaster />
        </div>
      </div>
    </div>
  );
};
