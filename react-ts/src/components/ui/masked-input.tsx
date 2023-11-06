import { forwardRef, LegacyRef } from "react";
import { cn } from "@/lib/utils";
import ReactInputMask, { Props } from "react-input-mask";

interface MaskedInputProps extends Props, React.InputHTMLAttributes<HTMLInputElement> {}

const MaskedInput = forwardRef<ReactInputMask, MaskedInputProps>(
  ({ className, type, mask, ...props }, ref: LegacyRef<ReactInputMask>) => {
    return (
      <ReactInputMask
        type={type}
        className={cn(
          "flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md",
          className
        )}
        mask={mask}
        ref={ref}
        {...props}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
