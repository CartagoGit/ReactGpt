import type {
  IFetch,
  IProConDicusserResponse,
} from "../../interfaces/index.interfaces";
import { CONSTANTS } from "../config/config";

export const proConsUseCase = async (
  prompt: string
): IFetch<IProConDicusserResponse> => {
  const errorMessage = "No se pudo realizar la correción ortográfica";
  try {
    const resp = await fetch(`${CONSTANTS.API_GPT_URL}/pro-con/dicusser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!resp.ok) throw new Error(errorMessage);
    const { data }: IProConDicusserResponse = await resp.json();
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
