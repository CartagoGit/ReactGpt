import type {
  IFetch,
  IOrthographyResponse,
} from "../../shared/interfaces/index.interfaces";

import { manageError } from "../../shared/helpers/index.helpers";
import { CONSTANTS, ENDPOINTS } from "../constants/index.constants";

export const orthographyUseCase = async (
  prompt: string
): IFetch<IOrthographyResponse> => {
  const errorMessage = "No se pudo realizar la correción ortográfica";
  try {
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${ENDPOINTS.ORTHOGRAPHY.CHECK}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!resp.ok) throw resp;
    const { data }: IOrthographyResponse = await resp.json();
    return {
      ok: true,
      gptMessage: data.content,
      ...data,
    };
  } catch (error) {
    return manageError({ error: error as Response, message: errorMessage });
  }
};
