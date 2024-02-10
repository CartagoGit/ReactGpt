import { IResponseData, IResponseStream } from "./index.interfaces";

export interface IOrthographyResponse extends IResponseData {
  data: {
    result: string;
    accuracy: number;
    message: string;
    errors: string[];
  };
}

export interface IProConDicusserResponse extends IResponseData {
  data: {
    role: "assistant";
    content: string;
  };
}

export interface IProConStreamResponse extends IResponseStream {
  stream: ReadableStreamDefaultReader<Uint8Array>;
}
