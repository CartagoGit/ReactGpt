//* If the reponse JUST has a data property, then return the data property, else return the whole response
export type IOkResponse<T> = {
  ok: true;
} & (T extends { data: any } & {
  // Check if the response has JUST a data property
  [K in keyof T]: K extends "data" ? any : never;
}
  ? T["data"] & { gptMessage: string }
  : T extends { stream: ReadableStreamDefaultReader }
  ? T & { stream: ReadableStreamDefaultReader }
  : T);

export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IFetch<T> = Promise<IErrorResponse | IOkResponse<T>>;
