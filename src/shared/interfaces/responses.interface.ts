//* Responses from the API

export interface IOrthographyResponse {
  data: {
    content: string;
    accuracy: number;
    message: string;
    errors: string[];
  };
}

export interface IProConDicusserResponse {
  data: {
    role: "assistant";
    content: string;
  };
}

export interface IProConStreamResponse {
  stream: ReadableStreamDefaultReader<Uint8Array>;
}

export interface ITranslateResponse {
  data: {
    content: string; // Texto traducido
    origin_lang: string; // Lenguaje de origen del texto del usuario, en español
    result_lang: string; // Lenguaje resultante de la traduccion, en español
  };
}
