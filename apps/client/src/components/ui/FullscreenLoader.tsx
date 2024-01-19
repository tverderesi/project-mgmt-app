import { Loader2 } from "lucide-react";
import { h2 } from "./typography";
import { cn } from "../../lib/utils";

export function FullscreenLoader() {
  return (
    <div className="w-screen h-screen grid grid-rows-3">
      <h2 className={cn(h2, "border-none text-center row-span-1 row-start-1 self-center")}>mgmt.app</h2>
      <Loader2 className="animate-spin bg-background w-20 h-20 self-center row-span-1 row-start-2 mx-auto" strokeWidth={1} />
      <h2 className={cn(h2, "border-none text-center row-span-1 row-start-3 self-center")}>Loading...</h2>
    </div>
  );
}
