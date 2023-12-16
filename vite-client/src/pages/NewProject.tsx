import { Form } from "@/components/ui/form";
import { TypographyH3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, PlusCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { createProjectValidator } from "@/validators/project";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toTitleCase } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { USER } from "./USER";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { IS_AUTHENTICATED } from "@/IS_AUTHENTICATED";
import { useLazyQuery } from "@apollo/client";
import { CommandLoading } from "cmdk";
import { useNavigate } from "react-router-dom";

export const NewProject = () => {
  type Project = z.infer<typeof createProjectValidator>;
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createProjectValidator>>({
    resolver: zodResolver(createProjectValidator),
    defaultValues: {
      name: "",
      description: "",
      status: "NOT_STARTED",
      progress: 0,
      autoProgress: false,
    },
  });

  const status = createProjectValidator.shape.status.Values;
  const statusEnum = Object.values(status).map((status) => ({ value: status, label: toTitleCase(status) }));

  const onSubmit = (data: Project) => {
    console.log(data);
    toast({
      title: "Project Added",
      description: "The project was added successfully.",
    });
  };
  useEffect(() => {
    switch (form.watch("status")) {
      case "NOT_STARTED":
        form.setValue("progress", 0);
        break;

      case "COMPLETED":
        form.setValue("progress", 100);
        break;
    }
  }, [form.watch("status")]);

  const { data, loading } = useQuery(IS_AUTHENTICATED);
  const [user, { data: userData, loading: userLoading }] = useLazyQuery(USER);

  useEffect(() => {
    (async function getUser() {
      if (data?.currentUser?.id) {
        const id = (data as { currentUser: { id: string } }).currentUser.id;
        await user({ variables: { id } });
        form.setValue("userId", id);
      }
    })();
  }, [data?.currentUser?.id]);

  return (
    <section className="space-y-4">
      <TypographyH3 className="inline-flex gap-2 items-center">New Project</TypographyH3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>Insert a brief description of the project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-72">
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
            name="progress"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>Progress</FormLabel>
                <FormControl>
                  <Slider
                    onValueChange={field.onChange}
                    max={100}
                    disabled={form.watch("status") !== "IN_PROGRESS" || form.watch("autoProgress")}
                    value={[
                      form.watch("autoProgress")
                        ? 0
                        : form.watch("status") === "NOT_STARTED"
                        ? 0
                        : form.watch("status") === "COMPLETED"
                        ? 100
                        : field.value,
                    ]}
                  />
                </FormControl>
                <FormDescription>Project is {form.watch("progress")}% Completed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>Progress</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn("w-72 justify-between", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? data?.user?.clients?.find((client) => client.id === field.value) : "Select Client"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0">
                      {userData?.user?.clients?.length === 0 ? (
                        <div className="py-6 text-center text-sm">
                          No Clients Found.
                          <div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                const callbackParams = btoa(JSON.stringify(form.getValues()));
                                navigate(`/app/${data.currentUser.role.toLowerCase()}/clients/new?callback=${callbackParams}`);
                              }}
                            >
                              Create Client
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Command value={field.value} onValueChange={field.onChange}>
                          <CommandInput placeholder="Search Client..." className="h-9" />

                          <CommandList>
                            <CommandEmpty>No Clients Found.</CommandEmpty>
                            {userLoading && (
                              <CommandLoading>
                                <span>
                                  <Loader2 className="h-4 w-4" /> Loading Clients{" "}
                                </span>
                              </CommandLoading>
                            )}

                            {userData?.user?.clients?.map((client) => (
                              <CommandItem
                                value={client?.name}
                                key={client?.id}
                                onSelect={() => {
                                  form.setValue("clientId", client.id);
                                }}
                              >
                                {client?.name}
                                <CheckIcon
                                  className={cn("ml-auto h-4 w-4", client.id === field.value ? "opacity-100" : "opacity-0")}
                                />
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      )}
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>Project is {form.watch("progress")}% Completed.</FormDescription>
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
