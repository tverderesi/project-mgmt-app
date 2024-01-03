import { CustomError } from "@/passportStrategy";

type Role = "ADMIN" | "USER";

export async function checkAuthentication(context: any) {
  const me = await context.getUser();
  if (!me) throw new CustomError("User not authenticated!", "AUTHENTICATION_ERROR");
}

export async function checkRoleAuthorization(context: any, role: Role) {
  await checkAuthentication(context);
  const me = await context.getUser();
  if (me.role !== role) throw new CustomError("User not authorized!", "AUTHORIZATION_ERROR");
}

export async function adminViewershipCheck(context, args) {
  const user = await context.getUser();
  if (user.role !== "ADMIN") args.userId = user.id;
}
