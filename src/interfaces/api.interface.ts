export type IResponseData = { data: any };

type IResponse = { [key: string]: any };

export type IOkResponse<T extends IResponse> = {
  ok: true;
} & (T extends IResponseData & {
  [K in keyof T]: K extends "data" ? any : never;
}
  ? T["data"]
  : T);

export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IFetch<T extends IResponse> = Promise<
  IErrorResponse | IOkResponse<T>
>;
