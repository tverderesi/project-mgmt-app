import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaProps extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "form"> {
  form: UseFormReturn<any, any, any>;
  label: string;
  placeholder: string;
  name: string;
  className?: string;
  description?: string;
}
export function FormTextarea({ form, label, placeholder, name, className, description, ...props }: FormTextareaProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-72", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
