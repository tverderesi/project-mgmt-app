import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogDescription } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { p } from "@/ui/typography";
import { AlertOctagon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isolateErrorObject } from "./isolateErrorObject";

export function AuthErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const navigate = useNavigate();
  const errorObject = isolateErrorObject(error);

  return (
    <Dialog open={true}>
      <DialogContent closeButton={false}>
        <DialogHeader className="inline-flex flex-row text-lg font-semibold items-center">
          <AlertOctagon className="me-2 w-6 h-6" /> Error
        </DialogHeader>
        <DialogDescription className="flex flex-col justify-center mt-2">
          <p className={p}> {errorObject.message} </p>
        </DialogDescription>
        <DialogFooter className="flex justify-start">
          <Button
            className="font-semibold"
            onClick={() => {
              resetErrorBoundary();
              navigate("/login");
            }}
          >
            Navigate to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
