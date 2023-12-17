import { useForm } from "react-hook-form";
import { createUserValidator } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { SIGN_UP } from "@/graphql/mutations";
export const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(createUserValidator),
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const [signUp, { data, loading, reset }] = useMutation(SIGN_UP, {
    onError: (error) => {
      if (error.message.includes("duplicate key error")) {
        toast({
          title: "Sign-up failed",
          description: "Username already exists.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sign-up failed",
        description: error.message,
        variant: "destructive",
      });
    },

    update(cache, { data }) {
      cache.modify({
        fields: {
          currentUser() {
            return data.createUser;
          },
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      reset();
    }
  }, [data]);
  return (
    <div className="h-full w-full p-2 flex flex-col justify-center items-center relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h4 className="scroll-m-20 text-3xl font-semibold tracking-tight text-center mb-6">Sign Up Form</h4>
      <div className="relative">
        {loading ||
          (!!data && (
            <div className="w-full h-full bg-background/90 absolute z-10 rounded-xl border border-border backdrop-blur-sm shadow flex flex-col">
              <div
                className={cn(
                  "w-full h-full bg-gradient-to-br from-blue-500/10 to-pink-600/10 rounded-xl",
                  loading && "animate-pulse"
                )}
              >
                <div className="w-full h-full flex flex-col justify-center items-center">
                  {loading && (
                    <Loader2 className="w-20 h-20 text-foreground animate-spin" strokeWidth={0.5} absoluteStrokeWidth />
                  )}
                  {true && <Smile className="w-20 h-20 text-foreground" />}
                  <div className="absolute bottom-[0%] flex flex-col items-center justify-between h-full py-10">
                    <h4 className="text-foreground text-xl font-semibold tracking-tight text-center mb-6 break-words">
                      {loading && "Creating Account"}
                      {data && `Welcome in, ${data?.createUser?.name}!`}
                    </h4>
                    <Button
                      onClick={() => {
                        navigate("../login");
                      }}
                      className="font-semibold"
                    >
                      Log In
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => signUp({ variables: { input: data } }))}
            className={cn(
              "gap-4 grid grid-cols-2 p-4",
              (loading || data) && "pointer-events-none select-none",
              data && "opacity-0"
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 lg:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>How would you like to be called?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 lg:col-span-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>This is your unique username.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 lg:col-span-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Make sure to use a strong password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 lg:col-span-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Repeat your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 lg:col-span-1">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmEmail"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 lg:col-span-1">
                  <FormLabel>Confirm E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 flex flex-row justify-center mt-10">
              <Button type="submit" className="w-40 font-semibold">
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
