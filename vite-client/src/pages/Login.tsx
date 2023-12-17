import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { loginSchema } from "@/validators/auth";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../graphql/mutations";

export const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          currentUser() {
            return data.login;
          },
        },
      });
    },
    onCompleted: () => {
      navigate("../app");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="flex-grow bg-gradient-to-br from-blue-500 to-pink-600 hidden lg:block">
        <h1 className="text-6xl font-bold text-right h-full flex flex-col justify-center mr-5 text-white">
          Project <br /> mgmt <br /> app <br />
          <span className="mt-1">
            [<span className="text-3xl leading-[3.75rem] align-middle pb-2">working title</span>]
          </span>
        </h1>
      </div>
      <div className="bg-background dark:bg-background/90 w-full lg:max-w-lg h-screen flex flex-col justify-center relative">
        <div className="bg-gradient-to-br from-blue-500 to-pink-600  h-full w-full -z-10 absolute " />
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <h1 className="text-xl font-bold text-right flex flex-col justify-center mr-5 text-foreground absolute top-[12.5%] left-1/4 w-1/2 lg:hidden">
          Project <br /> mgmt <br /> app <br />
          <span className="mt-1">
            [<span className="text-sm align-middle pb-1.5">working title</span>]
          </span>
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => login({ variables: { input: data } }))} className="space-y-4 mx-auto">
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
            <Button type="submit" className="mx-[4.5rem] w-36 font-semibold relative">
              {loading && <Loader2 className="animate-spin text-foregound h-4 absolute left-2" />}
              Login
            </Button>
          </form>
        </Form>
        <div className="w-full absolute bottom-1/4">
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="../sign-up" className="underline  underline-offset-2 border-foreground hover:text-pink-500">
              Sign up now!
            </Link>
          </p>
          {/* TODO: Add Password Recovery Functionality */}
        </div>
      </div>
    </div>
  );
};
