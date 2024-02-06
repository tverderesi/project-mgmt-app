import { createErrorMessage } from "./createErrorMessage";
import { User } from "@/models/User";

export function checkAuthetication(me: User) {
  if (!me) throw new Error(createErrorMessage({ type: "AUTH_ERROR_UNAUTHENTICATED", message: "You are not authenticated!" }));
}
