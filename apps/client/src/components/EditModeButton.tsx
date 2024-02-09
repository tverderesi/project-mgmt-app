import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EditModeContext } from "@/lib/EditModeProvider";

export function EditModeButton({ thing }: { thing: string }) {
  const { editMode, setEditMode } = useContext(EditModeContext);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={editMode ? "sm" : "icon"}
            variant="outline"
            className="shadow-none"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Cancel" : <Pencil2Icon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit {thing}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
