import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn, toTitleCase } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PlusCircle, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewClient } from "./NewClient";
import projectV from "@/validators/project";
import { h3 } from "@/components/ui/typography";

export const NewProject = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectV.create>>({
    resolver: zodResolver(projectV.create),
    defaultValues: {
      name: "",
      description: "",
      status: "NOT_STARTED",
    },
  });

  const status = projectV.create.shape.status.Values;
  const statusEnum = Object.values(status).map((status) => ({ value: status, label: toTitleCase(status) }));

  const user = {
    clients: [
      { id: "1", name: "Client 1" },
      { id: "2", name: "Client 2" },
      { id: "3", name: "Client 3" },
      { id: "4", name: "Client 4" },
    ],
  };

  return (
    <section className="flex flex-col justify-start md:justify-center items-center h-full w-full pt-8">
      <Sheet>
        <h3 className={cn(h3, "inline-flex gap-2 items-center mb-8")}>New Project</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              toast({
                title: "Success",
                description: "Project created successfully!",
              });
            })}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0  md:gap-4 md:gap-x-8 pb-8 md:pb-0"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-72">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Insert the project name here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 md:col-span-1 grid-rows-2">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-72">
                        <SelectValue placeholder="Project Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {statusEnum.map(({ value, label }) => (
                            <SelectItem value={value} className="text-capitalize">
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select your project status.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 md:col-span-1 grid-rows-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" className="min-h-[7.5rem] max-h-[7.5rem]" {...field} />
                  </FormControl>
                  <FormDescription>Insert a brief description of the project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="w-72 col-span-2 md:col-span-1 grid-rows-2">
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="w-72 font-semibold">
                          Create Client
                        </Button>
                      </SheetTrigger>
                      <div className="relative h-8 flex flex-row items-center w-72">
                        <Separator className="my-2 absolute flex flex-row items-center" />
                        <div className="text-sm font-semibold bg-background p-1 rounded-sm absolute left-[7.5rem] z-[1] tracking-widest w-10 text-center">
                          OR
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-72 justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? user?.clients.find((client) => client?.id === field.value)?.name : "Select Client"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-0">
                          {user?.clients.length === 0 ? (
                            <div className="py-6 text-center text-sm">No Clients Found.</div>
                          ) : (
                            <Command value={field.value} onValueChange={field.onChange}>
                              <CommandEmpty>No Clients Found.</CommandEmpty>

                              <CommandInput placeholder="Search Client..." className="h-9" />
                              <ScrollArea className="max-h-72 overflow-auto">
                                <CommandGroup>
                                  {user?.clients.map((client) => (
                                    <CommandItem
                                      value={client?.id}
                                      key={client?.id}
                                      onSelect={() => {
                                        form.setValue("client", client?.id as string);
                                      }}
                                    >
                                      {client?.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          client?.id === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </ScrollArea>
                            </Command>
                          )}
                        </PopoverContent>
                      </Popover>
                    </>
                  </FormControl>
                  <FormDescription>You can create a client or pick an existing one.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="inline-flex w-full justify-center gap-4 col-span-2 mt-8">
              <Button type="reset" className="gap-2" variant="destructive">
                <RotateCcw className="h-4 w-4" />
                Reset Form
              </Button>
              <Button type="submit" className="gap-2 font-semibold">
                <PlusCircle className="h-4 w-4" /> Create Project
              </Button>
            </div>
          </form>
        </Form>

        <SheetContent className="max-md:w-screen">
          <NewClient asSideItem />
        </SheetContent>
      </Sheet>
    </section>
  );
};
