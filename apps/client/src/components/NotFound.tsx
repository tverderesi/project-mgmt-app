import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Astronaut from "../assets/404_error_rafiki.svg?react";

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-between items-center h-screen py-20">
      <p className="text-3xl font-light text-center">Whoops! Page not found.</p>
      <Astronaut className="h-9/10 max-h-[700px]" />
      <div>
        <Button asChild size="lg" className="font-semibold">
          <Link to="/app">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};
