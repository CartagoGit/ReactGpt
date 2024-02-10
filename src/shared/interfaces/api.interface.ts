//* If the reponse JUST has a data property, then return the data property, else return the whole response
export type IOkResponse<T> = {
  ok: true;
} & // Check if the response has JUST a data property
(T extends { data: any } & {
  [K in keyof T]: K extends "data" ? any : never;
}
  ? T["data"]
  : T);

export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IFetch<T> = Promise<IErrorResponse | IOkResponse<T>>;
