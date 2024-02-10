import type {
  IFetch,
  IProConDicusserResponse,
} from "../../shared/interfaces/index.interfaces";
import { CONSTANTS } from "../config/config";
import { endpoints } from "../config/endpoints.api";
import { manageError } from "../helpers/index.helpers";

export const proConDicusserUseCase = async (
  prompt: string
): IFetch<IProConDicusserResponse> => {
  const errorMessage = "No se pudo realizar la comparación de pros y contras";
  try {
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${endpoints.proCon.discuss}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );
    
    if (!resp.ok) throw new Error(errorMessage);
    const { data }: IProConDicusserResponse = await resp.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return manageError({ error: error, message: errorMessage });
  }
};
