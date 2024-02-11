import { IOrthographyResponse } from "./responses.interface";

export interface IMessage<T = any> {
  text: string;
  isGpt: boolean;
  isError?: boolean;
  info?: T;
  errorMessage?: string;
}

export type IMesssageOrthography = IMessage<IOrthographyResponse["data"]>;
