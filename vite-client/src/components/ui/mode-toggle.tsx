import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import { useTheme, Theme } from "@/components/ui/ThemeProvider.tsx";

export function ModeToggle() {
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
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
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
