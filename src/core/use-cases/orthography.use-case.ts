import type {
  IFetch,
  IOrthographyResponse,
} from "../../interfaces/index.interfaces";
import { CONSTANTS } from "../config/config";

export const orthographyUseCase = async (
  prompt: string
): IFetch<IOrthographyResponse> => {
  const errorMessage = "No se pudo realizar la correción ortográfica";
  try {
    const resp = await fetch(`${CONSTANTS.API_GPT_URL}/orthography/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!resp.ok) throw new Error(errorMessage);
    const { data }: IOrthographyResponse = await resp.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: errorMessage,
      error,
    };
  }
};
