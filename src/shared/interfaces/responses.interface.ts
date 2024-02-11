//* Responses from the API

export interface IOrthographyResponse {
  data: {
    result: string;
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
