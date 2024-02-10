export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IOkResponse<T extends { data: any }> = { ok: true } & T["data"];
export type IOkStream<T extends { stream: any }> = { ok: true } & T["stream"];

export type IFetch<T extends { data: any }> = Promise<
  IErrorResponse | IOkResponse<T>
>;

export type IStream<T extends { stream: any }> = Promise<
  IErrorResponse | IOkStream<T>
>;
