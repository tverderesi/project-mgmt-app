import { Role } from "@/validators/shared";
import { createErrorMessage } from "./createErrorMessage";

export function doerCanDo(me: { id: string; role: string; name: string }, idToCheck: string, role: Role = "ADMIN") {
  if (me.id !== idToCheck && me.role !== role) {
    throw new Error(
      createErrorMessage({ type: "AUTH_ERROR_UNAUTHORIZED", message: "You are not authorized to perform this action!" })
    );
  }
  return;
}
