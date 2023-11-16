import { Form } from "@/components/ui/form";
import { TypographyH3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AddProject, addProjectSchema } from "@/schemas/addProjectSchema";
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

export const NewProject = () => {
  const { toast } = useToast();
  const addClientForm = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    mode: "onSubmit",
  });

  const onSubmit: (addProject: AddProject) => void = (data) => {
    console.log(data);
    toast({
      title: "Project Added",
      description: "The project was added successfully.",
    });
  };

  return (
    <section className="space-y-4 h-full relative py-2">
      <TypographyH3 className="inline-flex gap-2 items-center">
        <PlusCircle />
        New Project
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
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>Insert the project name here.</FormDescription>
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
              <PlusCircle className="h-4 w-4" /> Add Client
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
