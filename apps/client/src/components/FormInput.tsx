import { UseFormReturn } from "react-hook-form";
import { Input } from "@/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/ui/form";
import { cn } from "@/lib/utils";

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  form: UseFormReturn<any, any, any>;
  label: string;
  placeholder: string;
  name: string;
  className?: string;
  description?: string;
}
export function FormInput({ form, label, placeholder, name, className, description, ...props }: FormInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-72", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
