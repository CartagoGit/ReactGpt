import { json } from "react-router-dom";
import { ISelectOption } from "../../shared/interfaces/chat-input-boxes.interface";
import {
  IFetch,
  ITranslateResponse,
} from "../../shared/interfaces/index.interfaces";
import { CONSTANTS, endpoints } from "../constants/index.constants";
import { manageError } from "../helpers/index.helpers";

export const translateUseCase = async (
  prompt: string,
  options?: {
    lang?: ISelectOption;
  }
): IFetch<ITranslateResponse> => {
  const errorMessage = "No se pudo realizar la traducción.";
  try {
    const { lang } = options || {};
    const resp = await fetch(`${CONSTANTS.API_GPT_URL}${endpoints.transalte}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, lang }),
    });
    if (!resp.ok) throw new Error(errorMessage);
    const { data }: ITranslateResponse = await resp.json();
    return {
      ok: true,
      gptMessage: data.content,
      ...data,
    };
  } catch (error) {
    return manageError({ error, message: errorMessage });
  }
};
