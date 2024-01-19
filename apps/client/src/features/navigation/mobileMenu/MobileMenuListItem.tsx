import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export interface MobileMenuListItemProps {
  to: string;
  title: string;
  className?: ClassValue;
  children?: React.ReactNode | React.ReactNode[];
}

export function MobileMenuListItem({ to, title, children, className }: MobileMenuListItemProps) {
  return (
    <Link
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      to={to}
    >
      <div className="text-sm font-semibold leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
    </Link>
  );
}
