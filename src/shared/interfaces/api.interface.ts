//* If the reponse JUST has a data property, then return the data property, else return the whole response
export type IOkResponse<T> = {
  ok: true;
} & (T extends { data: any } & {
  // Check if the response has JUST a data property
  [K in keyof T]: K extends "data" ? any : never;
}
  ? IDataResponse<T>
  : IStreamResponse<T>);

export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IDataResponse<T extends { data: any }> = {
  gptMessage: string;
  kind: "data";
} & T["data"];

export type IStreamResponse<T> = {
  stream: ReadableStreamDefaultReader<Uint8Array>;
  kind: "stream";
} & T;

export type IFetch<T> = Promise<IErrorResponse | IOkResponse<T>>;
