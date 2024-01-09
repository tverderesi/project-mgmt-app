import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { h1 } from "@/components/ui/typography";

import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="h-full w-full grid grid-rows-4 gap-5 relative bg-background/50 overflow-hidden">
      <div className="bg-gradient-to-br from-blue-500 to-pink-600  h-full w-full -z-10 absolute blur scale-125 " />
      <div className="m-2 absolute right-0">
        <ModeToggle />
      </div>
      <div className="row-span-2 row-start-2 m-auto h-full w-full relative flex items-center justify-center">
        <h1 className={h1}>mgmt.app</h1>
      </div>

      <div className="row-start-4 row-span-1 mx-auto flex items-center justify-center">
        <Button className="font-semibold">
          <Link to="app">Go to App</Link>
        </Button>
      </div>
    </div>
  );
};
