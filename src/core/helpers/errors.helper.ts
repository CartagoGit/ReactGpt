import { IErrorResponse } from "../../shared/interfaces/index.interfaces";

export const manageError = (data: { message: string; error: any }) => {
  const { message, error } = data;
  const kindError = (error?.kind as string) ?? "unknown";
  const specialErrorsMessage = {
    JsonParseError:
      "Mensaje demasiado largo para ser procesado. Intente con un texto más corto.",
  };
  const specialMessage: string | undefined = (specialErrorsMessage as any)[
    kindError
  ];
  const response = {
    ok: false,
    message: specialMessage ?? message,
    error,
  } as IErrorResponse;
  console.error("manageError:", response);
  return response;
};
