import { IOrthographyResponse } from "./responses.interface";

export interface IMessage<T = undefined> {
  text: string;
  isGpt: boolean;
  isError?: boolean;
  info?: T;
}

export type IMesssageOrthography = IMessage<IOrthographyResponse["data"]>;
