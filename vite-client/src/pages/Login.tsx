import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";

export const Login = () => {
  const loginSchema = z.object({
    user: z.string(),
    password: z.string(),
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const LOGIN = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        id
        name
        username
        email
        password
        photo
      }
    }
  `;
  //   const LOGOUT = gql`
  //     mutation Mutation {
  //       logout
  //     }
  //   `;
  //   const USERS = gql`
  //     query Users($filter: UserFilter) {
  //       users(filter: $filter) {
  //         id
  //       }
  //     }
  //   `;

  //   useEffect(() => {
  //     const unsubscribe = client.onResetStore(() => new Promise(() => setReset((prev) => prev + 1)));

  //     return () => {
  //       unsubscribe();
  //     };
  //   });

  const [login, { data, loading, error }] = useMutation(LOGIN);
  //   const [logout, { data: logoutData, loading: logoutLoading, error: logoutError }] = useMutation(LOGOUT);
  //   const [getUsers, { data: userData, loading: userLoading, error: userError }] = useLazyQuery(USERS);
  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [data, error, toast]);
  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="flex-grow bg-gradient-to-br from-blue-500 to-pink-600 hidden md:block">
        <h1 className="text-6xl font-bold text-right h-full flex flex-col justify-center mr-5 text-white">
          Project <br /> mgmt <br /> app <br />
          <span className="mt-1">
            [<span className="text-3xl leading-[3.75rem] align-middle pb-2">working title</span>]
          </span>
        </h1>
      </div>
      <div className="bg-background dark:bg-background/90 w-full lg:max-w-lg h-screen flex flex-col justify-center shadow-md relative">
        <div className="bg-gradient-to-br from-blue-500 to-pink-600  h-full w-full -z-10 absolute blur-lg" />
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
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
            <Button type="submit" className="mx-[4.5rem] w-36 font-semibold">
              {loading && <Loader2 className="animate-spin text-white me-2" />}
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
