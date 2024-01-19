import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { Logo } from "@/assets/Logo";
import { h1 } from "@/components/ui/typography";
import { FullscreenLoader } from "@/components/ui/FullscreenLoader";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { cn } from "@/lib/utils";
import { useSetPageTitle } from "@/lib/useSetPageTitle";
import { useLoggedInRedirect } from "../lib/useLoggedInRedirect";
import { LogoSection } from "../features/auth/LogoSection";
import { LoginForm } from "../features/auth/LoginForm";

export const Login = withSuspense(() => {
  useSetPageTitle("mgmt.app - Login");
  useLoggedInRedirect();

  return (
    <div
      className="h-screen w-screen flex flex-row"
      style={{
        backgroundImage: `url(/pattern.svg)`,
        backgroundPosition: "bottom right",
        backgroundRepeat: "repeat",
      }}
    >
      <LogoSection />
      <section className="w-full lg:max-w-lg h-screen flex flex-col justify-center relative bg-background/85 p-4 pt-1 items-center gap-2 backdrop-blur-3xl shadow shadow-gray-900/70">
        <div className="absolute top-4 right-4">
          <ModeToggle className="hover:bg-background/70" />
        </div>
        <div className="flex items-center justify-center gap-1 text-foreground absolute top-[10%] w-full lg:hidden ">
          <Logo className="h-8 w-8 mt-3" />
          <span className="sr-only">mgmt.app</span>
          <h1 className={cn(h1, "font-bold leading-none")}>mgmt.app</h1>
        </div>
        <LoginForm />
        <div className="w-full absolute bottom-[10%]">
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="../sign-up" className="underline  underline-offset-2 border-foreground hover:text-rose-500">
              Sign up now!
            </Link>
          </p>
          <p className="w-full text-center">
            <Link to="../forgot-password" className="underline  underline-offset-2 border-foreground hover:text-rose-500">
              Forgot password?
            </Link>{" "}
            <span className="text-foreground/50">(Comming soon)</span>
          </p>
        </div>
      </section>
    </div>
  );
}, <FullscreenLoader />);
