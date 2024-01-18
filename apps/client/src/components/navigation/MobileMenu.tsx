import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarDropdown } from "./AvatarDropdown";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { ClientCountWidget, ProjectCountWidget, TaskCountWidget, TotalTaskCountWidget } from "./widgets";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { h2, h3 } from "../ui/typography";
import { Suspense, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { USER } from "@/graphql/queries/user";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { userTaskCountByStatus_TaskCount$key } from "@/graphql/queries/__generated__/userTaskCountByStatus_TaskCount.graphql";

export function MobileMenu() {
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  const taskCountByStatus = user?.taskCountByStatus as userTaskCountByStatus_TaskCount$key;
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="md:hidden">
          <Menu className="w-8 h-8" />
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen">
        <SheetHeader>
          <h2 className={cn(h2, "border-none text-start")}>mgmt.app</h2>
        </SheetHeader>
        <Accordion type="multiple" className="mt-4">
          <AccordionItem value="projects">
            <AccordionTrigger>
              <div className="flex flex-col items-start gap-y-2">
                <h3 className={cn(h3, "text-rose-500")}>Projects</h3>
                <ProjectCountWidget fragmentRef={user} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ListItem to={`/app/user/projects/new`} title="New Project">
                Register a new project.
              </ListItem>
              <ListItem to={`/app/user/projects`} title="Projects">
                Browse and manage all projects.
              </ListItem>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="clients">
            <AccordionTrigger>
              <div className="flex flex-col items-start gap-y-2 ">
                <h3 className={cn(h3, "text-rose-500")}>Clients</h3>
                <ClientCountWidget fragmentRef={user} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ListItem to={`/app/user/projects/new`} title="New Client">
                Register a new Client.
              </ListItem>
              <ListItem to={`/app/user/projects`} title="Clients">
                Browse and manage all clients.
              </ListItem>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tasks">
            <AccordionTrigger>
              <div className="flex flex-col items-start gap-y-2 ">
                <h3 className={cn(h3, "text-rose-500")}>Tasks</h3>
                <TotalTaskCountWidget fragmentRef={user} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-2">
                <TaskCountWidget fragmentRef={taskCountByStatus} />
              </div>
              <ListItem to={`/app/user/projects/new`} title="New Client">
                Register a new Client.
              </ListItem>
              <ListItem to={`/app/user/projects`} title="Clients">
                Browse and manage all clients.
              </ListItem>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter className="absolute bottom-0 h-12 flex flex-row items-center justify-between w-[calc(100%-3rem)] mb-6">
          <Suspense fallback={<Skeleton className="w-10 h-10" />}>
            <AvatarDropdown align="start" />
          </Suspense>
          <ModeToggle align="end" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const ListItem: React.FC<{
  to: string;
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: ClassValue;
}> = ({ to, title, children, className, ...props }) => {
  return (
    <Link
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
      to={to}
    >
      <div className="text-sm font-semibold leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
    </Link>
  );
};
