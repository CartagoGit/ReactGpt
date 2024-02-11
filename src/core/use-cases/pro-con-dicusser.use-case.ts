import type {
  IFetch,
  IProConDicusserResponse,
} from "../../shared/interfaces/index.interfaces";
import { CONSTANTS } from "../constants/config.constant";
import { endpoints } from "../constants/endpoints.constant";
import { manageError } from "../helpers/index.helpers";

export const proConDicusserUseCase = async (
  prompt: string
): IFetch<IProConDicusserResponse> => {
  const errorMessage = "No se pudo realizar la comparación de pros y contras";
  try {
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${endpoints.proCon.dicusser}`,
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
