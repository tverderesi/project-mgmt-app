import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectStatusSelectProps {
  form: any;
  statusEnum: { value: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"; label: string }[];
}
export function ProjectStatusSelect({ form, statusEnum }: ProjectStatusSelectProps) {
  return (
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
  );
}
