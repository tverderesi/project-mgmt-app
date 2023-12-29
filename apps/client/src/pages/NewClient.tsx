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
import { useEffect } from "react";
import { CURRENT_USER, USER } from "@/graphql/queries/user";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandGroup } from "@/components/ui/command";
import countryCodes from "@/assets/countryCodes.json";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CREATE_CLIENT } from "@/graphql/mutations/client";
import { useMutation, usePreloadedQuery, loadQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
export const NewClient = ({ asSideItem = false }) => {
  type NewClient = z.infer<typeof createClientValidator>;
  const { toast } = useToast();

  const form = useForm<NewClient>({
    resolver: zodResolver(createClientValidator),
  });

  const queryRef = loadQuery<{
    variables: Record<string, never>;
    response: {
      currentUser: {
        id: string;
      };
    };
  }>(RelayEnvironment, CURRENT_USER, {});
  const {
    currentUser: { id },
  } = usePreloadedQuery(CURRENT_USER, queryRef);

  const [createClient] = useMutation(CREATE_CLIENT);

  useEffect(() => {
    if (id) {
      form.setValue("user", id);
    }
  }, [id]);

  const onSubmit = (data: NewClient) => {
    data.phone = `${data.countryCode}${data.phone}`;
    const { countryCode, ...rest } = data;
    createClient({
      variables: { input: rest },
      onCompleted: () => {
        toast({
          title: "Client created successfully",
          description: "The client was created successfully.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Client creation failed",
          description: error.message,
          variant: "destructive",
        });
      },
      updater: (store) => {
        const newClient = store.getRootField("createClient");
        const clients = store?.getRoot()?.getLinkedRecords("clients", { user: id });
        if (clients) {
          const updatedClients = [...clients, newClient];
          store.getRoot().setLinkedRecords(updatedClients, "clients", { user: id });
        } else {
          store.getRoot().setLinkedRecords([newClient], "clients", { user: id });
        }
      },
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
            name="countryCode"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>Country Phone Code</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-72 justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? countryCodes.find((country) => country.dial_code === field.value)?.name : "Select Country"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-0">
                    <Command className="h-72">
                      <CommandInput placeholder="Search Phone Code" className="h-9" />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <ScrollArea className="h-72 overflow-auto">
                        <CommandGroup>
                          {countryCodes.map((country) => (
                            <CommandItem
                              value={country.name}
                              key={country.code}
                              onSelect={() => {
                                form.setValue("countryCode", country.dial_code);
                              }}
                            >
                              {country.name}
                              <CheckIcon
                                className={cn("ml-auto h-4 w-4", country.dial_code === field.value ? "opacity-100" : "opacity-0")}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Select the country phone code.</FormDescription>
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
