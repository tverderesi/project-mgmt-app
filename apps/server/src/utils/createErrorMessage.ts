export const createErrorMessage = (e: { type: string; message: string }) => {
  return "&&" + JSON.stringify(e) + "&&";
};
