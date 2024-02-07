import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SheetTrigger } from "@/components/ui/sheet";
import { userClient_Connection$key } from "@/graphql/queries/__generated__/userClient_Connection.graphql";
import { userClient_ConnectionQuery } from "@/graphql/queries/__generated__/userClient_ConnectionQuery.graphql";
import { CLIENT_FRAGMENT } from "@/graphql/queries/user";
import { usePaginationFragment } from "react-relay";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIntersectionObserver } from "usehooks-ts";
import { Loader2 } from "lucide-react";

export function ProjectFormClientDropdown({ form, user }: { form: any; user: any }) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<userClient_ConnectionQuery, userClient_Connection$key>(
    CLIENT_FRAGMENT,
    user
  );

  const clients = data?.clientEdge?.edges?.map((edge) => edge?.node);

  const { ref } = useIntersectionObserver({
    onChange: (isIntersecting) => {
      if (isIntersecting && hasNext && !isLoadingNext) {
        loadNext(10);
      }
    },
  });

  return (
    <FormField
      control={form.control}
      name="client"
      render={({ field }) => {
        return (
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

                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent className="max-h-32">
                    {clients?.map((client) => (
                      <SelectItem value={client?.id as string} ref={ref}>
                        {client?.name}
                      </SelectItem>
                    ))}
                    {isLoadingNext && (
                      <SelectItem value="loading" disabled>
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={4} />
                          <span>Loading More Clients</span>
                        </div>
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </>
            </FormControl>
            <FormDescription>You can create a client or pick an existing one.</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
