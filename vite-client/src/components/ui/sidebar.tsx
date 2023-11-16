import { cn } from "@/lib/utils";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, To } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme, Theme } from "@/components/ui/ThemeProvider";

interface SidebarContextProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

interface SidebarProviderProps {
  children: ReactNode[] | ReactNode;
}

interface SidebarProps {
  children: ReactNode[] | ReactNode;
  className?: string;
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode | ReactNode[];
  label: string;
  className?: string;
}

interface SidebarLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  to: To;
  className?: string;
}

interface SidebarAvatarProps {
  label: string;
  className?: string;
}

const SidebarContext = createContext<SidebarContextProps>({
  isMenuOpen: false,
  setIsMenuOpen: () => null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar: () => SidebarContextProps = () => useContext(SidebarContext);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  const { isMenuOpen, setIsMenuOpen } = useSidebar();
  return (
    <aside
      onMouseEnter={() => !isMenuOpen && setIsMenuOpen(true)}
      onMouseLeave={(e) => {
        isMenuOpen && setIsMenuOpen(false);
        e.stopPropagation();
      }}
      className={cn(
        "-translate-x-36 md:translate-x-0 flex h-full transition-all  ease-in-out duration-300 md:px-0 gap-y-2 flex-col md:w-12 pr-2 py-2 justify-start left-0 absolute md:relative z-[100] md:z-0",
        isMenuOpen && "w-screen md:w-64 mr-2",
        className
      )}
    >
      {children}
    </aside>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, className, ...props }) => {
  const { isMenuOpen } = useSidebar();
  return (
    <Button
      size={isMenuOpen ? "default" : "icon"}
      className={cn(
        `w-full justify-start items-center pl-2 relative md:bg-background bg-transparent justify-self-center`,
        className
      )}
      variant="ghost"
      {...props}
      asChild
    >
      <div>
        <div className="flex-shrink-0">{icon}</div>
        <span
          className={`${
            isMenuOpen ? "opacity-100 relative" : "opacity-0 absolute z-[-1]"
          } transition-all ease-in-out duration-300 p-4 text-base leading-snug w-48 whitespace-nowrap`}
        >
          {label}
        </span>
      </div>
    </Button>
  );
};

export const SidebarMenuButton: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useSidebar();
  return (
    <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <MenuIcon className="w-4 h-4" />
    </Button>
  );
};

export const SidebarAvatar: React.FC<SidebarAvatarProps> = ({ label, className }) => {
  const { isMenuOpen, setIsMenuOpen } = useSidebar();
  return (
    <Button
      size={isMenuOpen ? "default" : "icon"}
      className={cn(
        `w-full justify-start items-center pl-0 relative md:bg-background bg-transparent disabled:opacity-100 hover:bg-transparent pointer-events-none`,
        className
      )}
      onClick={() => isMenuOpen && setIsMenuOpen(false)}
      asChild
      disabled
    >
      <div className="flex flex-row items-center justify-start gap-2">
        <Avatar>
          <AvatarImage
            src="https://source.unsplash.com/300x300/?face"
            className="rounded-full p-1"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span
          className={`${
            isMenuOpen ? "opacity-100 relative" : "opacity-0 absolute z-[-1]"
          } transition-all ease-in-out duration-300 p-4 pl-0 text-base leading-snug whitespace-nowrap text-foreground text-left w-auto`}
        >
          {label}
        </span>
      </div>
    </Button>
  );
};

export const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, to, className }) => {
  const { isMenuOpen } = useSidebar();

  return (
    <Button
      size={isMenuOpen ? "default" : "icon"}
      className={cn(
        `w-full justify-start items-center pl-2 relative md:bg-background bg-transparent justify-self-center`,
        className
      )}
      variant="ghost"
      asChild
    >
      <Link to={to}>
        <div className="flex-shrink-0">{icon}</div>
        <span
          className={`${
            isMenuOpen ? "opacity-100 relative" : "opacity-0 absolute z-[-1]"
          } transition-all ease-in-out duration-300 p-4 text-base leading-snug w-48 whitespace-nowrap`}
        >
          {label}
        </span>
      </Link>
    </Button>
  );
};

export const SidebarThemeToggle: React.FC = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useTheme();
  const { isMenuOpen } = useSidebar();

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
    <Button
      size={isMenuOpen ? "default" : "icon"}
      onClick={() => {
        setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
      }}
      className={cn(
        `w-full justify-start items-center pl-2 relative md:bg-background bg-transparent justify-self-center`,
        className
      )}
      variant="ghost"
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span
        className={`${
          isMenuOpen ? "opacity-100 relative left-0" : "opacity-0 absolute left-6 z-[-1]"
        } transition-all ease-in-out duration-300 p-4 text-base leading-snug w-48 whitespace-nowrap text-start`}
      >
        Theme: {themeArray.find((t) => t.key === theme)?.label}
      </span>
    </Button>
  );
};
