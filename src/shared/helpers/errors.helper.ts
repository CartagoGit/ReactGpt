import { IErrorResponse } from "../interfaces/index.interfaces";

export const manageError = async (data: {
  message: string;
  error: Response;
}) => {
  const { message, error } = data;
  const resp = await error.json();
  const kindError = (resp?.kind as string) ?? "unknown";
  const specialErrorsMessage = {
    JsonParseError:
      "Mensaje demasiado corto o demasiado largo para ser procesado. Reintente cambiando el texto.",
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
