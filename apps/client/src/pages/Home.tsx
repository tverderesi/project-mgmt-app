import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { h2 } from "@/components/ui/typography";
import { Link } from "react-router-dom";
import { Logo } from "../assets/Logo";
import { cn } from "@/lib/utils";
export const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="px-4 lg:px-6 h-16 flex items-center">
          <Link className="flex items-center justify-center gap-1" to="">
            <Logo className="h-7 w-7 text-gray-900 dark:text-gray-100" absoluteStrokeWidth={true} />
            <span className="sr-only">mgmt.app</span>
            <h1 className={cn(h2, "border-none font-bold")}>mgmt.app</h1>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link className="font-semibold hover:underline underline-offset-4 text-foreground" to="">
              Features
            </Link>
            <Link className="font-semibold hover:underline underline-offset-4 text-foreground" to="">
              Pricing
            </Link>
            <Link className="font-semibold hover:underline underline-offset-4 text-foreground" to="">
              About
            </Link>
            <Link className="font-semibold hover:underline underline-offset-4 text-foreground" to="">
              Contact
            </Link>
            <ModeToggle />
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <img
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full lg:order-last lg:aspect-square"
                  height="550"
                  src="multi-device-targeting-animate.svg"
                  width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-foreground">
                      Project Management. Simplified.
                    </h1>
                    <p className="max-w-[600px] text-foreground/50 md:text-xl ">
                      mgmt.app is a project management tool that helps you organize your projects, tasks, and deadlines, and
                      clients.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button className="font-semibold" size="lg" asChild>
                      <Link to="login">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">© mgmt.app. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400" to="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
};
