import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, RotateCcw, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import clientV from "@/validators/client";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { h3 } from "@/components/ui/typography";
import { CREATE_CLIENT } from "@/graphql/mutations/client";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { clientCreateMutation } from "@/graphql/mutations/__generated__/clientCreateMutation.graphql";
import { USER } from "@/graphql/queries/user";
import { useEffect } from "react";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { FormInput } from "@/components/FormInput";
import { useNavigate } from "react-router-dom";
import { useSetPageTitle } from "@/lib/useSetPageTitle";

export const NewClient = ({ asSideItem = false }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mutate, isInFlight] = useMutation<clientCreateMutation>(CREATE_CLIENT);
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });
  useSetPageTitle(asSideItem ? document.title : "mgmt.app - New Client");
  const form = useForm<z.infer<typeof clientV.create>>({
    resolver: zodResolver(clientV.create),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      user: user?.id || "",
    },
  });

  useEffect(() => {
    if (user?.id) {
      form.setValue("user", user.id);
    }
  }, [user]);

  const onSubmit = (data: z.infer<typeof clientV.create>) => {
    mutate({
      variables: {
        input: data,
      },
      onCompleted: () => {
        toast({
          title: "Client created",
          description: "The client was created successfully.",
        });
        form.reset({
          name: "",
          email: "",
          phone: "",
          user: user?.id || "",
        });
        {
          !asSideItem && navigate("/app");
        }
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: `There was an error creating the client. ${err.message}`,
        });
      },
    });
  };

  return (
    <section className={cn("h-full w-full relative flex flex-col  items-center justify-start lg:justify-center p-2 pt-16")}>
      <Form {...form}>
        <form
          className={cn("grid gap-y-4 gap-x-8 p-4 relative grid-cols-2", asSideItem && "gap-y-2")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className={cn(h3, "inline-flex gap-2 items-center mb-8 col-span-2 justify-center")}>New Client</h3>
          <FormInput
            name="name"
            form={form}
            label="Name"
            placeholder="Client's Name"
            description="Insert the client name here."
            className={cn("col-span-1", asSideItem && "col-span-2")}
            autoComplete="off"
            autoCapitalize="true"
          />
          <FormInput
            name="email"
            form={form}
            label="Email"
            type="email"
            placeholder="Client's Email"
            className={cn("col-span-1", asSideItem && "col-span-2")}
            description="Insert the client email here."
            autoComplete="off"
          />
          <FormInput
            name="phone"
            form={form}
            label="Phone"
            placeholder="Client's Phone"
            className={cn("col-span-1", asSideItem && "col-span-2")}
            description="Insert the client phone here."
            autoComplete="off"
          />
          <FormInput
            name="user"
            form={form}
            label="User"
            placeholder="user"
            className={cn("col-span-1", asSideItem && "col-span-2")}
            description="The user id that will be associated with this client."
            autoComplete="off"
            disabled
          />

          <Button
            className={cn("gap-2 mt-8 w-72 font-semibold col-span-2 lg:col-span-1", asSideItem && "lg:col-span-2 mt-2")}
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              form.reset({
                name: "",
                email: "",
                phone: "",
                user: user?.id || "",
              });
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Form
          </Button>
          <Button
            type="submit"
            className={cn(
              "gap-2 w-72 font-semibold col-span-2 lg:col-span-1",
              !asSideItem && "lg:mt-8",
              asSideItem && "col-span-2 mt-2"
            )}
            disabled={isInFlight}
          >
            {isInFlight ? <Loader2 className="animate-spin h-4 w-4" /> : <UserPlus className="h-4 w-4" />} Create Client
          </Button>
        </form>
      </Form>
    </section>
  );
};
