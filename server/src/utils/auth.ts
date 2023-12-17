type Role = "ADMIN" | "USER";

export async function checkAuthentication(context: any) {
  const currentUser = await context.getUser();
  if (!currentUser) throw new Error("User not authenticated!");
}

export async function checkRoleAuthorization(context: any, role: Role) {
  const currentUser = await context.getUser();
  if (!currentUser) throw new Error("User not authenticated!");
  if (currentUser.role !== role) throw new Error("User not authorized!");
}

export async function isCurrentUserOrAdmin(context: any, id: string) {
  const currentUser = await context.getUser();

  if (!currentUser) throw new Error("User not authenticated!");
  if (currentUser.role !== "ADMIN" && currentUser.id !== id) throw new Error("User not authorized!");
  if (currentUser.role !== "ADMIN" && currentUser.id !== id) throw new Error("User not authorized!");
}

export async function adminViewershipCheck(context, args) {
  const user = await context.getUser();
  if (user.role !== "ADMIN") args.userId = user.id;
}
