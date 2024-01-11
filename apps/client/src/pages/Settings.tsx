import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { code, h2, h3, h4, p } from "@/components/ui/typography";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import userV from "@/validators/user";
import { loadQuery, useMutation, usePreloadedQuery } from "react-relay";
import { RelayEnvironment } from "@/RelayEnvironment";
import { ME } from "@/graphql/queries/user";
import { userMeQuery } from "@/graphql/queries/__generated__/userMeQuery.graphql";
import { useEffect } from "react";
import { DELETE_USER, UPDATE_USER } from "@/graphql/mutations/user";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { isJSON } from "@/lib/utils";
import { LOGOUT } from "@/graphql/mutations/auth";
import { userDeleteMutation } from "@/graphql/mutations/__generated__/userDeleteMutation.graphql";
import { authLogoutMutation } from "@/graphql/mutations/__generated__/authLogoutMutation.graphql";

export const queryRef = loadQuery<userMeQuery>(RelayEnvironment, ME, {});

export function Settings() {
  const { toast } = useToast();
  const data = usePreloadedQuery(ME, queryRef);

  const updateForm = useForm<z.infer<typeof userV.update>>({
    resolver: zodResolver(userV.update),
    mode: "all",
  });

  useEffect(() => {
    if (data.me?.user?.id) {
      updateForm.setValue("id", data.me.user.id);
    }
  }, [data]);

  const [updateUser, loading] = useMutation(UPDATE_USER);

  const onSubmit = (data: z.infer<typeof userV.update>) => {
    updateUser({
      variables: { input: data },
      onCompleted() {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      },
      updater(store) {
        store.invalidateStore();
      },
      onError(error) {
        const parts = error.message.split("&&");
        const jsonString = parts[1];

        const errorObject = JSON.parse(jsonString);
        const isJson = isJSON(errorObject.message);

        if (isJson) {
          const errors = JSON.parse(errorObject.message);
          Object.keys(errors).forEach((key) => {
            type Keys = z.infer<typeof userV.update>;
            updateForm.setError(key as keyof Keys, {
              type: "validate",
              message: errors[key],
            });
          });
          return;
        }

        toast({
          title: "Error",
          description: errorObject.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="pt-18 pb-4">
      <Dialog>
        <Card>
          <CardHeader>
            <CardTitle className={cn(h2, "border-none")}>Settings</CardTitle>
            <CardDescription>You can change your settings here.</CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className={h3}>Edit Profile</CardTitle>
            <CardDescription>
              You can update any of your profile information below. You always must type your password to be able to save the
              changes.
            </CardDescription>
            <Form {...updateForm}>
              <form
                onSubmit={updateForm.handleSubmit(onSubmit)}
                className={cn("gap-4 grid grid-cols-2 flex-wrap pt-4 max-w-2xl")}
              >
                <FormField
                  control={updateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-72 col-span-2 md:col-span-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} autoComplete="off" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-72 col-span-2 md:col-span-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} autoComplete="off" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-72 col-span-2 md:col-span-1">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} type="password" autoComplete="off" />
                      </FormControl>
                      <FormDescription className="text-justify">
                        Make sure to use a strong password. It must contain at least 8 characters and at least one uppercase
                        letter, one lowercase letter, one number and one symbol.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-72 col-span-2 md:col-span-1">
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} type="password" autoComplete="off" />
                      </FormControl>
                      <FormDescription className="text-justify">
                        You must confirm your new password, so we can make sure you typed it correctly.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={updateForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-72 col-span-2 md:col-span-1">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem className="w-72 col-span-2 md:col-span-1">
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} type="password" />
                      </FormControl>
                      <FormDescription>You must enter your current password to save the changes.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row justify-start mt-4 col-span-2">
                  <Button type="submit" className="font-semibold" disabled={loading}>
                    {loading && <Loader2 className="animate-spin me-2" />} Update Profile
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <h3 className={h3}>Danger Zone</h3>
            <p className="text-slate-500"> These actions are permanent and cannot be undone.</p>
            <DialogTrigger asChild className="mt-4">
              <Button variant="destructive" className="font-semibold">
                Delete Account
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DeleteDialog />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeleteDialog() {
  const schema = z.object({
    delete: z.string().refine((v) => v === "delete my account"),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const { me } = usePreloadedQuery(ME, queryRef);
  const [deleteUser, loading] = useMutation<userDeleteMutation>(DELETE_USER);
  const [logout] = useMutation<authLogoutMutation>(LOGOUT);

  const handleSubmit = () => {
    if (me.user?.id) {
      deleteUser({
        onCompleted: ({ deleteUser }) => {
          if (deleteUser.status === "OK") {
            logout({
              onCompleted: () => {
                queryRef.dispose();
                window.location.href = "/login";
              },
              variables: {},
            });
          }
          console.log(deleteUser.error);
        },
        variables: {
          id: me?.user?.id,
        },
      });
    }
    if (!me.user || me.error?.message || me.error?.type) {
      console.log(`An error occured: ${me.error?.message || "Unknown Error"}`);
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
