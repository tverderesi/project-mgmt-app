import { cn } from "@/lib/utils";

type Typography = { children: React.ReactNode | React.ReactNode[]; className?: string };
export const TypographyH1: React.FC<Typography> = ({ children, className }) => {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  );
};

export const TypographyH2: React.FC<Typography> = ({ children, className }) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const TypographyH3: React.FC<Typography> = ({ children, className }) => {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
};
