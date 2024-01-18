export function isolateErrorObject(error: Error) {
  const stringifiedError = error.message.split("&&")[1];
  return JSON.parse(stringifiedError);
}
