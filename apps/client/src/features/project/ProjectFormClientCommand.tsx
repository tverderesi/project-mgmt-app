import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useFragment } from "react-relay";

interface CommandClientMapProps {
  id: string;
  name: string;
}
export function ProjectFormClientCommand({ form, user }: { form: any; user: any }) {
  // const clients = useFragment<userClient_client$key>(CLIENT_FRAGMENT, user.clients);

  return (
    <></>
    // <FormField
    //   control={form.control}
    //   name="client"
    //   render={({ field }) => (
    //     <FormItem className="w-72 col-span-2 md:col-span-1 grid-rows-2">
    //       <FormLabel>Client</FormLabel>
    //       <FormControl>
    //         <>
    //           <SheetTrigger asChild>
    //             <Button variant="outline" className="w-72 font-semibold">
    //               Create Client
    //             </Button>
    //           </SheetTrigger>
    //           <div className="relative h-8 flex flex-row items-center w-72">
    //             <Separator className="my-2 absolute flex flex-row items-center" />
    //             <div className="text-sm font-semibold bg-background p-1 rounded-sm absolute left-[7.5rem] z-[1] tracking-widest w-10 text-center">
    //               OR
    //             </div>
    //           </div>
    //           <Popover>
    //             <PopoverTrigger asChild>
    //               <FormControl>
    //                 <Button
    //                   variant="outline"
    //                   role="combobox"
    //                   className={cn("w-72 justify-between", !field.value && "text-muted-foreground")}
    //                 >
    //                   {field.value
    //                     ? clients.find((client: CommandClientMapProps) => client?.id === field.value)?.name
    //                     : "Select Client"}
    //                   <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //                 </Button>
    //               </FormControl>
    //             </PopoverTrigger>
    //             <PopoverContent className="w-72 p-0">
    //               {clients.length === 0 ? (
    //                 <div className="py-6 text-center text-sm">No Clients Found.</div>
    //               ) : (
    //                 <Command value={field.value} onValueChange={field.onChange}>
    //                   <CommandEmpty>No Clients Found.</CommandEmpty>

    //                   <CommandInput placeholder="Search Client..." className="h-9" />
    //                   <ScrollArea className="max-h-72 overflow-auto">
    //                     <CommandGroup>
    //                       {clients.map((client: CommandClientMapProps) => (
    //                         <CommandItem
    //                           value={client?.id}
    //                           key={client?.id}
    //                           onSelect={() => {
    //                             form.setValue("client", client?.id as string);
    //                           }}
    //                         >
    //                           {client?.name}
    //                           <CheckIcon
    //                             className={cn("ml-auto h-4 w-4", client?.id === field.value ? "opacity-100" : "opacity-0")}
    //                           />
    //                         </CommandItem>
    //                       ))}
    //                     </CommandGroup>
    //                   </ScrollArea>
    //                 </Command>
    //               )}
    //             </PopoverContent>
    //           </Popover>
    //         </>
    //       </FormControl>
    //       <FormDescription>You can create a client or pick an existing one.</FormDescription>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  );
}
