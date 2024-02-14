import type { voices } from "../constants/voices.constant";
import type {
  IFetch,
  ITextToAudioResponse,
} from "../../shared/interfaces/index.interfaces";
import { manageError } from "../../shared/helpers/index.helpers";
import { CONSTANTS, endpoints } from "../constants/index.constants";

export const textToAudioUseCase = async (
  prompt: string,
  options: { voice: (typeof voices)[number] }
): IFetch<ITextToAudioResponse> => {
  const errorMessage = "No se pudo realizar la conversión de texto a audio";
  try {
    const { voice } = options;
    const resp = await fetch(
      `${CONSTANTS.API_GPT_URL}${endpoints.textToAudio.data}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, voice }),
      }
    );
    if (!resp.ok) throw resp;
    const { data }: ITextToAudioResponse = await resp.json();
    return {
      ok: true,
      gptMessage: "Data recived",
      ...data,
    };
  } catch (error) {
    return manageError({ error: error as Response, message: errorMessage });
  }
};
