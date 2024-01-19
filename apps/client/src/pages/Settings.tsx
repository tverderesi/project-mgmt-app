import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { h2, h3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import userV from "@/validators/user";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { userUserQuery } from "@/graphql/queries/__generated__/userUserQuery.graphql";
import { USER } from "@/graphql/queries/user";
import { useEffect } from "react";
import { UPDATE_USER } from "@/graphql/mutations/user";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { isJSON } from "@/lib/utils";
import { DeleteUser } from "../features/user/DeleteUser";
import { useSetPageTitle } from "@/lib/useSetPageTitle";

export function Settings() {
  useSetPageTitle("mgmt.app - Settings");

  const { toast } = useToast();
  const { user } = useLazyLoadQuery<userUserQuery>(USER, { id: "" });

  const updateForm = useForm<z.infer<typeof userV.update>>({
    resolver: zodResolver(userV.update),
    mode: "all",
  });

  useEffect(() => {
    if (user?.id) {
      updateForm.setValue("id", user.id);
    }
  }, [user]);

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
            <form onSubmit={updateForm.handleSubmit(onSubmit)} className={cn("gap-4 grid grid-cols-2 flex-wrap pt-4 max-w-2xl")}>
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
                      Make sure to use a strong password. It must contain at least 8 characters and at least one uppercase letter,
                      one lowercase letter, one number and one symbol.
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
          <DeleteUser user={user} />
        </CardFooter>
      </Card>
    </div>
  );
}
