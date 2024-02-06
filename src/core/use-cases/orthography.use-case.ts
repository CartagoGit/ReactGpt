import type {
  Fetch,
  OrthographyResponse,
} from "../../interfaces/index.interfaces";
import { CONSTANTS } from "../config/config";

export const orthographyUseCase = async (
  prompt: string
): Fetch<OrthographyResponse> => {
  const errorMessage = "No se pudo realizar la correción ortográfica";
  try {
    const resp = await fetch(`${CONSTANTS.GPT_URL}/orthography-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    console.log(resp);
    if (!resp.ok) throw new Error(errorMessage);
    const { data }: OrthographyResponse = await resp.json();
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
