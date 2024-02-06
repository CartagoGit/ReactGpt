export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IOkResponse<T extends { data: any }> = { ok: true } & T["data"];

export type IFetch<T extends { data: any }> = Promise<
  IErrorResponse | IOkResponse<T>
>;
