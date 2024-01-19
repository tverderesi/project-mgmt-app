import { graphql, useLazyLoadQuery, useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/ui/use-toast";
import { ModeToggle } from "@/ui/mode-toggle";
import { loginSchema } from "@/validators/auth";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { LoginQuery } from "./__generated__/LoginQuery.graphql";
import { Logo } from "@/assets/Logo";
import { h1 } from "@/ui/typography";
import { FullscreenLoader } from "@/ui/FullscreenLoader";
import { withSuspense } from "@/lib/buildComponentWithSuspenseAndErrorBoundary";
import { cn } from "@/lib/utils";
const LogoSection = () => (
  <div className="flex-grow hidden lg:h-full lg:flex items-center justify-end px-4 gap-2 text-background dark:text-foreground">
    <div className="bg-black/50 p-4 pt-1 rounded-xl flex items-center gap-2 backdrop-blur-lg shadow shadow-gray-900/70">
      <Logo className="h-16 w-16 lg:mt-3" />
      <h1 className={h1}>mgmt.app</h1>
    </div>
  </div>
);
export const Login = withSuspense(() => {
  const { isLoggedIn } = useLazyLoadQuery<LoginQuery>(
    graphql`
      query LoginQuery {
        isLoggedIn
      }
    `,
    {}
  );

  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("../app");
    }
  }, [isLoggedIn]);

  const [login, isInFlight] = useMutation(graphql`
    mutation LoginLoginMutation($input: LoginInput!) {
      login(input: $input) {
        id
        name
        role
      }
    }
  `);

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login({
      variables: { input: data },
      onCompleted() {
        navigate(`../app`);
      },
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };
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

      <div className="w-full lg:max-w-lg h-screen flex flex-col justify-center relative bg-background/85 p-4 pt-1 items-center gap-2 backdrop-blur-3xl shadow shadow-gray-900/70">
        <div className="absolute top-4 right-4">
          <ModeToggle className="hover:bg-background/70" />
        </div>
        <div className="flex items-center justify-center gap-1 text-foreground absolute top-[10%] w-full lg:hidden ">
          <Logo className="h-8 w-8 mt-3" />
          <span className="sr-only">mgmt.app</span>
          <h1 className={cn(h1, "font-bold leading-none")}>mgmt.app</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Username/E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="username/email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mx-[4.5rem] w-36 font-semibold relative" disabled={isInFlight}>
              {isInFlight && <Loader2 className="animate-spin text-foregound h-4 absolute left-2" />}
              Login
            </Button>
          </form>
        </Form>
        <div className="w-full absolute bottom-[10%]">
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="../sign-up" className="underline  underline-offset-2 border-foreground hover:text-pink-500">
              Sign up now!
            </Link>
          </p>
          <p className="w-full text-center">
            <Link to="../forgot-password" className="underline  underline-offset-2 border-foreground hover:text-pink-500">
              Forgot password?
            </Link>{" "}
            <span className="text-foreground/50">(Comming soon)</span>
          </p>
        </div>
      </div>
    </div>
  );
}, <FullscreenLoader />);
