import { code, h4, p } from "@/components/ui/typography";
import { DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl } from "@/components/ui/form";
import { useMutation } from "react-relay";
import { userUserQuery$data } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { DELETE_USER } from "@/features/user/user";
import { Loader2 } from "lucide-react";
import { userDeleteMutation } from "@/features/user/__generated__/userDeleteMutation.graphql";
import { logoutMutation } from "@/features/auth/__generated__/logoutMutation.graphql";
import { LOGOUT } from "@/features/auth/auth";

export function DeleteDialogContent({ user }: { user: userUserQuery$data["user"] }) {
  const schema = z.object({
    delete: z.string().refine((v) => v === "delete my account"),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const [deleteUser, loading] = useMutation<userDeleteMutation>(DELETE_USER);
  const [logout] = useMutation<logoutMutation>(LOGOUT);

  const handleSubmit = () => {
    if (user?.id) {
      deleteUser({
        onCompleted: ({ deleteUser }) => {
          if (deleteUser) {
            logout({
              updater: (store) => {
                store.invalidateStore();
              },
              onCompleted: () => {
                window.location.href = "/login";
              },
              variables: {},
            });
          }
        },
        variables: {
          id: user?.id,
        },
      });
    }
  };
  return (
    <>
      <DialogHeader>
        <h4 className={h4}>Warning</h4>
      </DialogHeader>
      <DialogDescription className="space-y-4">
        <p className={p}>
          This action is permanent and cannot be undone. If you delete your account, you will lose all your data. If you wish to
          continue, please type <span className={cn(code, "font-sans")}>delete my account</span> below.
        </p>
        <Form {...form}>
          <form className="space-y-4 flex flex-col items-center" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="delete"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder="delete my account" autoComplete="off" {...field} />
                </FormControl>
              )}
            />

            <Button
              type="submit"
              variant="destructive"
              disabled={!!form.formState.errors.delete || !form.getFieldState("delete").isDirty || loading}
              className="font-semibold"
            >
              {loading && <Loader2 className="animate-spin me-2" />} Delete Account
            </Button>
          </form>
        </Form>
      </DialogDescription>
    </>
  );
}
