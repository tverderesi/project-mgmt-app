import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { h2 } from "@/components/ui/typography";
import { useSetPageTitle } from "@/lib/useSetPageTitle";
import { SignUpForm } from "../features/auth/SignUpForm";

export const SignUp = () => {
  useSetPageTitle("mgmt.app - Sign Up");

  return (
    <div className="h-screen w-screen p-4 ">
      <div className=" h-full w-full flex flex-col justify-start lg:justify-center items-center relative border border-border rounded-xl">
        <div className="absolute top-1 right-1">
          <ModeToggle />
        </div>
        <h4 className={cn(h2, "border-none mb-4")}>Sign Up Form</h4>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
SignUp.displayName = "SignUp";
