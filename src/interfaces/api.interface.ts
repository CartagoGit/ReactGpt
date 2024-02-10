export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

type IData<T extends any = any> = { data: T };

export type IOkResponse<T extends IData> = { ok: true } & T["data"];
// export type IOkStream<T extends { stream: any }> = { ok: true } & T["stream"];

export type IFetch<T extends IData> = Promise<IErrorResponse | IOkResponse<T>>;

// export type IStream<T extends { stream: any }> = Promise<
//   IErrorResponse | IOkStream<T>
// >;
