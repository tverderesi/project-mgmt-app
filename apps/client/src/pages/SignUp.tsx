import { useForm } from "react-hook-form";
import userV from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "react-relay";
import { userCreateMutation } from "@/graphql/mutations/__generated__/userCreateMutation.graphql";
import { CREATE_USER } from "@/graphql/mutations/user";
import { h4 } from "@/components/ui/typography";

export const SignUp = () => {
  const defaultValues = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
    role: "USER",
  };

  const form = useForm({
    resolver: zodResolver(userV.create),
    defaultValues,
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const [createUser, loading] = useMutation<userCreateMutation>(CREATE_USER);

  const handleSubmit = {
    onValid: (input: any) => {
      createUser({
        variables: { input },
        onCompleted: (response, errors) => {
          toast({
            title: "Account Created",
            description: "Your account has been created successfully.",
          });
          navigate("/login");
        },
        onError: (err) => {
          toast({
            title: "Account Creation Failed",
            description: err.message,
          });
        },
      });

      navigate("/login");
    },
    onInvalid: () => {
      toast({
        title: "Account Creation Failed",
        description: "Please check your inputs and try again.",
      });
    },
  };

  return (
    <div className="h-full w-full p-2 flex flex-col justify-start lg:justify-center items-center relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <h4 className={h4}>Sign Up Form</h4>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit.onValid, handleSubmit.onInvalid)}
            className={cn("gap-4 grid grid-cols-2 p-4", false && "pointer-events-none select-none")}
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
SignUp.displayName = "SignUp";
