import { Form } from "@/components/ui/form";
import { TypographyH3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addClient, addClientSchema } from "../schemas/addClientSchema";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { MaskedInput } from "@/components/ui/masked-input";

export const NewClient = () => {
  const { toast } = useToast();
  const addClientForm = useForm<z.infer<typeof addClientSchema>>({
    resolver: zodResolver(addClientSchema),
    mode: "onSubmit",
  });

  const onSubmit: (addClient: addClient) => void = (data) => {
    console.log(data);
    toast({
      title: "Client added",
      description: "The client was added successfully.",
    });
  };

  return (
    <section className="space-y-4 h-full relative py-2">
      <TypographyH3 className="inline-flex gap-2 items-center">
        <UserPlus />
        New Client
      </TypographyH3>

      <Form {...addClientForm}>
        <form onSubmit={addClientForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={addClientForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Client's Name" {...field} />
                </FormControl>
                <FormDescription>Insert the client's name here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addClientForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormDescription>Insert the client's email here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addClientForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                {/* TODO: Do better international phone handling */}
                <FormControl>
                  <MaskedInput mask="+999 99999-9999" {...field} />
                </FormControl>
                <FormDescription>Insert the client's phone here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="inline-flex w-full items-center justify-end gap-4 absolute bottom-0 right-2">
            <Button type="reset" className="gap-2" variant="destructive">
              <RotateCcw className="h-4 w-4" />
              Reset Form
            </Button>
            <Button type="submit" className="gap-2">
              <UserPlus className="h-4 w-4" /> Add Client
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
