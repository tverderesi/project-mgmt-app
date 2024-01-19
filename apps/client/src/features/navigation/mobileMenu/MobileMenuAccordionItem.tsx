import { AccordionItem, AccordionTrigger, AccordionContent } from "../../../ui/accordion";
import { cn } from "@/lib/utils";
import { h3 } from "../../../ui/typography";
import { MobileMenuListItem } from "./MobileMenuListItem";

interface ListItem {
  to: string;
  title: string;
  description: string;
}

export interface MobileMenuAccordionItemProps {
  value: string;
  title: string;
  fragmentRef: any;
  listItems: ListItem[];
  Widget: any;
  children?: React.ReactNode | React.ReactNode[];
}

export function MobileMenuAccordionItem({
  children,
  value,
  title,
  fragmentRef,
  listItems,
  Widget,
}: MobileMenuAccordionItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>
        <div className="flex flex-col items-start gap-y-2">
          <h3 className={cn(h3, "text-rose-500")}>{title}</h3>
          <Widget fragmentRef={fragmentRef} />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {children}
        {listItems.map((item) => (
          <MobileMenuListItem to={item.to} title={item.title} key={item.title}>
            {item.description}
          </MobileMenuListItem>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
