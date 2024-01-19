export function isolateErrorObject(error: Error | string) {
  if (typeof error === "string") {
    return JSON.parse(error.split("&&")[1]);
  }
  const stringifiedError = error.message.split("&&")[1];
  return JSON.parse(stringifiedError);
}
