import { IFetch } from "../../interfaces/api.interface";
import { IProConStreamResponse } from "../../interfaces/responses.interface";
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
    // const decoder = new TextDecoder();
    // let text = "";
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   const decodeChunk = decoder.decode(value, { stream: true });
    //   text += decodeChunk;
    //   console.log({ text, decodeChunk });
    // }
    //     const { data }:  = await resp.json();
    //     return {
    //       ok: true,
    //       ...data,
    //     };
  } catch (error) {
    return {
      ok: false,
      message: errorMessage,
      error,
    };
  }
};
