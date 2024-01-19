import { h3 } from "@/ui/typography";
import { Dialog, DialogTrigger, DialogContent } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { userUserQuery$data } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { DeleteDialogContent } from "./DeleteUserDialogContent";

export function DeleteUser({ user }: { user: userUserQuery$data["user"] }) {
  return (
    <Dialog>
      <h3 className={h3}>Danger Zone</h3>
      <p className="text-slate-500"> These actions are permanent and cannot be undone.</p>
      <DialogTrigger asChild className="mt-4">
        <Button variant="destructive" className="font-semibold">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DeleteDialogContent user={user} />
      </DialogContent>
    </Dialog>
  );
}
