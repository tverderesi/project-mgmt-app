import { Outlet } from "react-router-dom";
import { loadQuery, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { ME } from "@/graphql/queries/user";
import { userMeQuery } from "@/graphql/queries/__generated__/userMeQuery.graphql";
import { Navbar } from "../components/navigation/Navbar";
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { p } from "@/components/ui/typography";
export const loadedQuery = loadQuery<userMeQuery>(RelayEnvironment, ME, {}, { fetchPolicy: "network-only" });
export const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const data = usePreloadedQuery(ME, loadedQuery);

  useEffect(() => {
    if (data.me.error?.type === "AUTH_ERROR_UNAUTHENTICATED") {
      setOpen(true);
    }
  }, [data]);

  return (
    <div className="h-full w-full p-2 lg:px-4 relative">
      <Dialog open={open}>
        <Navbar />
        <Outlet />
        <DialogContent closeButton={false}>
          <DialogHeader>Expired Session</DialogHeader>
          <DialogDescription className="flex flex-col justify-center mt-2">
            <p className={p}> Your Session has expired. Please login again.</p>
          </DialogDescription>
          <DialogFooter className="flex justify-start">
            <Button
              className="font-semibold"
              onClick={() => {
                setOpen(false);
                window.location.href = "/login";
              }}
            >
              Navigate to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
