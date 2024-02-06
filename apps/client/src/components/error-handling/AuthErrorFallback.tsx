import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { p } from "@/components/ui/typography";
import { AlertOctagon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isolateErrorObject } from "./isolateErrorObject";
import { useMutation, graphql } from "react-relay";
import { AuthErrorFallbackMutation } from "./__generated__/AuthErrorFallbackMutation.graphql";
export function AuthErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const navigate = useNavigate();

  // const errorObject = isolateErrorObject(error);
  const [mutate, isInFlight] = useMutation<AuthErrorFallbackMutation>(graphql`
    mutation AuthErrorFallbackMutation($input: LogoutInput!) {
      logout(input: $input) {
        success
      }
    }
  `);

  return (
    <Dialog open={true}>
      <DialogContent closeButton={false}>
        <DialogHeader className="inline-flex flex-row text-lg font-semibold items-center">
          <AlertOctagon className="me-2 w-6 h-6" /> Error
        </DialogHeader>
        <DialogDescription className="flex flex-col justify-center mt-2">
          {/* <p className={p}> {errorObject.message} </p> */}
        </DialogDescription>
        <DialogFooter className="flex justify-start">
          <Button
            className="font-semibold gap-2"
            onClick={() => {
              mutate({
                variables: { input: {} },
                updater: (store) => {
                  store.invalidateStore();
                },
                onCompleted: () => {
                  resetErrorBoundary();
                  navigate("/login");
                },
              });
            }}
          >
            {isInFlight && <Loader2 className="animate-spin w-4 h-4" />} Navigate to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
