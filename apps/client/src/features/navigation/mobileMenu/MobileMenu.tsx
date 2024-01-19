import { ModeToggle } from "@/ui/mode-toggle";
import { Skeleton } from "@/ui/skeleton";
import { AvatarDropdown } from "../AvatarDropdown";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../../../ui/sheet";
import { Menu } from "lucide-react";
import { Accordion } from "../../../ui/accordion";
import { cn } from "@/lib/utils";
import { h2 } from "../../../ui/typography";
import { Suspense, useState } from "react";
import { MobileMenuAccordionItem } from "./MobileMenuAccordionItem";
import { useMobileMenuItems } from "./useMobileMenuItems";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const mobileMenuItems = useMobileMenuItems();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="md:hidden">
          <Menu className="w-8 h-8" />
        </div>
      </SheetTrigger>
      <SheetContent className="w-screen">
        <SheetHeader>
          <h2 className={cn(h2, "border-none text-start")}>mgmt.app</h2>
        </SheetHeader>
        <Accordion type="multiple" className="mt-4">
          {mobileMenuItems.map(({ children, ...item }) =>
            children ? (
              <MobileMenuAccordionItem {...item}>{children}</MobileMenuAccordionItem>
            ) : (
              <MobileMenuAccordionItem {...item} />
            )
          )}
        </Accordion>
        <SheetFooter className="absolute bottom-0 h-12 flex flex-row items-center justify-between w-[calc(100%-3rem)] mb-6">
          <Suspense fallback={<Skeleton className="w-10 h-10" />}>
            <AvatarDropdown align="start" />
          </Suspense>
          <ModeToggle align="end" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
