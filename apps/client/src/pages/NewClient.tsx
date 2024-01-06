import { Form } from "@/components/ui/form";
import { TypographyH3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import clientV from "@/validators/client";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
export const NewClient = ({ asSideItem = false }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof clientV.create>>({
    resolver: zodResolver(clientV.create),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: z.infer<typeof clientV.create>) => {
    console.log(data);
    toast({
      title: "Client created",
      description: "The client was created successfully.",
    });
  };

  return (
    <section className={cn("h-full w-full relative flex flex-col items-center justify-start lg:justify-center p-2")}>
      <Form {...form}>
        <form
          className={cn("grid grid-cols-1  gap-y-4 gap-x-8 p-4 relative", !asSideItem && "lg:grid-cols-2")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TypographyH3 className="inline-flex gap-2 items-center mb-8">New Client</TypographyH3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
                <FormItem>
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
          <Button type="reset" className="gap-2 mt-8 w-72 font-semibold" variant="destructive" onClick={() => form.reset()}>
            <RotateCcw className="h-4 w-4" />
            Reset Form
          </Button>
          <Button type="submit" className={cn("gap-2 w-72 font-semibold", !asSideItem && "lg:mt-8")}>
            <UserPlus className="h-4 w-4" /> Add Client
          </Button>
        </form>
      </Form>
    </section>
  );
};
