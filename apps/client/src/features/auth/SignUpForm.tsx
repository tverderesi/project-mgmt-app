import { useForm } from "react-hook-form";
import userV from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { graphql, useMutation } from "react-relay";
import { SignUpFormMutation } from "./__generated__/SignUpFormMutation.graphql";
import { Loader2, PlusCircle, RotateCcw } from "lucide-react";
import { FormInput } from "@/components/FormInput";

export function SignUpForm() {
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
  const [createUser, isInFlight] = useMutation<SignUpFormMutation>(graphql`
    mutation SignUpFormMutation($input: UserInput!) {
      createUser(input: $input) {
        id
        role
        name
      }
    }
  `);

  const handleSubmit = {
    onValid: (input: any) => {
      createUser({
        variables: { input },
        onCompleted: () => {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit.onValid, handleSubmit.onInvalid)}
        className={cn("gap-4 grid grid-cols-2 p-4", false && "pointer-events-none select-none")}
      >
        <FormInput
          label="Name"
          name="name"
          placeholder="name"
          className="w-72 col-span-2 lg:col-span-1"
          form={form}
          description="How would you like to be called?"
        />
        <FormInput
          label="username"
          name="username"
          placeholder="username"
          className="w-72 col-span-2 lg:col-span-1"
          form={form}
          description="This is your unique username."
        />
        <FormInput
          label="Password"
          name="password"
          placeholder="password"
          className="w-72 col-span-2 lg:col-span-1"
          form={form}
          description="Make sure to use a strong password. It has to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
          type="password"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="password"
          className="w-72 col-span-2 lg:col-span-1"
          form={form}
          description="Repeat your password."
          type="password"
        />
        <FormInput
          label="E-mail"
          name="email"
          placeholder="email"
          className="w-72 col-span-2 lg:col-span-1"
          form={form}
          description="Enter your e-mail address."
        />
        <FormInput
          label="Confirm E-mail"
          name="confirmEmail"
          placeholder="email"
          className="w-72 col-span-2 lg:col-span-1"
          form={form}
          description="Repeat your e-mail address."
        />

        <div className="col-span-2 flex flex-row justify-center mt-10">
          <Button
            onClick={(e) => {
              e.preventDefault();
              form.reset();
            }}
            className="w-72 font-semibold mr-4 gap-2"
            variant="destructive"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Form
          </Button>
          <Button type="submit" className="w-72 font-semibold gap-2" disabled={isInFlight}>
            {isInFlight ? <Loader2 className="animate-spin h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}
