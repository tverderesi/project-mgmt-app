import { Role } from "@/validators/shared";

export function viewerCanView(id: string, me: { id: string; role: string }, role: Role = "ADMIN") {
  if (id && me.id !== id && me.role !== role) {
    return {
      user: null,
      error: { type: "AUTH_ERROR_UNAUTHORIZED", message: "You are not authorized to perform this action!" },
    };
  }
}
