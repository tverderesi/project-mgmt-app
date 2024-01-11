import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { p } from "@/components/ui/typography";
import { AuthError } from "@/lib/utils";
import { AlertOctagon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AuthErrorFallback({ error, resetErrorBoundary }: { error: AuthError; resetErrorBoundary: () => void }) {
  const navigate = useNavigate();

  return (
    <Dialog open={true}>
      <DialogContent closeButton={false}>
        <DialogHeader className="inline-flex flex-row text-lg font-semibold items-center">
          <AlertOctagon className="me-2 w-6 h-6" /> Error
        </DialogHeader>
        <DialogDescription className="flex flex-col justify-center mt-2">
          <p className={p}> {error.message} Please login again.</p>
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
