import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const ProjectDescriptionInfo = ({ description }: { description?: string | null }) => {
  if (description)
    return (
      <Accordion type="single" collapsible defaultValue="description">
        <AccordionItem value="description" className="border-none">
          <AccordionTrigger className="text-2xl font-semibold hover:bg-accent hover:text-accent-foreground px-3 rounded hover:no-underline">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-justify text-lg font-light p-3">{description}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  return (
    <div className="px-3 space-y-2">
      <p className="text-2xl font-semibold">Description</p>
      <p className="text-justify text-lg font-light">No description provided.</p>
    </div>
  );
};
