import type {
  IFetch,
  IProConStreamResponse,
} from "../../shared/interfaces/index.interfaces";
import { manageError } from "../../shared/helpers/index.helpers";
import { CONSTANTS, endpoints } from "../constants/index.constants";

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
    if (!resp.ok) throw resp;
    const reader = resp.body?.getReader();
    if (!reader)
      throw new Error(`${errorMessage}. Problema al generar el lector`);
    return { ok: true, stream: reader };
  } catch (error) {
    return manageError({ error: error as Response, message: errorMessage });
  }
};
