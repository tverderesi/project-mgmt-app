type Role = "ADMIN" | "USER";

async function checkAuthentication(context: any) {
  const currentUser = await context.getUser();
  if (!currentUser) throw new Error("User not authenticated!");
}

async function checkAuthorization(context: any, role: Role) {
  const currentUser = await context.getUser();
  if (!currentUser) throw new Error("User not authenticated!");
  if (currentUser.role !== role) throw new Error("User not authorized!");
}
