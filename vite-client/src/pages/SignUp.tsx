import { useForm } from "react-hook-form";
import { createUserValidator } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
export const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(createUserValidator),
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const SIGN_UP = gql`
    mutation CreateUser($input: UserInput!) {
      createUser(input: $input) {
        id
        name
        username
        email
        photo
      }
    }
  `;

  const [signUp, { data, loading, called }] = useMutation(SIGN_UP, {
    onCompleted: () => {},
    onError: (error) => {
      toast({
        title: "Sign-up failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="h-full w-full p-2 flex flex-col justify-center items-center relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h4 className="scroll-m-20 text-3xl font-semibold tracking-tight text-center mb-6">Sign Up Form</h4>
      <div className="relative">
        {loading ||
          !!data ||
          (true && (
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
                  <h4 className="text-foreground text-xl font-semibold tracking-tight text-center mb-6 absolute bottom-[15%] break-words">
                    {loading && "Creating Account"}
                    {true && `Welcome in, ${data?.createUser?.name || "Thomas"}!`}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => signUp({ variables: { input: data } }))}
            className={cn("gap-4 grid grid-cols-2 p-4", true && "pointer-events-none select-none")}
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
                  <FormDescription>This is your unique username.</FormDescription>
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
