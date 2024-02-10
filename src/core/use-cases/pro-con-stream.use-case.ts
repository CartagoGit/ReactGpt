import { IFetch } from "../../shared/interfaces/api.interface";
import { IProConStreamResponse } from "../../shared/interfaces/responses.interface";
import { CONSTANTS } from "../config/config";
import { endpoints } from "../config/endpoints.api";

export const proConStreamUseCase = async (
  prompt: string
): IFetch<IProConStreamResponse> => {
  const errorMessage = "No se pudo realizar la comparación de pros y contras";
  try {
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${endpoints.proCon.stream}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        // TODO Aborts signal
      }
    );
    if (!resp.ok) throw new Error(errorMessage);
    const reader = resp.body?.getReader();
    if (!reader)
      throw new Error(`${errorMessage}. Problema al generar el lector`);
    return { ok: true, stream: reader };
  } catch (error) {
    return {
      ok: false,
      message: errorMessage,
      error,
    };
  }
};
