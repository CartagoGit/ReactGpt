export interface ErrorResponse {
  message: string;
  error: any;
  ok: false;
}

export type OkResponse<T extends { data: any }> = { ok: true } & T["data"];

export type Fetch<T extends { data: any }> = Promise<
  ErrorResponse | OkResponse<T>
>;
