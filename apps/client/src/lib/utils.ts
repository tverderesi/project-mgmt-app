import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function toTitleCase(str: string) {
  const words = str.split("_");
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(" ");
}

export const statusDTO = (status: string) => {
  switch (status) {
    case "NOT_STARTED":
      return "Not Started";
    case "IN_PROGRESS":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
};
export const formatName = (name: string) => {
  const nameArray = name.split(" ");
  const isFullName = nameArray.length > 1;
  const firstName = nameArray[0];
  const lastNameInitial = nameArray[nameArray.length - 1]?.split("")[0];
  return `${firstName}${isFullName ? ` ${lastNameInitial}. ` : ""}`;
};
export const isJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export class AuthError extends Error {
  type: string;
  constructor(type: string, message?: string) {
    super(message);
    this.name = "AuthError";
    this.type = type;
  }
}
