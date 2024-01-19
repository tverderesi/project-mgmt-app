import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, RotateCcw, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/ui/button";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/ui/form";
import clientV from "@/validators/client";
import { Input } from "@/ui/input";
import * as z from "zod";
import { useToast } from "@/ui/use-toast";
import { cn } from "@/lib/utils";
import { h3 } from "@/ui/typography";
import { CREATE_CLIENT } from "@/graphql/mutations/client";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { clientCreateMutation } from "@/graphql/mutations/__generated__/clientCreateMutation.graphql";
import { USER } from "@/graphql/queries/user";
import { useEffect } from "react";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";

export const NewClient = ({ asSideItem = false }) => {
  const { toast } = useToast();
  const [mutate, loading] = useMutation<clientCreateMutation>(CREATE_CLIENT);
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });

  const form = useForm<z.infer<typeof clientV.create>>({
    resolver: zodResolver(clientV.create),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      user: "",
    },
  });

  useEffect(() => {
    if (user.id) {
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
        form.reset();
      },
      onError: (err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "There was an error creating the client.",
        });
      },
    });
  };

  return (
    <section className={cn("h-full w-full relative flex flex-col  items-center justify-start lg:justify-center p-2 pt-16")}>
      <Form {...form}>
        <form className={cn("grid gap-y-4 gap-x-8 p-4 relative grid-cols-2")} onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className={cn(h3, "inline-flex gap-2 items-center mb-8 col-span-2")}>New Client</h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={cn("col-span-2 lg:col-span-1", asSideItem && "lg:col-span-2")}>
                <FormLabel>Name</FormLabel>
                <FormControl className="w-72">
                  <Input placeholder="Client's Name" {...field} autoComplete="off" />
                </FormControl>
                <FormDescription>Insert the client's name here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={cn("col-span-2 lg:col-span-1", asSideItem && "lg:col-span-2")}>
                <FormLabel>Email</FormLabel>
                <FormControl className="w-72">
                  <Input placeholder="client@email.com" {...field} autoComplete="off" />
                </FormControl>
                <FormDescription>Insert the client's email here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Phone</FormLabel>
                  <FormControl className="w-72">
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                  <FormDescription className="w-72">Insert the client's phone here.</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type="reset"
            className={cn("gap-2 mt-8 w-72 font-semibold col-span-2 lg:col-span-1", asSideItem && "lg:col-span-2")}
            variant="destructive"
            onClick={() => form.reset()}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Form
          </Button>
          <Button
            type="submit"
            className={cn(
              "gap-2 w-72 font-semibold col-span-2 lg:col-span-1",
              !asSideItem && "lg:mt-8",
              asSideItem && "col-span-2 mt-8"
            )}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <UserPlus className="h-4 w-4" />} Add Client
          </Button>
        </form>
      </Form>
    </section>
  );
};
