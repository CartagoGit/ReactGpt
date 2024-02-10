export type IResponseData = { data: any };

export type IResponseStream<
  T extends ReadableStreamDefaultReader = ReadableStreamDefaultReader
> = { stream: T };

type IResponse = IResponseData | IResponseStream;

type IOkResponse<T extends IResponse> = {
  ok: true;
} & (T extends IResponseData // If T is Data, then T["data"] is the type of the data
  ? T["data"]
  : T extends IResponseStream
  ? T // If T is Stream, then U is the type of the stream
  : never);

export interface IErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type IFetch<T extends IResponse> = Promise<
  IErrorResponse | IOkResponse<T>
>;

// export type IFetch<T extends IResponse> = Promise<
//   | IErrorResponse
//   | (T extends IData
//     ? IOkResponse<T>
//     : T extends IStream<infer U>
//     ? IOkStreamResponse<U>
//     : never)
// >;
