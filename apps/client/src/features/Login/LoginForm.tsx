import { graphql, useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/ui/use-toast";
import { loginSchema } from "@/validators/auth";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../components/FormInput";
import { isolateErrorObject } from "@/components/error-handling/isolateErrorObject";
import { LoginFormLoginMutation } from "./__generated__/LoginFormLoginMutation.graphql";

export function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [login, isInFlight] = useMutation<LoginFormLoginMutation>(graphql`
    mutation LoginFormLoginMutation($input: LoginInput!) {
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
      onCompleted(_response, errors) {
        if (errors) {
          const errorObject = isolateErrorObject(errors[0].message.replace(/\\/g, ""));
          if (errorObject.type === "NO_USER_ERROR") {
            toast({
              title: "No",
              description: (
                <>
                  You don't have an account! How about{" "}
                  <Link to="../sign-up" className="underline  underline-offset-2 border-foreground hover:text-rose-500">
                    creating one?
                  </Link>
                </>
              ),
            });
          }
          form.setError("user", { message: errorObject.message });
          form.setError("password", { message: errorObject.message });
        } else {
          navigate(`../app`);
        }
      },
      updater: (store) => {
        store.invalidateStore();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto">
        <FormInput form={form} label="Username/E-mail" placeholder="username/email" name="user" />
        <FormInput form={form} label="Password" placeholder="password" name="password" type="password" />
        <Button type="submit" className="mx-[4.5rem] w-36 font-semibold relative" disabled={isInFlight}>
          {isInFlight && <Loader2 className="animate-spin text-foregound h-4 absolute left-2" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
