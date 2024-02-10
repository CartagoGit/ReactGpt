import { IErrorResponse } from "../../shared/interfaces/index.interfaces";


export const manageError = (data: { message: string; error: any }) => {
  const { message, error } = data;
  const response = {
    ok: false,
    message,
    error,
  } as IErrorResponse;
  console.error(response);
  return response;
};
