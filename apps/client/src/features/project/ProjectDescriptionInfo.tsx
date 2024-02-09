import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import projectV from "@/validators/project";
import { FormTextarea } from "@/components/FormTextArea";
import { useContext } from "react";
import { EditModeContext } from "@/lib/EditModeProvider";
export const ProjectDescriptionInfo = ({
  description,
  form,
}: {
  description?: string | null;
  form: UseFormReturn<z.infer<typeof projectV.update>>;
}) => {
  const { editMode } = useContext(EditModeContext);
  if (editMode)
    return (
      <div>
        <p className="text-2xl font-semibold px-3 rounded">Description</p>
        <FormTextarea
          form={form}
          placeholder="Description"
          name="description"
          description="Provide a description for the project."
          className="px-2 w-full resize-none"
        />
      </div>
    );
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
