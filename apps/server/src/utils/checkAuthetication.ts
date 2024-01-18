import { Role } from "@/validators/shared";
import { createErrorMessage } from "./createErrorMessage";

export function checkAuthetication(me: { id: string; name: string; role: Role }) {
  if (!me) throw new Error(createErrorMessage({ type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" }));
}
