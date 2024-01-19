import { Logo } from "@/assets/Logo";
import { h1 } from "@/components/ui/typography";

export const LogoSection = () => (
  <div className="flex-grow hidden lg:h-full lg:flex items-center justify-end px-4 gap-2 text-background dark:text-foreground">
    <div className="bg-black/50 p-4 pt-1 rounded-xl flex items-center gap-2 backdrop-blur-lg shadow shadow-gray-900/70">
      <Logo className="h-16 w-16 lg:mt-3" />
      <h1 className={h1}>mgmt.app</h1>
    </div>
  </div>
);
