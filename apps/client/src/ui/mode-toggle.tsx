import { Moon, Sun } from "lucide-react";
import { Button } from "@/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { useTheme, Theme } from "@/ui/ThemeProvider";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
export function ModeToggle({
  align = "end",
  className = "",
}: {
  align?: DropdownMenuContentProps["align"];
  className?: ClassValue;
}) {
  const { setTheme } = useTheme();

  const themeArray: {
    key: Theme;
    label: string;
  }[] = [
    {
      key: "light",
      label: "Light",
    },
    {
      key: "dark",
      label: "Dark",
    },
    {
      key: "system",
      label: "System",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className)}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {themeArray.map(({ key, label }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => {
              setTheme(key);
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

ModeToggle.displayName = "ModeToggle";
