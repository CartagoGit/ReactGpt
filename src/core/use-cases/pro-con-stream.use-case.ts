import {
  IFetch,
  IProConStreamResponse,
} from "../../shared/interfaces/index.interfaces";
import { CONSTANTS } from "../config/config";
import { endpoints } from "../config/endpoints.api";
import { manageError } from "../helpers/index.helpers";

export const proConStreamUseCase = async (
  prompt: string,
  options?: { abortSignal?: AbortSignal }
): IFetch<IProConStreamResponse> => {
  const errorMessage = "No se pudo realizar la comparación de pros y contras";
  try {
    const { abortSignal } = options || {};
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${endpoints.proCon.stream}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );
    if (!resp.ok) throw new Error(errorMessage);
    const reader = resp.body?.getReader();
    if (!reader)
      throw new Error(`${errorMessage}. Problema al generar el lector`);
    return { ok: true, stream: reader };
  } catch (error) {
    return manageError({ error, message: errorMessage });
  }
};
