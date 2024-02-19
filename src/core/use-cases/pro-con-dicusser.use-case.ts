import type {
  IFetch,
  IProConDicusserResponse,
} from "../../shared/interfaces/index.interfaces";

import { manageError } from "../../shared/helpers/index.helpers";
import { CONSTANTS, ENDPOINTS } from "../constants/index.constants";

export const proConDicusserUseCase = async (
  prompt: string
): IFetch<IProConDicusserResponse> => {
  const errorMessage = "No se pudo realizar la comparación de pros y contras";
  try {
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${ENDPOINTS.PRO_CON.DICUSSER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw resp;
    const { data }: IProConDicusserResponse = await resp.json();
    return {
      ok: true,
      gptMessage: data.content,
      ...data,
    };
  } catch (error) {
    return manageError({ error: error as Response, message: errorMessage });
  }
};
