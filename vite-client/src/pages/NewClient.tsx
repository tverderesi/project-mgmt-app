import { Form } from "@/components/ui/form";
import { TypographyH3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { createClientValidator } from "@/validators/client";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
export const NewClient = () => {
  createClientValidator.omit({ phone: true }).extend({
    phone: z.string().min(11, "Invalid Phone number!").max(16, "Invalid Phone Number"),
  });
  type NewClient = z.infer<typeof createClientValidator>;
  const { toast } = useToast();
  const form = useForm<NewClient>({
    resolver: zodResolver(createClientValidator),
  });

  const formatE164Number = (number: string) => {
    const digitsAndSpaces = number.replace(/[^0-9\s]/g, "");
    const max15Digits = digitsAndSpaces.replace(/\s/g, "").slice(0, 15);
    return "+" + max15Digits;
  };

  return (
    <section className="h-full w-full relative py-2 flex flex-col items-center justify-center">
      <TypographyH3 className="inline-flex gap-2 items-center">New Client</TypographyH3>

      <Form {...form}>
        <form className="grid grid-cols-1 gap-y-4" onSubmit={form.handleSubmit((data) => console.log(data))}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="w-72">
                  <Input placeholder="Client's Name" {...field} />
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
                <FormControl className="max-w-lg">
                  <Input placeholder="client@email.com" {...field} />
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
                  <FormControl className="max-w-lg">
                    <Input {...field} onChange={(e) => field.onChange(formatE164Number(e.target.value))} />
                  </FormControl>
                  <FormDescription>Insert the client's phone here.</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
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
